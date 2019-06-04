import React from 'react';
import { BrowserRouter, Route } from "react-router-dom"
import './App.css';
import Login from "./components/javascript/login"
import Chat from "./components/javascript/chat"

function App() {
 
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/chat" component={Chat} />
      </div>
    </BrowserRouter>
  );
}

export default App;
