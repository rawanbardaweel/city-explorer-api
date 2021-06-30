import React, { Component } from 'react'

export class Weather extends Component {
    constructor(props){
        super(props)
        this.state={
            description:''
        }
    }
    weatherRender =()=>
    {
      this.setState={
      description: this.state.weatherData.map(weatherData=>{
          return (weatherData.description)
          
        })
        
    }
    
}

    render() {
        return (
            <div>
                <h1>{this.props.description}</h1>
                <h1>{this.props.date}</h1>
            </div>
        )
    }
}

export default Weather
