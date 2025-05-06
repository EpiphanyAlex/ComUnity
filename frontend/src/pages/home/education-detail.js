import { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import "./index.css"
import Header from "./header"

const paginateContent = (content, currentPage) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const elements = Array.from(doc.body.children);
  
  const pageBreakIndices = [];
  elements.forEach((element, index) => {
    if (element.tagName === 'H3') {
      pageBreakIndices.push(index);
    }
  });
  
  if (pageBreakIndices.length === 0) {
    const elementsPerPage = 3;
    const startIndex = (currentPage - 1) * elementsPerPage;
    const endIndex = startIndex + elementsPerPage;
    const pageElements = elements.slice(startIndex, Math.min(endIndex, elements.length));
    return pageElements.map(el => el.outerHTML).join('');
  }
  
  const pageCount = pageBreakIndices.length;
  
  if (currentPage > pageCount) {
    return elements.slice(pageBreakIndices[pageCount - 1]).map(el => el.outerHTML).join('');
  }
  
  if (currentPage === 1) {
    if (pageBreakIndices[0] === 0) {
      const endIndex = pageBreakIndices.length > 1 ? pageBreakIndices[1] : elements.length;
      return elements.slice(0, endIndex).map(el => el.outerHTML).join('');
    } else {
      return elements.slice(0, pageBreakIndices[0]).map(el => el.outerHTML).join('');
    }
  } 
  
  const startIndex = pageBreakIndices[currentPage - 1];
  const endIndex = currentPage < pageCount ? pageBreakIndices[currentPage] : elements.length;
  
  return elements.slice(startIndex, endIndex).map(el => el.outerHTML).join('');
}

const hasNextPage = (content, currentPage) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const elements = Array.from(doc.body.children);
  
  const pageBreakIndices = [];
  elements.forEach((element, index) => {
    if (element.tagName === 'H3') {
      pageBreakIndices.push(index);
    }
  });
  
  if (pageBreakIndices.length === 0) {
    const elementsPerPage = 3;
    return elements.length > currentPage * elementsPerPage;
  }
  
  const firstPageBeforeH3 = pageBreakIndices[0] > 0;
  const totalPages = firstPageBeforeH3 ? pageBreakIndices.length + 1 : pageBreakIndices.length;
  
  return currentPage < totalPages;
}

const ArticleDetail = () => {
  const [articleId, setArticleId] = useState(1)
  const [favorites, setFavorites] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
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

    4: {
      title: "Self-confidence",
      images: [
        'articles/self_confidence/image1.svg',
        'articles/self_confidence/image2.svg',
        'articles/self_confidence/image3.svg'
      ],
      date: "March 25, 2025",
      tags: ["racism"],
      content: `

        <h3>This can help if:</h3>

        <p>You feel unsure about yourself.</p>
        
        <p>You find it hard to speak up or try new things.</p>

        <p>You compare yourself to others and feel "not good enough"</p>

        <p>You want practical ways to build your confidence</p>

        <h3>What's the problem?</h3>
        
        <p>Self-confidence can drop for lots of reasons-like being judged, past failures, or constantly comparing yourself to others (especially on social media). You might doubt your abilities, avoid risks, or stay quiet in groups even when you have something to say. This can leave you feeling stuck, invisible, or not good enough.</p>
        
        <h3>How to overcome:</h3>
        
        <p>List your wins: Write down things yo've achieved or moments you're proud of.</p>
        
        <p>Know your strengths: Everyone's good at something-identify yours and focus on them.</p>
        
        <p>Set small goals: Achieve little things that build momentum and belief in yourself.</p>

        <p>Change your self-talk: Speak to yourself with kindness, like you would to a best friend.</p>

        <p>Do what you enjoy: Hobbies and passions help build skills and confidence.</p>

        <p>Stop comparing: Especially online-what you see is usually just the highlight reel.</p>

        <p>Talk to someone: A friend, mentor, or counsellor can help you see yourself clearly.</p>

        <h3>The result:</h3>

        <p>You'll feel more in control, more capable, and more proud of who you are. You'll be more likely to try new things, bounce back from mistakes, and feel confident in your own skin-even when things aren't perfect. Building confidence is a journey, but every step makes a difference.</p>
      `,
    },

    5: {
      title: "Talk to others",
      images: [
        'articles/racism/image1.svg',
        'articles/racism/image2.svg',
        'articles/racism/image3.svg'
      ],
      date: "March 25, 2025",
      tags: ["racism"],
      content: `

        <h3>This can help if:</h3>

        <p>You're feeling stressed, overwhelmed, or down</p>
        
        <p>You're going through a tough time and don't know what to do</p>

        <p>You feel alone or like no one understands</p>

        <p>You need to let something out but don't want to be judged</p>

        <h3>What's the problem?</h3>
        
        <p>When you're struggling, keeping things bottled up can make problems feel heavier and more overwhelming. You might feel isolated or like no one would understand. Trying to deal with everything alone can increase stress, anxiety, and sadness, and might stop you from finding a way forward.</p>
        
        <h3>How to overcome:</h3>
        
        <p>Talk to someone you trust: This could be a friend, family member, mentor, teacher, counsellor, or support worker.</p>
        
        <p>Let it out: Sometimes, you just need to vent without expecting advice or solutions.</p>
        
        <p>Pick someone outside the situation: They can offer a fresh point of view and might help you see things differently.</p>

        <p>Start small: If talking feels scary, you can write down your thoughts first, or talk through text/chat services.</p>

        <p>Use support services: Platforms like ReachOut, Headspace, or Lifeline offer anonymous, non-judgemental help.</p>


        <h3>The result:</h3>

        <p>You'll feel lighter, more understood, and less alone. Talking can help you make sense of what you're going through, reduce your stress, and break big problems into smaller, more manageable pieces. It can also lead to support, connection, and ideas you might not have thought of on your own. You don't have to go through it alone-talking is a strength, not a weakness.</p>
      `,
    },

    6: {
      title: "Online gaming against real life",
      images: [
        'articles/online_gaming_against_real_life/image1.svg',
        'articles/online_gaming_against_real_life/image2.svg',
        'articles/online_gaming_against_real_life/image3.svg'
      ],
      tags: ["Online_Gaming"],
      content: `

        <h3>This can help if:</h3>

        <p>You think gaming is taking over your life.</p>
        <p>You're feeling distant from family, friends, or school.</p>
        <p>You use games to escape real-life stress.</p>
        <p>You want to know the signs of gaming addiction.</p>


        <h3>Explanation of problem:</h3>
        
        <p>Gaming can be fun and social, but sometimes it goes too far. If it starts to affect your health, sleep, school, relationships, or emotions, it might be more than just a hobby. </p>
        <p>Some games are built to keep you playing, and it's easy to lose track of time and real-life priorities.</p>

      
        <h3>How to overcome:</h3>
        
        <p>Notice the signs-like playing even when it's not fun anymore, hiding how much you play, or feeling upset when you can't play</p>
        <p>Set limits on how long you play each day</p>
        <p>Make time for other activities-like hanging out with friends, sports, or creative hobbies</p>
        <p>Talk to someone if you're struggling to balance gaming and real life-family, a teacher, or a counsellor</p>
      `,
    },


  }

  
  const handleNextPage = () => {
    const article = articlesDatabase[articleId];
    if (hasNextPage(article.content, currentPage)) {
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
                      alt={`${article.title} - ${currentImageIndex + 1}`} 
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
                      __html: paginateContent(article.content, currentPage)
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
                      disabled={!hasNextPage(article.content, currentPage)}
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