import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import Header from "./header"
import Footer from "./footer"

const EducationList = () => {
  
  const articles = [
    {
      id: 1,
      title: "Cultural Pressure",
      excerpt: "Cultural Pressure",
      image: "/edu.jpg",
      overlayColor: "purple-overlay",
      date: "April 2, 2025",
      category: "Digital Safety",
    },
    {
      id: 2,
      title: "New people",
      excerpt:
        "New People",
      image: "/edu.jpg",
      overlayColor: "dark-overlay",
      date: "March 28, 2025",
      category: "Relationships",
    },
    {
      id: 3,
      title: "Racism",
      excerpt: "Racism",
      image: "/edu.jpg",
      overlayColor: "red-overlay",
      date: "March 25, 2025",
      category: "Awareness",
    },
    // {
    //   id: 4,
    //   title: "Self_Confidence",
    //   excerpt:
    //     "Self_Confidence",
    //   image: "/edu.jpg",
    //   overlayColor: "blue-overlay",
    //   date: "March 20, 2025",
    //   category: "Technology",
    // },
    // {
    //   id: 5,
    //   title: "Talking to others",
    //   excerpt: "Talking to others",
    //   image: "/edu.jpg",
    //   overlayColor: "green-overlay",
    //   date: "March 15, 2025",
    //   category: "Inclusive Learning",
    // },
  ]

  return (
    <>
      <Header />

      <section className="page-header py-5 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="page-title">Educational Resources</h1>
              <p className="lead">Discover articles, guides, and resources to support learning and development</p>
            </div>
          </div>
        </div>
      </section>


    <section className="articles-section py-5">
        <div className="container">
          <div className="row">
            {articles.map(article => (
              <div className="col-md-6 col-lg-4 mb-4" key={article.id}>
                <div className="story-card">
                  <div className="story-image">
                    <img src={article.image} alt={article.title} />
                  </div>
                  <div className={`story-content ${article.overlayColor}`}>
                    <h2 className="story-title">{article.title}</h2>
                    <p className="story-excerpt">{article.excerpt}</p>
                    <div>
                    <a href={`/education-detail?id=${article.id}`} className="story-button">
                      Read {article.author || "Full"} Story
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default EducationList