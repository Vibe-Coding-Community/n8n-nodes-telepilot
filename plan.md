# План рефакторинга n8n-nodes-telepilot

Этот план описывает шаги по рефакторингу проекта `n8n-nodes-telepilot` с целью минимизации сторонних зависимостей от `@telepilotco`, оптимизации процесса публикации NPM пакета с помощью Github Action и отчистки неиспользуемого легаси кода.

**Важно:** После выполнения каждого этапа или значительного изменения, создавайте коммит в Git.

## Этап 1: Анализ и удаление некритичного легаси

*   `[x]` **Задача 1.1:** Проанализировать и удалить скрипт `deploy/publish.sh`.
    *   **Обоснование:** Публикация управляется через GitHub Actions (`publish.yml`). Этот скрипт, вероятно, является устаревшим ручным методом.
    *   **Действия:** Проверить, не используется ли скрипт в каких-либо других процессах. Если нет - удалить.
*   `[x]` **Задача 1.2:** Проанализировать и удалить цели `publish` и `dryrun` из `Makefile`.
    *   **Обоснование:** GitHub Actions (`publish.yml` и `publish-check.yml`) уже выполняют эти функции (публикация и сухой прогон).
    *   **Действия:** Убедиться, что локальные вызовы `make publish` или `make dryrun` не являются частью основного рабочего процесса разработчиков. Если нет - удалить цели.
*   `[x]` **Задача 1.3:** Удалить скрипт `deploy/npm-telepilot-co.sh`.
    *   **Обоснование:** Кастомный NPM registry `npm.telepilot.co:4873` не используется. Публикация осуществляется на стандартный NPM registry (`npmjs.org`) через GitHub Actions.
    *   **Действия:** Удалить файл `deploy/npm-telepilot-co.sh`.

## Этап 2: Оптимизация процесса публикации NPM

*   `[x]` **Задача 2.1:** Оптимизировать GitHub Action `publish.yml` для использования стандартного NPM registry.
    *   **Обоснование:** Кастомный NPM registry `npm.telepilot.co:4873` не используется. Необходимо полностью перейти на `https://registry.npmjs.org`.
    *   **Действия:** 
        *   Установить `inputs.npm_registry` в `https://registry.npmjs.org` и удалить возможность его изменения.
        *   Удалить всю логику, связанную с `CUSTOM_REGISTRY_AUTH` и переменными для кастомного registry.
        *   Убедиться, что для публикации используется `NODE_AUTH_TOKEN: ${{ secrets.REGISTRY_TOKEN }}` и `actions/setup-node` с `registry-url: 'https://registry.npmjs.org'`.
        *   Удалить шаг `dkershner6/use-npm-token-action@v1`, так как `actions/setup-node` достаточно.
        *   Удалить `npm config set strict-ssl false`, так как для `registry.npmjs.org` это не требуется.
*   `[x]` **Задача 2.2:** Обновить GitHub Action `publish-check.yml` для использования стандартного NPM registry.
    *   **Обоснование:** Аналогично `publish.yml`, `publish-check.yml` должен использовать `https://registry.npmjs.org`.
    *   **Действия:** Синхронизировать логику установки registry с обновленным `publish.yml`, удалив все упоминания кастомного registry.

### 3. Анализ и минимизация зависимостей `@telepilotco`
- [x] **3.1. Заменить `@telepilotco/tdl` на `tdl` от `eilvelia`**
    - [x] Обновить `package.json`.
    - [x] Обновить импорты и использование в `TelePilotNodeConnectionManager.ts`.
- [x] **3.2. Интегрировать `prebuilt-tdlib`**
    - [x] Добавить `prebuilt-tdlib` в `package.json`.
    - [x] Обновить `TelePilotNodeConnectionManager.ts` для использования `prebuilt-tdlib` для конфигурации TDLib.

## Этап 4: Очистка легаси кода в директории `deploy`

