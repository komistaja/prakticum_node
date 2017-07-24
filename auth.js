const express = require('express');
const app = express();
const session = require('express-session');

app.use(session({
  secret: 'dontcare',
  resave: true,
  saveUninitialized: true
}));


//Auth middleware
var adminAuth = function(req, res, next) {
  console.log(req.session.admin)
  if(!req.session.admin) {
    return next();
  } else {
    return res.status(401).json('please login');
  }
};

var datanomAuth = function(req, res, next) {
  if(req.session.user === 'datanom') {
    return next();
  } else {
    return res.status(401).send('please login');
  }
};

exports.adminAuth = adminAuth;
exports.datanomAuth = datanomAuth;