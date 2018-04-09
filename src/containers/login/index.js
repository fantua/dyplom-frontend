import { connect } from 'react-redux';
import { fetchLogin } from '../../actions/user';
import Login from '../../components/login';

const mapDispatchToProps = {
    fetchLogin,
};

export default connect(
    null,
    mapDispatchToProps,
)(Login);