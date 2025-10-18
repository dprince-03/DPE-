require('dotenv').config();

module.exports= {
    PORT: process.env.PORT || 5080,
    NODE_ENV: process.env.NODE_ENV || 'development',

    USER_PROFILE: {
        email: process.env.USER_EMAIL || 'tech.bro@gmail.com',
        name: process.env.USER_NAME || 'Tech Bro',
        stack: process.env.USER_STACK || 'Node.js/Express.js',
    },

    CAT_FACTS_API: process.env.CAT_FACTS_API || 'https://catfact.ninja/fact',
    API_TIMEOUT: parseInt(process.env.API_TIMEOUT) || 500000,

    MESSAGES: {
        SUCCESS: 'success',
        ERROR: 'error',
        CAT_FACT_ERROR: 'Unable to fetch cat fact at this time. Please try again later.',
        FALLBACK_CAT_FACT: 'Cats are amazing creatures! (Fallback fact - API unavailable)'
    },

    STATUS_CODES: {
        OK: 200,
        BAD_REQUEST: 400,
        INTERNAL_ERROR: 500
    },
};