import * as React from 'react';
import Button from '@material-ui/core/Button';
import ErrorBoundaryContext from './ErrorBoundaryContext';

class ErrorBoundary extends React.Component {
  state = { hasError: undefined };

  componentDidCatch(_error, _info) {
    this.setState({ hasError: true });
  }

  informAboutError = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { hasError } = this.state;

    return hasError ? (
      <div className="wrapper-middle">
        <h2>Something went wrong.</h2>
        <Button variant="contained" color="primary" onClick={refreshPage}>
          Reload
        </Button>
      </div>
    ) : (
      <ErrorBoundaryContext.Provider
        value={{ informAboutError: this.informAboutError }}
      >
        {this.props.children}
      </ErrorBoundaryContext.Provider>
    );
  }
}

function refreshPage() {
  window.location.reload();
}

export default ErrorBoundary;
