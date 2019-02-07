import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Bookshelf = props => {
    //Destructure props
    const { shelfName, shelfBooks, handleUpdateBook }  = props
    // console.log('Bookshelf: ',shelfName);
    // console.log('Bookshelf books: ',shelfBooks);

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {shelfBooks.map(book => (
                    <Book shelf={book.shelf} key={book.id} book={book} handleUpdateBook={handleUpdateBook}/>
                ))}
            </ol>
            </div>
        </div>
    );
}

//Add proptypes setup for type/required checks
Bookshelf.propTypes = {
    shelfName: PropTypes.string.isRequired,
    shelfBooks: PropTypes.array.isRequired,
    handleUpdateBook: PropTypes.func.isRequired,
}

export default Bookshelf