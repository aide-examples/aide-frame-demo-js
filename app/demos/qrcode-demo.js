/**
 * Demo: QR Code generation.
 */

const path = require('path');
const aideFrame = require(path.join(__dirname, '..', '..', 'aide-frame', 'js', 'aide_frame'));
const { qrcodeUtils } = aideFrame;

const TITLE = 'QR Code';
const DESCRIPTION = 'Generate QR codes from text or URLs';

/**
 * Generate a QR code from input text.
 *
 * Input: { text: "https://example.com" }
 * Output: { image: "data:image/png;base64,...", text: "https://example.com" }
 */
async function run(data) {
    const text = (data.text || '').trim();
    if (!text) {
        return { error: 'Text is required' };
    }

    if (!qrcodeUtils.isAvailable()) {
        return { error: 'qrcode library not installed. Run: npm install qrcode' };
    }

    try {
        const dataUrl = await qrcodeUtils.generateBase64(text);
        if (dataUrl === null) {
            return { error: 'Failed to generate QR code' };
        }

        return {
            text,
            image: dataUrl,
            size: text.length,
        };
    } catch (e) {
        return { error: e.message };
    }
}

module.exports = {
    TITLE,
    DESCRIPTION,
    run,
};
