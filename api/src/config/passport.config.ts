const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

passport.use(
    new LocalStrategy((username: any, password: any, done: any) => {
        // User.findOne({ email: username }, (err: any, user: any) => {
        //   if (err) {
        //     return done(err);
        //   }
        //
        //   if (!user) {
        //     return done(null, false, { message: 'Incorrect username.' });
        //   }
        //
        //   if (!bcrypt.compareSync(password, user.password)) {
        //     return done(null, false, { message: 'Incorrect password.' });
        //   }
        //
        //   return done(null, user);
        // });
    })
);

const jwtOptions = {
    // TODO make sure Angular is sending the bearer token
    // Authorization: Bearer eyJhbGciOiJIUzI...
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'the_secret_key',
};

passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload: any, done: any) => {
        try {
            // TODO wrap User in UserModel
            // const user = await User.findById(jwtPayload.userId);
            const user = {
                id: 123,
                uuid: "234"
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

module.exports = passport;
