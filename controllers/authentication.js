const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
	const timestamp = new Date().getTime();
	return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.singin = (req, res, next)=>{
	//User has already had their email and password auth'd
	//we just need to give them  a token
	return res.json({token: tokenForUser(req.user)});
};

exports.signup = (req, res, next)=>{
	const email = req.body.email;
	const password = req.body.password;
    
	// if(!email || !password){
	// 	return res.status(422).json({error:'You most provide email and password'});
	// }

	//see if user with the given email exists
	User.findOne({email}, (err, existingUser)=>{
		if(err) {return next(err);}
		//if user with email does not exists, return an error
		if(existingUser){
			return res.status(422).json({error:'Email is in use'});
		}

		//If a user with email does NOT exists, create and save user record
		const user = new User({email, password});
		user.save((err)=>{
			if(err && err.errors && err.name === 'ValidationError') {
				return res.status(422).json({error: err.message});
			}
			 
			if (err) {
				return next(err);
			}

			//respond to request indicating the user was created
			return res.json({token: tokenForUser(user)});
		});
	});
};