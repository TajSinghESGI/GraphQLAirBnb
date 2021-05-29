import graphqlM from 'graphql';
import viewerType from './types/Viewer.js';
import logementInterface from './interfaces/Logements.js';
import Maison from './types/House.js';
import Appart from './types/Appartement.js';
import Villa from './types/Villa.js';
import PriceFilter from './inputs/PriceFilter.js';
import graphqlRelay from 'graphql-relay';
import LogementInput from './inputs/LogementInput.js';

const { mutationWithClientMutationId } = graphqlRelay;
const { GraphQLObjectType, GraphQLList, GraphQLSchema,  GraphQLID, GraphQLString, } = graphqlM;

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: viewerType,
      resolve: (obj, args, { viewer }) => {
        return viewer;
      },
    },
    logements: {
      type: new GraphQLList(logementInterface),
      args: {
        price: {
          type: PriceFilter,
        },
      },
      resolve: async (_, { price }, { supabase }) => {
        
        const query = supabase.from('logements').select('*');

        if (price !== null && price !== undefined) {
          const { low, high } = price;
          if(low !== null && low !== undefined) {
            query.gte('price', low);
          }
          if(high !== null && high !== undefined) {
            query.lte('price', high);
          }
        }

        const { data } = await query;

        return data.map(logement => {
          if (logement.grenier === true) {
            console.log('Maison', logement);
            return {...logement, __typename: 'Maison'};
          }
          if (logement.balcon === true) {
            console.log('APPART', logement);
            return {...logement, __typename: 'Appartement' };
          }
          if(logement.options) {
            console.log('Villa', logement);
            return {...logement, __typename: 'Villa' };
          }
          return null;
        });
      },
    },
  },
});

const addLogementMutation = mutationWithClientMutationId({
  name: 'AddLogement',
  description: 'Adds a house to logement.',
  inputFields: {
   logement: {
     type: LogementInput,
   }
  },
  outputFields: {
    logement: {
      type: logementInterface,
    },
  },
  mutateAndGetPayload: async (input, {supabase}) => {
    console.log(
      'Mutation.addLogement called with input: ' + JSON.stringify(input, null, 2)
    );
    const { logement } = input;
    const logementLocal = {
      id: logement.id,
      name: logement.name,
      squaremeter: logement.squaremeter,
      price: logement.price,
      rooms: logement.rooms,
      image_url: logement.image_url,
      is_sold: logement.is_sold,
      balcon: logement.balcon,
      options: logement.options,
      grenier: logement.grenier,
    }
      console.log('Mutation 3', JSON.stringify(logementLocal, null, 2))
      await supabase.from('logements').insert([logementLocal])
    return {
        "logement": logementLocal
    }
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addLogement: addLogementMutation,
  },
});

export default new GraphQLSchema({ query: queryType, types: [Maison, Appart, Villa], mutation: mutationType });
