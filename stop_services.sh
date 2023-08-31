#!/bin/bash

kill_process_by_port() {
    local port=$1
    if lsof -i :$port | grep -q LISTEN; then
        local pid=$(lsof -ti :$port)
        kill $pid 2>/dev/null
        echo "Process with PID $pid on port $port has been terminated."
    else
        echo "No process found listening on port $port."
    fi
}

# Kill the product-microservice
kill_process_by_port 8080

# Kill the web
kill_process_by_port 4200

# Kill the API
kill_process_by_port 3000

echo "All services stopped."
