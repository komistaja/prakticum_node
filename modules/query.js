
const mongoose = require('mongoose');
const db = mongoose.connection;

//query userdatabase
  function userQuery(usr) {
    let result = new Promise(function(resolve, reject) { 
      db.collection('users').find({ username: usr }).toArray(function(err, user) { 
        if (err) console.log(err);
        resolve(user); 
      });
    });
    return result;
  };

  function userList(username) {
    let query = {};
    if(username) {
      query = {username: username};
    }
    console.log('query: ', query);
    console.log('username: ', username);
    let result = new Promise(function(resolve, reject) { 
      db.collection('users').find(query).toArray(function(err, user) { 
        if (err) console.log(err);
        resolve(user); 
      });
    });
    return result;
  }

  function updatePassword(username, password) {
    db.collection('users').updateOne(
      { username: username },
      { username: username, password: password})
      .catch(function(error) {resizeBy.json({error: error}) });
      resizeBy.status(200).json(username);
    }


exports.userQuery = userQuery;
exports.userList = userList;