import graphql from 'graphql';
import additionalsEnum from '../enums/Additionnals.js';
import logementInterface from '../interfaces/Logements.js';
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLList, GraphQLInt,} = graphql;

export default new GraphQLObjectType({
    name: 'Villa',
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
        options: {
            type: new GraphQLList(additionalsEnum),
        }
    },
});
