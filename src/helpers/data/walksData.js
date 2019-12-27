import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getWalksData = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/walks.json`)
    .then((result) => {
      const demWalks = result.data;
      const walks = [];
      if (demWalks != null) {
        Object.keys(demWalks).forEach((walkId) => {
          const newWalk = demWalks[walkId];
          newWalk.id = walkId;
          walks.push(newWalk);
        });
      }
      resolve(walks);
    })
    .catch((error) => reject(error));
});

export default { getWalksData };
