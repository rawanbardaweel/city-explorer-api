import React, { Component } from 'react'
import axios from 'axios';
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      errorMessage: true,
      showError: false,
      long: '',
      lat: '',
      city: '',


    }
  }
  changeHandler = (e) => {
    this.setState({
      cityName: e.target.value,


    });
  }

  submitData = async (e) => {
    e.preventDefault()
    try {
      let axiosData = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.b25689e45ce9b253dc8d624cf71fa8e1&city=${this.state.displayName}&format=json`)
      // let axiosReqApi = await axios.get(`http://localhost:8000/weather-list?key=pk.b25689e45ce9b253dc8d624cf71fa8e1&city=${this.state.latitude}&${this.state.longitude}&format=json`).catch(error => {
        this.setState({
          cityData: axiosReqApi.data.city_name,
          longitude: axiosReqApi.data.lon,
          latitude: axiosReqApi.data.lat,
          display: true,
          // weatherData: axiosReqApi.data,
          errorMessage: false

        })

      }     
      catch(error) {
        this.setState({ errorMessage: error.message });
        out = true;
        showError: true

      }
   


  }

  render() {

    return (
      <div>

        <form onSubmit={this.submitData} style={{ marginLeft: '20px', paddingTop: '20px' }}>
          <input type='text' placeholder='city name....' onChange={this.changeHandler} />
          <button>Explore</button>
        </form>
        {
          this.state.errorMessage === false &&
          <div>
            <h1>{this.state.displayName}</h1>
            <h1>{this.state.longitude}</h1>
            <h1>{this.state.latitude}</h1>
            <p>
              {
                this.state.cityData.display_name
              }
            </p>
            <Image alt="map" src={`https://maps.locationiq.com/v3/staticmap?key=pk.b25689e45ce9b253dc8d624cf71fa8e1&center=${this.state.latitude},${this.state.longitude}&zoom=1-18`}
              fluid style={{ margin: '100px' }} />
            <p>
              {`latitude:${this.state.cityData.lat},longitude:${this.state.cityData.lon}`}
            </p>
          </div>

        }
        {/* {
          this.this.weatherData.map(weatherData => {
            return <weather description={weatherData.description} date={weatherData.date} />
          // this.state.showError &&
          // <div>
          //   <h1>ERROR</h1>
          //   <p>{this.state.errorMessage}</p>
         
        }} */}

      </div>

    )
  }
}


export default App
