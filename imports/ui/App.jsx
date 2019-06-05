import React from 'react';
import Nav from './components/Nav.js';
import MapView from "./components/MapView";
import MapMarker from "./components/MapMarker";



const App = () => (
  <div>
    <Nav />
    <MapView
        width={'600px'}
        height={'500px'}
    >
        <MapMarker/>
    </MapView>
  </div>
);

export default App;
