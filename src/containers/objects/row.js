import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleSelect } from '../../actions/objects';
import { getEntity, isSelected } from '../../selectors/objects';
import Row from '../../components/objects/row';

const mapStateToProps = (state, props) => {
    return {
        ...getEntity(state, props),
        isSelected: isSelected(state, props),
    };
};

const mapDispatchToProps = (dispatch, { id }) => {
    return bindActionCreators({
        toggleSelect: () => toggleSelect(id),
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Row);