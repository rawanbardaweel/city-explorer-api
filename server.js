
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const weatherData = require('./data/weather.json')
require('dotenv').config();
app.use(cors()) // after you initialize your express app instance



app.get('/weather-list', (req, res) => {
  let lat = req.query.lat
  let lon = req.query.lon
  let searchQuery = req.query.searchQuery
  try {
    let findData = () => {
      let city = weather.find((city, idx) => {
        return (city.city_name.toLowerCase() === searchQuery.toLowerCase() && city.lat===Number(lat) && city.lon===Number(lon))
      })
      return city.data.map(iteam => {
        return new ForeCast(iteam)
      })
    }
    res.send('Hello World')
    res.json(findData());
  } catch (error) {
    res.json({ message: 'Something went error' })
  }
})
class ForeCast {
  constructor(weatherData) {
    this.date = weatherData.valid_date
    this.description = weatherData.description
  }
}

app.listen(8000)

