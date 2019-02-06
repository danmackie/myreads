import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import Bookshelf from './Bookshelf';
//import { Route } from 'react-router-dom';

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
          books:books,
          booksCurrentlyReading:books.filter( book => book.shelf === ShelfCurrentlyReading ),
          booksWantToRead:books.filter( book => book.shelf === ShelfWantToRead ),
          booksRead:books.filter( book => book.shelf === ShelfRead ),
        }))
        // console.log('All books on shelves: ',this.state.books)
        // console.log('booksCurrentlyReading = ',this.state.booksCurrentlyReading)
        // console.log('booksWantToRead = ',this.state.booksWantToRead)
        // console.log('booksRead = ',booksRead)
      })
  }

  handleOnReturnFromSearch = () => {
    this.setState({ showSearchPage: false })
  }

  render() {
    //Destructure state
    const { myBooks, booksCurrentlyReading, booksWantToRead, booksRead } = this.state
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search myBooks={myBooks} onReturn={this.handleOnReturnFromSearch}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf 
                  shelfName='Currently Reading' 
                  shelfID={ShelfCurrentlyReading} 
                  shelfBooks={booksCurrentlyReading} 
                />
                <Bookshelf 
                  shelfName='Want to read' 
                  shelfID={ShelfWantToRead} 
                  shelfBooks={booksWantToRead} 
                />
                <Bookshelf 
                  shelfName='Read' 
                  shelfID={ShelfRead} 
                  shelfBooks={booksRead} 
                />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
