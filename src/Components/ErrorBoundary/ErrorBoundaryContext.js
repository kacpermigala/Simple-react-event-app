import * as React from 'react';

const ErrorBoundaryContext = React.createContext({
  informAboutError: () => {},
});

export default ErrorBoundaryContext;
