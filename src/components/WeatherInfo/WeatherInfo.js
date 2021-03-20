import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';
import Axios from 'axios';
import Select from 'react-select';
import { cityData } from '../../data/Data';


class WeatherInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCity: null,
      weatherData: [],
      recentlySearched: []
    }
  }

  componentDidMount = () => {
    let recentlySearchedData = JSON.parse(localStorage.getItem('recentlySearched')) || [];
    this.setState({
      recentlySearched: recentlySearchedData
    })
  }

  getWeatherInfo = selectedCity => {
    this.getWeatherAPI(selectedCity.value);
  };

  getWeatherAPI = (cityName) => {
    Axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=094aa776d64c50d5b9e9043edd4ffd00`)
      .then(response => {
        let allData = [];
        let selectedCityBySearch = [];

        allData = JSON.parse(localStorage.getItem('recentlySearched')) || [];
        allData.unshift(response.data);
        localStorage.setItem('recentlySearched', JSON.stringify(allData));

        selectedCityBySearch.push({ label: cityName, value: cityName });

        this.setState({
          weatherData: response.data,
          recentlySearched: allData,
          selectedCity: selectedCityBySearch
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  clearRecentSearch = () => {
    localStorage.removeItem('recentlySearched');
    this.setState({
      recentlySearched: []
    })
  }

  render() {

    const {
      selectedCity,
      weatherData,
      recentlySearched
    } = this.state;

    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Row>
            <Col xs="7">
              <Card>
                <CardBody>
                  <Select
                    value={selectedCity}
                    onChange={this.getWeatherInfo}
                    options={cityData}
                    placeholder="Enter Your City Name"
                  />
                  {
                    weatherData.length !== 0 &&
                    <>
                      <br />
                        Today's weather information as follows,
                        <br /><br />
                      <ListGroup>
                        <ListGroupItem>
                          City Name: {weatherData.name}
                        </ListGroupItem>
                        <ListGroupItem>
                          Temperature: {weatherData.main.temp}
                        </ListGroupItem>
                        <ListGroupItem>
                          Weather: {weatherData.weather[0].description}
                        </ListGroupItem>
                        <ListGroupItem>
                          Cordinates of longitude is {weatherData.coord.lon}
                        </ListGroupItem>
                        <ListGroupItem>
                          Cordinates of latitude is: {weatherData.coord.lat}
                        </ListGroupItem>
                        <ListGroupItem>
                          Pressure level: {weatherData.main.pressure}
                        </ListGroupItem>
                        <ListGroupItem>
                          Humidity level: {weatherData.main.humidity}
                        </ListGroupItem>
                      </ListGroup>
                    </>
                  }
                </CardBody>
              </Card>
            </Col>

            <Col xs="5" style={{ borderLeft: "1px solid #A9A9A9", height: "500px" }}>
              <div className="recent-search">
                <h4>Recently Searches</h4>
                <Button size="sm" onClick={this.clearRecentSearch}>Clear</Button>
                <br /><br />
                {
                  recentlySearched.length !== 0 ? recentlySearched.map((search, index) => (
                    <>
                      <Card 
                        className="cursor-pointer" 
                        key={index} 
                        onClick={() => { this.getWeatherAPI(search.name) }}
                      >
                        <CardBody>
                          <h6>
                            City: {search.name} <br /><br />
                            Temp: {search.main.temp}
                          </h6>
                        </CardBody>
                      </Card>
                      <br />
                    </>
                  ))
                  :
                  <>
                    No records found
                  </>
                }
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default WeatherInfo;