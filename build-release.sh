#!/bin/bash
#
# Build release tarball for aide-frame-demo-js
#
# Creates a tarball containing only the app/ directory contents,
# ready for upload to GitHub Releases.
#
# Usage:
#   ./build-release.sh           # Uses version from app/VERSION
#   ./build-release.sh 0.2       # Override version
#

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Get version
if [ -n "$1" ]; then
    VERSION="$1"
else
    VERSION=$(cat app/VERSION | tr -d '\n\r')
fi

if [ -z "$VERSION" ]; then
    echo "Error: No version specified and app/VERSION not found"
    exit 1
fi

TARBALL_NAME="aide-frame-demo-js-${VERSION}.tar.gz"
BUILD_DIR="$(mktemp -d)"
RELEASE_DIR="${BUILD_DIR}/aide-frame-demo-js-${VERSION}"

echo "Building release ${VERSION}..."

# Create release directory structure
mkdir -p "${RELEASE_DIR}"

# Copy app directory contents
cp -r app/* "${RELEASE_DIR}/"

# Create tarball
cd "${BUILD_DIR}"
tar -czvf "${SCRIPT_DIR}/${TARBALL_NAME}" "aide-frame-demo-js-${VERSION}"

# Cleanup
rm -rf "${BUILD_DIR}"

echo ""
echo "Created: ${TARBALL_NAME}"
echo ""
echo "Contents:"
tar -tvf "${SCRIPT_DIR}/${TARBALL_NAME}" | head -20
echo ""
echo "To create a GitHub release:"
echo "  1. git tag v${VERSION}"
echo "  2. git push origin v${VERSION}"
echo "  3. Upload ${TARBALL_NAME} to the release"
