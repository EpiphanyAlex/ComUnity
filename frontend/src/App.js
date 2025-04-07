import logo from './logo.svg';
import './App.css';

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/home'
import MapPage from './pages/map/MapPage';
import EducationList from './pages/home/education-list';
import ArticleDetail from './pages/home/education-detail';

function App() {
  return (
    
    <div className="App">
          <div>
      {/* <Navigation /> */}
      {/* Add your routes or components here */}
    </div>
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
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<h2>Welcome to Home Page</h2>} />
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
        </Routes>
      </Container>
    </div>
  );
}


// function Navigation() {
//   return (
//     <Navbar bg="light" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/">Kids Connect</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/">Home</Nav.Link>
//             <Nav.Link as={Link} to="/map">Map</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

export default App;
