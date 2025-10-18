const express = require('express');

const { getProfile } = require('../controllers/profile.controllers');

const profileRouter = express.Router();

profileRouter.get('/me', getProfile);

module.exports = profileRouter;