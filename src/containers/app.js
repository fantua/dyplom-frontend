import { connect } from 'react-redux';
import { fetchParams } from '../actions/objects';
import App from '../components/app';

const mapDispatchToProps = {
    fetchObjectsParams: fetchParams,
};

export default connect(
    null,
    mapDispatchToProps,
)(App);