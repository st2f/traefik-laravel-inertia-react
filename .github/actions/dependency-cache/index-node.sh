#!/usr/bin/env bash
set -e

DIST_ROOT=$1
CACHE_ROOT=$2

if [ -z "$DIST_ROOT" ] || [ -z "$CACHE_ROOT" ]; then
  echo "Usage: index-node.sh <dist_root> <cache_root>"
  exit 1
fi

NODE_HASH=$(sha256sum "$DIST_ROOT/package-lock.json" 2>/dev/null | cut -d' ' -f1 || echo "no-node-lock")
NODE_CACHE="$CACHE_ROOT/node_modules_$NODE_HASH"

echo "NODE_CACHE = $NODE_CACHE"

if [ -d "$NODE_CACHE" ]; then
  echo "Restoring node_modules from cache"
  mkdir -p "$DIST_ROOT/node_modules"
  cp -a "$NODE_CACHE/." "$DIST_ROOT/node_modules/"
else
  cd "$DIST_ROOT"
  npm ci
  mkdir -p "$NODE_CACHE"
  cp -a node_modules/. "$NODE_CACHE/"
fi

echo "Node dependencies installed and cached successfully!"
