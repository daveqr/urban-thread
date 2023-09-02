
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// TODO need to implement the user save encryption
// userSchema.pre('save', function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = bcrypt.genSaltSync(10);
//   this.password = bcrypt.hashSync(this.password, salt);
//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
