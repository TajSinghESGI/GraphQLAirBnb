import React from "react";
import { StatusBar, Platform} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from './app/navigation/HomeStack';
import { Provider } from "react-redux";
import store from "./app/store/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import styled from "styled-components";


import navigationTheme from "./app/navigation/navigationTheme";

const Common = styled.SafeAreaView`
  ${Platform.select({
  ios: {
    fontFamily: "Avenir",
  },
  android: {
    fontFamily: "Roboto",
    paddingTop: StatusBar.currentHeight,
  },
})}

  flex: 1;
`;

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://192.168.1.196:3000/graphql',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <Common>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <NavigationContainer theme={navigationTheme}>
            <HomeStack />
          </NavigationContainer>
        </ApolloProvider>
      </Provider>
    </Common>
  );
}
