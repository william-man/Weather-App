import React from "react";
import "./searchcss.css";

const api_key = process.env.REACT_APP_KEY;

export default class SearchRequest extends React.Component {
  defaultState = {
          countrycodes: [],
          country: "",
          city: ""
        };
    constructor(props) {
        super(props);
        this.state = this.defaultState
        this.submitSearch = this.submitSearch.bind(this);
        this.countrySelected = this.countrySelected.bind(this);
        this.citySelected=this.citySelected.bind(this);
        this.errorHandle=this.errorHandle.bind(this);
        this.dataHandle=this.dataHandle.bind(this);
      }
    
    countrySelected = (event) => {
      this.setState({
        country: event.target.value
      });
    }
    citySelected = (event) => {
      this.setState({
        city:event.target.value
      });
    }

    errorHandle = (response) => {
      this.props.animateReset();
      if (!response.ok || this.state.city === "") {
        document.getElementById("error").innerHTML="There was an error retrieving the data!";
        this.props.reset()
      } else {
        document.getElementById("error").innerHTML=" ";
        return response.json();
      };
    }
    dataHandle = (data) => {
      if (data!== undefined) {
        this.props.searching(data);
        this.props.animateStart();
      }
    }

    submitSearch() {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="+this.state.city+","+this.state.country+"k&APPID="+api_key
      )
        .then(response => this.errorHandle(response))
        .then(data => this.dataHandle(data))
    }

    componentDidMount() {
        fetch(
          "https://gist.githubusercontent.com/wman27/b57b9031a26073f7d91ab4d4256b694d/raw/2e3bd424021beb6e0edb987b912f4e43dc31ab73/iso3166countrycodes.json"
        )
        .then(result => result.json())
        .then((json)=> {
          this.setState({
            countrycodes: json
          });
        });
    }

    render(){
      return (
        <div id="form-container">
          <form >
            <input id="input" type="text" onChange={this.citySelected}  placeholder="City e.g London"></input>
            <select id="select" onChange={this.countrySelected}>
              <option value="" >Select country</option>
              {this.state.countrycodes.map(data=>(
                <option value={data.code} key={data.name}>{data.name}</option>
              ))}
            </select>
              <button type="button" onClick={this.submitSearch}>Search</button>
            
          </form>
          <p id="error"></p>
        </div>
      )
    }
  }   