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