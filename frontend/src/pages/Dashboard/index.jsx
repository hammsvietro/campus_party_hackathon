import React from 'react';

import { Navbar, Nav, Button } from 'react-bootstrap'

import Map from '../../components/Map';

import './styles.css'
import logo from '../../assets/logo.png'


const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar bg="dark" variant="dark">
        <img src={logo} alt="logo" className="logo" />
        <Navbar.Brand className="brand">NUTRE</Navbar.Brand>

        <Nav className="mr-auto hash-links">
          <Nav.Link>Mapa</Nav.Link>
          <Nav.Link>Quem somos</Nav.Link>
          <Nav.Link>Sobre</Nav.Link>
        </Nav>
        <Button>Registrar</Button>
        <Button className="login">Login</Button>
      </Navbar>

      <Map />
    </div>
  )
}

export default Dashboard;
