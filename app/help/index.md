# AIDE Frame Demo (Node.js) - Help

## Getting Started

This demo application showcases the aide-frame Node.js implementation.

## Available Demos

### HTTP Call
Demonstrates fetching JSON data from external APIs using `webRequest.fetchJson()`.

### Config
Shows configuration loading with defaults and deep merging.

### Logging
Displays structured logging at different levels (DEBUG, INFO, WARNING, ERROR).

### QR Code
Generates QR codes from text using the `qrcode` npm package.

### i18n
Demonstrates internationalization with client-side language switching.

## Navigation

- **About** - View documentation
- **Help** - This help page
- **Language selector** - Switch between English, German, and Spanish

## Troubleshooting

### Port already in use
If port 8082 is occupied, specify a different port:
```bash
npm start -- --port 8083
```

### QR codes not working
Ensure the qrcode package is installed:
```bash
npm install qrcode
```
