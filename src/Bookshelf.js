//import React from 'react';
import PropTypes from 'prop-types';

const Bookshelf = props => {
    //Destructure props
    const {shelf, books}  = this.props
}

//Add proptypes setup for type/required checks
const propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
}

export default Bookshelf