import logo from "./logo.svg";
import "./App.css";

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import EducationList from "./pages/home/education-list";
import ArticleDetail from "./pages/home/education-detail";
import Events from "./pages/home/events";
import Header from "./pages/home/header";
import Footer from "./pages/home/footer";
import MapPage from "./pages/map/MapPage";
import Chat from "./pages/chat/ChatPage";
// import QuizGame from "./pages/game";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <div>
      <Navigation />
    </div> */}
      {/* <Container className=""> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/education-list" element={<EducationList />} />
        <Route path="/education-detail" element={<ArticleDetail />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/events" element={<Events />} />
        <Route path="/map" element={<MapPage />} />
        {/* <Route path="/quiz" element={<QuizGame />} /> */}
      </Routes>
      {/* </Container> */}
      <Footer />
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
