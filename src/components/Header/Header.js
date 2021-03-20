import React, { Component } from 'react';
import {
  Col,
  Navbar,
} from 'reactstrap';
import Brand from '../../static/images/weather.png';

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar color="primary" dark expand="md" className="ml-auto">
          <img src={Brand} width="50" alt="FORECAST WEATHER" />
          <Col sm="12" md={{ size: 6, offset: 4 }}>
            <h2 className="text-white brand">FORECAST WEATHER</h2>
          </Col>
        </Navbar>
        <br /><br />
      </div>
    );
  }
}

export default Header;