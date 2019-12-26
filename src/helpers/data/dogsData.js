import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllDogs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dogs.json`)
    .then((result) => {
      const allDogsObj = result.data;
      const dogs = [];
      if (allDogsObj != null) {
        Object.keys(allDogsObj).forEach((dogId) => {
          const newDog = allDogsObj[dogId];
          newDog.id = dogId;
          dogs.push(newDog);
        });
      }
      resolve(dogs);
    })
    .catch((error) => reject(error));
});

const getSingleDogById = (dogId) => axios.get(`${baseUrl}/dogs/${dogId}.json`);

export default { getAllDogs, getSingleDogById };
