const Weather=require('../models/Weather.model');

const weatherController=(req,res)=>{
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
 
}

module.exports=weatherController