import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import CustomerList from './components/CustomerList';
import CustomerCreate from './components/CustomerCreate';
import CustomerDetail from './components/CustomerDetail';
import CustomerEdit from './components/CustomerEdit';

import App from './components/App';

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={CustomerList} />
          <Route path="customers/new" component={CustomerCreate} />
          <Route path="customers/:id" component={CustomerDetail} />
          <Route path="customers/:id/edit" component={CustomerEdit} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
