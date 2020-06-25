const express = require('express');
const Properties = require('../controller/property');
const roles = require('../controller/checkroles');


const propRoute = express.Router();


propRoute.get('/property/Search',Properties.Search)
propRoute.post('/property/new_property',roles.allowIfLoggedin,Properties.new_property)

propRoute.get('/property/all_properties',roles.allowIfLoggedin,Properties.properties);
propRoute.get('/property/user_property_page',roles.allowIfLoggedin,roles.allowIfLoggedin,Properties.user_property_page);
//landing page property
propRoute.get('/property/user_landing_property_page',Properties.user_landing_property_page);
//show page for each property
propRoute.get('/property/:id/show',roles.allowIfLoggedin,Properties.oneProperty)
propRoute.get('/property/interested/:id/:email/:_id/:title',Properties.property_Interested);





module.exports = propRoute;