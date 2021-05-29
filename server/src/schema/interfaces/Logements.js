import graphql from 'graphql';
import houseType from '../types/House.js';
import appartementType from '../types/Appartement.js';
import villaType from '../types/Villa.js';

const {
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLID,
  GraphQLString,
} = graphql;

const logementInterface = new GraphQLInterfaceType({
  name: 'Logement',
  resolveType: (obj) => {
    if (obj.grenier) {
      return houseType;
    }
    if (obj.balcon) {
      return appartementType;
    }
    if(obj.options) {
      return villaType;
    }
  },
  fields: () => ({
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
  }),
});

export default logementInterface;