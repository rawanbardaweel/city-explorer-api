
const express = require('express') 
const app = express() 
const cors = require('cors');
const weatherData = require('./data/weather.json');
const { response } = require('express');
require('dotenv').config();
app.use(cors()) 
const axios =require ('axios');



app.get('/weather-list', (req, res) => {
  let weather;
  let lat = req.query.lat
  let lon = req.query.lon
  let searchQuery = req.query.searchQuery
  let url=(` https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`)
  let axiosWeatherBit=axios.get(url).then(response=>{
    weather=response.data
    let forecast=weather.data.map((item,idx)=>{
      return new ForeCast(item)
  })
  res.json(forecast);
 })
 
});

app.get('/movie', (req, res) => {
  // let movies;
  let query=req.query.query
  let urlMovie=`https://api.themoviedb.org/3/search/movie?api_key=46d08c58562bf1fb960bba0c5a501ea1&query=${query}`
  axios.get(urlMovie).then(response=>{
  const movies=response.data.results.map((item,idx)=>{
  return new Movie(item)     
})
res.send(movies)
}).catch(error=>res.send(error.message));
})

class ForeCast {
  constructor(weatherData) {
    this.date = weatherData.valid_date
    this.description = weatherData.weather.description
  }
}

class Movie {
  constructor(moviesData) {
    this.title = moviesData.original_title
    this.votes = moviesData.vote_count
    this.img ='http://image.tmdb.org/t/p/w342'+moviesData.poster_path;
  }
}

app.listen(process.env.PORT)
