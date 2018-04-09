import { compose } from 'redux';
import { connect } from 'react-redux';
import wrapModal from 'react-modal-hoc';
import { getParams } from '../../selectors/objects';
import Info from '../../components/objects/info';

const mapStateToProps = (state) => {
    return {
        params: getParams(state),
    };
};

const enhance = compose(
    wrapModal,
    connect(mapStateToProps),
);

export default enhance(Info);
