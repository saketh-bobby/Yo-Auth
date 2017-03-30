var crypto = require('crypto');

function base64Encode(str){
	return new Buffer(str).toString('base64');
}

function base64Decode(str){
	return new Buffer(str,'base64').toString();
}
function sign(jwt,secret){
	return crypto.createHmac('SHA256',secret).update(jwt).digest('base64');
}

exports.encode = function(payload,secret){
	var algorithm = 'HS256';

	var header = {
		typ: 'JWT',
		alg: algorithm
	};

	var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));

	jwt += '.' + sign(jwt,secret);

	return jwt;
};

function verify(rawSignature,secret,signature){
	return sign(rawSignature,secret) == signature;
}

exports.decode = function(token,secret){
	var segments = token.split('.');

	if(segments.length != 3){
		throw new Error('Invalid token structure');
	}

	var header = JSON.parse(base64Decode(segments[0]));
	var payload = JSON.parse(base64Decode(segments[1]));
	var rawSignature = segments[0] + '.' + segments[1];

	if(!verify(rawSignature,secret,segments[2])){
		throw new Error('Verification failed');
	}
 	return payload;
};