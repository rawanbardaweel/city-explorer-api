import weatherController from ('./controllers/Weather.controller')
import movieController from ('./ontrollers/Movies.controller')
import weatherData from ('./data/weather.json')

const express = require('express') 
const app = express() 
const cors = require('cors');
const weatherData = require('./data/weather.json');
const { response } = require('express');
// const weatherController=require('./controllers/Weather.controller');
// const movieController=require('./controllers/Movies.controller');
require('dotenv').config();
app.use(cors()) 
const axios =require ('axios');


app.get('/',weatherController);  

app.get('/',movieController);
 
app.listen(process.env.PORT)
