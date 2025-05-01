import React from 'react'
import './index.css'


const Footer = () => {
  return (
    <footer className="footer py-4 px-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-start">
              <h5>Navigation</h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <button className="nav-link ps-0">
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link ps-0">
                    Blog
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link ps-0">
                    About Us
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-md-6 text-md-end">
              <h5>Social Media</h5>
              <ul className="list-inline">
                <li className="list-inline-item">
                  <button className="social-link">
                  <i className="bi bi-instagram"></i>
                  </button>
                </li>
                <li className="list-inline-item">
                  <button className="social-link">
                    <i className="bi bi-twitter"></i>
                  </button>
                </li>
                <li className="list-inline-item">
                  <button className="social-link">
                    <i className="bi bi-youtube"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 text-center">
              <p className="copyright">ComUnity Copyright © 2025 - All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer