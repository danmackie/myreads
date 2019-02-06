import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Bookshelf = props => {
    //Destructure props
    const { shelfName, shelfID, shelfBooks }  = props
    console.log('Bookshelf: ',shelfName);
    console.log('Bookshelf books: ',shelfBooks);

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {shelfBooks.map(book => (
                    <Book key={book.id} book={book} />
                ))}
            </ol>
            </div>
        </div>
    );
}

//Add proptypes setup for type/required checks
Bookshelf.propTypes = {
    shelfID: PropTypes.string.isRequired,
    shelfName: PropTypes.string.isRequired,
    shelfBooks: PropTypes.array.isRequired,
}

export default Bookshelf