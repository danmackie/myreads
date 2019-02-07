import React from 'react';
import PropTypes from 'prop-types';

const BookOptionsMenu = props => {
    //Destructure props
    const { book, handleUpdateBook, shelf }  = props

    const getDisabled = (optionString) => {
        return optionString === shelf
    }

    const getStyle = (optionString) => {
        // console.log(shelf);
        return optionString === shelf ? {background: '#60ac5d', color:'#fff'} : null;
    }

    const handleUpdateBookLocal = (event) => {
        book.shelf = event.target.value;
        // console.log('MENU: book.shelf = ', book.shelf );
        handleUpdateBook(book);
    }
    
    return (
        <div className="book-shelf-changer">
            <select defaultValue='move' selected onChange={handleUpdateBookLocal} >
                <option style={{}} value="move" disabled>Move to...</option>
                <option
                    disabled={getDisabled('currentlyReading')}
                    style={getStyle('currentlyReading')}
                    value="currentlyReading"
                >
                    Currently Reading
                </option>
                <option
                    disabled={getDisabled('wantToRead')}
                    style={getStyle('wantToRead')}
                    value="wantToRead"
                >
                    Want to Read
                </option>
                <option
                    disabled={getDisabled('read')}
                    style={getStyle('read')}
                    value="read"
                >
                    Read
                </option>
                <option
                    disabled={getDisabled('none')}
                    style={getStyle('none')}
                    value="none"
                >
                    None
                </option>
            </select>
        </div>
    );
}

//Add proptypes setup for type/required checks
BookOptionsMenu.propTypes = {
    book: PropTypes.object.isRequired,
    handleUpdateBook: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
}

export default BookOptionsMenu