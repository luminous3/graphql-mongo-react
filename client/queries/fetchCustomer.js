import gql from 'graphql-tag';

export default gql`
  query CustomerQuery($id: ID!) {
    customer(id: $id) {
      id
      name
      email
      prime
    }
  }
`;
