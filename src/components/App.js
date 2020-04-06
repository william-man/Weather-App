import React from "react";
import { CSSTransition,TransitionGroup } from "react-transition-group";
import SearchRequest from "./Search";
import DisplayRequest from "./Data-display";
import DisplayImage from "./Display-image";
import "./app.css"


const api_key = process.env.REACT_APP_KEY

export default class WeatherApp extends React.Component {
  defaultState = {
      data: {sys:{country:""},
            name:"",
            weather:[{description:"",icon:""}],
            main:{humidity:"0"}
            },
      temp:"0°",
      temp_min:"-10 °C",
      temp_max:"10 °C",
      icon: "http://openweathermap.org/img/wn/01d@2x.png",
      animate: false,
      
  }
  
  constructor(props) {
    super(props);
    this.state =this.defaultState ;
    this.resetState=this.resetState.bind(this);
    this.searchData=this.searchData.bind(this);
    this.animateReset=this.animateReset.bind(this);
    this.animateStart=this.animateStart.bind(this);
  }

  resetState = () => {
    this.setState(this.defaultState);
  }

  searchData = (weatherdata) => {
    this.setState({
      data: weatherdata,
      temp: String((Math.round((weatherdata.main.temp - 273.15)*100))/100)+" °C",
      temp_min: String((Math.round((weatherdata.main.temp_min - 273.15)*100))/100)+" °C",
      temp_max: String((Math.round((weatherdata.main.temp_max - 273.15)*100))/100)+" °C",
      icon: "http://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png",
      animate:true
    });
  
  }
  animateReset = () => {
    this.setState({
      animate:false
    });
  }
  animateStart = () => {
    this.setState({
      animate:true
    });
  }
  render() {
    return (
      <div id="App">
          <div>
            <SearchRequest key={api_key} searching={this.searchData} reset={this.resetState} animateReset={this.animateReset} animateStart={this.animateStart}/>
          </div>
          
          <div id="request-container">
            <TransitionGroup id="request">
              <CSSTransition
              classNames="fade"
              timeout={2000}
              in={this.state.animate}
              key= {this.state.temp+this.state.temp_max+this.state.temp_min+this.state.data.weather[0].icon}
              >
              <DisplayRequest   data={this.state.data} temp_min={this.state.temp_min} temp_max={this.state.temp_max} temp={this.state.temp} animate={this.state.animate}/>
              </CSSTransition>
            </TransitionGroup>

            <TransitionGroup id="image">
              <CSSTransition 
              classNames="fade"
              timeout={2000}
              in={this.state.animate}
              key= {this.state.data.weather[0].icon}
              >
              <DisplayImage   icon={this.state.icon} iconid={this.state.data.weather[0].icon} animate={this.state.animate}/> 
              </CSSTransition>
            </TransitionGroup>
            
          </div>
        
      </div>
    );
  }
}

