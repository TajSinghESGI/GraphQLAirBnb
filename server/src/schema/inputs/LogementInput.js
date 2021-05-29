import graphql from 'graphql';
const {
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID,
    GraphQLString,
  } = graphql;
import additionalsEnum from '../enums/Additionnals.js';

export default new GraphQLInputObjectType({
    name: 'LogementInput',
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
        },
        grenier: {
            type: GraphQLBoolean,
        },
        options: {
            type: new GraphQLList(additionalsEnum),
        }
    },
});
