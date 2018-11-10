import React, { Component } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import WeatherCard from '../components/WeatherCard';
import styles from '../styles/App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            location: null,
            humidity: null,
            temp: null,
            maxTemp: null,
            minTemp: null,
            weather: null,
            weatherId: null,
            weatherIcon: null
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/')
          .then((res) => {
            console.log(res);
            this.setState({ 
                location: res.data.name,
                humidity: res.data.main.humidity,
                pressure: res.data.main.pressure,
                temp: res.data.main.temp,
                maxTemp: res.data.main.temp_max,
                minTemp: res.data.main.temp_min,
                weather: res.data.weather[0].description,
                weatherId: res.data.weather[0].id,
            })
          })
          .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <NavBar />
                <WeatherCard />
            </div>
        );
    }
}
export default App;