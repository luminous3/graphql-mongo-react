const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const CustomerType = require('./customer_type');
const Customer = mongoose.model('customer');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    customers: {
      type: new GraphQLList(CustomerType),
      resolve() {
        return Customer.find({});
      }
    },
    customer: {
      type: CustomerType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Customer.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
