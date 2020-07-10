import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Button, ButtonGroup, ToggleButton, DropdownButton, Dropdown } from 'react-bootstrap'
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import InputMask from 'react-input-mask';

import './styles.css';

import Dropzone from '../../components/FileHandler';

const Register = () => {

  const history = useHistory();
  
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);

  const [position, setPosition] = useState([0,0]);
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [entityType, setEntityType] = useState('');
  const [selectedType, setSelectedType] = useState('Estabelecimento');
  const [logo, setLogo] = useState();

  function goBack(e) {
    e.preventDefault();
    history.push('/');
  }

  const fetchUfs = async () => {
    const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    
    const initials = response.data.map((data) => data.sigla);
    setUfs(initials);
  }
  const fetchCities = async () => {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    const cityNames = response.data.map((city) => city.nome);
    setCities(cityNames);
  };

  const handleMapClick = (event) => {
    setPosition([
      event.latlng.lat,
      event.latlng.lng
    ]);
  };

  const handleSelectedUf = async (e) => {
    setSelectedUf(e.target.value);
  }

  const handleSelectType = (type) => {
    setSelectedType(type);
    setEntityType(type)
  }

  const handleSelectedCity = async (e) => {
    setSelectedCity(e.target.value);
  }

  const handleSubmit = async () => {
    console.log(cnpj)
    console.log(entityType)
    console.log(name)
    console.log(email)
    console.log(password)
    console.log(selectedUf)
    console.log(selectedCity)
    console.log(phone)
    console.log(street)
    console.log(number)
    console.log(logo)
    console.log(position)
  }


  useEffect(() => {
    fetchUfs();
  }, []);

  useEffect(() => {
    fetchCities();
  }, [selectedUf])
  return(
    <div className="register-page">
      <Button className="go-back"variant="info" onClick={goBack}>
        <FiArrowLeft />
        Voltar
      </Button>
      <div className="middle">

        <h2>NUTRE</h2>
        <div className="register-container">
          <form onSubmit={handleSubmit}>
            <div className="two-data-wrapper">
              <div className="data">
                <strong>CNPJ:</strong>
                <InputMask className="cnpj-input" mask="99.999.999/9999-99" value={cnpj} onChange={(e) => setCnpj(e.currentTarget.value)} />
              </div>
              <div className="data">
                <strong>Você é:</strong>
                <ButtonGroup toggle>
                  <ToggleButton
                    type="radio"
                    variant="info"
                    value="ONG"
                    onChange={(e) => setEntityType(e.currentTarget.value)}
                    className="radio"
                  >
                    ONG
                  </ToggleButton>
                  <DropdownButton as={ButtonGroup} variant="secondary" title={selectedType} id="bg-nested-dropdown">
                    <Dropdown.Item onClick={() => handleSelectType('Restaurante')} eventKey="1">Restaurante</Dropdown.Item>
                    <Dropdown.Item eventKey="2"onClick={() => handleSelectType('Mercado')} >Mercado</Dropdown.Item>
                    <Dropdown.Item eventKey="3"onClick={() => handleSelectType('Bar')}>Bar</Dropdown.Item>
                    <Dropdown.Item eventKey="4"onClick={() => handleSelectType('Lanchonete')}>Lanchonete</Dropdown.Item>
                    <Dropdown.Item eventKey="5"onClick={() => handleSelectType('Hospital')}>Hospital</Dropdown.Item>
                  </DropdownButton>
                </ButtonGroup>
              </div>
              
            </div>
            
            <div className="two-data-wrapper">
              <div className="info">
                <strong>Nome da entidade:</strong>
                <input onChange={(e) => setName(e.target.value)} type="text"/>
              </div>
              <div className="info">
                <strong>E-mail</strong>
                <input onChange={(e) => setEmail(e.target.value)} type="text"/>
              </div>
            </div>
            <div className="two-data-wrapper">
              <div className="info">
                <strong>Senha:</strong>
                <input onChange={(e) => setPassword(e.target.value)} type="password"/>
              </div>
              <div className="info">
                <strong>Confirmar senha:</strong>
                <input onChange={(e) => setConfirmPassword(e.target.value)} type="password"/>
              </div>
            </div>

            <div className="two-data-wrapper">
              <div className="info">
                <div className="data">
                  <strong htmlFor="uf">Estado:</strong>
                    <select name="uf" id="uf" value={selectedUf} onChange={handleSelectedUf}>
                      <option value="0">Selecione uma UF</option>
                      {ufs.map((uf) => (
                        <option key={uf} value={uf} >{uf}</option>
                      ))}
                    </select>
                </div>
                <div className="data">
                  <strong htmlFor="uf">Cidade:</strong>
                    <select name="uf" id="uf" value={selectedCity} onChange={handleSelectedCity}>
                      <option value="0">Selecione uma UF</option>
                      {cities.map((city) => (
                        <option key={city} value={city} >{city}</option>
                      ))}
                    </select>
                </div>
              </div>
              <div className="info phone">
                <strong>Telefone:</strong>
                <InputMask mask="(99)99999-9999" value={phone} onChange={(e) => setPhone(e.currentTarget.value)} />
              </div>
            </div>
            <div className="two-data-wrapper">
              <div className="info">
                <strong>Rua</strong>
                <input onChange={(e) => setStreet(e.target.value)} type="text"/>
              </div>
              <div className="info">
                <strong>Número</strong>
                <input onChange={(e) => setNumber(e.target.value)} type="text"/>
              </div>
            </div>
          </form>
            <div className="map-n-drop">
              <Dropzone fileHandler={setLogo} />
              <div className="info">
                <strong>Informe a localização da sua entidade clicando no mapa: </strong>
                <Map center={[ -27.59667, -48.54917 ]} zoom={5} onclick={handleMapClick} >
                  <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position} />
                </Map>
              </div>
            </div>
            <div className="buttons">
              <Button variant="info" className="bottom-button" onClick={goBack}>
                <FiArrowLeft />
                Cancelar
              </Button>
              <Button variant="info" className="bottom-button" onClick={handleSubmit} >
                <FiCheck />
                Finalizar Cadastro
              </Button>
            </div>

        </div>
      </div>
    </div>
  );
}

export default Register;


const radios = [
  { name: 'ONG', value: 'ONG' },
  { name: 'Estabelecimento', value: 'Estabelecimento' }
];