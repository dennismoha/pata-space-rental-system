const express = require('express');
const agent = require('../controller/landlord');
const router = express.Router();

//get all properties for a logged in agent
router.get('/landlord/owner/properties', agent.landlord_property)



module.exports = router

