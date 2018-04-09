import { connect } from 'react-redux';
import { getObjectLast } from '../../../selectors/statistics';
import LastStats from '../../../components/objects/view/last-stats';

const mapStateToProps = (state, props) => {
    return {
        entities: getObjectLast(state, props),
        isFetching: state.statistics.isFetching,
    };
};

export default connect(
    mapStateToProps,
)(LastStats);