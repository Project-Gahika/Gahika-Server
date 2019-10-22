const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

export const User = mongoose.model('user', UserSchema);
