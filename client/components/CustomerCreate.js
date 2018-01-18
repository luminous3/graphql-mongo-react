import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import gql from 'graphql-tag';
import query from '../queries/fetchCustomers';

export class CustomerCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: ''
    };
  }

  onSubmit(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          name: this.state.name,
          email: this.state.email,
          prime: document.getElementById('mycheckbox').checked
        },
        refetchQueries: [{ query }]
      })
      .then(() => hashHistory.push('/'));
  }

  render() {
    return (
      <div className="wrapper">
        <h4>Create a New Customer</h4>
        <form>
          <label>Name:</label>
          <input
            name="name"
            onChange={event => this.setState({ name: event.target.value })}
            value={this.state.name}
          />
          <label>Email:</label>
          <input
            name="email"
            onChange={event => this.setState({ email: event.target.value })}
            value={this.state.email}
          />
          <label>Prime Membership</label>
          <div className="switch">
            <label>
              Off
              <input type="checkbox" id="mycheckbox" />
              <span className="lever" />
              On
            </label>
          </div>
        </form>
        <a
          onClick={this.onSubmit.bind(this)}
          className="waves-effect waves-light btn right"
        >
          Create
        </a>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddCustomer($name: String, $email: String, $prime: Boolean) {
    addCustomer(name: $name, email: $email, prime: $prime) {
      name
      email
      prime
    }
  }
`;

export default graphql(mutation)(CustomerCreate);
