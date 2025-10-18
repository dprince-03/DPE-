const { USER_PROFILE, MESSAGES } = require("../config/constants.config");
const { getCatFactWithFallback } = require("../services/catFact.service");


/**
 * GET /me endpoint handler
 * Returns user profile with dynamic cat fact
 */
getProfile = async (req, res, next) => {
	try {
        const user = USER_PROFILE;

        const catFectResult =  await getCatFactWithFallback();

        res.status(200).json({
            status: 'success',
            user: user,
            timestamp: new Date().toISOString(),
            fact: catFectResult.fact,
        });

	} catch (error) {
        console.error('Error in getProfile controller:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            timestamp: new Date().toISOString(),
        });
    };
};

// console.log(getProfile());

module.exports = {
	getProfile,
};
