var express = require('express');
var groupController = require('./controllers/groups');
var memberController = require('./controllers/members');
var router = express.Router();

router.route('/group')
    .post(groupController.postGroup);

router.route('/group/:id')
    .get(groupController.getGroup)
    .put(groupController.putGroup);

router.route('/member')
    .post(memberController.postMember);

router.route('/member/:id')
    .get(memberController.getMember)
    .put(memberController.putMember);

module.exports = router;