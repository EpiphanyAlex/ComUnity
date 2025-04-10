import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="main-navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="index.html">ComUnity</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/map">Events</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/chat">E-Buddy</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/education-list">Education</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Quiz</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default Header