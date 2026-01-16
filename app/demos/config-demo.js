/**
 * Demo: Configuration loading with aide_frame.config.
 */

const path = require('path');
const aideFrame = require(path.join(__dirname, '..', '..', 'aide-frame', 'js', 'aide_frame'));
const { config, paths } = aideFrame;

const TITLE = 'Configuration';
const DESCRIPTION = 'Demonstrates config loading with defaults, search paths, and overrides';

/**
 * Run the config demo.
 *
 * Input: { action: "show_paths" }
 * Output: { action: "show_paths", paths: { ... } }
 */
async function run(data) {
    const action = data.action || 'show_paths';

    if (action === 'show_paths') {
        // Show registered paths
        return {
            action: 'show_paths',
            paths: {
                APP_DIR: paths.APP_DIR || 'not set',
                STATIC_DIR: paths.STATIC_DIR || 'not set',
                DOCS_DIR: paths.get('DOCS_DIR') || 'not set',
            },
        };
    }

    if (action === 'load_config') {
        // Demonstrate config loading with defaults
        const defaults = { port: 8080, debug: false, name: 'Demo App' };
        const cfg = config.loadConfig(
            data.config_path || 'config.json',
            defaults
        );
        return {
            action: 'load_config',
            config: cfg,
            defaults_used: defaults,
        };
    }

    if (action === 'get_value') {
        // Get a specific config value
        const key = data.key || 'port';
        const defaultValue = data.default || null;
        const defaults = defaultValue !== null ? { [key]: defaultValue } : {};
        const cfg = config.loadConfig(null, defaults);
        return {
            action: 'get_value',
            key,
            value: cfg[key] !== undefined ? cfg[key] : defaultValue,
            found: key in cfg,
        };
    }

    return { error: `Unknown action: ${action}` };
}

module.exports = {
    TITLE,
    DESCRIPTION,
    run,
};
