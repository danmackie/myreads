import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import Bookshelf from './Bookshelf';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

const ShelfCurrentlyReading = 'currentlyReading';
const ShelfWantToRead = 'wantToRead';
const ShelfRead = 'read';

class BooksApp extends Component {
  
  state = {
    myBooks : [],
    booksCurrentlyReading : [],
    booksWantToRead : [],
    booksRead : [],
    showSearchPage: false,
  }
  
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          myBooks:books,
          booksCurrentlyReading:books.filter( book => book.shelf === ShelfCurrentlyReading ),
          booksWantToRead:books.filter( book => book.shelf === ShelfWantToRead ),
          booksRead:books.filter( book => book.shelf === ShelfRead ),
        }))
      })
  }

  handleUpdateBook = (updatedbook) => {
    let index = this.state.myBooks.findIndex(book => book.id === updatedbook.id)
    let newBooks = this.state.myBooks
    newBooks.splice(index, 1, updatedbook)
    
    let newBooksCurrentlyReading = newBooks.filter( book => book.shelf === ShelfCurrentlyReading )
    let newbooksWantToRead = newBooks.filter( book => book.shelf === ShelfWantToRead )
    let newbooksRead = newBooks.filter( book => book.shelf === ShelfRead )
    this.setState(
      {
        myBooks:newBooks,
        booksCurrentlyReading:newBooksCurrentlyReading,
        booksWantToRead:newbooksWantToRead,
        booksRead:newbooksRead,
      }
    )
    BooksAPI.update(updatedbook, updatedbook.shelf);
  }

  handleReturnFromSearch = () => {
    this.setState({ showSearchPage: false })
  }

  render() {
    const { myBooks, booksCurrentlyReading, booksWantToRead, booksRead } = this.state
    
    return (
      <div className="app">
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf 
                    shelfName='Currently Reading' 
                    shelfBooks={booksCurrentlyReading}
                    handleUpdateBook={this.handleUpdateBook}
                  />
                  <Bookshelf 
                    shelfName='Want to read' 
                    shelfBooks={booksWantToRead} 
                    handleUpdateBook={this.handleUpdateBook}
                  />
                  <Bookshelf 
                    shelfName='Read' 
                    shelfBooks={booksRead} 
                    handleUpdateBook={this.handleUpdateBook}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to='/search' >
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )} />
          <Route path='/search' render={({history}) => (
            <Search 
              handleUpdateBook={this.handleUpdateBook}
              myBooks={myBooks}
              handleReturn={() => {
                this.handleReturnFromSearch()
                history.push('/')
              }}
            />
          )} />
      </div>
    )
  }
}

export default BooksApp
