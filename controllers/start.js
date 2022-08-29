'use strict';

// import all required modules
const logger = require('../utils/logger');
const artCollectionStore = require('../models/artCollection-store.js');
const accounts = require ('./accounts.js');

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');
    
    if(loggedInUser){
      
      const artCollections = artCollectionStore.getAllArtCollections();
      let numArtCollections = artCollections.length;
      let numArtworks = 0;
      for (let i in artCollections) {
        numArtworks = numArtworks + artCollections[i].artworks.length;
      }

      const viewData = {
        title: 'Welcome to the ArtCollection App!',
        totalArtCollections: numArtCollections,
        totalArtworks: numArtworks,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture:loggedInUser.picture
      };

      response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

// export the start module
module.exports = start;