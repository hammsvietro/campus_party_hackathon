import React, { useState } from 'react';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Modal } from 'react-bootstrap';


import SearchComponent from '../MapSearch';

import './styles.css';
import logo from '../../assets/logo.png';
import ovo from '../../assets/ovo.jpeg';

const position = [51.505, -0.09];

const MapComponent = () => {
  
  const [showModal, setShowModal] = useState(false); 


  async function handleOpenModal(e) {
    e.preventDefault();
    setShowModal(true);
  }

  async function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div className="map">

      <Map center={position} zoom={15}>

        <SearchComponent />

            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          
            {stablishments.map(store => (

              <Marker position={[store.latitude, store.longitude]}>
                <Popup className="popup">

                  <img class="stablishment-logo" src={logo} alt="jsaidj"/>

                  <p>{store.name}</p>
                  <p>{store.availableMeals + ' Refeições disponíveis'}</p>

                  <Button className="see-more-button" variant="info" onClick={handleOpenModal}>
                    Mais Informações
                  </Button>

                </Popup>
              </Marker>
            ))}

        <Modal show={showModal} onHide={handleCloseModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {stablishmentInfo.name}
            </Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <div className="modal-body">
                
                <img className="img-fluid modal-logo" src={ovo} alt="logo" />
                <div className="modal-info">

                <p><h2>Endereço: </h2>{stablishmentInfo.street+' '+stablishmentInfo.number}</p>

                <p><h2>Telefone: </h2>{stablishmentInfo.phone}</p>

                <p><h2>E-mail: </h2>{stablishmentInfo.email}</p>
                  
                </div>
                
              </div>
            </Modal.Body>

        </Modal>

      </Map>
      
    </div>
  );
}

export default MapComponent;





const stablishments = [
  {
    name: 'Imperatriz',
    availableMeals: 32,
    latitude: 51.505,
    longitude: -0.09
  },
  {
    name: 'tres irmaos',
    availableMeals: 4,
    latitude: 51.54 ,
    longitude: -0.09
  },
  {
    name: 'braulio',
    availableMeals: 123,
    latitude: 51.503,
    longitude: -0.097
  },
  {
    name: 'qwdhuqhwd',
    availableMeals: 543,
    latitude: 51.502,
    longitude: -0.091
  }
]

const stablishmentInfo = {
  name: 'Imperatriz',
  availableMeals: 32,
  street: 'rua dos polvos',
  number: 142,
  cpnj: '232.323.3223/013-2',
  until: '18:30',
  phone: '(48) 9969196942',
  email: 'ovo@gmail.com',

}