# AIDE Frame Demo (Node.js)

Demo application showcasing the [aide-frame](aide-frame/) Node.js implementation.

## Features

- **HTTP API Calls** - Using `webRequest.fetchJson()` to call external APIs
- **Configuration** - Loading JSON config with defaults and deep merge
- **Logging** - Structured logging with levels (DEBUG, INFO, WARNING, ERROR)
- **QR Codes** - Generating QR codes from text
- **i18n** - Internationalization with Polyglot.js (client-side)

## Requirements

- Node.js 18.0.0 or higher

## Installation

```bash
# Clone with submodules
git clone --recurse-submodules <repository-url>
cd aide-frame-demo-js

# Install dependencies
npm install
```

## Running

```bash
# Start server
npm start

# Or with options
npm start -- --port 8083 --log-level DEBUG
```

Open http://localhost:8082 in your browser.

## Project Structure

```
aide-frame-demo-js/
├── aide-frame/          # Git submodule (framework)
├── app/
│   ├── demo.js          # Main entry point
│   ├── demos/           # Demo modules
│   ├── static/          # Frontend assets
│   ├── docs/            # Documentation
│   └── help/            # Help pages
├── package.json
└── run                  # Start script
```

## CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--port` | HTTP server port | 8082 |
| `--log-level` | Log level (DEBUG, INFO, WARNING, ERROR) | INFO |

## License

MIT
