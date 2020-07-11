import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';

import { Navbar, Nav, Button, Modal } from 'react-bootstrap'

import ComoUsar from '../../components/ComoUsar';
import Map from '../../components/Map';
import Sobre from '../../components/Sobre';
import QuemSomos from '../../components/QuemSomos';

import './styles.css'
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png'


const Dashboard = () => {

  const { signIn, signOut, entity, token, isSigned, isEstablishment, hasFood } = useAuth();

  const [showModal, setShowModal] = useState(false); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signIn(username, password);
    handleCloseModal();
  }
  
  const handleSignOut = () => {
    signOut();
  }

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

  useEffect(() => {
    
  }, [isSigned]);

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
          {!isSigned && (<><Nav.Item>
            <Button variant="info" onClick={goToRegister}>Registrar</Button>
          </Nav.Item>
          <Nav.Item>
            <Button variant="info" onClick={handleOpenModal}className="login">Login</Button>
          </Nav.Item></>)}

          {isSigned && (
            <div className="logged-nav"> 
              {
                isEstablishment ?
                  (
                    <>
                      <Button variant="info">{hasFood ? 'Divulgar doação' : 'alterar dados doação'}</Button>
                    </>
                  )
                :
                  (
                    <>
                    <div className="div"></div>
                    <div className="div"></div>
                    </>
                  )
              }
              
              
              <div className="entity-info">
                <img className="thumb-photo" src={entity.logo_thumbnail} alt='ovo' />
                <span>{isEstablishment}</span>
              </div>
            <Button variant="info" onClick={handleSignOut}>
              <FiLogOut size={20}/>
            </Button>
            </div>
          )}
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
                <Button variant="info" onClick={handleCloseModal}>Cancelar</Button>
                <Button variant="info" onClick={handleSignIn}>Login</Button>
              </div>
            </div>
          </Modal.Body>

      </Modal>
    </div>
  )
}

export default Dashboard;
