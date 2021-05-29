import graphql, { GraphQLNonNull } from 'graphql';
import houseEnum from '../enums/Additionnals.js';
import logementInterface from '../interfaces/Logements.js';
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLInt,} = graphql;

export default new GraphQLObjectType({
  name: 'Maison',
  interfaces: () => [logementInterface],
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    rooms: {
      type: GraphQLInt,
    },
    squaremeter: {
      type: GraphQLFloat,
    },
    price: {
      type: GraphQLFloat,
    },
    image_url: {
      type: GraphQLString,
    },
    is_sold: {
      type: GraphQLBoolean,
    },
    grenier: {
      type: new GraphQLNonNull(GraphQLBoolean),
    }
  },
});
