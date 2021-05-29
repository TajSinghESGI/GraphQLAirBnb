import graphql from 'graphql';
const { GraphQLInputObjectType, GraphQLInt } = graphql;

export default new GraphQLInputObjectType({
  name: 'PriceFilter',
  fields: {
    low: {
      type: GraphQLInt,
    },
    high: {
      type: GraphQLInt,
    },
  },
});
