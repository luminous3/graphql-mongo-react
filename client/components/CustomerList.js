import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchCustomers';
import gql from 'graphql-tag';

export class CustomerList extends Component {
  renderCustomers() {
    return this.props.data.customers.map(({ id, name }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/customers/${id}`}>{name}</Link>
          <Link to={`/customers/${id}/edit`}>
            <i className="material-icons">edit</i>
          </Link>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div />;
    }
    return (
      <div className="wrapper">
        <h4>Customers</h4>
        <ul className="collection">{this.renderCustomers()}</ul>
        <Link to="/customers/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(query)(CustomerList);
