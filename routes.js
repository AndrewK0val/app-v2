'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const artCollection = require('./controllers/artCollection.js');
const accounts = require ('./controllers/accounts.js');

// connect routes to controllers

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/artCollection/:id', artCollection.index);

router.get('/artCollection/:id/deleteArtwork/:artworkid', artCollection.deleteArtwork);
router.post('/artCollection/:id/addartwork', artCollection.addArtwork);

router.get('/dashboard/deleteartCollection/:id', dashboard.deleteArtCollection);
router.post('/dashboard/addartCollection', dashboard.addArtCollection);

router.post('/artCollection/:id/updateartwork/:artworkid', artCollection.updateArtwork);

// export router module
module.exports = router;

