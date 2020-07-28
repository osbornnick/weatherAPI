import React from 'react';
import getWeather from './weatherService';

function App() {
  getWeather("Boston");
  return (
    <h1>Hello World</h1>
  )
}

export default App;
