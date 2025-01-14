#!/bin/bash

# Watch .go files and run `go run main.go`
find . -type f \( -name "*.go" -o -name "*.m" -o -name "*.h" -o -name "*.ts" -o -name "example.js" \) -not -path "./node_modules/*" -not -path "./build/*" -not -path "./assets/*" | entr -r sh -c 'clear && DEBUG=true ./scripts/build.sh && DEBUG=true ./build/Finicky.app/Contents/MacOS/Finicky && echo "$?"'
