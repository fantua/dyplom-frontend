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