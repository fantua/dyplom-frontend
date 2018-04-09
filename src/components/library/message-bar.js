import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class MessageBar extends Component {

    static propTypes = {
        dismiss: PropTypes.bool,
        className: PropTypes.string,
        message: PropTypes.string,
        messageType: PropTypes.string,
        clearMessage: PropTypes.func.isRequired
    };

    render() {
        const { message, messageType, dismiss, clearMessage, className } = this.props;

        if (message) {
            return <Alert className={className} color={messageType} toggle={(dismiss) ? clearMessage : undefined}>{message}</Alert>;
        }

        return null;
    }

}

export default MessageBar;
