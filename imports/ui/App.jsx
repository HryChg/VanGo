import React from 'react';
import Nav from './components/Nav.js';
import MapView from "./components/MapView";


const App = () => (
  <div>
    <Nav />
    <MapView
        width={'600px'}
        height={'500px'}
    />
  </div>
);

export default App;
