#!/usr/bin/env bash
set -euo pipefail

# Lightweight helper to load a local .env (if present) and run the server
if [ -f .env ]; then
  echo "Loading .env variables..."
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
else
  echo ".env not found. Create one from .env.example and add your API keys before running."
fi

PORT=${PORT:-8787}
echo "Starting server on port ${PORT}..."
node server.js
