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

        this.fetchStats = this.fetchStats.bind(this);
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

    timerId = null;

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

    componentWillUnmount() {
        window.clearTimeout(this.timerId);
    }

    async fetchStats() {
        const { date } = this.state;
        const { id, fetchStats } = this.props;

        await fetchStats(id, date.clone());
        this.timerId = window.setTimeout(this.fetchStats, 1000);
    }

    handleDateChange(e) {
        this.setState({ date: moment(e.target.value) });
    }

    render() {
        const { date } = this.state;
        const { id, object } = this.props;

        if (!object) {
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