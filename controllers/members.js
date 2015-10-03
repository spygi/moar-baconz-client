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
			} else {
				var result = {
					id: member.id,
					email: member.email,
					token: Member.generateToken(member)
				};
				
				res.json({ success: true, message: 'Member created', result: result });
			}
		});
	},
	getMember: function(req, res){
		Member.findById(req.params.id, function(err, member){
			if (err){
      			res.send(err);
      		}
      		if(!member){
      			res.json({success:false, message: "not found"});
      			return;
      		}

			var result = {
				id: member.id,
				email: member.email,
				token: Member.generateToken(member),
				nearbyStores: member.nearbyStores
			};
      		res.json(result);
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
      		if(req.body.location && req.body.location.latitude && req.body.location.longitude){
      			member.location = req.body.location;
      			googlePlaces.placeSearch({
					location: [req.body.location.latitude, req.body.location.longitude],
					radius: 300, // probably meters
					types: "grocery_or_supermarket",
					opennow: true
				}, function (error, response) {
					member.nearbyStores = response;

					return member.save(function(err){
      					if(err){
      						res.send(err);
      					}
      					var result = {
							id: member.id,
							email: member.email,
							token: Member.generateToken(member),
							nearbyStores: member.nearbyStores
						};
      					res.json(result);
      				});
				});
      		} else {
      			return member.save(function(err){
      				if(err){
      					res.send(err);
      				}
      				var result = {
						id: member.id,
						email: member.email,
						token: Member.generateToken(member),
						nearbyStores: member.nearbyStores
					};
      				res.json(result);
      			});
      		}
      		
		});
	}
}
module.exports = memberController;