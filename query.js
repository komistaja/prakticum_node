
const mongoose = require('mongoose');
const db = mongoose.connection;

//query userdatabase
  function userQuery(usr) {
    var result = new Promise(function(resolve, reject) { 
      db.collection('users').find({ username: usr }).toArray(function(err, user) { 
        if (err) console.log(err);
        resolve(user); 
      });
    });
    return result;
  };



exports.userQuery = userQuery;