import React, { useState, Component } from 'react';
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
import AboutPage from './about.js';
import ProfilePage from './profile.js';
import UsersPage from './users.js';
import SheltersPage from './shelters.js';
import GoogleApiWrapper from './sheltersMap/sheltersMap.js';
import './App.css';
import {initializeIcons} from '@uifabric/icons'
initializeIcons()

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      render: ''
    }

  }

  handleClick(compName, e) {
    this.setState({ render: compName });
  }
  _renderSubComp() {
    switch (this.state.render) {
      case 'about': return <AboutPage />
      case 'profile': return <ProfilePage />
      case 'users': return <UsersPage />
      case 'shelters': return <SheltersPage />
      default: return <GoogleApiWrapper />
    }
  }

  render() {
    return (
      <div className="App d-flex flex-column">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">SafePoint</NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="mr-auto nav" navbar>
              <NavItem>
                <NavLink disabled onClick={this.handleClick.bind(this, 'about')}>About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink disabled onClick={this.handleClick.bind(this, 'users')}>Users</NavLink>
              </NavItem>
              <NavItem>
                <NavLink disabled onClick={this.handleClick.bind(this, 'shelters')}>Shelters</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/AyalaKlein/SafePoint">GitHub</NavLink>
              </NavItem>
            </Nav>
            <Nav>
              <NavItem>
                <NavLink disabled onClick={this.handleClick.bind(this, 'profile')}>My Profile</NavLink>
              </NavItem>
            </Nav>

          </Collapse>
        </Navbar>
        <div className="flex-grow-1">
          {this._renderSubComp()}
        </div>
      </div>

    )
  }
}

export default App;

