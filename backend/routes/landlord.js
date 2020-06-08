const express = require('express');
const agent = require('../controller/landlord');

const router = express.Router();


router.get('/landlord/owner/properties', agent.landlord_property);//get all properties for a logged in agent
router.get('/landlord/show/:id',agent.landlord_show);
router.get('/landlord/edit/:id',agent.landlord_edit_property)
router.get('/landlord/delete/:id',agent.land_prop_delete); //property delete route


router.get('/test/:prop',agent.landlord_all_property)


module.exports = router

