import { connect } from 'react-redux';
import { fetchAll, toggleSelectAll, deleteSelected, } from '../../actions/objects';
import { getIds, isSelectedAll, isSelectedAny } from '../../selectors/objects';
import View from '../../components/objects';

const mapStateToProps = (state) => {
    return {
        entities: getIds(state),
        isSelectedAny: isSelectedAny(state),
        isSelectedAll: isSelectedAll(state),
        isFetching: state.objects.isFetching,
    };
};

const mapDispatchToProps = {
    deleteSelected,
    toggleSelectAll,
    fetch: fetchAll,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);