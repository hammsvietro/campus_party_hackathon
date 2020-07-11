import React, { useState } from 'react';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Modal } from 'react-bootstrap';

import { redMarker, greenMarker, purpleMarker } from '../../assets/mapMarkers';


import SearchComponent from '../MapSearch';
import ModalBody from '../ModalBody';

import './styles.css';
import logo from '../../assets/logo_big.png';

const position = [51.5103, -0.09];

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

      <Map center={position} zoom={13}>

        <SearchComponent />

            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          
            {stablishments.map((store, inx) => (

              <Marker icon={inx%2==0 ? greenMarker : purpleMarker} position={[store.latitude, store.longitude]}>
                <Popup className="popup">
                  <div className="popup-container">
                    <img class="stablishment-logo" src={logo} alt="jsaidj"/>
                      <span>{store.name}</span>
                    
                      <span style={{margin: '5px 0 0 0'}}>{store.type}</span>
                    
                    <p>{store.availableMeals + ' Refeições disponíveis'}</p>

                    <Button className="see-more-button" variant="info" onClick={handleOpenModal}>
                      Mais Informações
                    </Button>

                  </div>

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
              <ModalBody data={stablishmentInfo}/>
            </Modal.Body>

        </Modal>

      </Map>
      
    </div>
  );
}

export default MapComponent;





const stablishments = [
  {
    name: 'Supermercado Big',
    availableMeals: 32,
    type: 'Mercado',
    latitude: 51.505,
    longitude: -0.09
  },
  {
    name: 'tres irmaos',
    availableMeals: 4,
    type: 'Mercado',
    latitude: 51.54 ,
    longitude: -0.09
  },
  {
    name: 'braulio',
    availableMeals: 123,
    type: 'Mercado',
    latitude: 51.503,
    longitude: -0.097
  },
  {
    name: 'qwdhuqhwd',
    availableMeals: 543,
    type: 'Mercado',
    latitude: 51.502,
    longitude: -0.091
  }
]

const stablishmentInfo = {
  name: 'Supermercado Big',
  availableMeals: 32,
  street: 'rua dos polvos',
  number: 142,
  cnpj: '232.323.3223/013-2',
  time_available: '18:30',
  phone_number: '(48) 9969196942',
  email: 'ovo@gmail.com',
  uf: 'SC',
  city:'fpolis'
}