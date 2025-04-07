import { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import Header from "./header"
import Footer from './footer'

const ArticleDetail = () => {
  const [articleId, setArticleId] = useState(1)

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = Number.parseInt(queryParams.get("id") || "1")
    setArticleId(id)
  }, [])

  const articlesDatabase = {
    1: {
      title: "Cultural Pressure",
      image: "https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_1280.jpg",
      date: "April 2, 2025",
      author: "xxx",
      category: "Early Learning",
      content: `
        <h3>This can help if:</h3>

        <p>1. You are a First Nations student feeling weighed down.</p>

        <p>2. You are expected to take on cultural roles at school.</p>

        <p>3. You are not sure how to balance culture with study and life.</p>
        
        <h3>Explanation of problem:</h3>
        
        <p>Cultural pressure (or cultural load/colonial load) is when First Nations students are expected to take on extra responsibilities — like leading cultural activities, representing culture at school events, or educating others. These expectations can come from school, friends, community, or even family. While some of it can be empowering, it can also feel exhausting — especially when it’s on top of regular school stress.</p>
        
        
        <h3>How to overcome:</h3>
        
        <p>Yarn with someone you trust: Talk with a family member, Elder, Aboriginal Support Officer, or friend. They can give support, perspective, and advice.</p>
        
        <p>It is okay to say no (or yes): Set boundaries. You don't have to do everything. Say yes when it feels right, and no when you need to rest or focus elsewhere.</p>
        
        <p>Own your priorities: Your time and energy matter. If school or health is your current priority, explain that to family and community - most will understand and support you.</p>
        
        <p>Don't let tokenism define you: If you're being asked to participate just to tick a box, you're allowed to question it or step back. You are more than a symbol.</p>
      `,
    },
    2: {
      title: "New people",
      image: "https://cdn.pixabay.com/photo/2018/03/03/20/02/laptop-3196481_1280.jpg",
      date: "March 28, 2025",
      author: "xxx",
      category: "Teaching Methods",
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
      image: "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_1280.jpg",
      date: "March 25, 2025",
      author: "xxx",
      category: "Alternative Education",
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
    // 4: {
    //   title: "Digital Literacy: Preparing Students for the Future",
    //   image: "https://cdn.pixabay.com/photo/2016/11/29/09/32/concept-1868728_1280.jpg",
    //   date: "March 20, 2025",
    //   author: "Dr. Robert Garcia",
    //   category: "Technology",
    //   content: `
    //     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
        
    //     <h3>The Digital Skills Gap</h3>
        
    //     <p>Maecenas faucibus mollis interdum. Sed posuere consectetur est at lobortis. Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
        
    //     <p>Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
        
    //     <h3>Essential Digital Skills for Today's Students</h3>
        
    //     <p>Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Curabitur blandit tempus porttitor. Aenean lacinia bibendum nulla sed consectetur.</p>
        
    //     <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
        
    //     <h3>Integrating Technology Meaningfully</h3>
        
    //     <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
        
    //     <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor.</p>
    //   `,
    // },
    // 5: {
    //   title: "Inclusive Education: Strategies for Diverse Classrooms",
    //   image: "https://cdn.pixabay.com/photo/2018/07/25/08/58/business-3560916_1280.jpg",
    //   date: "March 15, 2025",
    //   author: "Dr. Amara Patel",
    //   category: "Inclusive Learning",
    //   content: `
    //     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
        
    //     <h3>Understanding Inclusive Education</h3>
        
    //     <p>Maecenas faucibus mollis interdum. Sed posuere consectetur est at lobortis. Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
        
    //     <p>Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
        
    //     <h3>Creating an Inclusive Classroom Environment</h3>
        
    //     <p>Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Curabitur blandit tempus porttitor. Aenean lacinia bibendum nulla sed consectetur.</p>
        
    //     <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
        
    //     <h3>Collaboration and Support Systems</h3>
        
    //     <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
        
    //     <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor.</p>
    //   `,
    // },
    // 6: {
    //   title: "The Role of Play in Learning",
    //   image: "https://cdn.pixabay.com/photo/2016/04/26/12/25/children-1354565_1280.jpg",
    //   date: "March 10, 2025",
    //   author: "Dr. James Wilson",
    //   category: "Child Development",
    //   content: `
    //     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
        
    //     <h3>The Science Behind Play-Based Learning</h3>
        
    //     <p>Maecenas faucibus mollis interdum. Sed posuere consectetur est at lobortis. Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
        
    //     <p>Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
        
    //     <h3>Types of Play and Their Benefits</h3>
        
    //     <p>Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Curabitur blandit tempus porttitor. Aenean lacinia bibendum nulla sed consectetur.</p>
        
    //     <p>Nullam quis risus eget urna mollis ornare vel eu leo. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
        
    //     <h3>Integrating Play in Educational Settings</h3>
        
    //     <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
        
    //     <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor.</p>
    //   `,
    // },
  }

  console.log('render')
  const article = articlesDatabase[articleId] || articlesDatabase[1]

  return (
    <>
      <Header />
      <section className="article-detail-section py-5 mt-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <a href="/education-list" className="btn btn-outline-primary mb-4">
                <i className="bi bi-arrow-left me-2"></i> Back to Articles
              </a>
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
                  <img src={article.image || "/placeholder.svg"} alt={article.title} className="img-fluid rounded" />
                </div>

                <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }}></div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}


export default ArticleDetail