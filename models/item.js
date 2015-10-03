var mongoose = require('mongoose');

var ItemSchema   = new mongoose.Schema({
	name: String,
	icon: String,
	state: String 
});

module.exports = mongoose.model('Item', ItemSchema);
