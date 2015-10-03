var Member = require('../models/member');
var jwt = require('jsonwebtoken');
var secret = process.env.MOAR_BACONZ_SECRET || 'notreallysecret';

var authenticationController = {
	authenticate: function(req, res){
		Member.findOne({ email: req.body.email }, function(err, member){
			if(err){
				throw err;
			}

			if(!member){
				res.json({success: false, message: "authentication failed."});
				return;
			}

			if(!member.validPassword(req.body.password)) {
				res.json({success: false, message: "authentication failed."});
			} else{
				var token = Member.generateToken(member);

				res.json({
					success:true,
					token: token
				})
			}
		});
	},
	hasValidToken: function(req, res, next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (token) { 
			var decodedPayload = Member.isValidToken(token);
			if(decodedPayload){
				req.decodedPayload = decodedPayload;    
        		next();
			}else{
				return res.json({ success: false, message: 'invalid token' }); 
			}
    	

  		} else {
    		return res.status(403).send({ 
        		success: false, 
        		message: 'no token' 
    		});
  		}
	}
}
module.exports = authenticationController;