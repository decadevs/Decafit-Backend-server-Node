import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
  VerifyCallback as GoogleVerifyCallback,
} from 'passport-google-oauth20';
import { Strategy as FacebookStrategy, Profile as FacebookProfile, } from 'passport-facebook';
import { User, UserType } from '../model/userModel';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export = (passport: passport.Authenticator) => {
  //Gooogle Authentication
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: '/auth/google/redirect',
      },
      async (accessToken: string, 
        refreshToken: string, profile: GoogleProfile, 
        done: GoogleVerifyCallback) => {
        // get the user data from google
        const newUser = {
          googleId: profile.id,
          fullName: profile.displayName,
          email: profile.emails?.[0].value,
          verified: true,
        };

        try {
          //find the user in our database
          let user = await User.findOne({ email: profile.emails?.[0].value });

          if (user) {
            //If user present in our database.
            user.googleId = profile.id;
            user = await user.save();
            done(null, user);
          } else {
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      },
    ),
  );

  //Facebook Authentication
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.CLIENT_ID_FB as string,
        clientSecret: process.env.CLIENT_SECRET_FB as string,
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'name', 'email', 'gender', 'picture.type(large)', 'location'],
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: FacebookProfile,
        done: (error: string | Error | null | unknown, user: UserType | null) => void,
      ) => {
        const { id, first_name, email } = profile._json;
        try {
          let user = await User.findOne({ email });
          if (user) {
            user.facebookId = id;
            user = await user.save();
            return done(null, user);
          } else {
            user = await User.create({
              fullName: first_name,
              email,
              facebookId: id,
              verified: true,
            });

            return done(null, user);
          }
        } catch (err: unknown) {
          return done(err, null);
        }
      },
    ),
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err: unknown, user: UserType) => {
      return done(err, user);
    });
  });
};
