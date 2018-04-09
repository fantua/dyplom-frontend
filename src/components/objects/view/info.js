import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { formatDateTime } from '../../../utils';
import Status from '../status';

const Info = ({ id, description, createdAt, lastCrashAt }) => (
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
            <td><Status lastCrashAt={lastCrashAt} /></td>
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
    lastCrashAt: PropTypes.string.isRequired,
};

export default Info;