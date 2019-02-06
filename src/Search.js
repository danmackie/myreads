import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
//import { Link } from 'react-router-dom';
//import { Button } from 'react-router-dom';

class Search extends Component {
    state = {
        query: '',
        booksvisible:[],
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
        BooksAPI.search(this.state.query)
            .then((booksvis) => {
                this.setState(() => ({
                    booksvisible:booksvis
                })) 
                console.log('booksvis: ',this.state.booksvisible)
            })
    }

    render() {
        //Destructure props & state
        const { myBooks, onReturn }  = this.props
        const { query } = this.state
        
        //Create booksvisible, the filtered list of books to power the rendered view
        //based on the state, which is based on input field.
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
                    onClick={onReturn}
                >Close</button>
              <div className="search-books-input-wrapper">
                <form>
                    <input 
                        placeholder="Search by title or author" 
                        type='text' 
                        name='search-input'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </form>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )
    }
}

//Add proptypes setup for type/required checks
Search.propTypes = {
    myBooks: PropTypes.array.isRequired,
    onReturn: PropTypes.func.isRequired,
}

export default Search