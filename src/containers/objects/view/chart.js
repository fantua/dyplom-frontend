import { connect } from 'react-redux';
import { getObjectData } from '../../../selectors/statistics';
import LastStats from '../../../components/objects/view/chart';

const mapStateToProps = (state, props) => {
    return {
        data: getObjectData(state, props),
    };
};

export default connect(
    mapStateToProps,
)(LastStats);