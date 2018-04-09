import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import MessageBar from '../containers/library/message-bar';
import Header from '../containers/blocks/header';
import Objects from '../containers/objects';
import ObjectView from '../containers/objects/view';
import Footer from './blocks/footer';
import Main from './main';

class App extends Component {

    static propTypes = {
        fetchObjectsParams: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetchObjectsParams();
    }

    render() {
        return (
            <Container className="app-container">
                <Header className="mb-3" />
                <MessageBar className="mb-3" />
                <section className="content mb-3">
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/objects" component={Objects} />
                        <Route exact path="/objects/:id" component={ObjectView} />
                        <Redirect to="/" />
                    </Switch>
                </section>
                <Footer />
            </Container>
        );
    }

}

export default App;

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

import React from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Col, Input, Badge, Table } from 'reactstrap';

const LabelXS = 4;
const InpitXS = 8;

const Info = ({ id, params, toggle }) => (
    <Modal size="lg" isOpen>
        <ModalHeader toggle={toggle}>Параметрування контроллера</ModalHeader>
        <ModalBody>
            <FormGroup row>
                <Label xs={LabelXS}>
                    <strong>Protocol</strong>
                </Label>
                <Col xs={InpitXS}>
                    <Input plaintext><mark>{_get(params, 'protocol', '').toUpperCase()}</mark></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label xs={LabelXS}>
                    <strong>Partner Address</strong>
                </Label>
                <Col xs={InpitXS}>
                    <Input plaintext><mark>{_get(params, 'host')}</mark></Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label xs={LabelXS}>
                    <strong>Partner Port</strong>
                </Label>
                <Col xs={InpitXS}>
                    <Input plaintext><mark>{_get(params, 'port')}</mark></Input>
                </Col>
            </FormGroup>
            <h5 className="mt-5">Доступні методи комунікації</h5>
            <hr />
            <FormGroup row>
                <Col xs={12}>
                    <Table size="sm" bordered striped>
                        <thead>
                        <tr>
                            <th scope="col">Local Port</th>
                            <th className="text-center" scope="col">Значення</th>
                            <th scope="col">Опис</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><code>{_get(params, 'statsPort') + id}</code></td>
                            <td className="text-center"><Badge color="info">&lt;integer&gt;</Badge></td>
                            <td>Збір статистичної інформації.</td>
                        </tr>
                        <tr>
                            <td><code>{_get(params, 'crashPort') + id}</code></td>
                            <td className="text-center">––</td>
                            <td>Оповіщення про аварійну ситуацію.</td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>
            </FormGroup>
        </ModalBody>
    </Modal>
);

Info.propTypes = {
    id: PropTypes.number.isRequired,
    params: PropTypes.shape({
        host: PropTypes.string.isRequired,
        port: PropTypes.number.isRequired,
        protocol: PropTypes.string.isRequired,
        crashPort: PropTypes.number.isRequired,
        statsPort: PropTypes.number.isRequired,
    }),
    toggle: PropTypes.func.isRequired,
};

export default Info;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';

