import React, { useState, useEffect } from "react";
import {
  Dimensions,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  StatusBar,
  LogBox
} from "react-native";
import { AppLoading } from 'expo'
import { useNavigation } from '@react-navigation/native';

//import components
import { SearchTap } from "../components/SearchBar";
import * as TextInput from "../components/forms/AppInput";
import * as Cards from "../components/Cards";

//import styles and assets
import styled from "styled-components";
import colors from "../config/colors";
import * as Typography from "../config/Typography";

//import data
import { homedata, InitialCities } from "../data/homedata";

//import redux
import { connect } from "react-redux";
import { setCity } from "../store/search";
import { gql, useQuery } from '@apollo/client'

const PROPERTIES_QUERY = gql`
  {
    logements {
      ... on Appartement {
        id
        name
        rooms
        squaremeter
        price
        image_url
        is_sold
        balcon
      }
      ... on Villa {
        id
        name
        rooms
        squaremeter
        price
        image_url
        is_sold
        options
      }
      ... on Maison {
        id
        name
        rooms
        squaremeter
        price
        image_url
        is_sold
        grenier
      }
    }
  }
`

const Home = (props) => {
  const [search, setSearch] = useState(false);
  const [searchterm, setSearchterm] = useState("");
  const { data, loading, error } = useQuery(PROPERTIES_QUERY)
  const navigation = useNavigation();
  const filteredCity = InitialCities.filter((city) => {
    return city.title.toLowerCase().includes(searchterm.toLocaleLowerCase());
  });

  const goToDetails = (item) => {
    navigation.navigate('Details', {property: item})
    console.log('pressed')
  };

  if (loading) {
    return <AppLoading />
  }

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <View
          style={{
            width: 270,
            marginVertical: 12,
            marginLeft: 30,
            marginRight: 12,
          }}
        >
          <Cards.Default
            image={item.image_url}
            title={item.name}
            secondary={item.price}
            rooms={item.rooms}
            action={"Voir les détails"}
            onPress={() => goToDetails(item)}
          />
        </View>
      );
    } else {
      return (
        <View style={{ width: 270, margin: 12 }}>
          <Cards.Default
            image={item.image_url}
            title={item.name}
            rooms={item.rooms}
            secondary={item.price}
            action={"Voir les détails"}
            onPress={()=> goToDetails(item)}
          />
        </View>
      );
    }
  };

  return (
    <Container>
      <Main>
        <SearchStart>
          <SearchTap
            placeholder="Lieux, adresse, code postal"
            icon="search"
            size={20}
            setSearch={() => setSearch(true)}
          />
        </SearchStart>
        <Modal visible={search} animationType="slide">
          <Safe>
            <FlatList
              ListHeaderComponent={
                <SearchArea>
                  <TextInput.Search
                    placeholder="search"
                    autoCorrect={false}
                    onChangeText={(text) => setSearchterm(text)}
                  />
                  <TouchableOpacity onPress={() => setSearch(false)}>
                    <CancelBtn>Cancel</CancelBtn>
                  </TouchableOpacity>
                </SearchArea>
              }
              keyboardShouldPersistTaps={"handled"}
              data={filteredCity}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <View style={{ paddingHorizontal: 20 }}>
                </View>
              )}
              ItemSeparatorComponent={() => <HLine />}
            />
          </Safe>
        </Modal>
        <HLine />
        <Text>
          <Typography.H color={colors.red}>
            Bienvenue sur AirbnbQL
          </Typography.H>
        </Text>
        <FlatList
          data={data.logements}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
        />
      </Main>
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const Main = styled.View`
  background-color: white;
  padding-bottom: 30px;
`;

const SearchStart = styled.View`
  padding: 10px 0 5px 0;
`;

const SearchArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Safe = styled.SafeAreaView`
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0};
  flex: 1;
`;

const HLine = styled.View`
  width: 100%;
  margin: 0 auto;
  height: 1px;
  background-color: ${colors.faintgray};
`;

const CancelBtn = styled.Text`
  color: ${colors.black};
  text-decoration: underline;
  margin-left: 10px;
`;

const Text = styled.View`
  width: 100%;
  padding: 30px;
`;

export default connect(null, { setCity })(Home);
