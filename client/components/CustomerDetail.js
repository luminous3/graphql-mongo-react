import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchCustomer from '../queries/fetchCustomer';
import { Link } from 'react-router';

export class CustomerDetail extends Component {
  render() {
    const { customer } = this.props.data;
    if (!customer) {
      return <div />;
    }

    return (
      <div className="wrapper">
        <Link to="/">Back</Link>
        <h3>Welcome, {customer.name}</h3>
        <label>
          You are currently
          {customer.prime ? ' a prime member.' : ' not a prime member.'}
        </label>
      </div>
    );
  }
}

export default graphql(fetchCustomer, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(CustomerDetail);
