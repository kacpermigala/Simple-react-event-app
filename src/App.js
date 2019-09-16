import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import EventsList from './Components/EventsList';
import NotFound from './Components/NotFound';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import Layout from './Components/Layout';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Switch>
            <Route path="/" exact component={EventsList} />
            {/* <Route path="/event/:id" exact component={CharacterProfile} /> */}
            <Route path="/404" exact component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
