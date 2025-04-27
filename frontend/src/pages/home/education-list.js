import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import Header from "./header"
import { useState, useEffect } from 'react'

const EducationList = () => {
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  
  const articles = [
    {
      id: 1,
      title: "Cultural Pressure",
      excerpt: "Cultural Pressure",
      image: "/edu.jpg",
      overlayColor: "purple-overlay",
      date: "April 2, 2025",
      category: "Digital Safety",
      tags: ["culture", "pressure"]
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
      tags: ["social", "friendship"]
    },
    {
      id: 3,
      title: "Racism",
      excerpt: "Racism",
      image: "/edu.jpg",
      overlayColor: "red-overlay",
      date: "March 25, 2025",
      category: "Awareness",
      tags: ["rascism"]
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

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (articleId) => {
    const newFavorites = favorites.includes(articleId)
      ? favorites.filter(id => id !== articleId)
      : [...favorites, articleId]
    
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  const displayedArticles = showFavorites 
    ? articles.filter(article => favorites.includes(article.id))
    : articles

  return (
    <>
      <Header />
      <section className="page-header py-5 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="page-title">Educational Resources</h1>
              <p className="lead">Discover articles, guides, and resources to support learning and development</p>
              <button 
                className="btn btn-primary mb-3"
                onClick={() => setShowFavorites(!showFavorites)}
              >
                {showFavorites ? 'Show All Articles' : 'Show Favorites'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="articles-section py-5">
        <div className="container">
          <div className="row">
            {displayedArticles.map(article => (
              <div className="col-md-6 col-lg-4 mb-4" key={article.id}>
                <div className="story-card">
                  <div className="story-image">
                    <img src={article.image} alt={article.title} />
                  </div>
                  <div className={`story-content ${article.overlayColor}`}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h2 className="story-title">{article.title}</h2>
                    </div>
                    
                    
                    <p className="story-excerpt">{article.excerpt}</p>
                    <div>
                      <a href={`/education-detail?id=${article.id}`} className="story-button">
                        Read {article.author || "Full"} Story
                      </a>
                    </div>
                    <button 
                        className="btn btn-light btn-sm mt-4"
                        onClick={() => toggleFavorite(article.id)}
                      >
                        {!favorites.includes(article.id) ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                        </svg>}
                      </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default EducationList