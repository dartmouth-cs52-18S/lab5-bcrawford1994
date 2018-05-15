import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  console.log('Right Here token');

  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}


export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  // console.log('Right Here');
  const email = req.body.email;
  // const username = req.body.username;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  // 🚀 TODO:
  // here you should do a mongo query to find if a user already exists with this email.
  // if user exists then return an error. If not, use the User model to create a new user.
  // Save the new User object
  // this is similar to how you created a Post
  // and then return a token same as you did in in signin
  User.findOne({ email })
    .then((result) => {
      if (result) {
        throw new Error(500);
        // return res.status(500).json({ error });
      }
      const user = new User();
      user.email = req.body.email;
      user.username = req.body.username;
      user.password = req.body.password;
      user.save().then((r) => {
        res.send({ token: tokenForUser(user) });
      }).catch((e) => {
        return res.status(422).json({ e });
      });
    })
    /*
    .then((user) => {
      console.log('Right Here');
      console.log(tokenForUser(user));
      res.send({ token: tokenForUser(user) });
    })
    */
    .catch((error) => {
      return res.status(422).json({ error });
    });
};
