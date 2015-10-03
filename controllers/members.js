var Member = require('../models/member');

var memberController = {
	postMember: function(req, res){
		var member = new Member({
			email: req.body.email
		});
		member.password = member.generateHash(req.body.password)

		member.save(function(err) {
			if (err) {
				res.json({success: false, message: err.errmsg});
			}else{
				res.json({ message: 'Member created', data: member });
			}
		});
	},
	getMember: function(req, res){
		Member.findById(req.params.id, function(err, member){
			if (err){
      			res.send(err);
      		}

    		res.json(member);
		});
	},
	putMember: function(req, res){
		Member.findById(req.params.id, function(err, member){
			if (err){
      			res.send(err);
      		}
      		if(req.body.name){
      			member.name = req.body.name;
      		}
      		if(req.body.email){
      			member.email = req.body.email;
      		}
      		if(req.body.password){
      			member.password = req.body.password;
      		}
      		return member.save(function(err){
      			if(err){
      				res.send(err);
      			}
      			return res.json(member);
      		});
		});
	}
}
module.exports = memberController;