import React from 'react';
import Hello from './Hello.jsx';
import Info from './Info.jsx';
import MapView from './components/MapView';

const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello />
    <Info />
    <MapView />
  </div>
);

export default App;
