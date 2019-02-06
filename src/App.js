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
          myBooks:books,
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

  handleUpdateBook = (updatedbook) => {
    // console.log(`handleUpdateBook: updatedbook ID ${updatedbook.id} and name ${updatedbook.title}`);
    let index = this.state.books.findIndex(book => book.id === updatedbook.id)
    let newBooks = this.state.books
    newBooks.splice(index, 1, updatedbook)
    // console.log('handleUpdateBook newBooks = ',newBooks);
    
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

  // removeContact = (contact) => {
  //   this.setState((currentState) => ({
  //     contacts: currentState.contacts.filter((c) => {
  //       return c.id !== contact.id
  //     })
  //   }))

  //   ContactsAPI.remove(contact);
  // }

  handleReturnFromSearch = () => {
    this.setState({ showSearchPage: false })
  }

  render() {
    //Destructure state
    const { myBooks, booksCurrentlyReading, booksWantToRead, booksRead } = this.state
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search 
            handleUpdateBook={this.handleUpdateBook}
            myBooks={myBooks} 
            handleReturn={this.handleReturnFromSearch}
          />
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
                  handleUpdateBook={this.handleUpdateBook}
                />
                <Bookshelf 
                  shelfName='Want to read' 
                  shelfID={ShelfWantToRead} 
                  shelfBooks={booksWantToRead} 
                  handleUpdateBook={this.handleUpdateBook}
                />
                <Bookshelf 
                  shelfName='Read' 
                  shelfID={ShelfRead} 
                  shelfBooks={booksRead} 
                  handleUpdateBook={this.handleUpdateBook}
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
