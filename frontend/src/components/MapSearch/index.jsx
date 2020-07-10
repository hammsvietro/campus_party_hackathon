import React from 'react';
import ReactLeafletSearch from "react-leaflet-search";
import './styles.css';

const SearchComponent = (props) => <ReactLeafletSearch zoom={10} showMarker={false} inputPlaceholder="Endereço" showPopup={true} className="search" position="topleft" provider="OpenStreetMap" />;

export default SearchComponent;