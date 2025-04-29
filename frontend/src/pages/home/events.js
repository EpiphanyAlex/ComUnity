import React from 'react'
import Header from './header'
import './index.css'


const Events = () => {
  return (
    <div>
      <section className="hero-section"
        style={{ 
          backgroundImage: "url(/hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-md-12">
              <div className="hero-content">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 d-flex align-items-center">
                      <div className="hero-text">
                        <h1>
                          Free and fun education
                          <br />
                          for all teenagers
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* todo: map section ? */}
      <section style={{
        height: '500px',
        width: '100%',
        border: '1px solid black',
        display: 'flex'
      }}>
        <div style={{
          backgroundColor: '#aaa',
          height: '500px',
          width: '100%'
        }}>

        </div>
        <div
           style={{
            backgroundColor: '#bbb',
            height: '500px',
            width: '100%'
          }}
        >

        </div>
      </section>
    </div>
  )
}

export default Events