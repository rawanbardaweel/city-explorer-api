import React, { Component } from 'react';
import AlertMessage from './AlertMessage';
import Weather from './Weather';
import Movies from './Movies';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city_name: '',
      latitude: '',
      longitude: '',
      error: '',
      show: false,
      weather:[],
      image:'',
      movies:[]

    }
  }
 
  handlerData = (e) => {
    this.setState({
      city_name: e.target.value,
    })
  }
  handlerSubmit = async (e) => {
    e.preventDefault()
    try {
      e.preventDefault();
      let cityUrl=`https://eu1.locationiq.com/v1/search.php?key=pk.0a80fd547a3c1e8574e39921b81514c5&q=${this.state.city_name}&format=json`;
      let axiosResponed = await axios.get(cityUrl).then(response=>{
        console.log('hi', response.data[0].display_name)

        this.setState({
          
          latitude: response.data[0].lat,
          longitude: response.data[0].lon,
          alert:false,
          show: true,
        })
      })
      // const axiosLocalApi = await axios.get(`http://localhost:8000/weather-list?lat=31.95&lon=35.91&searchQuery=${this.state.city_name}`)
      // const axiosLocalApi = await axios.get(`http://localhost:8000/weather-list?lat=31.95&lon=35.91&searchQuery=${this.state.city_name}`)
      let weatherApiUrl=`http://localhost:8000/weather-list/?lat=${this.state.latitude}&lon=${this.state.longitude}&searchQuery=${this.state.city_name}`
      let weatherGet=await axios.get(weatherApiUrl)
        this.setState({
          weather:weatherGet.data,
          show:true
        })
      

      let moviesUrl=`http://localhost:8000/movie?query=amman`
      let moviesGet=await axios.get(moviesUrl)
        this.setState({
          movies:moviesGet.data,
          show:true
        })
        
      console.log(axiosResponed.data)
      console.log('helloooo',moviesGet.data)
    }catch (error){
      this.setState({
        error:"please provide a valid city name",
        alert:true,
        show:false,
      })
    }
  }
  
  render() {
    return (
      <>
      <AlertMessage 
      alert={this.state.alert}
      error={this.state.error}/>
        <form onSubmit={this.handlerSubmit} style={{ marginLeft: '100px', paddingTop: '20px', marginButton: '20px', display: 'block', width: '50px' }}>
          <input type='text' placeholder='City Name' onChange={(e) => { this.handlerData(e) }} />
          <button >Explorer!</button>
        </form>
        <div>
        {this.state.show &&
          <div>
            <h1>{this.state.city_name}</h1>
            <h1>{this.state.longitude}</h1>
            <h1>{this.state.latitude}</h1>
           
            <Image alt='map' src={`https://maps.locationiq.com/v3/staticmap?key=pk.0a80fd547a3c1e8574e39921b81514c5&center=${this.state.latitude},${this.state.longitude}&zoom=1-8`} fluid style={{ margin: '100px', width: '1000px' }} />
            
{
   this.state.weather.map((elemnt,index)=>{
    return (
      <Weather description={elemnt.description} date={elemnt.date}/> 
     

    )
  })
}
{
  this.state.movies.map((ele,index)=>{
    return (
      <Movies img={ele.img} title={ele.title} votes={ele.votes}/>
    )
  })
}
            
          </div>
        }
        
        </div> 
        
      </>
    )
  }
}
export default App;