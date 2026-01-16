# AIDE Frame Demo (Node.js)

This application demonstrates the Node.js implementation of aide-frame.

## Features

The demo showcases:

- **HTTP API Calls** - Using `webRequest.fetchJson()` to call external APIs
- **Configuration** - Loading JSON config with defaults and deep merge
- **Logging** - Structured logging with levels (DEBUG, INFO, WARNING, ERROR)
- **QR Codes** - Generating QR codes from text using the `qrcode` npm package
- **i18n** - Internationalization with Polyglot.js (client-side)

## Architecture

```
aide-frame-demo-js/
├── aide-frame/          # Git submodule (framework)
├── app/
│   ├── demo.js          # Main entry point
│   ├── demos/           # Demo modules
│   ├── static/          # Frontend assets
│   ├── docs/            # Documentation
│   └── help/            # Help pages
└── package.json
```

## Implementation

The Node.js demo mirrors the Python version:

| Python | Node.js |
|--------|---------|
| `http_server.HttpServer` | `HttpServer` (Express-based) |
| `http_server.JsonHandler` | Express routes |
| `web_request.fetch_json()` | `webRequest.fetchJson()` |
| `qrcode_utils` | `qrcodeUtils` |

## Running

```bash
npm install
npm start
```

Open http://localhost:8082 in your browser.
