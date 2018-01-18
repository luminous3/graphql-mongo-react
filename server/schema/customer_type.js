const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const Customer = mongoose.model('customer');

const CustomerType = new GraphQLObjectType({
  name: 'CustomerType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    prime: { type: GraphQLBoolean }
  })
});

module.exports = CustomerType;
