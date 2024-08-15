import axios from 'axios';
const APIURL = 'https://api.open5e.com/monsters/?limit=25';
axios.defaults.headers.common = {
  Accept: 'application/json',
};

export const getMonsters = async () => {
  try {
    const response = await axios.get(APIURL);
    // console.log('response in getMonsters:', response.data);
    return response.data;
  } catch (error) {
    console.log('error:', error);
  }
};

export const getMonstersWithImages = async () => {
  try {
    const response = await axios.get(
      'https://api.open5e.com/monsters/?limit=3207'
    );
    console.log('response all monsters with images:', response.data);
    return response.data.results.filter(
      (monster) => monster.img_main.length > 0
    );
  } catch (error) {
    console.log('error:', error);
  }
};

export const getMonstersPage = async (page) => {
  try {
    const response = await axios.get(page);
    console.log('response in getMonsters:', response.data);
    return response.data;
  } catch (error) {
    console.log('error:', error);
  }
};
