import React from 'react';
import PropTypes from 'prop-types';
import BookOptionsMenu from './BookOptionsMenu';

const Book = props => {
    //Destructure props
    const {book}  = props
    console.log(book);
    
    const authorNames = book.authors.join(" & "); 

    const getCoverURL = () => {
        return `url(${book.imageLinks.thumbnail})`
    }

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ 
                    width: 128, 
                    height: 193, 
                    backgroundImage: getCoverURL()
                }}></div>
                <BookOptionsMenu key='{book.id}' book={book} />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{authorNames}</div>
        </div>
    );
}

//Add proptypes setup for type/required checks
Book.propTypes = {
    book: PropTypes.object.isRequired,
}

export default Book