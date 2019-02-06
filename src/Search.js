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
        // this.setState(() => ({
        //     query: searchquery.trim()
        // }))
        BooksAPI.search(trimmedsearch)
            .then((booksvis) => {
                   (booksvis) && this.updateStateBooks(booksvis)
                }
            )
    }

    render() {
        //Destructure props & state
        const { myBooks, handleReturn, handleUpdateBook }  = this.props
        const { booksvisible } = this.state
        // const { query, booksvisible } = this.state
        
        // Create booksvisible, the filtered list of books to power the rendered view
        // based on the state, which is based on input field.
        // const booksvisible = query === ''
        // ? books 
        // : books.filter((book) => (
        //     book.title.toLowerCase().includes(query.toLowerCase())
        // ))
        
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
                    <Book key={book.id} book={book} handleUpdateBook={handleUpdateBook}/>
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