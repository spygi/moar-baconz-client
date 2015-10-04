var Group = require('../models/group');
var Item = require('../models/item');

var itemController = {
	postItem: function(req, res){
		console.log(req.params);

		var item = new Item({
			name: req.body.name,
			icon: req.body.icon,
			state: req.body.state 
		});

		Group.findByIdAndUpdate(
			req.params.groupId,
			{'$push': {
				"items": item
			}},
			function(err, model) {
				if (err) {
					return res.send(err);
				}
				res.json({ message: 'Item created', data: item} )
			}
		);
	},

	putItem: function(req, res){
		console.log(req.params)
	
		Group.update(
			{ '_id': req.params.groupId, 'items._id': req.params.itemId},
			{ '$set': {
				'items.$.state': req.body.item.state
			}},  
			function(err, doc){
				console.log(doc);

				if (err) {
					return res.send(err);
				}
				res.json({ message: 'Item edited', success: true, data: doc} )
			}
		);
	}
}
module.exports = itemController;
