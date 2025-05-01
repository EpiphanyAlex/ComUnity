import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


const ComUnityWebsite = () => {
  return (
    <>
{/* Section 1 */}
<div
  className="section d-flex align-items-center"
  style={{
    backgroundImage: "url(/p1.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "100px 0",
    minHeight: "100vh",
  }}
>
  <div className="container">
    <div className="row justify-content-start" style={{ marginBottom: "300px" }}>
      <div className="col-12 col-md-8">
        <h2
          className="section-title fp-animate"
          style={{
            color: "#024A72",
            fontSize: "2.5rem",
            fontWeight: 600,
            textAlign: "left",
            marginBottom: "10px",
            paddingTop: "10px",
            lineHeight: "1.4",
            maxWidth: "500px",
          }}
        >
          Free and fun education for all children
        </h2>
        <div
          className="btn-custom btn-blue fp-animate"
          style={{
            backgroundColor: "#456C82",
            color: "white",
            borderRadius: 30,
            width: "200px",
            height: "63px",
            lineHeight: "63px",
            textAlign: "center",
            cursor: "pointer",
            fontSize: "18px",
            marginTop: "80px",
            fontWeight: 500,
            transition: "all 0.3s ease",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
          onClick={() => {
            window.location.href = "/education-list";
          }}
        >
          Read More
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Section 2 */}
      <div className="section">
        <div className="container" style={{ height: "100%", paddingTop: 80 }}>
          <div className="row" style={{ height: "100%" }}>
            {/* left text */}
            <div
              className="col-lg-7 d-flex flex-column justify-content-center"
              style={{ height: "100%" }}
            >
              <h2
                className="section-title fp-animate"
                style={{
                  color: "#024A72",
                  fontSize: "clamp(24px, 5vw, 48px)",
                  fontWeight: 600,
                  textAlign: "left",
                  width: "100%",
                  lineHeight: "60px",
                }}
              >
                Welcome to <br /> ComUnity Platform
              </h2>
              <div className="mt-3">
                <div
                  className="fp-animate"
                  style={{
                    marginTop: 20,
                    textAlign: "left",
                    width: "100%",
                    flex: 1,
                    fontSize: "clamp(16px, 3vw, 32px)",
                    color: "#424040",
                    lineHeight: "45px",
                    fontWeight: 400,
                    fontFamily: "Inter",
                  }}
                >
                  Education also refers to knowledge received through <br /> schooling
                  instruction and to the institution of teaching <br /> as a whole.
                </div>
              </div>
            </div>

            {/* right picture */}
            <div className="col-lg-5" style={{ height: "100%" }}>
              <div
                className="fp-animate"
                style={{
                  height: "100%",
                  width: "100%", 
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/p2.png"
                  alt="Education image"
                  style={{
                    height: "auto",
                    maxWidth: "100%",
                    objectFit: "contain",
                    borderRadius: 16,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Section 3 */}

      <div
        className="section"
        style={{
          width: "100%",
          position: "relative",
          height: "860px",
          padding: 60,
        }}
      >
        <img
          src="/p3.png"
          alt="Education image"
          style={{
            height: "100%",
            height: 738,
            objectFit: "cover",
            borderRadius: 16,
            position: "absolute",
            right: 0,
          }}
        />
        <div
          style={{
            width: "100%",
            textAlign: "left",
            height: "100%",
            zIndex: 10,
          }}
        >
          <p
            style={{
              color: "#024A72",
              fontSize: 24,
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            Interactive
          </p>

          <h2
            className="section-title fp-animate"
            style={{
              color: "#024A72",
              fontSize: 38,
              fontWeight: 600,
              textAlign: "left",
              marginBottom: "30px",
            }}
          >
            Event Map
          </h2>
          <div className="col-lg-6" style={{ marginLeft: 100 }}>
            <div
              className="community-cards-container"
              style={{ justifyContent: "start", alignItems: "start" }}
            >
              <div className="community-card fp-animate" data-delay="0.2s">
                <div className="d-flex align-items-start">
                  <div className="card-icon me-3">
                    <img
                      src="/icon-2.png"
                      alt="Community Events Icon"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="community-card-content">
                    <h3>Community Events & Activities</h3>
                    <p className="mt-2">
                      Discover local events, workshops, and meetups happening in
                      your community.
                    </p>
                  </div>
                </div>
              </div>

              <div className="community-card fp-animate" data-delay="0.4s">
                <div className="d-flex align-items-start">
                  <div className="card-icon me-3">
                    <img
                      src="/icon-3.png"
                      alt="Creative & Cultural Spots Icon"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="community-card-content">
                    <h3>Creative & Cultural Spots</h3>
                    <p className="mt-2">
                      Explore theaters, art galleries, and cultural festivals in
                      your area.
                    </p>
                  </div>
                </div>
              </div>

              <div className="community-card fp-animate" data-delay="0.6s">
                <div className="d-flex align-items-start">
                  <div className="card-icon me-3">
                    <img
                      src="/icon-1.png"
                      alt="Outdoor Fun Icon"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="community-card-content">
                    <h3>Outdoor Fun</h3>
                    <p className="mt-2">
                      Find parks, playgrounds, zoos, and sports fields for
                      outdoor activities.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4" style={{ textAlign: "left" }}>
              <button
                className="btn-custom btn-red fp-animate"
                style={{
                  backgroundColor: "#E74C3C",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  padding: "12px 40px",
                  fontSize: "18px",
                  cursor: "pointer",
                  boxShadow: "0 4px 8px rgba(231,76,60,0.3)",
                  transition: "all 0.3s ease",
                }}
                onClick={() => (window.location.href = "/map")}
              >
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>

{/* Section 4 */}
<div
  className="section"
  style={{
    width: "100%",
    padding: "10px 10px",
    display: "flex",
    flexWrap: "wrap",               
    justifyContent: "center",     
    gap: "120px",                   
  }}
>
  {[1, 2, 3].map((num, index) => {
    const cardColors = ["blue", "yellow", "red"];
    const titles = [
      "Select your location",
      "Filter based on preference",
      "See the local events"
    ];
    return (
      <div
        key={num}
        className="fp-animate"
        style={{
          flex: "1 1 100px",              
          maxWidth: "400px",             
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className={`step-card-${cardColors[index]} step-card`} style={{ width: "100%" }}>
          <div className="step-number">{num}</div>
          <h3 className="step-title">{titles[index]}</h3>
          <hr />
          <p className="step-text">
            You can chose based on your geological location or by searching
          </p>
        </div>
      </div>
    );
  })}
</div>


      {/* Section 5 */}
      <div
        className="section"
        style={{
          width: "100%",
          height: "auto",
          padding: 60,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          backgroundColor: "#f2f2f2",
        }}
      >
        <div style={{ textAlign: "left", flex: 1,}}>
          <div style={{ width: 419, textAlign: "left", marginLeft: "160px" }}>
            <h2 className="section-title fp-animate">Talk to Your Buddy!</h2>
            <p>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries.
            </p>
            <div className="text-left mt-3 fp-animate">
              <a
                href="/chat"
                className="btn btn-success"
                style={{ width: 200 }}
              >
                Click
              </a>
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <img
            src="/p5.png"
            alt="Education image"
            style={{
              height: "100%",
              height: 550,
              objectFit: "cover",
              borderRadius: 16,
            }}
          />
        </div>
      </div>

      {/* Section 6 */}
      <div
        className="section"
        style={{
          width: "100%",
          height: "auto",
          padding: 60,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ flex: 1 }}>
          <img
            src="/p6.png"
            alt="Education image"
            style={{
              height: "100%",
              height: 550,
              objectFit: "cover",
              borderRadius: 16,
            }}
          />
        </div>

        <div style={{ textAlign: "left", flex: 1 }}>
          <div style={{ width: 419, textAlign: "left" }}>
            <h2 className="section-title fp-animate">Private Space!</h2>
            <p>
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries.
            </p>
            <div className="text-left mt-3 fp-animate">
              <a
                href="/quiz"
                className="btn btn-primary"
                style={{ width: 200 }}
              >
                Click
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComUnityWebsite;
