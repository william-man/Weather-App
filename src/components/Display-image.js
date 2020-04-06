import React from "react";
import "./image.css"
export default class DisplayImage extends React.Component{
    render() {
      return (
        <div id="icon">
          <img src = {this.props.icon} alt="weather condition"></img>
        </div>
      )
    }
  }