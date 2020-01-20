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
import  LoginPage  from './login.js';
import  AboutPage  from './about.js';
import  ProfilePage  from './profile.js';
import  UsersPage  from './users.js';
import  SheltersPage  from './shelters.js';
import  GoogleApiWrapper  from './sheltersMap.js';


class App extends Component 
{
  constructor(props) {
    super(props);

    this.state = {
      render: ''
    }
    
  }

  handleClick(compName, e){
    console.log(compName);
    this.setState({render:compName});        
}
_renderSubComp(){
    switch(this.state.render){
        case 'login': return <LoginPage/>
        case 'about': return <AboutPage/>
        case 'profile': return <ProfilePage/>
        case 'users': return <UsersPage/>
        case 'shelters': return <SheltersPage/>
        default : return <GoogleApiWrapper/>
    }
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
            <NavLink onClick={this.handleClick.bind(this, 'about')}>About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.handleClick.bind(this, 'users')}>Users</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.handleClick.bind(this, 'shelters')}>Shelters</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/AyalaKlein/SafePoint">GitHub</NavLink>
          </NavItem>
        </Nav>
        <Nav>
        `<NavItem>
            <NavLink onClick={this.handleClick.bind(this, 'profile')}>My Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.handleClick.bind(this, 'login')}>Log In</NavLink>
          </NavItem>
        </Nav>
        
      </Collapse>
    </Navbar>
    {this._renderSubComp()}
    </div>
  
    )
  }
}

export default App;

