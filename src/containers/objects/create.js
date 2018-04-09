import { compose } from 'redux';
import { connect } from 'react-redux';
import wrapModal from 'react-modal-hoc';
import { create } from '../../actions/objects';
import Create from '../../components/objects/create';

const mapDispatchToProps = {
    create,
};

const enhance = compose(
    wrapModal,
    connect(null, mapDispatchToProps),
);

export default enhance(Create);
