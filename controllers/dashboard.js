"use strict";

// import all required modules
const logger = require("../utils/logger");
const uuid = require("uuid");
const accounts = require("./accounts.js");

const artCollectionStore = require("../models/artCollection-store.js");

// create dashboard object
const dashboard = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: "ArtCollection Dashboard",
        artCollections: artCollectionStore.getUserArtCollections(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture:loggedInUser.picture
      };
      logger.info("about to render" + viewData.artCollections);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },

  deleteArtCollection(request, response) {
    const artCollectionId = request.params.id;
    logger.debug("Deleting ArtCollection" + artCollectionId);
    artCollectionStore.removeArtCollection(artCollectionId);
    response.redirect("/dashboard");
  },

  addArtCollection(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newArtCollection = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      picture: request.files.picture,
      date: date,
      artworks: []
    };
    logger.debug("Creating a new ArtCollection" + newArtCollection);
    artCollectionStore.addArtCollection(newArtCollection, function() {
      response.redirect("/dashboard");
    });
  }
};

// export the dashboard module
module.exports = dashboard;
