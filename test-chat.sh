#!/usr/bin/env bash
set -euo pipefail

# Usage: ./test-chat.sh 'Hello from local test' [lang]
MSG=${1:-"Hello from local test"}
LANG=${2:-en}
PORT=${PORT:-8787}

URL=${3:-http://localhost:${PORT}/api/chat}

cat <<EOF | curl -sS -X POST "${URL}" -H 'Content-Type: application/json' -d @-
{
  "messages": [{"role": "user", "content": ${MSG@Q}}],
  "lang": "${LANG}",
  "siteContext": "RAPTOR [X] website context"
}
EOF
