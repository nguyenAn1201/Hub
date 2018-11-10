import React, { Component } from 'react';
import styles from '../styles/WeatherCard.scss';
import axios from 'axios';

class WeatherCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            location: null,
            humidity: null,
            wind: null,
            temp: null,
            weather: null,
            weatherId: null,
            weatherIcon: null
        }
    }
    componentDidMount() {
        //Import all svgs from assets dir
        const reqWeatherSvg = require.context('../assets', true, /\.svg$/);
        const allSvgFilePaths = reqWeatherSvg.keys(); 
        const weatherSvgArray = allSvgFilePaths.map(path => reqWeatherSvg(path));
        console.log(allSvgFilePaths);

        var date = new Date();
        var dateHour = date.getHours();

        axios.get('http://localhost:5000/')
          .then((res) => {
              //TODO: import the icon svg and write if else to display the right icon.
              let weatherId = res.data.weather[0].id;
              console.log(`${weatherId} time: ${dateHour}`)
              
              if (weatherId <= 232){
                this.setState({ weatherIcon: weatherSvgArray[11] }); //thunderstorm
              } else if (weatherId >= 300 && weatherId <= 321) {
                this.setState({ weatherIcon: weatherSvgArray[10] }); // drizzle
              } else if (weatherId >= 500 && weatherId <= 531) { 
                this.setState({ weatherIcon: weatherSvgArray[8] }); // rain
              } else if (weatherId >= 600 && weatherId <= 622) {
                this.setState({ weatherIcon: weatherSvgArray[9] }); // snow
              } else if (weatherId === 741) {
                this.setState({ weatherIcon: weatherSvgArray[5] }); // fog
              } else if (weatherId === 800 && dateHour <18) {
                this.setState({ weatherIcon: weatherSvgArray[4]}); // clear day
              } else if (weatherId === 800 && dateHour >17) {
                this.setState({ weatherIcon: weatherSvgArray[7] }); // clear night
              } else if (weatherId === 801) {
                this.setState({ weatherIcon: weatherSvgArray[0] }); // few cloud
              } else if (weatherId >= 803 && weatherId <= 804) {
                this.setState({ weatherIcon: weatherSvgArray[3] }); // cloudy
              } else {
                this.setState({ weatherIcon: weatherSvgArray[6] }); // If none then N/A
              }
              
              this.setState({
                location: res.data.name,
                humidity: res.data.main.humidity,
                wind: res.data.wind.speed,
                temp: res.data.main.temp,
                weather: res.data.weather[0].description,
                weatherId: weatherId
              })
          })
          .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="card-container">
                <div className="card">
                    <h5>{this.state.location}</h5>
                    <svg width="100%" height="40%" xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink">       
                        <image href={this.state.weatherIcon}  y="-100%" height="300%" width="100%"/>
                    </svg>
                    <p>{this.state.weather}</p>
                    <ul className="info">
                        <li><p>{this.state.temp} ˚F</p></li>
                        <li><p>{this.state.wind} mph</p></li>
                        <li><p>{this.state.humidity} %</p></li>
                    </ul>
                </div>
            </div>
        )
    }
};
export default WeatherCard;