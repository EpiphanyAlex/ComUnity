import logo from './logo.svg';
import './App.css';

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/home'
import MapPage from './pages/map/MapPage';
import EducationList from './pages/home/education-list';
import ArticleDetail from './pages/home/education-detail';
import ChatPage from './pages/chat/ChatPage';
import Header from './pages/home/header';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Container className="mt-4" style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={
            <Home />
          } />
          <Route path="/education-list" element={
            <EducationList />
          } />
          <Route path="/education-detail" element={
            <ArticleDetail />
          } />
          <Route path="/map" element={<MapPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
