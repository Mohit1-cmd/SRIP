#!/bin/bash
# ============================================================
# SRIP Portal — Quick Start Script
# Starts both backend and frontend in one command.
# Usage: ./start.sh
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "🔄 Clearing old processes on ports 8001 and 3000..."
lsof -ti :8001 -ti :3000 2>/dev/null | xargs kill -9 2>/dev/null
sleep 1

# --- Start Backend ---
echo "🚀 Starting Django backend on http://127.0.0.1:8001 ..."
cd "$SCRIPT_DIR/backend"
source venv/bin/activate
python manage.py runserver 8001 --noreload &
BACKEND_PID=$!

# Wait for backend to be ready
for i in $(seq 1 15); do
  if curl -s -o /dev/null http://127.0.0.1:8001/api/positions/ 2>/dev/null; then
    echo "✅ Backend is ready! (took ${i}s)"
    break
  fi
  sleep 1
done

# --- Start Frontend ---
echo "🚀 Starting Vite frontend on http://localhost:3000 ..."
cd "$SCRIPT_DIR/frontend"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "============================================"
echo "  SRIP Portal is running!"
echo "  Backend:  http://127.0.0.1:8001/admin/"
echo "  Frontend: http://localhost:3000"
echo "  Press Ctrl+C to stop both servers."
echo "============================================"
echo ""

# Trap Ctrl+C to kill both
trap "echo '🛑 Shutting down...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" SIGINT SIGTERM

# Wait for either to exit
wait
