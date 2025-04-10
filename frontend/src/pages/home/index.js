import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"


const ComUnityWebsite = () => {
  return (
    <>

      <section className="hero-section"
        style={{ 
          backgroundImage: "url(/hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          left: 0,
          right: 0
        }}
      >
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-md-24">
              <div className="hero-content">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 d-flex align-items-center">
                      <div className="hero-text">
                        <h1>
                          Free and fun education
                          <br />
                          for all children
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

      <section className="explore-events py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="circular-image">
                <img src="/exp_events.png" alt="Group of students" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-7">
              <h2 className="section-title">Find your vibe, not just events!!</h2>
              <p className="section-text" style={{
                textAlign: 'left'
              }}>
                Use our interactive map to explore teen-friendly hangouts and activities around you and connect with your community.
              </p>
              <div className="text-center mt-3">
               <a href="/map" className="btn btn-explore" style={{ width: 200 }}>
                 Explore
               </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">How Does it Work?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="step-card step-card-blue">
                <div className="step-number">1</div>
                <h3 className="step-title">Select your location</h3>
                <hr />
                <p className="step-text">You can chose based on your geological location or by searching</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="step-card step-card-yellow">
                <div className="step-number">2</div>
                <h3 className="step-title">Filter based on preference</h3>
                <hr />
                <p className="step-text">You can chose based on your geological location or by searching</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="step-card step-card-red">
                <div className="step-number">3</div>
                <h3 className="step-title">See the local events</h3>
                <hr />
                <p className="step-text">You can chose based on your geological location or by searching</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="talk-buddy py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h2 className="section-title">Talk to Your Buddy!</h2>
              <p className="section-text" style={{
                textAlign: 'left'
              }}>
              Chat or speak with your personal Al companion anytime you need to vent or unwind. It listens, understands, and suggests feel-good activities to help you recharge.
              </p>
              <div className="text-center mt-3">
               <a href="/chat" className="btn btn-success" style={{ width: 200 }}>
                Click
               </a>
              </div>

            </div>
            <div className="col-lg-5">
              <div className="circular-image green-bg">
                <img src="/buddy.png" alt="Person with tablet" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="quiz-section py-5"
        style={{ 
          backgroundImage: "url(/quiz-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        <div className="container">
          <div className="quiz-container">
            <h2 className="quiz-title">Quiz</h2>
            <p className="quiz-question">Which Chinese invention greatly improved navigation and exploration?</p>
            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <button className="btn btn-quiz w-100">Printing press</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-quiz w-100">Steam engine</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-quiz w-100">Compass</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-quiz w-100">Telescope</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="private-space py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="circular-image blue-bg">
                <img src="/private.png" alt="Person looking in mirror" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-7">
              <h2 className="section-title">Private Space!</h2>
              <p className="section-text">
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book. It has survived not only five
                centuries.
              </p>
              <a href="#" className="btn btn-primary">
                Click
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}


export default ComUnityWebsite