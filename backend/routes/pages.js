const express = require('express')
const Pages = require('../controller/page');
const roles = require('../controller/checkroles');
const Admin = require('../controller/admin')
const content_page = require('../controller/content_page');
const pageRoute = express.Router();

pageRoute.get('/users/login',Pages.login_page);
pageRoute.get('/users/signup_page',Pages.register_page);
pageRoute.get('/users/about_page',Pages.home_about_page);
pageRoute.get('/users/contact_page',roles.allowIfLoggedin,Pages.contact_page);
pageRoute.get('/users/property_page', roles.allowIfLoggedin, Pages.property_page);
pageRoute.get('/',Pages.landing_page);
pageRoute.get('/users/dashboard_pagee',roles.allowIfLoggedin,Pages.dashboard_page); //takes us to a users profile id
pageRoute.get('/users/edit/:id',Pages.user_edit);

pageRoute.get('/admin/page',Pages.admin_page);
pageRoute.get('/admin/registerUser',Admin.regForm);
pageRoute.get('/admin/contactPage',Pages.admin_contactPage);
pageRoute.get('/admin/adminAboutPage',Pages.admin_aboutPage);


pageRoute.get('/about',Pages.about_page)
pageRoute.post('/about/add_content',content_page.about_page);

pageRoute.get('/landlord/dashboard_page',Pages.landlord_dashboard)
pageRoute.get('/landlord/create_property',Pages.landlord_create_property);
//pageRoute.get('/landlord/view_property',Pages.landlord_view_property)
pageRoute.get('/category/add_category',Pages.add_category)





module.exports = pageRoute;