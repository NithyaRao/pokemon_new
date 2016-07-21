import passport from 'passport';
import User from '../models/user';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy({
  usernameField: 'email',
},
  (email, password, done) => {
    const emailStr = email.toLowerCase();
    User.findOne({ email: emailStr }).populate('pokemon').exec((err, user) => {
      console.log('Error is ', err);
      console.log('User', user);
      console.log('Email and pwd is ', email, password, emailStr);
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    });
  }
));
