import L from 'leaflet';

import greenMarkerPng from './green_marker.png';
import purpleMarkerPng from './purple_marker.png';
import redMarkerPng from './red_marker.png';


export const greenMarker = L.icon({
  iconUrl: greenMarkerPng,
  iconSize: [25,41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -40]
})

export const purpleMarker = L.icon({
  iconUrl: purpleMarkerPng,
  iconSize: [25,41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -40]
})

export const redMarker = L.icon({
  iconUrl: redMarkerPng,
  iconSize: [25,41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -40]
})


