#!/usr/bin/env bash
set -euo pipefail

PORT=${PORT:-8787}
URL=${1:-http://localhost:${PORT}/api/health}

echo "Checking health at: ${URL}"
curl -sS "${URL}" | jq . || curl -sS "${URL}"
