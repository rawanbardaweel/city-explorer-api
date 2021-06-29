
const express = require('express') 
const app = express() 
const cors = require('cors');
const weatherData = require('./data/weather.json')
require('dotenv').config();
app.use(cors()) 




app.get('/weather-list', (req, res) => {
  let lat = req.query.lat
  let lon = req.query.lon
  let searchQuery = req.query.searchQuery
  try {
    let findData = () => {
      let city = weatherData.find((city, idx) => {
        return (city.city_name.toLowerCase() === searchQuery.toLowerCase() && Number(city.lat)===Number(lat) && Number(city.lon)===Number(lon))
      })
      return city.data.map(iteam => {
        return new ForeCast(iteam)
      })
    }
    
    res.json(findData());
  } catch (error) {
    res.json({ message: 'Something went error' })
  }
})
class ForeCast {
  constructor(weatherData) {
    this.date = weatherData.valid_date
    this.description = weatherData.weather.description
  }
}

app.listen(8000)

