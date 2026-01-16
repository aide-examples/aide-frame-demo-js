/**
 * Demo: HTTP API calls using aide_frame.webRequest.
 */

const path = require('path');
const aideFrame = require(path.join(__dirname, '..', '..', 'aide-frame', 'js', 'aide_frame'));
const { webRequest, logger } = aideFrame;

const TITLE = 'HTTP API Call';
const DESCRIPTION = 'Demonstrates fetching JSON from external APIs (Genderize.io)';

// Demo data for offline fallback
const DEMO_DATA = {
    max: { gender: 'male', probability: 0.99 },
    anna: { gender: 'female', probability: 0.98 },
    alex: { gender: 'male', probability: 0.62 },
};

/**
 * Run the HTTP call demo.
 *
 * Input: { name: "Max" }
 * Output: { name: "Max", gender: "male", probability: 0.99, source: "api" }
 */
async function run(data) {
    const name = (data.name || '').trim();
    if (!name) {
        return { error: 'Name is required' };
    }

    // Try live API first
    try {
        const result = await webRequest.fetchJson(`https://api.genderize.io/?name=${encodeURIComponent(name)}`);
        if (result && result.gender) {
            return {
                name: result.name || name,
                gender: result.gender,
                probability: result.probability || 0,
                count: result.count || 0,
                source: 'genderize.io',
            };
        }
    } catch (e) {
        logger.warning(`API call failed: ${e.message}`);
    }

    // Fallback to demo data
    const nameLower = name.toLowerCase();
    if (nameLower in DEMO_DATA) {
        const demo = DEMO_DATA[nameLower];
        return {
            name,
            gender: demo.gender,
            probability: demo.probability,
            count: 0,
            source: 'demo_data',
        };
    }

    return {
        name,
        gender: 'unknown',
        probability: 0,
        count: 0,
        source: 'not_found',
    };
}

module.exports = {
    TITLE,
    DESCRIPTION,
    run,
};
