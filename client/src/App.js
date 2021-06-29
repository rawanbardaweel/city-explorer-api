import React, { Component } from 'react';
import AlertMessage from './AlertMessage';
import Weather from './Weather';
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
      WeatherData:[]
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
      let axiosResponed = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.0a80fd547a3c1e8574e39921b81514c5&q=${this.state.city_name}&format=json`);
      // const axiosLocalApi = await axios.get(`http://localhost:8000/weather-list?lat=31.95&lon=35.91&searchQuery=${this.state.city_name}`)
      const axiosLocalApi = await axios.get(`http://localhost:8000/weather-list?lat=31.95&lon=35.91&searchQuery=${this.state.city_name}`)

      this.setState({
        city_name: axiosResponed.data[0].city_name,
        latitude: axiosResponed.data[0].lat,
        longitude: axiosResponed.data[0].lon,
        alert:false,
        show: true,
        weatherData:axiosLocalApi.data
      })
      console.log(axiosLocalApi.data)
      console.log(axiosResponed.data)
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
            <h5>{this.state.city_name}</h5>
            <Image alt='map' src={`https://maps.locationiq.com/v3/staticmap?key=pk.0a80fd547a3c1e8574e39921b81514c5&center=${this.state.latitude},${this.state.longitude}&zoom=1-8`} fluid style={{ margin: '100px', width: '1000px' }} />
          </div>
        }
        </div>
        {/* <Weather ren={this.state.alert}/> */}

      </>
    )
  }
}
export default App;