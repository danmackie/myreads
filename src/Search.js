import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
//import { Link } from 'react-router-dom';
//import { Button } from 'react-router-dom';

class Search extends Component {
    state = {
        // query: '',
        booksvisible:[],
    }

    resetState = () => {
        this.setState(() => ({
            // query: '',
            booksvisible:[],
        }))
    }

    updateStateBooks = (booklist) => {
        if (!booklist) return;
        if (booklist.error) {
            this.setState(() => ({
                booksvisible:[]
            }))
            return;
        }
        if (booklist.length > 0) {
            this.setState(() => ({
                booksvisible:booklist
            }))
            return;
        }
    }

    updateQuery = (searchquery) => {
        // console.log('searchquery.trim(): ',searchquery.trim())
        let trimmedsearch = searchquery.trim()
        if (trimmedsearch === '') {
            this.resetState()
            return;
        }
        BooksAPI.search(trimmedsearch)
            .then((booksvis) => {
                   (booksvis) && this.updateStateBooks(booksvis)
                }
            )
    }

    getShelfName = (book) => {
        //Check book is in myBooks list and identify the shelf name - for the menu context
        let shelfBooks = this.props.myBooks;
        var theShelf = '';
        for (let b = 0; b < shelfBooks.length; b++) {
            let thebook = shelfBooks[b];
            if (thebook.id === book.id){
                theShelf = thebook.shelf
                break;
            }else{
                theShelf = 'none';
            }
        }
        return theShelf;
    }

    render() {
        //Destructure props & state
        const { handleReturn, handleUpdateBook }  = this.props
        const { booksvisible } = this.state
        
        return(
            <div className="search-books">
                <div className="search-books-bar">
                <button 
                    className="close-search" 
                    onClick={handleReturn}
                >Close</button>
              <div className="search-books-input-wrapper">
                <form>
                    <input 
                        placeholder="Search by title or author" 
                        type='text' 
                        name='search-input'
                        //value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </form>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {booksvisible.map(book => (
                    <Book shelf={this.getShelfName(book)} key={book.id} book={book} handleUpdateBook={handleUpdateBook}/>
                ))}
              </ol>
            </div>
          </div>
        )
    }
}

//Add proptypes setup for type/required checks
Search.propTypes = {
    myBooks: PropTypes.array.isRequired,
    handleReturn: PropTypes.func.isRequired,
    handleUpdateBook: PropTypes.func.isRequired,
}

export default Search