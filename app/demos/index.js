/**
 * Demo modules for AIDE Frame features.
 */

const httpCall = require('./http-call');
const configDemo = require('./config-demo');
const loggingDemo = require('./logging-demo');
const qrcodeDemo = require('./qrcode-demo');
const i18nDemo = require('./i18n-demo');

// Registry of available demos
const DEMOS = {
    http_call: httpCall,
    config: configDemo,
    logging: loggingDemo,
    qrcode: qrcodeDemo,
    i18n: i18nDemo,
};

module.exports = DEMOS;
