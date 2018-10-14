const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Define User model
const userSchema  = new Schema({
	email: {
		type: String,
		unique: true,
		required: [true, 'Email is required']
	},
	password: {
		type:String,
		required: [true, 'Password is required']
	}
});

userSchema.plugin(require('mongoose-bcrypt'));

//Create model classs
const ModelClass = mongoose.model('user', userSchema);

//Export model
module.exports = ModelClass; 