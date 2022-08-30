'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const artCollectionStore = require('../models/artCollection-store');
const accounts = require ('./accounts.js');

const artCollection = {
  index(request, response) {
      const loggedInUser = accounts.getCurrentUser(request);  
      const artCollectionId = request.params.id;
      logger.debug('ArtCollection id = ' + artCollectionId);
      if (loggedInUser) {
      const viewData = {
        title: 'ArtCollection',
        artCollection: artCollectionStore.getArtCollection(artCollectionId),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture:loggedInUser.picture
      };
      response.render('artCollection', viewData);
      }
      else response.redirect('/');
  },
    deleteArtwork(request, response) {
    const artCollectionId = request.params.id;
    const artworkId = request.params.artworkid;
    logger.debug('Deleting Artwork' + artworkId + 'from ArtCollection' + artCollectionId);
    artCollectionStore.removeArtwork(artCollectionId, artworkId);
    response.redirect('/artCollection/' + artCollectionId);
  },
    addArtwork(request, response) {
    const artCollectionId = request.params.id;
    const artCollection = artCollectionStore.getArtCollection(artCollectionId);
    const newArtwork = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
      medium: request.body.medium,
      publishDate: request.body.publishDate
    };
    artCollectionStore.addArtwork(artCollectionId, newArtwork);
    response.redirect('/artCollection/' + artCollectionId);
  },  
  updateArtwork(request, response) {
    const artCollectionId = request.params.id;
    const artworkId = request.params.artworkid;
    logger.debug("updating artwork " + artworkId);
    const updatedArtwork = {
      title: request.body.title,
      artist: request.body.artist,
      medium: request.body.medium,
      publishDate: request.body.publishDate
    };
    artCollectionStore.editArtwork(artCollectionId, artworkId, updatedArtwork);
    response.redirect('/artCollection/' + artCollectionId);
  }
};

module.exports = artCollection;