*   [x] **Задача 4.1:** Удалить устаревшие скрипты и конфигурации, связанные с AWS и Verdaccio.
    *   **Обоснование:** Переход на стандартный NPM-registry и GitHub Actions для CI/CD делает эти элементы ненужными.
    *   **Действия:** 
        *   Проанализировать содержимое директории `deploy`.
        *   Удалить директории `deploy/aws-test` и `deploy/verdaccio`.
*   [x] **Задача 4.2:** Проанализировать и, при необходимости, удалить или переместить оставшиеся скрипты из `deploy`.
    *   **Обоснование:** Некоторые скрипты могут быть полезны для локального тестирования или сборки, но их расположение в `deploy` может быть неоптимальным.
    *   **Действия:** 
        *   Изучить оставшиеся файлы в `deploy` (например, `deploy/test-n8n-imports`).
        *   Переместить содержимое `deploy/test-n8n-imports` в новую директорию `examples` в корне проекта.
        *   Удалить пустую директорию `deploy/test-n8n-imports`.
        *   Удалить пустую директорию `deploy`.

## Этап 5: Общий анализ и рефакторинг кода (более сложный)

*   [x] **Задача 5.1:** Проверить и обновить `.eslintrc.js` и `.prettierrc.js`.
    *   **Обоснование:** После удаления явного легаси и оптимизации зависимостей, могут остаться неиспользуемые функции, модули или конфигурации.
    *   **Действия:** Использовать инструменты статического анализа, анализ покрытия кода (если есть тесты) и ручной просмотр для выявления таких участков.
- [x] 5.2 Audit code for unused or outdated parts (e.g. old `deploy` folder references, commented out code, unused variables/functions).
- [ ] ~~**Задача 5.3 (Опционально/Сложно):** Рефакторинг кода для уменьшения прямой зависимости от функционала библиотек `@telepilotco`, если это возможно и целесообразно.~~ (Skipped)
    *   **Обоснование:** Если анализ на Этапе 3 показал, что части функционала `@telepilotco/tdl` можно заменить или реализовать иначе.
    *   **Действия:** Это потребует глубокого понимания кода и может быть значительной задачей. Выполнять только при явной выгоде (упрощение, повышение стабильности, снижение затрат на поддержку).

## Этап 6: Документация и Финализация

- [x] 6.1 Update README.md with information about the new structure, how to use the examples, and any changes to the build/run process.
- [x] 6.2 Create a short `CONTRIBUTING.md` if it doesn't exist, or update it. (Optional, can be skipped if not a priority)
- [x] 6.3 Final review of all changes and ensure all tasks in `plan.md` are marked correctly.

## Этап 7: Ревью и исправление ошибок после рефакторинга

- [x] **Задача 7.1:** Провести ревью и исправить ошибки в `/Users/vailcody/Code/n8n-nodes-telepilot-1/nodes/TelePilot/TelePilotTrigger.node.ts`.
- [x] 7.2 Исправить пути в `TelePilotNodeConnectionManager.ts`
- [x] 7.3 Исправить ошибки типов и использования Client/ClientOptions в `TelePilotNodeConnectionManager.ts`

---
Пожалуйста, обновляйте статусы задач по мере их выполнения.

### Stage 9: Обновление и очистка скриптов сборки и конфигурационных файлов
- [x] 9.1 Обновить `run.sh` для использования `npm` и корректного имени пакета.
- [x] 9.2 Обновить `Makefile` для использования `npm` и корректного имени пакета.
- [x] 9.3 Удалить `.gitmodules`, так как он пуст или не нужен.

### Stage 10: Улучшение GitHub Actions Workflow для публикации
- [x] 10.1 Обновить `.github/workflows/publish.yml` для упрощения процесса публикации, используя триггеры по тегам и синхронизацию версии с `package.json`.

### Stage 11: Обновление документации README
- [x] 11.1 Добавить раздел "Development" в `README.md` с описанием локальной установки и отладки.
- [x] 11.2 Добавить раздел "Publish to NPM" в `README.md` с описанием процесса публикации через теги GitHub.
