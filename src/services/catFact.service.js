const axios = require('axios');

const {
	CAT_FACTS_API,
	API_TIMEOUT,
	MESSAGES,
} = require("../config/constants.config");


/**
 * Fetches a random cat fact from the Cat Facts API
 * @returns {Promise<string>} A random cat fact
 * @throws {Error} If the API call fails
*/
const fetchCatFact = async () => {
    try {
        const response = await axios.get(CAT_FACTS_API, {
            timeout: API_TIMEOUT,
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'HNG13-Stage-0 (https://hng.tech/)',
            },
        });

        if ( response.data && response.data.fact ) {
            return {
                success: true,
                fact: response.data.fact,
                length: response.data.length
            };
        }

        throw new Error('Invalid response structure from Cat Facts API');
        
    } catch (error) {
        console.error('Cat Facts API Error:', {
            message: error.message,
            code: error.code,
            response: error.response?.status,
        });

        if (error.code === 'ECONNABORTED') {
            throw new Error('Cat Facts API request timed out');
        } else if (error.response) {
            throw new Error(`Cat Facts API returned status ${error.response.status}`);
        } else if (error.request) {
            throw new Error('No response received from Cat Facts API');
        } else {
            throw new Error('Failed to fetch cat fact');
        }
    };
};

/**
 * Fetches a cat fact with fallback handling
 * @returns {Promise<Object>} Object containing fact and success status
*/
const getCatFactWithFallback = async () => {
    try {
        const result = await fetchCatFact();
        return {
            success: true,
            fact: result.fact,
        };
    } catch (error) {
        console.warn('Using fallback cat fact due to API error:', error.message);
        return {
            success: false,
            fact: MESSAGES.FALLBACK_CAT_FACT,
            error: error.message,
        };
    };
};

module.exports = {
    fetchCatFact,
    getCatFactWithFallback,
};