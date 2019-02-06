import React from 'react';
import PropTypes from 'prop-types';

const BookOptionsMenu = props => {
    //Destructure props
    const { book }  = props

    const getDisabled = (optionString) => {
        return optionString === book.shelf
    }

    const getStyle = (optionString) => {
        return optionString === book.shelf ? {background: '#60ac5d', color:'#fff'} : null;
    }

    return (
        <div className="book-shelf-changer">
            <select>
                <option value="move" disabled>Move to...</option>
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
                <option value="none">None</option>
            </select>
        </div>
    );
}

//Add proptypes setup for type/required checks
BookOptionsMenu.propTypes = {
    book: PropTypes.object.isRequired,
}

export default BookOptionsMenu