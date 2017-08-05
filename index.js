const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const ticketModel = require('./models/ticketmodel');
const userModel = require('./models/usermodel');
const counterModel = require('./models/countermodel');

const loginRouter = require('./router/login');
const adminRouter = require('./router/admin');

const auth = require('./modules/auth');
const query = require('./modules/query');

const testEnv = true;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'dontcare',
  resave: true,
  saveUninitialized: true
}));

app.use('/login', loginRouter);
app.use('/admin', adminRouter);

if (process.env.ENV !== 'production') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
} 

//connect to database (mlab sandbox for dev)
mongoose.connect('mongodb://prakticum:password@ds029665.mlab.com:29665/heroku_79kjs0nb');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('server up');
});

//Set public folder
app.use(express.static('public/'));

app.get('/user', function(req, res) {
  let userlist = query.userList(req.query.username).then(function(result) {
    console.log(result);
    res.status(200).send(result);
  });
});