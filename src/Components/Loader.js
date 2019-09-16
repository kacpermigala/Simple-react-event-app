import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({ show, children }) => {
  return !show ? (
    children
  ) : (
    <div className="wrapper-middle">
      <CircularProgress />
    </div>
  );
};

export default Loader;
