import express from 'express';
import passport from 'passport';

const ssoRouter = express.Router();

ssoRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

ssoRouter.get('/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/fail-login',
    successRedirect: '/',
  }));

 ssoRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'user_gender', 'user_location'] }));

ssoRouter.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/fail-login',
    successRedirect: '/',
  }));
  
export = ssoRouter;