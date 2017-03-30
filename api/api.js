var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var dbUrl = 'mongodb://localhost/yo-auth';
mongoose.connect(dbUrl);

var User = require(__dirname + '/models/User').model;
var jwt = require(__dirname + '/services/jwt');

var app = express();

app.set('views',__dirname + '/views');

app.set('view engine','ejs');
app.use(express.static('../front-end/app'));

app.use(bodyParser.json());

app.get('/',function(req,res){
	res.render('index',{});
});

app.post('/register',function(req,res){
	var user = req.body;

	var newUser = new User({
		email:user.email,
		password:user.password
	});

	var payload = {
		iss: req.hostname,
		sub:newUser.id
	};

	var token = jwt.encode(payload,'SECRET');


	newUser.save(function(err){
		res.status(200).send({
			user: newUser.toJson(),
			token:token
		});
	});
});
var jobs = ['foo','bar','baz','bazzzzz'];

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