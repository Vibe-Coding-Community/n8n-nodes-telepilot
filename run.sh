rm -rf dist/
npm run build
npm link

cd ~/.n8n/
mkdir -p nodes && cd nodes
npm link @vcc-community/n8n-nodes-telepilot

#npm config set registry http://0.0.0.0:4873/

DEBUG=tdl,telepilot-cred,telepilot-node,telepilot-trigger,telepilot-cm EXECUTIONS_PROCESS=main N8N_LOG_LEVEL=debug n8n start
