import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// create a PostSchema with a title field
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  username: { type: String, unique: true },
  password: String,
}, {
  toJSON: {
    virtuals: true,
  },
});

UserSchema.set('toJSON', {
  virtuals: true,
});

UserSchema.pre('save', function beforeUserSave(next) {
  // this is a reference to our model
  // the function runs in some other context so DO NOT bind it

  const user = this;

  if (!user.isModified('password')) return next();

  // TODO: do stuff here
  // when done run the next callback with no arguments
  // call next with an error if you encounter one
  // return next();
  bcrypt.genSalt(10, (error, salt) => {
    if (error) return next(error);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      return next();
    });
  });
});

//  note use of named function rather than arrow notation
//  this arrow notation is lexically scoped and prevents binding scope, which mongoose relies on
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
/*
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  // return callback(null, comparisonResult) for success
  // or callback(error) in the error case
  bcrypt.compare(candidatePassword, this.password, (error, result) => {
    if (error) return callback(error);
    callback(null, result);
  });
};
*/


// create PostModel class from schema
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
