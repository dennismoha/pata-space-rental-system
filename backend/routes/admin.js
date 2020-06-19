const express = require('express');
const Adminroute = require('../controller/admin');
const roles = require('../roles')
const Adminrouter = express.Router();


Adminrouter.post('/admin/createUser',Adminroute.createUser)
Adminrouter.get('/admin/getUser',Adminroute.getUsers);
Adminrouter.get('/admin/delprops',Adminroute.delProps);
Adminrouter.post('/admin/agent_approved',Adminroute.agent_approval);
Adminrouter.get('/admin/admin_Agentapprove_show',Adminroute.admin_Agentapprove_show);
Adminrouter.get('/admin/singleUnapprovedagent/:id',Adminroute.Admin_show_single_unApprovedAgent);
Adminrouter.get('/admin/approve/:id' ,Adminroute.Admin_approve);
Adminrouter.get('/admin/disaprove/:id', Adminroute.Admin_disaprove);

module.exports = Adminrouter