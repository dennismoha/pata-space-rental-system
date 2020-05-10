const express = require('express');
const Adminroute = require('../controller/admin');
const roles = require('../roles')
const Adminrouter = express.Router();


Adminrouter.post('/admin/createUser',Adminroute.createUser)
Adminrouter.get('/admin/getUser',Adminroute.getUsers);

module.exports = Adminrouter