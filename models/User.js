// import mongoose from 'mongoose'
const bcrypt = require("bcryptjs")
const validator = require("validator")
const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const validateEmail = function(email){
  return validator.isEmail(email);
};

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: [
      validateEmail,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', async function(next){
  const user = this;
  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch(e) {
    return next(e);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword, callback){
  const user = this;
  try {
    const isMatch = await bcrypt.compare(candidatePassword, user.password);
    callback(null, isMatch);
  } catch(e) {
    callback(e);
  }
};


const User = mongoose.model('User', UserSchema);

module.exports = User;