class Create extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        create: PropTypes.func.isRequired,
        toggle: PropTypes.func.isRequired,
    };

    state = {
        name: '',
        description: '',
    };

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { create, toggle } = this.props;
        const { name, description } = this.state;

        toggle();
        create({ name, description });
    }

    render() {
        const { toggle } = this.props;
        const { name, description } = this.state;

        return (
            <Modal size="lg" isOpen>
                <ModalHeader toggle={toggle}>Створити об'єкт</ModalHeader>
                <Form onSubmit={this.handleSubmit}>
                    <ModalBody>
                        <FormGroup row>
                            <Label for="name" xs={4}>Назва</Label>
                            <Col xs={8}>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    placeholder="Введіть назву"
                                    autoFocus
                                    required
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="description" xs={4}>Опис</Label>
                            <Col xs={8}>
                                <Input
                                    type="textarea"
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={this.handleChange}
                                    placeholder="Введіть детальний опис"
                                    rows={4}
                                    required
                                />
                            </Col>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">Зберегти</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }

}

export default Create;

import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Row, Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import Icon from '../../library/icon';
import ObjectInfo from './info';
import ObjectChart from '../../../containers/objects/view/chart';
import ObjectCrashes from '../../../containers/objects/view/crashes';
import ObjectLastStats from '../../../containers/objects/view/last-stats';
import './index.css';

class View extends Component {

    constructor(props) {
        super(props);

        this.handleDateChange = this.handleDateChange.bind(this);
    }

    static propTypes = {
        id: PropTypes.number.isRequired,
        object: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
        isFetching: PropTypes.bool.isRequired,
        fetchStats: PropTypes.func.isRequired,
        fetchObject: PropTypes.func.isRequired,
        fetchCrashes: PropTypes.func.isRequired,
    };

    state = {
        date: moment(),
    };

    componentDidMount() {
        const { id, fetchObject, fetchCrashes } = this.props;

        fetchObject(id);
        this.fetchStats();
        fetchCrashes(id);
    }

    componentDidUpdate(prevProps, { date }) {
        if (date !== this.state.date) {
            this.fetchStats();
        }
    }

    fetchStats() {
        const { date } = this.state;
        const { id, fetchStats } = this.props;

        fetchStats(id, date.clone());
    }

    handleDateChange(e) {
        this.setState({ date: moment(e.target.value) });
    }

    render() {
        const { date } = this.state;
        const { id, object, isFetching } = this.props;

        if (!object || isFetching) {
            return null;
        }

        return (
            <Col className="object-container" xs="12">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0">{object.name}</h4>
                    <div className="heading-target">
                        <InputGroup size="sm">
                            <Input type="date" value={date.format('YYYY-MM-DD')} onChange={this.handleDateChange} />
                            <InputGroupAddon>
                                <Icon name="calendar" />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
                <Row className="mb-3">
                    <Col xs={6}>
                        <ObjectInfo {...object} />
                    </Col>
                    <Col xs={6}>
                        <ObjectLastStats id={id} length={4} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12}>
                        <h5>Статистичні показники об'єкта</h5>
                        <ObjectChart className="m-4" id={id} date={date} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <h5>Журнал аварійних ситуацій</h5>
                        <ObjectCrashes id={id} />
                    </Col>
                </Row>
            </Col>
        );
    }

}

export default View;

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { formatDateTimeSeconds as format } from '../../../utils';

function renderEntities(list) {
    return list.map(({ id, code, createdAt }) => (
        <tr key={id}>
            <td><code>{code}</code></td>
            <td className="text-muted">{format(createdAt)}</td>
        </tr>
    ));
}

const Crashes = ({ entities, isFetching }) => (
    <Table size="sm" bordered striped>
        <thead>
        <tr>
            <th>Статус код</th>
            <th>Дата</th>
        </tr>
        </thead>
        <tbody>
        {(!isFetching && !entities.length) && (
            <tr>
                <td className="text-center" colSpan={2}>Немає даних</td>
            </tr>
        )}
        {renderEntities(entities)}
        </tbody>
    </Table>
);

Crashes.propTypes = {
    id: PropTypes.number.isRequired,
    entities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        code: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
    })),
    isFetching: PropTypes.bool.isRequired,
};

export default Crashes;

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { formatDateTime } from '../../../utils';

const Info = ({ id, description, createdAt }) => (
    <Table className="object-info" size="sm" bordered striped>
        <thead>
        <tr>
            <th className="text-center" colSpan={2}>Загальна інформація</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">ID</th>
            <td>{id}</td>
        </tr>
        <tr>
            <th scope="row">Статус</th>
            <td><strong className="text-success">Активний</strong></td>
        </tr>
        <tr>
            <th scope="row">Опис</th>
            <td>{description}</td>
        </tr>
        <tr>
            <th scope="row">Створений</th>
            <td>{formatDateTime(createdAt)}</td>
        </tr>
        </tbody>
    </Table>
);

Info.propTypes = {
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
};

export default Info;

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { formatDateTimeSeconds as format } from '../../../utils';

function renderEntities(list) {
    return list.map(({ id, value, createdAt }) => (
        <tr key={id}>
            <td>{value}</td>
            <td className="text-muted">{format(createdAt)}</td>
        </tr>
    ));
}

const LastStats = ({ entities, isFetching }) => (
    <Table className="object-last-stats" size="sm" bordered striped>
        <thead>
        <tr>
            <th className="text-center" colSpan={2}>Останні показники</th>
        </tr>
        </thead>
        <tbody>
        {(!isFetching && !entities.length) && (
            <tr>
                <td className="text-center" colSpan={2}>Немає даних</td>
            </tr>
        )}
        {renderEntities(entities)}
        </tbody>
    </Table>
);

LastStats.propTypes = {
    id: PropTypes.number.isRequired,
    entities: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
    })),
    isFetching: PropTypes.bool.isRequired,
};

export default LastStats;