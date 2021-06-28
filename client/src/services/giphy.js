import {Grid} from '@giphy/react-components';
import {GiphyFetch} from '@giphy/js-fetch-api';
import axios from 'axios';

const API_KEY = 'PN02ITADjn1ry8YZDRMaG1no4h8emWiT';

const giphyFetch = new GiphyFetch(API_KEY);

const fetchCategories = () => {
  return giphyFetch.categories()
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const fetchGifs = () => {
  return giphyFetch
    .gif('fpXxIjftmkk9y')
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const fetchTrending = () => {
  return giphyFetch
    .trending({limit: 10})
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export {fetchGifs, fetchCategories, fetchTrending, Grid, giphyFetch};
