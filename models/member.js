var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var secret = process.env.MOAR_BACONZ_SECRET || 'notreallysecret';

var MemberSchema   = new mongoose.Schema({
    email        : { type: String, index: { unique: true }},
    password     : String,
	location: {
		latitude: Number,
		longitude: Number,
		date: Date
	},
	nearbyStores: [mongoose.Schema.Types.Mixed],
	groups: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
});

MemberSchema.static('generateToken', function(member) {
	// member.password should be the hashed thingy
	return jwt.sign({email: member.email, hash: member.password}, secret);
});
MemberSchema.static('isValidToken', function(token) {
    return jwt.verify(token, secret);
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