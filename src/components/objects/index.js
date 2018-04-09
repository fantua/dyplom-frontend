import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Col, Table, Button, Label, Input } from 'reactstrap';
import Icon from '../library/icon';
import Row from '../../containers/objects/row';
import Create from '../../containers/objects/create';

class View extends Component {

    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
    }

    static propTypes = {
        entities: PropTypes.arrayOf(PropTypes.number.isRequired),
        selected: PropTypes.arrayOf(PropTypes.string.isRequired),
        isFetching: PropTypes.bool.isRequired,
        isSelectedAny: PropTypes.bool.isRequired,
        isSelectedAll: PropTypes.bool.isRequired,
        fetch: PropTypes.func.isRequired,
        deleteSelected: PropTypes.func.isRequired,
        toggleSelectAll: PropTypes.func.isRequired,
    };

    state = {
        isOpenModal: false
    };

    componentDidMount() {
        this.props.fetch();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.props.fetch();
        }
    }

    toggleModal() {
        this.setState(({ isOpenModal }) => ({ isOpenModal: !isOpenModal }));
    }

    renderEmpty() {
        const { entities, isFetching } = this.props;

        if (!isFetching && !entities.length) {
            return (
                <tr>
                    <td className="text-center" colSpan={6}>Немає даних</td>
                </tr>
            );
        }
    }

    renderEntities() {
        return this.props.entities.map(id => <Row key={id} id={id} />);
    }

    render() {
        const { isOpenModal } = this.state;
        const { isSelectedAny, isSelectedAll, deleteSelected, toggleSelectAll } = this.props;

        return (
            <Fragment>
                <Col xs="12">
                    <div className="d-flex justify-content-between mb-2">
                        <h4 className="mb-0">Список об'єктів</h4>
                        <div>
                            <Button className="mr-3" color="success" size="sm" onClick={this.toggleModal}>
                                <Icon name="file-text-o" /> Створити
                            </Button>
                            <Button color="danger" size="sm" onClick={deleteSelected} disabled={!isSelectedAny}>
                                <Icon name="trash-o" /> Видалити
                            </Button>
                        </div>
                    </div>
                    <Table striped hover>
                        <thead>
                        <tr>
                            <th scope="col">
                                <Label className="align-text-bottom" check>
                                    <Input type="checkbox" className="position-static" checked={isSelectedAll} onChange={toggleSelectAll} />
                                </Label>
                            </th>
                            <th scope="col">ID</th>
                            <th scope="col">Назва</th>
                            <th scope="col">Опис</th>
                            <th scope="col">Статус</th>
                            <th scope="col">Керування</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderEmpty()}
                        {this.renderEntities()}
                        </tbody>
                    </Table>
                </Col>
                <Create isOpen={isOpenModal} toggle={this.toggleModal} />
            </Fragment>
        );
    }

}

export default View;