
const express = require('express') 
const app = express() 
const cors = require('cors');
const weatherData = require('./data/weather.json');
const { response } = require('express');
require('dotenv').config();
app.use(cors()) 
const axios =require ('axios');



app.get('/weather-list', (req, res) => {
  
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

let urlMovie=(`https://api.themoviedb.org/3/movie/550?api_key=46d08c58562bf1fb960bba0c5a501ea1`)
let axiosMovie=axios.get(urlMovie).then(response=>{
  movie=response.data
  let movieRen=movie.data.map((item,idx)=>{
    return new Movie(item)
})
res.json(movieRen);
})





class ForeCast {
  constructor(weatherData) {
    this.date = weatherData.valid_date
    this.description = weatherData.weather.description
  }
}
class Movie {
  constructor(movies) {
    this.title = movies.title
    this.overview = movies.overview
    this.average_votes = movies.average_votes
    this.total_votes = movies.total_votes
    this.image_url = image_url
    this.popularity = popularity
    this.released_on = released_on

  }
}
app.listen(process.env.PORT)

