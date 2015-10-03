var mongoose = require('mongoose');

var GroupSchema   = new mongoose.Schema({
	name: String,
	members: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
	items: [ {
		name: String,
		icon: String,
		state: String
	} ],
});

module.exports = mongoose.model('Group', GroupSchema);
