import graphql from 'graphql';
const { GraphQLEnumType } = graphql;

export default new GraphQLEnumType({
  name: 'Additionnals',
  description: 'The possible options in a house',
  values: {
    GARAGE: {
      value: 'GARAGE',
    },
    PISCINE: {
      value: 'PISCINE',
    },
    JARDIN: {
      value: 'JARDIN',
    },
  },
});
