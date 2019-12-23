import React, { useState } from 'react';
import './App.css';
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
import styled from "styled-components";

function App() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);

    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = e => {
        setModalOpen(!modalOpen);
    };
    const register = e => {
        setModalOpen(!modalOpen);
    };
    
  return (
    
    <div>
      
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">SafePoint</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
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
        <Container>
            <Row>
                <Button color="primary" onClick={toggleModal}>Create New User</Button>
            </Row>
        </Container>
        <Modal isOpen={modalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>New User</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="firstNameInput">First Name</Label>
                        <Input type="text" name="firstName" id="firstNameInput" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastNameInput">Last Name</Label>
                        <Input type="text" name="lastName" id="lastNameInput" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="countryInput">City</Label>
                        <Input type="text" name="country" id="countryInput" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="ageInput">Age</Label>
                        <Input type="number" name="age" id="ageInput" />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={register}>Register</Button>{' '}
                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </div>
);
    
}

export default App;

