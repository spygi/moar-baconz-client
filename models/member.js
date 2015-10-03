var mongoose = require('mongoose');

var MemberSchema   = new mongoose.Schema({
	name: String,
	email: String,
	password: String, // TODO !!!!!!!!!!! refactor this with oauth!!!!!!!!!!!!!!!!!!!!!!!
	groups: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
});

MemberSchema.static('findByEmail', function (email, callback) {
  return this.find({ email: email }, callback);
});

module.exports = mongoose.model('Member', MemberSchema);