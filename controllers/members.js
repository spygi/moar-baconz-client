var Member = require('../models/member');
var GooglePlaces = require('googleplaces');
var googlePlaces = new GooglePlaces(process.env.MOAR_BACONZ_GOOGLE_PLACES_KEY || 'your api key', 'json');


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
      		if(!member){
      			res.json({success:false, message: "not found"});
      			return;
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
      		if(req.body.location){
      			member.location = req.body.location;
      			googlePlaces.placeSearch({
					location: [47.3881487,8.5162363],
					radius: 300,
					types: "grocery_or_supermarket"
				}, function (error, response) {
					member.nearbyStores = response;

					return member.save(function(err){
      					if(err){
      						res.send(err);
      					}
      					res.json(member);
      				});
				});
      		} else {
      			return member.save(function(err){
      				if(err){
      					res.send(err);
      				}
      				res.json(member);
      			});
      		}
      		
		});
	}
}
module.exports = memberController;