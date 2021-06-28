
const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
const weatherData= require('./data/weather.json')
require('dotenv').config();
app.use(cors()) // after you initialize your express app instance


// a server endpoint 
app.get('/weather-list',  (req, res)=>{// our endpoint name
  // callback function of what we should do with our request
  let data=[weatherData.lon,weatherData.lat,weatherData.city_name]
  res.json( data)
  res.json(weatherData.lon)
  res.send('Hello World') // our endpoint function response
})
// const found = data.find(`${this.state.data}`);
app.listen(8000) // kick start the express server to work

// longTask('shawerma').then(task => console.log('Task', task)).catch(console.error);
