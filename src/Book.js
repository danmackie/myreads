//import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
    //Destructure props
    const {book}  = this.props
    console.log('Book is ',book)
}

//Add proptypes setup for type/required checks
const propTypes = {
    book: PropTypes.object.isRequired,
}

export default Book