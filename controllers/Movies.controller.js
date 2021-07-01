const axios = require('axios')
const Cache = require('../cache/cache')

const Movie = require('../models/Moviesmodel')

let cache = new Cache();
cache['data'] = [];
const movieController = (req, res) => {
  let movies=[];
  let query = req.query.query
  if (query) {
    if (cache.data.length > 0) {
      movies = cache.data.map(data => new Movie(data))
      console.log('THE DATA COME FROM CACHE')
      res.send(movies)
    } else {
      let urlMovie = `https://api.themoviedb.org/3/search/movie?api_key=46d08c58562bf1fb960bba0c5a501ea1&query=${query}`
      axios.get(urlMovie).then(response => {
        const movies = response.data.results.map((item, idx) => {
          return new Movie(item)
        })
        cache['data']=response.data.results
        console.log('THE DATA COME FROM API')
        res.send(movies)
      }).catch(error => res.send(error.message));

    }
  }
}



  module.exports = movieController