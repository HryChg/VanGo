import React from 'react';
import Nav from './components/Nav.js';
import MapContainer from "./components/MapContainer";



const App = () => (
  <div>
    <Nav />
  <MapContainer
      width={'600px'}
      height={'500px'}
  />
  </div>
);

export default App;
