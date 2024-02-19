const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String
  // Agrega más campos según necesites
});

const User = mongoose.model('User', userSchema);
