
//Dependencies
var express = require('express');
var router = express.Router();


var auth = require('./auth.js');


//Data Models
var Case = require('./Case.js');
var CaseCreate = require('../models/policeCaseModel.js');
var Offense = require('./Offense.js');
var OffenseCreate = require('../models/criminalOffenseObject.js');

//User API
var user = require('./users.js');


//Keep a Time Log of Requests
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//Public Routes
router.get('/ping', function(req, res){
    res.status(200).send("Hello There! I'm Alive...I think.\n");
});

router.post('/login', auth.login);

//Authenticated Routes
CaseCreate.methods(['get', 'put', 'post', 'delete']);
CaseCreate.register(router, 'api/v1/case');
OffenseCreate.methods(['get', 'put', 'post', 'delete']);
OffenseCreate.register(router, '/api/v1/offense');

//Routes for Cases
router.get('/api/v1/cases', Case.getAll);
router.get('/api/v1/case/:id', Case.getOne);
router.put('/api/v1/case/:id', Case.update);
router.delete('/api/v1/case/:id', Case.delete);

//Routes for Offenses
router.get('/api/v1/offenses', Offense.getAll);
router.get('/api/v1/offense/:id', Offense.getOne);
router.put('/api/v1/offense/:id', Offense.update);
router.delete('/api/v1/offense/:id', Offense.delete);

//Authenticated and Authorized Routes
//Routes for User
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;
