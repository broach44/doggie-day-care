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

const deleteWalkById = (walkId) => axios.delete(`${baseUrl}/walks/${walkId}.json`);

const saveWalk = (newWalk) => axios.post(`${baseUrl}/walks.json`, newWalk);

const updateWalk = (walkId, newWalkInfo) => axios.put(`${baseUrl}/walks/${walkId}.json`, newWalkInfo);

export default {
  getWalksData,
  deleteWalkById,
  saveWalk,
  updateWalk,
};
