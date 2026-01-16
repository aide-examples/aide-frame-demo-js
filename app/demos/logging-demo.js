/**
 * Demo: Logging with aide_frame.log.
 */

const path = require('path');
const aideFrame = require(path.join(__dirname, '..', '..', 'aide-frame', 'js', 'aide_frame'));
const { log } = aideFrame;

const TITLE = 'Logging';
const DESCRIPTION = 'Demonstrates logging levels and structured log output';

// Track current level (since we don't have a getter in log module)
let currentLevel = 'INFO';

/**
 * Run the logging demo.
 *
 * Input: { action: "log", level: "INFO", message: "Test message" }
 * Output: { logged: true, level: "INFO", message: "Test message" }
 */
async function run(data) {
    const action = data.action || 'status';

    if (action === 'status') {
        // Show current logging status
        return {
            action: 'status',
            current_level: currentLevel,
            available_levels: ['DEBUG', 'INFO', 'WARNING', 'ERROR'],
        };
    }

    if (action === 'set_level') {
        // Change log level
        const level = (data.level || 'INFO').toUpperCase();
        if (!['DEBUG', 'INFO', 'WARNING', 'ERROR'].includes(level)) {
            return { error: `Invalid level: ${level}` };
        }
        const oldLevel = currentLevel;
        log.setLevel(level);
        currentLevel = level;
        return {
            action: 'set_level',
            old_level: oldLevel,
            new_level: level,
        };
    }

    if (action === 'log') {
        // Log a message at specified level
        const level = (data.level || 'INFO').toUpperCase();
        const message = data.message || 'Demo log message';

        if (level === 'DEBUG') {
            log.debug(message);
        } else if (level === 'INFO') {
            log.info(message);
        } else if (level === 'WARNING') {
            log.warning(message);
        } else if (level === 'ERROR') {
            log.error(message);
        } else {
            return { error: `Invalid level: ${level}` };
        }

        return {
            action: 'log',
            logged: true,
            level,
            message,
            note: 'Check terminal output to see the log entry',
        };
    }

    return { error: `Unknown action: ${action}` };
}

module.exports = {
    TITLE,
    DESCRIPTION,
    run,
};
