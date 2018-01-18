import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import gql from 'graphql-tag';
import fetchCustomer from '../queries/fetchCustomer';
import query from '../queries/fetchCustomers';

export class CustomerEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      prime: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.customer) {
      const { customer } = newProps.data;
      this.setState({
        name: customer.name,
        email: customer.email,
        prime: customer.prime
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          id: this.props.params.id,
          name: this.state.name,
          email: this.state.email,
          prime: this.state.prime
        },
        refetchQueries: [
          { query },
          {
            query: fetchCustomer,
            variables: {
              id: this.props.params.id
            }
          }
        ]
      })
      .then(() => hashHistory.push('/'));
  }

  render() {
    const { name, email, prime } = this.state;

    return (
      <div className="wrapper">
        <Link to="/">Back</Link>
        <h4>Edit Customer</h4>
        <form className="form">
          <label>Name:</label>
          <input
            onChange={event => this.setState({ name: event.target.value })}
            value={name}
          />
          <label>Email:</label>
          <input
            onChange={event => this.setState({ email: event.target.value })}
            value={email}
          />
          <label>Prime Membership</label>
          <div className="switch">
            <label>
              Off
              <input
                type="checkbox"
                id="mycheckbox"
                checked={prime}
                onChange={event =>
                  this.setState({ prime: event.target.checked })
                }
              />
              <span className="lever" />
              On
            </label>
          </div>
        </form>
        <a
          onClick={this.onSubmit.bind(this)}
          className="waves-effect waves-light btn right"
        >
          Submit
        </a>
      </div>
    );
  }
}

const mutation = gql`
  mutation updateCustomer(
    $id: ID
    $name: String
    $email: String
    $prime: Boolean
  ) {
    updateCustomer(id: $id, name: $name, email: $email, prime: $prime) {
      name
      email
      prime
    }
  }
`;

export default graphql(mutation)(
  graphql(fetchCustomer, {
    options: props => {
      return { variables: { id: props.params.id } };
    }
  })(CustomerEdit)
);
