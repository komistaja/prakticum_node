const express = require('express');
const session = require('express-session');

const router = express.Router();

const query = require('../modules/query');


router.route('/').post(function(req, res) {
 
  query.userQuery(req.body.username).then(function(userRes) {
      console.log(req.body.username + ' ' + req.body.password);
      console.log(userRes);
      if(!userRes[0]) {
        console.log('user not found');
        res.type('application/json');
        return res.status(401).json('Unknown user/wrong password');
      } else if (req.body.username === userRes[0].username && req.body.password != userRes[0].password) {
        return res.status(401).json('Unknown user/wrong password');
      } else {
        console.log('Login: ' + userRes[0].username);
        req.session.user = userRes[0].username;        
        if(req.session.user === 'admin') {
          req.session.admin = true;
          return res.status(200).send({ "name": "admin" });
        }
        if(req.session.user === 'datanom') {
          req.session.datanom = true;
          return res.status(200).json(req.session.user);
        } else if(req.body.username != userRes[0].username || req.body.password != userRes[0].password) {
          res.status(401).send('check username/password');
        }
      }
      if(!req.body.username || !req.body.password) {
        res.status(401).send('Login failed');
      }
    }).catch(function(error) { console.log(error) });
  }).get(function(req, res) {
  //end session
  console.log('logged out: ' + req.session.user)
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;