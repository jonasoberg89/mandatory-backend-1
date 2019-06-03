import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"
import './App.css';
import Login from "./components/javascript/login"


function App() {
 
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Login} />
      </div>
    </BrowserRouter>
  );
}

export default App;
