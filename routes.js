var express = require('express');
var groupController = require('./controllers/groups');
var memberController = require('./controllers/members');
var authenticationController = require('./controllers/authentication');
var apiRoutes = express.Router();

module.exports = function(app) {

	apiRoutes.route('/authenticate')
		.post(authenticationController.authenticate)

	apiRoutes.route('/group')
	    .post(authenticationController.hasValidToken, groupController.postGroup);

	apiRoutes.route('/group/:id')
	    .get(authenticationController.hasValidToken, groupController.getGroup)
	    .put(authenticationController.hasValidToken, groupController.putGroup);

	apiRoutes.route('/member')
	    .post(memberController.postMember);

	apiRoutes.route('/member/:id')
	    .get(authenticationController.hasValidToken, memberController.getMember)
	    .put(authenticationController.hasValidToken, memberController.putMember);


	app.use('/api', apiRoutes);
}