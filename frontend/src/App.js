import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import Navbar from './Navbar';
import Landing from './Landing';
function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/form" caseSensitive={false} element={<Home />}          />
          <Route exact path="/" caseSensitive={false} element={<Landing />} />
        </Routes>
      </Router>


    </>

  );
}

export default App;
