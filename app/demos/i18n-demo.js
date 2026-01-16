/**
 * i18n Demo - Demonstrates internationalization features.
 *
 * This demo shows how aide-frame handles multiple languages
 * using Polyglot.js on the frontend. The language switching
 * is handled client-side via the i18n.js module.
 */

const TITLE = 'i18n';
const DESCRIPTION = 'Demonstrates internationalization features';

/**
 * Get information about supported languages.
 *
 * @param {object} data - Request data (not used)
 * @returns {object} Language information
 */
async function run(data) {
    return {
        supported_languages: ['en', 'de', 'es'],
        language_names: {
            en: 'English',
            de: 'Deutsch',
            es: 'Español',
        },
        info: 'Language switching is handled client-side via i18n.setLanguage()',
    };
}

module.exports = {
    TITLE,
    DESCRIPTION,
    run,
};
