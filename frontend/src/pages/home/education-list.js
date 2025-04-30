import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import Header from "./header"
import { useState, useEffect } from 'react'

const EducationList = () => {
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)
  const [tagFilter, setTagFilter] = useState('')
  
  const articles = [
    {
      id: 1,
      title: "Cultural Pressure",
      excerpt: "Cultural Pressure",
      image: 'articles/cultural_pressure/image1.svg',
      overlayColor: "purple-overlay",
      date: "April 2, 2025",
      category: "Digital Safety",
      tags: ["culture", "pressure"]
    },
    {
      id: 2,
      title: "New people",
      excerpt: "New People",
      image: 'articles/meet_new_people/image1.svg',
      overlayColor: "dark-overlay",
      date: "March 28, 2025",
      category: "Relationships",
      tags: ["social", "friendship"]
    },
    {
      id: 3,
      title: "Racism",
      excerpt: "Racism",
      image: 'articles/racism/image1.svg',
      overlayColor: "red-overlay",
      date: "March 25, 2025",
      category: "Awareness",
      tags: ["racism"]
    },
    // {
    //   id: 4,
    //   title: "Self_Confidence",
    //   excerpt: "Self_Confidence",
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

  
  const displayedArticles = articles
    .filter(article => !showFavorites || favorites.includes(article.id))
    .filter(article => {
      if (!tagFilter) return true;
      const lowerCaseFilter = tagFilter.toLowerCase();
      return article.tags.some(tag => tag.toLowerCase().includes(lowerCaseFilter));
    });

  return (
    <>
      <Header />
      <section className="page-header py-5 mb-4 position-relative">
        <div className="container text-center">
          <h1 className="page-title">Educational Resources</h1>
          <p className="lead">Discover articles, guides, and resources to support learning and development</p>
          
          
          <div style={{ 
            position: 'absolute', 
            top: '20px', 
            right: '20px'
          }}>
            <button 
              className="btn btn-primary"
              onClick={() => setShowFavorites(!showFavorites)}
            >
              {showFavorites ? 'Show All Articles' : 'Show Favorites'}
              {showFavorites ? '' : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart ms-2" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>}
            </button>
          </div>
        </div>
      </section>

      <section className="filter-section py-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <div className="input-group mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search by tags..." 
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                />
                {tagFilter && (
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => setTagFilter('')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="articles-section py-5">
        <div className="container">
          {displayedArticles.length === 0 ? (
            <div className="row">
              <div className="col-12 text-center">
                <p className="lead">No articles found matching your criteria.</p>
              </div>
            </div>
          ) : (
            <div className="row">
              {displayedArticles.map(article => (
                <div className="col-md-6 col-lg-4 mb-4" key={article.id}>
                  <div className="story-card">
                    <div className="story-image" style={{ 
                      height: "200px", 
                      display: "flex", 
                      justifyContent: "center", 
                      alignItems: "center",
                      overflow: "hidden",
                      backgroundColor: "#f8f9fa"
                    }}>
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        style={{ 
                          maxHeight: "100%", 
                          maxWidth: "100%", 
                          objectFit: "contain" 
                        }} 
                      />
                    </div>
                    <div className={`story-content ${article.overlayColor}`}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h2 className="story-title">{article.title}</h2>
                      </div>
                      
                      {/* <div className="article-tags mb-3">
                        {article.tags.map((tag, index) => (
                          <span key={index} className="badge bg-light text-dark me-2">
                            {tag}
                          </span>
                        ))}
                      </div> */}
                      
                      <div>
                        <a href={`/education-detail?id=${article.id}`} className="story-button">
                          Read {article.author || "Full"} Story
                        </a>
                      </div>
                      <button 
                          className="btn btn-light btn-sm mt-4"
                          onClick={() => toggleFavorite(article.id)}
                        >
                          {!favorites.includes(article.id) ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                          </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                          </svg>}
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default EducationList