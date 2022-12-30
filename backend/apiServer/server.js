var express = require('express');
const morgan = require('morgan');
const Mongoose= require('mongoose');
const https = require('https');
var http = require('http');
var cors = require('cors');
require('dotenv').config();
var util = require('util');
var bodyParser= require('body-parser');
var log4js= require('log4js');
var logger = log4js.getLogger('servicepr-admin');
var debug = require('debug')('secure:server');
const passport = require('passport');
var app = express();
const InitiateMongoServer = require('./config/db');

const ConnectDB= require('./config/dbConfig');


//Routes import


// const usermanagement = require('./routes/usermgmt');
// const token= require('./routes/token');


//Connecting MongoDB

InitiateMongoServer();
ConnectDB();

//Body parser of application/json
app.use(bodyParser.json({limit:"50mb"}));

//body parser of application/x-www-form-urlencoded post data

app.use(bodyParser.urlencoded({limit:"50mb", extended:true, parameterLimit: 5000}));

app.use(morgan('dev'));

// Passport 

app.use(passport.initialize());

//Passport configuration

require('./config/passport')(passport);


//CORS

app.options('*', cors());
app.use(cors());


/////////////////// STARTING THE SERVER ///////////////////////////////////
var host = process.env.HOST;
var port = normalizePort(process.env.PORT);
app.set('port', port);


// set up plain http server
// var http = express();

// set up a route to redirect http to https
// app.get('*', function(req, res) {  
//     res.redirect('https://' + req.headers.host + req.url);

//     // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
//     // res.redirect('https://example.com' + req.url);
// })

// http.listen(9090);

//Mongoose connection

Mongoose.connection.once('open', ()=>{
  console.log('Connected to DB');
  let server = app.listen(port,()=>{
    console.log(`Server running on port ${port}`);

    
  })

  logger.info('-------------- SERVER STARTED ----------------------');
  logger.info('*************** http://%s:%s ************************', host, port);
  server.timeout= 240000;
  server.on('error', onError);
  server.on('listening', onListening);

  function onListening(){
    var addr = server.address();
    var bind = typeof addr ==='string'?
      'pipe'+addr:
      'port'+ addr.port;
    
    debug('Listening on '+ bind);
  }

})


// Use of Routes

app.use('/api/v1', require('./routes'))

///Swagger interface

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
);


// Nomalize port 
function normalizePort(val){
  var port= parseInt(val,10);

  if (isNaN(port)){
    return val;
  }
  if (port>=0){
    return port;
  }
  return false;
}

function onError(error){
  if (error.syscall !== 'listen'){
    throw error;
  }
  var bind = typeof port === 'string'?
  'Pipe' + port:
  'Port' + port;

  // handle specific listen errors with messages

  switch (error.code){
    case 'EACCESS':
      console.error(bind + 'requires elevated privileges');
      process.exit(1);
      break;
    
    case 'EADDRINUSE':
      console.error(bind+ 'is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// app.use((req, res, next) => { //to handle CORS Errors.

//   res.header("Access-Control-Allow-Origin", "*");

//   res.header("Access-Control-Allow-Headers", "Origin, X-Reqquested-With, Content-Type, Accept, Authorization");



//   if(req.method === 'OPTIONS') {

//       res.header('Access-Control-Allow-Methods', 'PUT POST, PATCH, DELETE GET');

//       return res.status(200).json({});

//   }

//   next();

// });

