import React, { useState, Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import {
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
    Jumbotron, Button, Row, Container, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Modal,
    ModalBody, ModalHeader, ModalFooter, Label, Input, InputGroup, Form, FormGroup, Navbar, NavbarBrand
} from "reactstrap";
import { render } from '@testing-library/react';

const mapStyles = {
  width: '80%',
  height: '80%'
};


class MapContainer extends Component 
{
  constructor(props) {
    super(props);

    this.state = {
      stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
              {latitude: 47.359423, longitude: -122.021071},
              {latitude: 47.2052192687988, longitude: -121.988426208496},
              {latitude: 47.6307081, longitude: -122.1434325},
              {latitude: 47.3084488, longitude: -122.2140121},
              {latitude: 47.5524695, longitude: -122.0425407}]
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    return (
      <div>
      <Navbar color="light" light expand="md">
      <NavbarBrand href="/">SafePoint</NavbarBrand>
      <NavbarToggler />
      <Collapse navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink path="/about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/AyalaKlein/SafePoint">GitHub</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
              <DropdownItem>
                Option 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarText>Simple Text</NavbarText>
      </Collapse>
    </Navbar>

    <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        >
          {this.displayMarkers()}
        </Map>
    </div>
  
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA9JeZYGM9vsytm45dXISaRlRnW5HYSDic'
})(MapContainer);

