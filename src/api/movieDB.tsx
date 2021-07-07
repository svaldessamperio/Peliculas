import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '69a53b18e18ba51aa1c4ea1f682e027b',
        language: 'es-ES'
    }
});

export default movieDB;