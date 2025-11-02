#!/usr/bin/env bash
set -e

DIST_ROOT=$1
CACHE_ROOT=$2

if [ -z "$DIST_ROOT" ] || [ -z "$CACHE_ROOT" ]; then
  echo "Usage: index-php.sh <dist_root> <cache_root>"
  exit 1
fi

COMPOSER_HASH=$(sha256sum "$DIST_ROOT/composer.lock" 2>/dev/null | cut -d' ' -f1 || echo "no-composer-lock")
COMPOSER_CACHE="$CACHE_ROOT/vendor_$COMPOSER_HASH"

echo "COMPOSER_CACHE = $COMPOSER_CACHE"

if [ -d "$COMPOSER_CACHE" ]; then
  echo "Restoring vendor from cache"
  mkdir -p "$DIST_ROOT/vendor"
  cp -a "$COMPOSER_CACHE/." "$DIST_ROOT/vendor/"
else
  cd "$DIST_ROOT"
  composer install --no-interaction --no-dev --prefer-dist --optimize-autoloader
  mkdir -p "$COMPOSER_CACHE"
  cp -a vendor/. "$COMPOSER_CACHE/"
fi

echo "PHP dependencies installed and cached successfully!"
