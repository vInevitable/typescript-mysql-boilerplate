import {GOOGLE_OAUTH} from 'loaders/config';
import logger from 'logger';

// tslint:disable-next-line:no-var-requires
const GoogleStrategy = require('passport-google-oauth20').Strategy;

export function passportConfiguration(passport) {
    logger.info('passportConfiguration()');
    try {
        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });

        passport.use(
            new GoogleStrategy(
                {
                    clientID: GOOGLE_OAUTH.clientID,
                    clientSecret: GOOGLE_OAUTH.clientSecret,
                    callbackURL: GOOGLE_OAUTH.redirectUrl,
                },
                (accessToken, refreshToken, profile, done) => {
                    logger.debug(accessToken, profile, refreshToken)
                    done(null, {
                        profile,
                        accessToken,
                        refreshToken,
                    });

                },
            ),
        );
    } catch (e) {
        logger.error('Error in passportConfiguration()', e);
    }

}
