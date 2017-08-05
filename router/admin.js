const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const db = mongoose.connection;

const ticketModel = require('../models/ticketmodel');

const auth = require('../modules/auth');

const router = express.Router();

router.route('/').put(auth.adminAuth, (req, res) => {
  console.log(req.body.id)
  let date = new Date;
  db.collection('tickets').update(
    { id: req.body.id },
    { $set: 
      { firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       tel: req.body.tel,
       service: req.body.service,
       comments: req.body.comments,
       status: req.body.status,
       date: date,
       }
      }
  ).catch(function(error) { res.json({error: error}) });
  res.status(200).send('updated');
}).get(auth.adminAuth, (req, res) => {
  let dbQuery = {};
  if(req.query.id || req.query.email) {
    dbQuery = { $or: [{ email: req.query.email }, {id: req.query.id}]};
  }

  db.collection('tickets').find( dbQuery ).toArray(function (err, tickets) {
    res.send(tickets);
  });
}).post((req, res) => {
  console.log(req.body);
  var ticket = mongoose.model('Ticket', ticketModel.ticketSchema);
  var counter = new Promise(function(resolve, reject) {
    resolve(db.collection('counters').findOneAndUpdate( 
      { _id: 'name' },
      { $inc: { seq: 1 } },
      { returnNewDocument: true, upsert: true }
    ));
    return value.seq;
  });
  
  counter.then(function(value) {
    req.body.id = value.value.seq;
    var data = req.body;
    var addTicket = new ticket(data);
    addTicket.save(function(err, tiket) {
      if (err) return console.error(err);
      res.send(tiket);
    });
  });
}).delete(auth.adminAuth, (req, res) => {
  var ticketRemove = db.collection('tickets').remove({ id: req.body.id }, 1);
  ticketRemove.then(function(value) {
    res.send(value);
  })
});

module.exports = router;