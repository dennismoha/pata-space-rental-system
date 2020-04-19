
//defines each role for each router. i.e either admin,user,landlord

const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles =(function() {
	ac.grant('user')
	  .readOwn('profile')
	  .updateOwn('profile')
	  .readAny('property')
	  

	ac.grant('landlord')
	  .extend('user')
	  .readAny('profile')
	  .createOwn('property')
	  .deleteOwn('property')

	ac.grant('admin')
	  .extend('user')
	  .extend('landlord')
	  .updateAny('profile')
	  .deleteAny('profile')
})();


