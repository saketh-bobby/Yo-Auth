var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');

var dbUrl = 'mongodb://localhost/yo-auth';

mongoose.connect(dbUrl);
var User = require(__dirname + '/models/User');

var app = express();

app.set('views',__dirname + '/views');

app.set('view engine','ejs');
app.use(express.static('../front-end/app'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',function(req,res){
	res.render('index',{});
});

function createSendToken(req,res,user){
	var payload = {
		iss: req.hostname,
		sub:user.id
	};

	var token = jwt.encode(payload, 'SECRET');

	res.status(200).send({
		user: user.toJson(),
		token:token
	});
}

app.post('/register',function(req,res){
	var user = req.body;
	var newUser = new User({
		email:user.email,
		password:user.password
	});

	newUser.save(function(err){
		createSendToken(req,res,newUser);
	});
});
var jobs = ['foo','bar','baz','bazzzzz'];

app.post('/login',function(req,res){
	var userBody = req.body;
	console.log(userBody);
	User.findOne({email:userBody.email},function(err,user){
		if(err){
			return res.status(500).json({message:err});
		}
		if(!user){
			return res.status(401).json({message:'Wrong email/password'});
		}
		user.comparePasswords(userBody.password,function(isMatch){
			if(!isMatch){
				return res.status(401).json({message:'Wrong email/password'});
			}
			createSendToken(req,res,user);
		});
	});
});

app.get('/jobs',function(req,res){
	if(!req.headers.authorization){
		return res.status(401).json({message:'Unauthorized'})
	}

	var token = req.headers.authorization.split(' ')[1];

	var payload = jwt.decode(token,'SECRET');

	if(!payload.sub){
		return res.status(401).json({message:'Unauthorized'})
	}

	res.status(200).send(jobs);
});


var server = app.listen(3000,function(){
	console.log('Server listening at '+server.address().port);
});