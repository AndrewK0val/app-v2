'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const artCollectionStore = {

  store: new JsonStore('./models/artCollection-store.json', { artCollectionCollection: [] }),
  collection: 'artCollectionCollection',

  getAllArtCollections() {
    return this.store.findAll(this.collection);
  },

  getArtCollection(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addArtCollection(artCollection, response) {
    artCollection.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            artCollection.picture = result.url;
            response();
          });
        }
      });
    this.store.add(this.collection, artCollection);
  },

  removeArtCollection(id) {
    const artCollection = this.getArtCollection(id);
    this.store.remove(this.collection, artCollection);
  },

  removeAllArtCollections() {
    this.store.removeAll(this.collection);
  },

  addArtwork(id, artwork) {
    const artCollection = this.getArtCollection(id);
    artCollection.artworks.push(artwork);
  },

  removeArtwork(id, artworkId) {
    const artCollection = this.getArtCollection(id);
    const artworks = artCollection.artworks;
    _.remove(artworks, { id: artworkId});
  },
  
  editArtwork(id, artworkId, updatedArtwork) {
    const artCollection = this.getArtCollection(id);
    const artworks = artCollection.artworks;
    const index = artworks.findIndex(artwork => artwork.id === artworkId);
    artworks[index].title = updatedArtwork.title;
    artworks[index].artist = updatedArtwork.artist;
    artworks[index].medium = updatedArtwork.medium;
    artworks[index].publishDate = updatedArtwork.publishDate;
  },
  
  getUserArtCollections(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = artCollectionStore;