const axios = require('axios')
const Cache = require('../cache/cache')
const ForeCast = require('../models/Weathermodels.js');

let cache = new Cache();
cache['data'] = [];
// cache['timestamp']=Date.now();
// {
//  let timestamp= Math.floor(Date.now() / 1000);
//  return timestamp;

// }

const weatherController = (req, res) => {

  let weather=[];
  let lat = req.query.lat
  let lon = req.query.lon
  let searchQuery = req.query.searchQuery
  console.log(lat)
  console.log(lon)
  console.log(searchQuery)

  if (lat && lon) {
    if (cache.data.length > 0) {

      weather=cache.data.map(data=> new ForeCast(data))
      console.log('THE DATA COME FROM CACHE')
      res.send(weather)
    } else {
      let url = (` https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`)
      axios.get(url).then(response => {
       weatherResponse = response.data
        let weather = weatherResponse.data.map((item, idx) => {
          return new ForeCast(item)
        })
        cache['data']=weatherResponse.data
        console.log('THE DATA COME FROM API')
        // res.send(weather)
        res.json(weather);
      })
    }
  }


}

module.exports = weatherController