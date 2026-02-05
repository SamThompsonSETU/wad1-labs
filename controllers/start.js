'use strict';

import logger from "../utils/logger.js";

const start = {
  createView(request, response) {
    logger.info("Start page loading!");
    response.send('Welcome to the Sam\'s Playlist app!');   
  },
};

export default start;
