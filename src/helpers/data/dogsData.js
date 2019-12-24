const dogsData = [
  {
    id: 'dog1',
    dogName: 'Ralph',
    dogImageUrl: 'https://cdn.icepop.com/wp-content/uploads/2019/08/10-Hemis-Alamy-Stock-Photo.jpg',
    ownerName: 'Ava Smith',
    description: 'Whoa! Is that a lion or a dog?',
  },
  {
    id: 'dog2',
    dogName: 'Sally',
    dogImageUrl: 'https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/08/cocker-spaniel.jpg?bust=1540330455',
    ownerName: 'Dustin Wood',
    description: 'Very fancy cocker spaniel...I mean very!',
  },
  {
    id: 'dog3',
    dogName: 'Sam',
    dogImageUrl: 'https://boygeniusreport.files.wordpress.com/2019/11/9399319a.jpg?quality=98&strip=all&w=782',
    ownerName: 'Alicia Walker',
    description: 'Large black lab who thinks he is a lap dog',
  },
  {
    id: 'dog4',
    dogName: 'Fluffy',
    dogImageUrl: 'https://cdn.pixabay.com/photo/2018/05/07/10/48/husky-3380548__340.jpg',
    ownerName: 'Bryce Lander',
    description: 'Black and white husky, loves to chat',
  },
  {
    id: 'dog5',
    dogName: 'Bella',
    dogImageUrl: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12232608/Great-Dane-MP.jpg',
    ownerName: 'Crystal Broach',
    description: 'Blue Dane, she is going to grow super fast',
  },
];

const getAllDogs = () => dogsData;

export default { getAllDogs };
