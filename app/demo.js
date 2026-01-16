#!/usr/bin/env node
/**
 * Minimal aide-frame example - demonstrates the framework basics.
 */

const path = require('path');

// =============================================================================
// 1. PATH SETUP
// =============================================================================

const SCRIPT_DIR = __dirname;
const PROJECT_DIR = path.dirname(SCRIPT_DIR);

// =============================================================================
// 2. AIDE-FRAME INIT
// =============================================================================

const aideFrame = require(path.join(PROJECT_DIR, 'aide-frame', 'js', 'aide_frame'));
const { paths, config, httpRoutes, updateRoutes, HttpServer } = aideFrame;

paths.init(SCRIPT_DIR);

// =============================================================================
// 3. APP IMPORTS
// =============================================================================

const DEMOS = require('./demos');

// =============================================================================
// CONFIGURATION
// =============================================================================

const DEFAULT_CONFIG = { port: 8083 };

// =============================================================================
// ARGUMENT PARSING
// =============================================================================

const { Command } = require('commander');
const program = new Command();

program
    .description('AIDE Frame Demo App (Node.js)')
    .option('-l, --log-level <level>', 'Log level', 'INFO')
    .option('-c, --config <path>', 'Config file', 'config.json')
    .option('-p, --port <number>', 'Override port', parseInt)
    .parse();

const opts = program.opts();

// Apply log level
aideFrame.log.setLevel(opts.logLevel);

// Load config
const cfg = config.loadConfig(
    opts.config,
    DEFAULT_CONFIG,
    [path.join(PROJECT_DIR, 'config.json')]
);

if (opts.port) {
    cfg.port = opts.port;
}

// =============================================================================
// SERVER SETUP
// =============================================================================

const server = new HttpServer({
    port: cfg.port,
    appDir: SCRIPT_DIR,
    docsConfig: {
        appName: 'AIDE Demo',
        customRoots: {
            sample_docs: {
                dirKey: 'SAMPLE_DOCS_DIR',
                title: 'Sample Docs',
                route: '/sample_docs',
                subdir: 'sample_docs',
            }
        }
    },
    updateConfig: {
        githubRepo: 'aide-examples/aide-frame-demo-js',
        serviceName: 'aide-frame-demo-js',
    }
});

// Register docs/help routes
httpRoutes.register(server.getApp(), server.docsConfig);

// Register update routes
updateRoutes.register(server.getApp(), server.updateConfig);

// =============================================================================
// CUSTOM ROUTES
// =============================================================================

const app = server.getApp();

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(SCRIPT_DIR, 'static', 'demo', 'demo.html'));
});

app.get('/index.html', (req, res) => {
    res.redirect('/');
});

// API: List available demos
app.get('/api/demos', (req, res) => {
    res.json({ demos: Object.keys(DEMOS) });
});

// API: Run demo
app.post('/api/demo/:name', async (req, res) => {
    const demoName = req.params.name;
    if (demoName in DEMOS) {
        try {
            const result = await DEMOS[demoName].run(req.body);
            res.json(result);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    } else {
        res.status(404).json({ error: `Unknown demo: ${demoName}` });
    }
});

// =============================================================================
// START SERVER
// =============================================================================

server.run();
