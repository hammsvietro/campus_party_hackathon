import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';

import moment from 'moment';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap'

import ComoUsar from '../../components/ComoUsar';
import Map from '../../components/Map';
import Sobre from '../../components/Sobre';
import QuemSomos from '../../components/QuemSomos';

import TimePicker from 'react-time-picker';
import './styles.css'
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/logo.png'


const Dashboard = () => {

  const { signIn, signOut, entity, setHasFood, isSigned, isEstablishment, hasFood } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [time, setTime] = useState('18:30');
  const [meals, setMeals] = useState(1);

  const handleSignIn = () => {
    signIn(username, password);
    handleCloseModal();
  }

  const handleSignOut = () => {
    signOut();
  }

  function handleOpenModal(e) {
    e.preventDefault();
    setShowModal(true);
  }

  async function handleRemoveMeal() {

    let response;

    try {
      response = await api.delete(`/establishment/${entity.id}`);

    } catch (error) {
      console.log(error);
      
      return setShowAddMealModal(false);
    }

    setShowAddMealModal(false);
    setHasFood(false);
  }

  async function handleSubmitMeal() {

    const now = moment(new Date());
    const submitedDate = moment(time, 'HH:mm');

    if(moment(now).isAfter(moment(submitedDate))) {
      alert('Você precisa informar um horário futuro')
      return setShowAddMealModal(false);
    }

    let response;

    try {
      response = await api.put(`/establishment/${entity.id}`, {
        mealQuantity: meals,
        timeAvailable: time
      });
    } catch(error) {
      console.log(error);
      
      return setShowAddMealModal(false);
    }
    setShowAddMealModal(false);
    setHasFood(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleOpenAddMealModal(e) {
    e.preventDefault();
    setShowAddMealModal(true);
  }

  function handleCloseAddMealModal() {
    setShowAddMealModal(false);
  }

  function handleTimeChange(e) {
    setTime(e);
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
        <Nav className="justify-content-end nav-end">
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
                      <Button onClick={handleOpenAddMealModal} variant="info">{hasFood ? 'alterar dados doação' : 'Divulgar doação'}</Button>
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
                <span>{entity.name}</span>
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

      <Modal show={showAddMealModal} onHide={handleCloseAddMealModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="addMealModal">
            Doação
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-meal-modal-container">
            <div className="inputs">
              <div className="data">
                <strong>Número de refeições:</strong>
                <input value={meals} onChange={(e) => setMeals(e.target.value)} min='1' type="number"/>
              </div>
              <div className="data">
                <strong>Disponível para coleta até:</strong>
                <TimePicker
                  onChange={handleTimeChange}
                  value={time}
                  format="HH:mm"
                />

              </div>
            </div>
            <div className="buttons">
              <Button onClick={handleRemoveMeal} variant="info">Remover Doação</Button>
              <Button onClick={handleSubmitMeal} variant="info">Confirmar Doação</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Dashboard;
