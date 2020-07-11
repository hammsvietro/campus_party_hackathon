import React, { useEffect, useState } from 'react';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Modal } from 'react-bootstrap';

import { redMarker, greenMarker, purpleMarker } from '../../assets/mapMarkers';

import api from '../../services/api';

import SearchComponent from '../MapSearch';
import ModalBody from '../ModalBody';

import './styles.css';
import logo from '../../assets/logo_big.png';

const position = [-15.798478, -47.860861];

const MapComponent = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [establishments, setEstablishments] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [selectedEstablishmentInfo, setSelectedEstablishmentInfo] = useState({})



  async function handleOpenModal(e, id, type) {
    e.preventDefault();
    let response;
    try {
      response = await api.get(`${type}/${id}`);
    } catch (error) {
      alert('error');
    }
    
    setSelectedEstablishmentInfo(response.data);
    setShowModal(true);
  }

  async function handleCloseModal() {

    setShowModal(false);
  }

  async function fetchEntities() {
    let response;

    try {
      response = await api.get('/dashboard');
      
      setEstablishments(response.data.establishments);
      setNgos(response.data.ngos);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchEntities();
  }, []);

  return (
    <div className="map">

      <Map center={position} zoom={14}>

        <SearchComponent />

            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
              establishments.map((establishment, inx) => (
                <Marker
                  key={establishment.name}
                  icon={establishment.has_meal == '1' ? greenMarker : redMarker}
                  position={[establishment.latitude, establishment.longitude]}
                >
                  <Popup className="popup">
                    <div className="popup-container">
                      <img class="establishment-logo" src={establishment.logo_thumbnail} alt="jsaidj"/>
                        <span>{establishment.name}</span>
                      
                        <span style={{margin: '5px 0 0 0'}}>{establishment.establishmentType}</span>
                      
                      {establishment.hasMeal && <p>{establishment.available_meals + ' Refeições disponíveis'}</p>}

                      <Button className="see-more-button" variant="info" onClick={(e) => handleOpenModal(e, establishment.id, 'establishment')}>
                        Mais Informações
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))
            }

            {
              ngos.map((ngo, inx) => (
                <Marker
                  key={ngo.name}
                  icon={purpleMarker}
                  position={[ngo.latitude, ngo.longitude]}
                >
                  <Popup className="popup">
                    <div className="popup-container">
                      <img class="establishment-logo" src={ngo.logo_thumbnail} alt="jsaidj"/>
                        <span>{ngo.name}</span>
                      
                        <span style={{margin: '5px 0 0 0'}}>ONG</span>
                      
                      

                      <Button className="see-more-button" variant="info" onClick={(e) => handleOpenModal(e, ngo.id, 'ngo')}>
                        Mais Informações
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))
            }

        <Modal show={showModal} onHide={handleCloseModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {selectedEstablishmentInfo.name}
            </Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <ModalBody data={selectedEstablishmentInfo}/>
            </Modal.Body>

        </Modal>

      </Map>
      
    </div>
  );
}

export default MapComponent;
