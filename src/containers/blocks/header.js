import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchData, logout } from '../../actions/user';
import Header from '../../components/blocks/header';

const mapStateToProps = (state) => {
    const { entity } = state.user;

    return {
        user: entity,
    };
};

const mapDispatchToProps = {
    logout,
    fetchUser: fetchData,
};

const enhance = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Header);