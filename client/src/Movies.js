import React, { Component } from 'react'

export class Movies extends Component {
    constructor(props){
        super(props)
        this.state={
            imges:''
        }
    }
    imagesRender =()=>
    {
      this.setState={
          image: this.state.movies.map(movies=>{
          return (movies.imges)
          
        })
        
    }
    
}
    render() {
        return (
            <div>
                <p>{this.props.title}</p>
                <p>{this.props.votes}</p>
                <img src={this.props.img} alt='img'/>
            </div>
        )
    }
}

export default Movies
