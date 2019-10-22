import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

let DB_URI: any =
  process.env.NODE_ENV === 'production'
    ? process.env.DB_URI_PROD
    : process.env.DB_URI_DEV;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose;
