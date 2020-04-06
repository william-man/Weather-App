import React from "react";
import "./display.css"
export default class DisplayRequest extends React.Component{
    render() {
      return (
        <div id="display-container">
            <p>Country: {this.props.data.sys.country}</p>
            <p>City: {this.props.data.name}</p>
            <p>Description: {this.props.data.weather[0].description}</p>
            <p>Temp: {this.props.temp}</p>
            <p>Temp min: {this.props.temp_min}</p>
            <p>Temp max: {this.props.temp_max}</p>
            <p>Humidity: {this.props.data.main.humidity}%</p>
        </div>
      )
    }
  }