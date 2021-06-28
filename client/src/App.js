import React, { Component } from 'react'
import axios from 'axios';

// import weather  from './data/weather.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',

    }
  }
  changeHandler = (e) => {
    this.setState({
      displayName: e.target.value,


    })
  }
  getData = async (e) => {
    e.preventDefault()
    let axiosResp = await axios.get('http://localhost:8000/weather-list')
    // const result = this.data.find( ({ city_name }) => city_name === 'Amman' );
    console.log(axiosResp)
    // console.log(result)
    this.setState({
      displayName:axiosResp.data.city_name,
      longitude: axiosResp.data.lon,
      latitude: axiosResp.data.lat,

    })

  }
  render() {

    return (

      <div>

        <form onSubmit={this.getData} style={{ marginLeft: '20px', paddingTop: '20px' }}>
          <input type='text' placeholder='city name....' onChange={this.changeHandler} />
        <button onClick={this.getData}>Explore!</button>
        </form>
        <h1>{this.state.displayName}</h1>
        </div>

       

    )
  }
}

export default App
