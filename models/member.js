var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var MemberSchema   = new mongoose.Schema({
    email        : { type: String, index: { unique: true }},
    password     : String,
	
	groups: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
});

MemberSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
MemberSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

MemberSchema.static('findByEmail', function (email, callback) {
  return this.find({ email: email }, callback);
});

module.exports = mongoose.model('Member', MemberSchema);