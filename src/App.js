import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './components/Header/Header';
import WeatherInfo from './components/WeatherInfo/WeatherInfo';
import './static/common.css';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <WeatherInfo />
      </>
    );
  }
}

export default App;
