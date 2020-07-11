import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Navbar, Nav, Button, Modal } from 'react-bootstrap'

import ComoUsar from '../../components/ComoUsar';
import Map from '../../components/Map';
import Sobre from '../../components/Sobre';
import QuemSomos from '../../components/QuemSomos';

import './styles.css'
import logo from '../../assets/logo.png'


const Dashboard = () => {

  const [showModal, setShowModal] = useState(false); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  async function handleOpenModal(e) {
    e.preventDefault();
    setShowModal(true);
  }

  async function handleCloseModal() {
    setShowModal(false);
  }


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
          <Nav.Link href="#sobre">Sobre</Nav.Link>
          <Nav.Link href="#quem-somos">Quem somos</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Item>
            <Button variant="info" onClick={goToRegister}>Registrar</Button>
          </Nav.Item>
          <Nav.Item>
            <Button variant="info" onClick={handleOpenModal}className="login">Login</Button>
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
        <div id="sobre">
          <Sobre />
        </div>
        <div id="quem-somos">
          <QuemSomos />
        </div>

      </div>
      
      <Modal show={showModal} onHide={handleCloseModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login
          </Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <div className="login-body">
              <input onChange={(e) => {setUsername(e.target.value)}}type="text"/>
              <input onChange={(e) => {setPassword(e.target.value)}} type="password"/>
              <div className="login-buttons">
                <Button variant="info">Cancelar</Button>
                <Button variant="info">Login</Button>
              </div>
            </div>
          </Modal.Body>

      </Modal>
    </div>
  )
}

export default Dashboard;
