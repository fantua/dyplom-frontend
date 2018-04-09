import React from 'react';
import PropTypes from 'prop-types';
import { isObjectCrashed } from '../../utils';

const Status = ({ lastCrashAt }) => {
    if (isObjectCrashed(lastCrashAt)) {
        return <span className="text-danger">Аварійний</span>;
    }

    return <span className="text-success">Активний</span>;
};

Status.propTypes = {
    lastCrashAt: PropTypes.string,
};

export default Status;