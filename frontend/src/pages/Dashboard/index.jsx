import React from 'react';
import { useHistory } from 'react-router-dom';

import { Navbar, Nav, Button } from 'react-bootstrap'

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
      <Navbar className="navbar" variant="dark">
        <img src={logo} alt="logo" className="logo" />
        <Navbar.Brand className="brand">NUTRE</Navbar.Brand>

        <Nav className="mr-auto hash-links">
          <Nav.Link>Mapa</Nav.Link>
          <Nav.Link>Sobre</Nav.Link>
          <Nav.Link>Quem somos</Nav.Link>
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

      <Map />
    </div>
  )
}

export default Dashboard;
