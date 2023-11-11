require('dotenv')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let dbConnection;

const options = {
  //NEW CONFIGURATION
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 200000,
  socketTimeoutMS: 2000000,
  keepAlive: true,
  useNewUrlParser: true,
  dbName: process.env.DB_NAME
};

exports.connectToDatabase = async (req, res, next) => {
  if (dbConnection) {
    console.log('----DB----PREVIOUS-CONNECTION----------------');
    next()
  } else {
    console.log("process.env.DB_STRING, options ", process.env.DB_STRING);
    mongoose.connect(process.env.DB_STRING, options)
      .then(db => {
        console.log('----DB----NEW-CONNECTION----------------');
        dbConnection = db.connections[0].readyState;
        console.log('----DB----NEW-CONNECTION-INIT----------------');
        next()
      },
        err => {
          console.log('----DB----ERROR-CONNECTION----------------');
          console.log(err);
          return res.send({
            status_code: 409,
            success: false,
            message: 'DB connection failure'
          });
        }
      );
  }
};
