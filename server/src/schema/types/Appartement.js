import graphql from 'graphql';
import logementInterface from '../interfaces/Logements.js';
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLInt,} = graphql;

export default new GraphQLObjectType({
    name: 'Appartement',
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
        balcon: {
            type: GraphQLBoolean,
        }
    },
});
