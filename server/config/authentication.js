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


import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = process.env.SECRET;

passport.use(new JwtStrategy(opts, (jwt, done) => {
  User.findById(jwt.sub).populate('pokemon').exec((err, user) => {
    if (err) {
      return done(err, false);
    }

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  });
}));
