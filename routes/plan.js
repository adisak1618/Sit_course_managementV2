var express = require('express');
var router = express.Router();
var middleware = require('./../models/middleware');
var mongoose = require('mongoose');
var dataplan = mongoose.model('plan');
var path = require('path');

router.get('/', middleware, function(req, res, next) {
	res.redirect('/');
});

router.get('/:id', function(req, res, next){
	dataplan.findOne({_id:req.params.id},function(err,collection){
		//res.render('plan-list',{user:req.user,datas:collection});
		res.sendfile(path.resolve('public/app.html'));
	});
});

router.get('/api/:id', middleware, function(req, res, next){
	dataplan.findOne({_id:req.params.id},function(err,collection){
		//res.render('plan-list',{user:req.user,datas:collection});
		res.json(collection);
	});
});

module.exports = router;
