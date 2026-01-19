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
const { paths, args, HttpServer } = aideFrame;

paths.init(SCRIPT_DIR);

// =============================================================================
// 3. APP IMPORTS
// =============================================================================

const DEMOS = require('./demos');

// =============================================================================
// 4. CONFIGURATION
// =============================================================================

const DEFAULT_CONFIG = { port: 8083 };

// =============================================================================
// 5. ARGUMENT PARSING
// =============================================================================

const { Command } = require('commander');
const program = new Command();

program.description('AIDE Frame Demo App (Node.js)');
args.addCommonArgs(program);  // Adds --log-level, --config, --regenerate-icons
program.option('-p, --port <number>', 'Override port', parseInt);
program.parse();

const opts = program.opts();

// Apply common args (log level, config loading, icon generation)
const cfg = args.applyCommonArgs(opts, {
    configDefaults: DEFAULT_CONFIG,
    appDir: SCRIPT_DIR,
});

if (opts.port) {
    cfg.port = opts.port;
}

// =============================================================================
// 6. SERVER SETUP
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
        },
        pwa: cfg.pwa && cfg.pwa.enabled ? cfg.pwa : null,
    },
    updateConfig: {
        githubRepo: 'aide-examples/aide-frame-demo-js',
        serviceName: 'aide-frame-demo-js',
    }
});
// Note: HttpServer auto-registers docs/help and update routes if configs provided

// =============================================================================
// 7. ROUTES
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
// 8. START SERVER
// =============================================================================

server.run();
