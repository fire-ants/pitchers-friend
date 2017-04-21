'use strict';

const BASE_URL = 'http://67.205.147.49/';

const PF  = {

  getPlayer(mlbid) {
    return fetch(`${BASE_URL}player/mlbid/${mlbid}`);
  },

  getPlayers() {
    return fetch(`${BASE_URL}player?limit=10000`);
  }
}

export default PF;
