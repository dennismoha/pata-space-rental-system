const express = require('express');
const agent = require('../controller/landlord');
const roles = require('../controller/checkroles');

const router = express.Router();


router.get('/landlord/owner/properties',roles.allowIfLoggedin,agent.landlord_property);//get all properties for a logged in agent
router.get('/landlord/show/:id',roles.allowIfLoggedin,agent.landlord_show);
router.get('/landlord/edit/:id',roles.allowIfLoggedin,agent.landlord_edit_property)
router.get('/landlord/delete/:Owner/:id',roles.allowIfLoggedin,agent.land_prop_delete); //property delete route


router.get('/test/:prop',agent.landlord_all_property)


module.exports = router

