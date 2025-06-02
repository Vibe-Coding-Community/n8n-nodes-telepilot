# n8n-nodes-telepilot

[![npm version](https://badge.fury.io/js/@telepilotco%2Fn8n-nodes-telepilot.svg)](https://www.npmjs.com/package/@telepilotco/n8n-nodes-telepilot)

## Project Status & Development

This project is under active development. While many core Telegram actions are implemented, contributions and feedback are welcome! The node is designed to be compatible with various n8n installations.

Here is environment compatibility overview:

|     OS | architecture | supported? |
|--------|--------------|------|
| docker | x64 | YES  |
| docker | arm64 | YES   |
| linux | x64 | YES     |
| linux | arm64 | YES   |
| macos | x64 | YES     |
| macos | arm64 | YES  |
| windows | x64 | NO  |
| windows | arm64 | NO  |

If you are interested in following our updates and news, check out:

- our telegram channel https://t.me/telepilotco OR
- our website https://telepilot.co


## Overview

`@telepilotco/n8n-nodes-telepilot` is a node for the n8n automation engine that provides the ability to configure your personal Telegram assistant. 
It works alongside your main client, allowing you to interact with Telegram servers and see all the messages you can see, 
while also enabling your assistant to react to those messages.

With `@telepilotco/n8n-nodes-telepilot`, you can enhance your Telegram user experience by automating various actions and responses. 
Your personal Telegram CoPilot acts as real-time assistant, providing additional functionalities and making your Telegram usage more efficient.

At [TelePilot](https://telepilot.co), we prioritize your privacy. We do not have access to your Telegram messages because you have full control over your personal instance of TelePilot, 
which runs on your self-hosted n8n instance. The choice of hosting environment is entirely up to you. 

Whether you prefer the convenience of cloud hosting or the control of running it on your own machine, TelePilot allows you to make that decision. 

Probably the fastest way to get everything up and running would be using Railway n8n template:

 - [Railway](https://railway.app/new/template/zo8wVU)

If you are technically inclined, you can even launch it on your homelab or Raspberry Pi. 
For a hassle-free experience, take one of these templates for self-hosting:

 - [n8n on Cloudron](https://www.cloudron.io/store/io.n8n.cloudronapp.html)
 - [YunoHost](https://yunohost.org/en/app_n8n) / [YunoHost n8n app on github](https://github.com/YunoHost-Apps/n8n_ynh)
 - https://timeweb.cloud/ ?

## Features

- Interact with other users
- Respond to private messages: CoPilot can respond to private messages from other users, allowing for automated answers
- Interact with channels and groups:
	- Download messages
	- Topic Notification: Stay updated on specific topics of interest by receiving notifications when they are being discussed in Telegram. 
    Configure your [personal Telegram assistant](https://telepilot.co) to monitor and alert you whenever a particular topic is mentioned.
	- Keyword Notification: Never miss important messages by setting up keyword notifications.
    Define specific words or phrases that you are interested in, and your Telegram assistant will notify you whenever those keywords are posted in any message. 
    Stay informed and engaged with the conversations that matter to you.
	- Moderating groups
  - Schedule message posting: you can schedule messages using your Telegram CoPilot
- Get more API events: Telepilot can receive API events that normal bots don't know about, such as when a message gets deleted through the client.


## Installation

### Install as n8n community node

To use this package in your n8n project, follow these steps:

1. Go to Settings -> Community modules of your self-hosted n8n instance
2. Select "Install Community node"
3. Specify the name `@telepilotco/n8n-nodes-telepilot`, click checkbox that you understand the risks and click "Install"

![Install Telepilot as n8n Community Node](https://telepilot.co/documentation-images/install-community-node-1.png)

### Manual installation

To get started install the package in your `~/.n8n/nodes` directory:

`npm install @telepilotco/n8n-nodes-telepilot`

For Docker-based deployments, add the following line before the font installation command in your [n8n Dockerfile](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/Dockerfile):

`RUN cd ~/.n8n/ && mkdir nodes && cd nodes && npm install @telepilotco/n8n-nodes-telepilot`

## TelePilot setup

### Connect TelePilot with your Telegram Account
![Connect Telepilot with your Telegram Account](https://telepilot.co/documentation-images/telegram-api-1.png)

- Log in to your Telegram core: https://my.telegram.org with your phone number that you wish to use TelePilot with
- Go to [API development tools](https://my.telegram.org/apps) and fill out the form:
  - App title: `telepilot`
  - Short name: `telepilot`
- Receive basic addresses as well as the `api_id` and `api_hash` parameters required for user authorization.

### Create Credentials in your n8n instance

Access the credentials UI by opening the left menu and selecting **Credentials**.

![Configure TelePilot Credentials](https://telepilot.co/documentation-images/credentials-0.png)

Click on "Add Credential" button and browse for "Personal Telegram CoPilot API".

To initiate connection with Telegram servers, you need to provide following:
- `api_id`: copy-paste it from https://my.telegram.org/apps page
- `api_hash`: copy-paste it from https://my.telegram.org/apps page

![Configure TelePilot Credentials](https://telepilot.co/documentation-images/credentials-1.png)

After you have filled out all fields, click on "Save" and make sure that you see "Connection tested successfully" message.

![Configure TelePilot Credentials](https://telepilot.co/documentation-images/credentials-2.png)

## Login

Once the credentials are set up, you need to log in.
This is accomplished by authorizing Telepilot using your Telegram account via a QR code scan.

For more detailed information, please refer to our login guide: https://telepilot.co/login-howto


### Example Workflows

Example workflows demonstrating various functionalities of the TelePilot nodes can be found in the `/examples` directory of this repository. You can import these `.json` files directly into your n8n instance to get started quickly.

Predefined workflows might also be available on our website: [TelePilot Workflows](https://telepilot.co/workflows)


## Troubleshooting
ке
You can enable DEBUG logs by running n8n with env variables. This is particularly useful for tracing issues within the `tdl` library, the node's credential handling, core node logic, trigger operations, and connection management.

Run n8n from your terminal with the following command:

```shell
DEBUG=tdl,tdl:client,telepilot-cred,telepilot-node,telepilot-trigger,telepilot-cm N8N_LOG_LEVEL=debug npx n8n
```

For Docker-based n8n setups, ensure you add these environment variables to your Docker container configuration or `docker-compose.yml` file.

This will provide verbose output that can help pinpoint issues during development.

## Development

This section outlines the process for setting up the development environment and installing the package locally within n8n.

### Local Installation

To work on this n8n node locally, you'll need to link it to your n8n installation. Follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/telepilotco/n8n-nodes-telepilot.git
    cd n8n-nodes-telepilot
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build the node:**
    ```bash
    npm run build
    ```
4.  **Link the package:**
    Navigate to the root directory of your n8n installation (or the directory where n8n is globally installed if you're linking it there) and run:
    ```bash
    npm link /path/to/your/n8n-nodes-telepilot
    ```
    Replace `/path/to/your/n8n-nodes-telepilot` with the actual absolute path to your cloned repository.

    Alternatively, you can use the `Makefile` targets:
    ```bash
    make link
    ```
    This will build and link the package to the default n8n nodes directory (`~/.n8n/nodes/`).

5.  **Restart n8n:**
    If n8n is already running, you'll need to restart it to pick up the newly linked node.

### Debugging

For detailed debugging instructions, please refer to the [Troubleshooting](#troubleshooting) section above.

## Publish to NPM

Publishing a new version of this package to NPM is automated via a GitHub Actions workflow. The process is triggered by pushing a new Git tag to the repository.

Here's how to publish a new version:

1.  **Ensure all changes are committed:** Make sure your `main` branch (or your release branch) is up-to-date and all desired changes are committed.
2.  **Create a new Git tag:** The tag name should correspond to the new version number (e.g., `v1.2.3`). It's crucial that the tag follows semantic versioning.
    ```bash
    git tag vX.Y.Z
    ```
    Replace `X.Y.Z` with the new version number (e.g., `v0.2.1`).
3.  **Push the tag to GitHub:**
    ```bash
    git push origin vX.Y.Z
    ```
    Or, to push all tags:
    ```bash
    git push --tags
    ```

Pushing a new tag will trigger the `publish.yml` GitHub Actions workflow. This workflow will:

*   Check out the code at the tagged commit.
*   Set up Node.js.
*   Synchronize the `version` in `package.json` with the Git tag (e.g., if the tag is `v1.2.3`, it sets the version to `1.2.3`).
*   Install dependencies using `npm ci`.
*   Build the project using `npm run build` (as defined in the `prepublishOnly` script in `package.json`).
*   Publish the package to NPM using `npm publish`.

You will need to have `NPM_TOKEN` configured as a secret in your GitHub repository settings for the publish step to succeed.

## Usage

This package provides various nodes and actions that allow you to interact with Telegram servers and enhance the Telegram user experience.

- **Nodes**: `TelePilot` (for performing actions) and `TelePilotTrigger` (for listening to events).
- **Credentials**: Securely store your Telegram API `api_id` and `api_hash`.
- **Operations**: A wide range of operations are available for interacting with users, chats, groups, messages, files, and more.

For detailed information on each node, its parameters, and how to use them, please refer to the node's built-in documentation within your n8n instance.

Check the `/examples` directory in this repository for practical workflow examples.

If you have any questions, reach out via email (contact@telepilot.co) or in our [Telegram Group](https://t.me/telepilotco_group).

## License

This project is licensed under the MIT license.
