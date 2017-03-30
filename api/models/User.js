var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var userSchema = new mongoose.Schema({
	email:String,
	password:String
});

userSchema.methods.toJson = function(){
	var user = this.toObject();
	delete user.password;
	return user;
};

userSchema.pre('save',function(next){
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(10,function(err,salt){
		if(err){
			return next(err);
		}
		bcrypt.hash(user.password,salt,null,function(err,hash){
			if(err){
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

exports.model = mongoose.model('User',userSchema);