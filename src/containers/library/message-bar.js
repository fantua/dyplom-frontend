import { connect } from 'react-redux';
import { clearMessage } from '../../actions/app';
import MessageBar from '../../components/library/message-bar';

const mapStateToProps = (state) => {
    const { message, messageType } = state.app;

    return {
        message, messageType
    };
};

const mapDispatchToProps = {
    clearMessage,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageBar);