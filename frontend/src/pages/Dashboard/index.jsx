import React from 'react';
import { useHistory } from 'react-router-dom';

import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap'

import ComoUsar from '../../components/ComoUsar';
import Map from '../../components/Map';

import './styles.css'
import logo from '../../assets/logo.png'


const Dashboard = () => {

  const history = useHistory();

  function goToRegister(e) {
    e.preventDefault();
    history.push('/register');
  }

  return (
    <div className="dashboard">
      <Navbar className="navbar" fixed="top" variant="dark">
        <img src={logo} alt="logo" className="logo" />
        <Navbar.Brand className="brand">NUTRE</Navbar.Brand>

        <Nav className="mr-auto hash-links">
          <Nav.Link href="#how-to-use">Como Usar</Nav.Link>
          <Nav.Link href="#map">Mapa</Nav.Link>
          <Nav.Link href="">Sobre</Nav.Link>
          <Nav.Link href="">Quem somos</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Item>
            <Button variant="info" onClick={goToRegister}>Registrar</Button>
          </Nav.Item>
          <Nav.Item>
            <Button variant="info" className="login">Login</Button>
          </Nav.Item>
        </Nav>
      </Navbar>
      <div className="content">
        <div id="how-to-use">

          <ComoUsar />
        </div>
        <div id="map">
          <Map />
        </div>

      </div>
          
    </div>
  )
}

export default Dashboard;
