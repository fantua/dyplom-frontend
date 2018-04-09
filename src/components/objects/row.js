import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Label, Input, Button } from 'reactstrap';
import Icon from '../library/icon';
import Status from './status';
import Edit from '../../containers/objects/edit';
import Info from '../../containers/objects/info';

class Row extends Component {

    constructor(props) {
        super(props);

        this.toggleEditModal = this.toggleModal('isOpenEditModal').bind(this);
        this.toggleInfoModal = this.toggleModal('isOpenInfoModal').bind(this);
    }

    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        lastCrashAt: PropTypes.string,
        isSelected: PropTypes.bool.isRequired,
        toggleSelect: PropTypes.func.isRequired,
    };

    state = {
        isOpenEditModal: false,
        isOpenInfoModal: false,
    };

    toggleModal(name) {
        return () => { this.setState(prevState => ({ [name]: !prevState[name] })); };
    }

    render() {
        const { isOpenEditModal, isOpenInfoModal } = this.state;
        const { id, name, description, lastCrashAt, isSelected, toggleSelect } = this.props;

        return (
            <Fragment>
                <tr className="table-row">
                    <td>
                        <Label check>
                            <Input type="checkbox" className="position-static" checked={isSelected} onChange={toggleSelect} />
                        </Label>
                    </td>
                    <th scope="row">{id}</th>
                    <td>{name}</td>
                    <td>{description}</td>
                    <td><Status lastCrashAt={lastCrashAt} /></td>
                    <td>
                        <Button className="mr-2" size="sm" onClick={this.toggleEditModal}>
                            <Icon name="wrench" />
                        </Button>
                        <Button className="action-button mr-2" color="info" size="sm" onClick={this.toggleInfoModal}>
                            <Icon name="info" />
                        </Button>
                        <Link to={`/objects/${id}`} className="btn btn-primary btn-sm">
                            <Icon name="list" />
                        </Link>
                    </td>
                </tr>
                <Edit id={id} isOpen={isOpenEditModal} toggle={this.toggleEditModal} />
                <Info id={id} isOpen={isOpenInfoModal} toggle={this.toggleInfoModal} />
            </Fragment>
        );
    }

}


export default Row;