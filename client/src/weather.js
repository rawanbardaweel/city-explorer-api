import React, { Component } from 'react'

export class weather extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.description}</h1>
                <h1>{this.props.date}</h1>
            </div>
        )
    }
}

export default weather
