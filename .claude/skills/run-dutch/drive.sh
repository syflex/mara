#!/usr/bin/env bash
# drive.sh — Bring up the Dutch app and take a smoke set of screenshots.
#
# Idempotent: if a dev server is already on $PORT this reuses it. Otherwise
# launches `npm run dev` in the background, polls until it serves HTTP 200,
# then drives a headless Chromium against each route to capture a PNG.
#
# Usage:
#   ./drive.sh                    # default route set
#   ./drive.sh /lessen/a0-les-01  # custom route(s)
#
# Outputs: $SHOTS_DIR/*.png  (default /tmp/dutch-shots/)
# Logs:    /tmp/dutch-dev.log when this script started the server.
# Pid:     /tmp/dutch-dev.pid  (only set when this script started the server)

set -euo pipefail

PORT=${PORT:-3000}
BASE_URL="http://localhost:$PORT"
SHOTS_DIR=${SHOTS_DIR:-/tmp/dutch-shots}
DEV_LOG=/tmp/dutch-dev.log
DEV_PID_FILE=/tmp/dutch-dev.pid

# macOS Chrome by default. On Linux set $CHROME to /usr/bin/google-chrome or
# /usr/bin/chromium and ensure the necessary libs are installed.
CHROME=${CHROME:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}

REPO_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)
cd "$REPO_DIR"

server_up() { curl -sf "$BASE_URL/" >/dev/null; }

ensure_server() {
  if server_up; then
    echo "[ok] dev server already up on $BASE_URL"
    return
  fi
  echo "[..] starting dev server (logs → $DEV_LOG)"
  : > "$DEV_LOG"
  npm run dev >> "$DEV_LOG" 2>&1 &
  echo $! > "$DEV_PID_FILE"
  timeout 60 bash -c "until curl -sf \"$BASE_URL/\" >/dev/null; do sleep 1; done"
  echo "[ok] dev server ready (pid $(cat "$DEV_PID_FILE"))"
}

shoot() {
  local route="$1"
  local name="${route//\//_}"
  name="${name#_}"
  [ -z "$name" ] && name="home"
  local out="$SHOTS_DIR/$name.png"
  printf '[..] %-32s ' "$route"
  "$CHROME" \
    --headless=new \
    --disable-gpu \
    --hide-scrollbars \
    --no-sandbox \
    --virtual-time-budget=8000 \
    --window-size=1280,1800 \
    --screenshot="$out" \
    "$BASE_URL$route" >/dev/null 2>&1
  if [ -f "$out" ]; then
    local size
    size=$(stat -f %z "$out" 2>/dev/null || stat -c %s "$out")
    echo "→ $out (${size} bytes)"
  else
    echo "FAILED"
    return 1
  fi
}

[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME — override with \$CHROME=..."; exit 1; }

mkdir -p "$SHOTS_DIR"
ensure_server

routes=("$@")
if [ "${#routes[@]}" -eq 0 ]; then
  routes=("/" "/lessen" "/lessen/a0-les-01")
fi

echo "[..] capturing screenshots → $SHOTS_DIR"
for r in "${routes[@]}"; do shoot "$r"; done

echo
echo "[ok] done. screenshots:"
ls -lh "$SHOTS_DIR"/*.png
