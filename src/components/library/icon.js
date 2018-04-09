import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Icon = ({ name }) => {
    const className = classNames('fa', `fa-${name}`);

    return <i className={className} aria-hidden="true"/>;
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Icon;