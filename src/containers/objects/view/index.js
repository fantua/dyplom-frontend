import { connect } from 'react-redux';
import { fetchById } from '../../../actions/objects';
import { fetchByObject } from '../../../actions/crashes';
import { fetchByDay } from '../../../actions/statistics';
import { getEntity } from '../../../selectors/objects';
import View from '../../../components/objects/view';

const mapStateToProps = (state, { match: { params: { id  } } }) => {
    id = Number(id);

    return {
        id,
        object: getEntity(state, { id }),
        isFetching: state.objects.isFetching || state.statistics.isFetching || state.crashes.isFetching,
    };
};

const mapDispatchToProps = {
    fetchStats: fetchByDay,
    fetchObject: fetchById,
    fetchCrashes: fetchByObject,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);