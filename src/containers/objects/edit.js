import { compose } from 'redux';
import { connect } from 'react-redux';
import wrapModal from 'react-modal-hoc';
import { edit } from '../../actions/objects';
import { getEntity } from '../../selectors/objects';
import Edit from '../../components/objects/edit';

const mapStateToProps = (state, props) => {
    return {
        ...getEntity(state, props),
    };
};

const mapDispatchToProps = {
    edit,
};

const enhance = compose(
    wrapModal,
    connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(Edit);
