import gql from 'graphql-tag';

export default gql`
  {
    customers {
      id
      name
    }
  }
`;
