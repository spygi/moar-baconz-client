var Group = require('../models/group');

var groupController = {
	
	postGroup: function(req, res){
		var group = new Group({
			name: req.body.name,
			members: req.body.members || [],
			items: req.body.items || []
		});

		group.save(function(err) {
			if (err) {
				res.send(err);
			}
			group.populate("members", function(err){
      			if (err){
      				res.send(err);
      			}
				res.json(group);
      		});
		});
	},
	getGroup: function(){
		Group.findById(req.params.id, function(err, group){
			if (err){
      			res.send(err);
      		}
      		group.populate("members", function(err){
      			if (err){
      				res.send(err);
      			}
				res.json(group);
      		});
		});
	},
	putGroup: function(req, res){
		Group.findById(req.params.id, function(err, group){
			if (err){
      			res.send(err);
      		}
      		if(req.body.name){
      			group.name = req.body.name;
      		}
      		if(req.body.items){
      			group.items = req.body.items;
      		}
      		if(req.body.members){
      			group.members = req.body.members;
      		}
      		return group.save(function(err){
      			if(err){
      				res.send(err);
      			}
      			group.populate("members", function(err){
      				if (err){
      					res.send(err);
      				}
					res.json(group);
      			});
      		});
		});
	}
}
module.exports = groupController;