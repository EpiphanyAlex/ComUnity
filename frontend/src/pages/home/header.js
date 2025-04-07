import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="main-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">ComUnity</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/map">Map</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/education-list">Education</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/chat">Chat</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Game</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default Header