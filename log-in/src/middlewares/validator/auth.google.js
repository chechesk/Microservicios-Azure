// const passport = require("passport");
// const { OAuth2Strategy, GoogleStrategy } = require("passport-google-oauth");
// const { config } = require("dotenv");
// config();

// const emails = ["hernandezadonis221@gmail.com"];

// passport.use(
//   "auth-google",
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:7000/login/google",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       const response = emails.includes(profile.emails[0].value);
//       // IF EXITS IN DATABASE
//       if (response) {
//         done(null, profile);
//       } else {
//         // SAVE IN DATABASE
//         emails.push(profile.emails[0].value);
//         done(null, profile);
//       }
//     }
//   )
// );

