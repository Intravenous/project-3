import React from 'react'
import axios from 'axios'
import auth from '../lib/auth'
import lodash from 'lodash'
import { Link } from 'react-router-dom'

import SlickCarousel from './SlickCarousel'

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      user: null,
      defaultCategories: ['hardcover-fiction', 'hardcover-nonfiction', 'young-adult-hardcover'],
      books: [],
      hotBooks: []
    }
  }

  componentDidMount() {
    if (auth.isLoggedIn()) {
      // axios
      //   .post('/api/profile', {}, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      //   .then(res => {
      //     this.setState({ user: res.data })
      //     console.log(res.data)
      // }) 
      axios.get('/api/mylibrary', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
        .then(res => this.setState({ books: res.data.user.books, user: res.data.user }))
        .catch(err => this.setState({ error: err.response.data.message }))


      axios.get('/api/books/get')
        .then(res => {

          const books = res.data
          let hotBooks = books.filter(book => {
            return book.comments.length > 0
          })
          hotBooks = _.shuffle(hotBooks)
          this.setState({ hotBooks })

        })
        .catch(err => this.setState({ error: err.response.data.message }))

    }
  }
  showWishListFromClick() {

  }

  render() {
    const categories = this.state.defaultCategories
    console.log(this.state)



    if (!auth.isLoggedIn()) {
      return <>
        <main>
          <section className="heroBannerHome hero is-primary is-medium">

            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title">
                  Booked-up!
      </h1>
                <h2 className="subtitle">
                  The only place for Book lovers
      </h2>
              </div>
            </div>


            <div className="hero-foot">
              <nav className="tabs is-fullwidth">
                <div className="container">
                  <ul>

                    <li><Link to={'/books/new'}><a>Find a Book</a></Link></li>
                    <li><Link to={'/register'}><a>Join the Converstaion</a></Link></li>
                  </ul>
                </div>
              </nav>
            </div>
          </section>

         
          <div className="columns is-multiline is-mobile">
            <div className='bookColumn column is-2-desktop is-one-third-tablet is-half-mobile'>
              <h2 className='bookColumnLabel'>Current Fiction Best Sellers</h2>
            </div>

            <SlickCarousel categories={categories[0]} />

            <div className='bookColumn column is-2-desktop is-one-third-tablet is-half-mobile'>
              <h2 className='bookColumnLabel'>Current Non Fiction Best Sellers</h2>
            </div>

            <SlickCarousel categories={categories[1]} />

            <div className='bookColumn column is-2-desktop is-one-third-tablet is-half-mobile'>
              <h2 className='bookColumnLabel'>Current Young Adult Best Sellers</h2>
            </div>

            <SlickCarousel categories={categories[2]} />

          </div>

        </main>
        <footer id="NonUserHomeMainfooter">
          <div>
            <p>CopyRight By Maxwell Jam, Peter Pan, Gordon Ramsay</p>
          </div>
        </footer>
      </>

    } else {
      console.log('hey')
      if (!this.state.user || !this.state.hotBooks) return <h1>Waiting</h1>
      console.log(this.state.user)
      return <>
        <main className="user-home-main">
          <div className="UserMainHomeContainer">
            <section className="LatestBooksContainer">
              <div className="LatestBookCards">
                <h2 className="LatestBookCardsTitle">Latest Book Added to My Library</h2>
                <div className="LatestBookCard">
                  <div className="LatestBookCardImageContainer">
                    <figure>
                      {this.state.books.length > 0 && <Link to='/mylibrary'><img src={this.state.books[0].thumbnail} alt="" className="LatestBookCardContent"></img></Link>}
                    </figure>
                  </div>
                  <div className="SearchTitleandAuthorInfo">
                    {/* <h4 className="SearchTheTitle">{this.state.books[0].title}</h4>
                    <h5 className="SearchAuthor"><strong>{this.state.books[0].author}</strong></h5> */}
                  </div>
                </div>
              </div>
              <div className="LatestBookCards">
                <h2 className="LatestBookCardsTitle">Latest Book Added to Books Read</h2>
                <div className="LatestBookCard">
                  <div className="LatestBookCardImageContainer">
                    <figure>
                      {this.state.user.booksRead.length > 0 && <Link to='/mylibrary'><img src={this.state.user.booksRead[0].thumbnail} alt="" className="LatestBookCardContent"></img></Link>}
                    </figure>
                  </div>
                </div>
              </div>
            </section>
            <section className="LatestBooksContainer">
              <div className="LatestBookCards">
                <h2 className="LatestBookCardsTitle">Latest Book Added to Wish List</h2>
                <div className="LatestBookCard">
                  <div className="LatestBookCardImageContainer">
                    <figure>
                      {this.state.user.booksWishList.length > 0 && <Link to='/mylibrary'><img src={this.state.user.booksWishList[0].thumbnail} alt="" className="LatestBookCardContent"></img></Link>}
                    </figure>
                  </div>
                </div>
              </div>
              <div className="LatestBookCards" >
                <h2 className="LatestBookCardsTitle">Latest Book Added to Books Rated</h2>
                <div className="LatestBookCard">
                  <div className="LatestBookCardImageContainer" id="LatestBookCardsRated">
                    <figure>
                      <img src="https://www.gijoeelite.com/assets/images/no%20image.jpg" alt="" className="LatestBookCardContent" id="RatedBooksImg"></img>
                    </figure>
                  </div>
                </div>
              </div>
            </section>
            <div className="UserCarouselandBookCommentsContainer">
              <section className="mainHomeCarousel">
                <div className="mainHomeCarouselContainer">
                  <div className="CarouselTitle2">
                    <h2 className="CarouselTitleContent">Selected for {this.state.user.username} from Favourite Categories...</h2>
                  </div>
                  <div className="CarouselSubContainer">
                    <div className="UserCarouselAllImages">
                      <SlickCarousel categories={this.state.user.categories} />
                    </div>
                  </div>
                </div>
              </section>
              <div className="UserHomeBookCommentsContainer">
                <div className="HomeCommentsTitle">
                  <h2 id="HomeCommentsTitleContent">The Hottest Books being talked about right now...</h2>
                </div>
                {this.state.hotBooks.length > 2 && <div className="HomeCommentsImages">
                  <Link to={`/book/${this.state.hotBooks[0].webId}`} book={this.state.hotBooks[0]}><img src={this.state.hotBooks[0].thumbnail} alt=""></img></Link>
                  <Link to={`/book/${this.state.hotBooks[1].webId}`} book={this.state.hotBooks[1]}><img src={this.state.hotBooks[1].thumbnail} alt=""></img></Link>
                  <Link to={`/book/${this.state.hotBooks[2].webId}`} book={this.state.hotBooks[2]}><img src={this.state.hotBooks[2].thumbnail} alt=""></img></Link>

                </div>}
                <div className="HomeCommentsTitle">
                  <h2 id="HomeCommentsTitleContent">...Join the converstation now!</h2>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer id="UserHomeMainfooter">
          <div>
            <p>CopyRight By Maxwell Jam, Peter Pan, Gordon Ramsay</p>
          </div>
        </footer>
      </>

    }

  }

}