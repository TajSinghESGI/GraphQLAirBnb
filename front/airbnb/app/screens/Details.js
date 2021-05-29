import React from "react";
import {
    StatusBar,
    View,
    Image,
    FlatList,
} from "react-native";
import { List } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { FontAwesome5 } from "@expo/vector-icons";

//import components

//import styles and assets
import styled from "styled-components";
import colors from "../config/colors";
import * as Typography from "../config/Typography";
import { color } from "react-native-reanimated";


const Details = (props) => {
    const route = useRoute();
    const { property } = route.params
    console.log(route.params.property);

    return (
        <Container>
            <Main>
                <ImageContainer>
                    <MainImage source={{ uri: property.image_url }} />
                </ImageContainer>
                <List.Section>
                    <List.Subheader style={{fontSize:24, color:colors.red}}>
                        Details de {property.name}
                    </List.Subheader>
                    <List.Item 
                        title={`Type: ${property.__typename}`} 
                        left={() => <FontAwesome5 name="home" color={colors.blue} size={24} style={{marginRight: 4}} />} />
                    <List.Item
                        title={`Rooms: ${property.rooms}`}
                        left={() => <FontAwesome5 name="bed" color={colors.blue} size={24} style={{marginRight: 4}} />
                    }
                    />
                    <List.Item
                        title={`SquareMeter: ${property.squaremeter}m2`}
                        left={() => <FontAwesome5 name="ruler-horizontal" color={colors.blue} size={24} style={{marginRight: 4}} />
                    }
                    />
                    <List.Item
                        title={`Price: ${property.price}`}
                        left={() => <FontAwesome5 name="euro-sign" color={colors.blue} size={24} style={{marginRight: 4}} />
                    }
                    />
                    {property.__typename === "Maison" ? 
                        <List.Item
                            title={`Grenier: Oui`}
                            left={() => <FontAwesome5 name="home" color={colors.blue} size={24} style={{marginRight: 4}} />
                        }
                    />
                    : property.__typename === "Appartement" ? 
                        <List.Item
                            title={`Balcon: ${property.balcon}`}
                            left={() => <FontAwesome5 name="home" color={colors.blue} size={24} style={{marginRight: 4}} />
                        }
                    />
                    : 
                        <List.Item
                                title={`Options: ${property.options}`}
                                left={() => <FontAwesome5 name="home" color={colors.blue} size={24} style={{marginRight: 4}} />
                            }
                        />
                    }
                </List.Section>
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

const Text = styled.View`
  width: 100%;
  padding: 30px;
`;

const ImageContainer = styled.View`
  width: 95%;
  height: 180px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 10px;
`;

const MainImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export default Details;
