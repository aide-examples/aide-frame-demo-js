#!/bin/bash
#
# Build release tarball for aide-frame-demo-js
#
# Creates a tarball containing only the app/ directory contents,
# ready for upload to GitHub Releases.
#
# Usage:
#   ./build-release.sh              # Build tarball (version from app/VERSION)
#   ./build-release.sh --clean      # Remove releases/ directory
#   ./build-release.sh 0.2          # Override version
#

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Project configuration
REPO_NAME="aide-frame-demo-js"
RELEASES_DIR="$SCRIPT_DIR/releases"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Handle --clean flag
if [ "$1" = "--clean" ]; then
    if [ -d "$RELEASES_DIR" ]; then
        rm -rf "$RELEASES_DIR"
        log_info "Removed releases/ directory"
    else
        log_info "Nothing to clean"
    fi
    exit 0
fi

# Get version
if [ -n "$1" ]; then
    VERSION="$1"
else
    VERSION=$(cat app/VERSION 2>/dev/null | tr -d '\n\r')
fi

if [ -z "$VERSION" ]; then
    log_error "No version specified and app/VERSION not found"
    exit 1
fi

# Setup paths
TARBALL_NAME="${REPO_NAME}-${VERSION}.tar.gz"
BUILD_DIR="$(mktemp -d)"
RELEASE_DIR="${BUILD_DIR}/${REPO_NAME}-${VERSION}"

log_info "Building release ${VERSION}..."

# Create release directory structure
mkdir -p "${RELEASE_DIR}"

# Copy app directory contents
log_info "Copying app/ directory..."
cp -r app/* "${RELEASE_DIR}/"

# Create tarball
mkdir -p "$RELEASES_DIR"
cd "${BUILD_DIR}"
tar -czf "${RELEASES_DIR}/${TARBALL_NAME}" "${REPO_NAME}-${VERSION}"

# Cleanup temp directory
rm -rf "${BUILD_DIR}"

# Show results
log_info "Build complete!"
echo ""

# Show version and size
TARBALL_SIZE=$(du -sh "${RELEASES_DIR}/${TARBALL_NAME}" | cut -f1)
log_info "Version: ${VERSION}"
log_info "Tarball size: ${TARBALL_SIZE}"
log_info "Created: releases/${TARBALL_NAME}"

echo ""
echo "Contents:"
tar -tvf "${RELEASES_DIR}/${TARBALL_NAME}" | head -20
echo ""
echo "Next steps for release:"
echo "  1. git tag v${VERSION}"
echo "  2. git push origin v${VERSION}"
echo "  3. Create GitHub Release with tag v${VERSION}"
echo "  4. Upload releases/${TARBALL_NAME} as release asset"
