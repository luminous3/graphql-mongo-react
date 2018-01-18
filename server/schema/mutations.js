const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const mongoose = require('mongoose');
const Customer = mongoose.model('customer');
const CustomerType = require('./customer_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        prime: { type: GraphQLBoolean }
      },
      resolve(parentValue, args) {
        return new Customer(args).save();
      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Customer.remove({ _id: id });
      }
    },
    updateCustomer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        prime: { type: GraphQLBoolean }
      },
      resolve(parentValue, args) {
        return Customer.update({ _id: args.id }, { $set: args }).exec();
      }
    }
  }
});

module.exports = mutation;
