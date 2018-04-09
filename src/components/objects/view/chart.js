import moment from 'moment';
import _get from 'lodash/get';
import _range from 'lodash/range';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const START_RANGE = 0;
const END_RANGE = 24;
const LABELS = _range(START_RANGE, END_RANGE).map(i => i.toString().padStart(2, '0'));

const options = {
    // maintainAspectRatio: false,
    legend: {
        display: false
    },
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Година'
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Значення'
            }
        }]
    }
};

class Chart extends Component {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        date: PropTypes.instanceOf(moment).isRequired,
    };

    getEndRange() {
        const today = new Date();

        return this.props.date.isSame(today, 'day') ? today.getHours() + 1 : END_RANGE;
    }

    render() {
        const { data, className } = this.props;
        const range = _range(START_RANGE, this.getEndRange());
        const config = {
            labels: LABELS,
            datasets: [
                {
                    label: 'Показник за годину часу',
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    lineTension: 0,
                    data: range.map(i => _get(data, i, 0)),
                }
            ]
        };

        return (
            <div className={className}>
                <Line data={config} options={options} />
            </div>
        );
    }

}

export default Chart;