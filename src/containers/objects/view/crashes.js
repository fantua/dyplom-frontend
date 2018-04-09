import { connect } from 'react-redux';
import { getObjectEntities } from '../../../selectors/crashes';
import Crashes from '../../../components/objects/view/crashes';

const mapStateToProps = (state, props) => {
    return {
        entities: getObjectEntities(state, props),
        isFetching: state.crashes.isFetching,
    };
};

export default connect(
    mapStateToProps,
)(Crashes);