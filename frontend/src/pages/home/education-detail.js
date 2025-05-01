import { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import "./index.css"
import Header from "./header"

const paginateContent = (content, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const elements = Array.from(doc.body.children);
  
  let currentLength = 0;
  let pageContent = [];
  
  for (let element of elements) {
    currentLength += element.textContent.length;
    if (currentLength >= startIndex && currentLength < endIndex) {
      pageContent.push(element.outerHTML);
    }
  }
  
  return pageContent.join('');
}

const hasNextPage = (content, currentPage, pageSize) => {
  const totalLength = content.length;
  return (currentPage * pageSize) < totalLength;
}

const ArticleDetail = () => {
  const [articleId, setArticleId] = useState(1)
  const [favorites, setFavorites] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 500 
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = Number.parseInt(queryParams.get("id") || "1")
    setArticleId(id)
    

    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(fid => fid !== id)
      : [...favorites, id]
    
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }


  const articlesDatabase = {
    1: {
      title: "Cultural Pressure",
      images: [
        'articles/cultural_pressure/image1.svg',
        'articles/cultural_pressure/image2.svg',
        'articles/cultural_pressure/image3.svg'
      ],
      date: "April 2, 2025",
      tags: ["culture", "pressure"],
      content: `
        <h3>This can help if:</h3>

        <p>1. You are a First Nations student feeling weighed down.</p>

        <p>2. You are expected to take on cultural roles at school.</p>

        <p>3. You are not sure how to balance culture with study and life.</p>
        
        <h3>Explanation of problem:</h3>
        
        <p>Cultural pressure (or cultural load/colonial load) is when First Nations students are expected to take on extra responsibilities like leading cultural activities, representing culture at school events, or educating others. These expectations can come from school, friends, community, or even family. While some of it can be empowering, it can also feel exhausting especially when it's on top of regular school stress.</p>
        
        
        <h3>How to overcome:</h3>
        
        <p>Yarn with someone you trust: Talk with a family member, Elder, Aboriginal Support Officer, or friend. They can give support, perspective, and advice.</p>
        
        <p>It is okay to say no (or yes): Set boundaries. You don't have to do everything. Say yes when it feels right, and no when you need to rest or focus elsewhere.</p>
        
        <p>Own your priorities: Your time and energy matter. If school or health is your current priority, explain that to family and community - most will understand and support you.</p>
        
        <p>Don't let tokenism define you: If you're being asked to participate just to tick a box, you're allowed to question it or step back. You are more than a symbol.</p>
      `,
    },
    2: {
      title: "New people",
      images: [
        'articles/meet_new_people/image1.svg',
        'articles/meet_new_people/image2.svg',
        'articles/meet_new_people/image3.svg'
      ],
      date: "March 28, 2025",
      tags: ["social", "friendship"],
      content: `

        <h3>This can help if:</h3>

        <p>You want to make new friends.</p>

        <p>You're feeling lonely or left out at school.</p>

        <p>You want to build long-lasting, meaningful connections.</p>
        
        <h3>Explanation of problem:</h3>
        
        <p>Making new friends can feel hard, especially if you're shy, new to school, or don't click with your current classmates. It's easy to feel isolated when you're not sure where or how to start forming friendships.</p>
              
        <h3>How to overcome:</h3>
        
        <p>Look for qualities of a good friend and be one yourself.</p>

        <p>Approach someone who's alone - they may be looking for a friend too.</p>

        <p>Ask questions to spark conversation and find shared interests.</p>

        <p>Join extracurricular activities or clubs to meet like-minded people.</p>
        
        <h3>Result:</h3>
        
        <p>You'll create more meaningful connections, feel more supported, and be part of a friendship circle that understands and uplifts you. Even if it takes time, you'll find people who truly appreciate you - at school or elsewhere.</p>
        
    
      `,
    },
    3: {
      title: "Racism",
      images: [
        'articles/racism/image1.svg',
        'articles/racism/image2.svg',
        'articles/racism/image3.svg'
      ],
      date: "March 25, 2025",
      tags: ["racism"],
      content: `

        <h3>This can help if:</h3>

        <p>You've experienced racism.</p>
        
        <p>You want to know how to respond safely.</p>

        <p>You're looking for support and ways to feel proud of your identity.</p>

        <h3>Explanation of problem:</h3>
        
        <p>Racism is when someone treats you unfairly or differently because of your background, culture, ethnicity, or skin colour. It can show up in obvious ways (like verbal abuse) or more subtle ones (like being left out or stereotyped). Sadly, it still exists in Australia today and is often connected to our history of colonisation and migration.</p>
        
        <h3>How to overcome:</h3>
        
        <p>Know it's not your fault: Your background is something to be proud of - racism reflects others' ignorance, not your worth.</p>
        
        <p>Walk away if you need to: Protect your safety first. Don't feel pressured to engage.</p>
        
        <p>Speak up only if you feel safe: You can challenge racism in the moment or later through a message. Use "I" statements like "I felt uncomfortable when..."</p>

        <p>Report it: If the racism is serious or ongoing, talk to a trusted adult and report it to the Australian Human Rights Commission or the police. Keep evidence if possible.</p>

        <p>Talk to someone you trust: Whether it's a family member, friend, teacher, or counsellor - sharing your experience helps.</p>
      `,
    },
  }

  
  const handleNextPage = () => {
    const article = articlesDatabase[articleId];
    if (hasNextPage(article.content, currentPage, pageSize)) {
      setCurrentPage(prev => prev + 1);
      
      setCurrentImageIndex(prev => (prev + 1) % article.images.length);
    }
  };

  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      
      setCurrentImageIndex(prev => (prev - 1 + articlesDatabase[articleId].images.length) % articlesDatabase[articleId].images.length);
    }
  };

  const article = articlesDatabase[articleId] || articlesDatabase[1];
  
  const currentImage = article.images[currentImageIndex];

  return (
    <>
      <Header />
      <section className="article-detail-section py-5 mt-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <a href="/education-list" className="btn btn-outline-primary">
                <i className="bi bi-arrow-left me-2"></i> Back to Articles
              </a>
              <button 
                className={`btn favorite-btn ${favorites.includes(articleId) ? 'favorite-active' : ''}`}
                onClick={() => toggleFavorite(articleId)}
              >
                {!favorites.includes(articleId) ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                </svg>}
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <article className="article-content">
                <h1 className="article-title mb-3">{article.title}</h1>
                
                <div className="article-meta mb-4">
                  <span className="article-date me-3">
                    <i className="bi bi-calendar me-1"></i> {article.date}
                  </span>
                  <span className="article-author me-3">
                    <i className="bi bi-person me-1"></i> {article.author}
                  </span>
                  <span className="article-category">
                    <i className="bi bi-tag me-1"></i> {article.category}
                  </span>
                </div>

                <div className="article-featured-image mb-4">
                  <div className="image-container" style={{
                    height: "300px", 
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    borderRadius: "8px",
                    backgroundColor: "#f8f9fa"
                  }}>
                    <img 
                      src={article.images[currentImageIndex]} 
                      alt={`${article.title} - Image ${currentImageIndex + 1}`} 
                      className="img-fluid" 
                      style={{
                        maxHeight: "250px", 
                        maxWidth: "100%",
                        objectFit: "contain"
                      }}
                    />
                  </div>
                  <div className="image-pagination-indicator mt-2 text-center">
                    {article.images.map((_, index) => (
                      <span 
                        key={index} 
                        className={`dot ${index === currentImageIndex ? 'active' : ''}`} 
                        style={{
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: index === currentImageIndex ? '#007bff' : '#ccc',
                          margin: '0 5px',
                          cursor: 'pointer'
                        }}
                        onClick={() => setCurrentImageIndex(index)}
                      ></span>
                    ))}
                  </div>
                </div>

                <div className="article-body-container position-relative">
                  <div className="article-body" 
                    dangerouslySetInnerHTML={{ 
                      __html: paginateContent(article.content, currentPage, pageSize)
                    }} 
                  />
                  
                  <div className="article-tags mb-4">
                    {article.tags && article.tags.map((tag, index) => (
                      <span key={index} className="badge bg-secondary me-2">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pagination-controls d-flex justify-content-between mt-4">
                    <button 
                      className="btn btn-outline-primary"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      <i className="bi bi-chevron-left"></i> Previous
                    </button>
                    
                    <span className="align-self-center">
                      Page {currentPage}
                    </span>

                    <button 
                      className="btn btn-outline-primary"
                      onClick={handleNextPage}
                      disabled={!hasNextPage(article.content, currentPage, pageSize)}
                    >
                      Next <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ArticleDetail