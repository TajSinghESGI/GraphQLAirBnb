import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView
} from "react-native";
import { useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Switch } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { gql, useMutation } from '@apollo/client'

//import components

//import styles and assets
import colors from "../config/colors";

const AddHouse = (props) => {

  
  const [text, setText] = React.useState('');
  const [rooms, setRooms] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [squareMeter, setSquareMeter] = React.useState('');

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'Piscine', value: 'PISCINE'},
    {label: 'Garage', value: 'GARAGE'},
    {label: 'Jardin', value: 'JARDIN'}
  ]);

  const [balconSwitch, setBalconSwitch] = React.useState(false);
  const [grenierSwitch, setGrenierSwitch] = React.useState(false);

  const ADD_HOUSE_MUTATION = gql`
    mutation AddLogements($name: String, $rooms: Int, $price: Float, $squaremeter: Float, $balcon: Boolean, $grenier: Boolean, $options: [String]) {
      addLogement(input: {
        logement: {
          id: 9,
          name: $name,
          rooms: $rooms,
          price: $price,
          squaremeter: $squaremeter,
          image_url: "https://www.travaux.com/images/cms/original/ebcd4d3c-6a00-47d2-8165-6d9e192082af.jpeg",
          is_sold: false,
          balcon: $balcon,
          grenier: $grenier,
          options: $options,
        }
      }) {
        logement {
          id
        }
      }
    } 
`

  const [addLogement, { data, error }] = useMutation(ADD_HOUSE_MUTATION);

  const onBalconSwitch = () => setBalconSwitch(!balconSwitch);
  const onGrenierSwitch = () => setGrenierSwitch(!grenierSwitch);
  console.log('ERROR MUTATION', error);

  // const sendData = () => {
  //   fetch('http://192.168.1.196:3000/graphql', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body:
  //     gql`{
  //         mutation AddLogements {
  //           addLogement(input: {
  //             logement: {
  //               id: 6,
  //               name: ${text},
  //               rooms: ${parseInt(rooms)},
  //               price: ${parseInt(price)},
  //               squaremeter: ${parseInt(squareMeter)},
  //               image_url: "https://www.travaux.com/images/cms/original/ebcd4d3c-6a00-47d2-8165-6d9e192082af.jpeg",
  //               is_sold: false,
  //               balcon: ${balconSwitch},
  //               grenier: ${grenierSwitch},
  //               options: ${items},
  //             }
  //           }) {
  //             logement {
  //               id
  //             }
  //           }
  //         }
  //       }`,
  //   })
  //     .then((res) => res.json())
  //     .then((res) => console.log(res.data))
  // }

  return (
    <ScrollView>
      <View style={[styles.container, {marginRight: 10, marginLeft: 10}]}>
        <Text style={{fontWeight:'bold'}}>
          Photos * -
                  <Text style={styles.titleGrey}> jusqu'à 3 photos</Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginBottom: 8,
          }}>
            <TouchableOpacity
              style={[styles.addPhotos, styles.addPhotosPlaceholder]}
              onPress={() => {
                console.log("Image 1");
              }}>
              <FontAwesome name="plus" size={16} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addPhotos, styles.addPhotosPlaceholder]}
              onPress={() => {
                console.log("Image 2");
              }}>
              <FontAwesome name="plus" size={16} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.addPhotos, styles.addPhotosPlaceholder]}
              onPress={() => {
                console.log("Image 3");
              }}>
              <FontAwesome name="plus" size={16} color="#000" />
            </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight:'bold'}}>
            Name
          </Text>
          <TextInput
            style={{backgroundColor:'#FFF'}}
            mode="outlined"
            outlineColor={colors.red}
            label="Name"
            placeholder="Name"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight:'bold'}}>
            Rooms
          </Text>
          <TextInput
            style={{backgroundColor:'#FFF'}}
            mode="outlined"
            outlineColor={colors.red}
            label="Rooms"
            placeholder="Rooms"
            value={rooms}
            onChangeText={(rooms) => setRooms(rooms)}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight:'bold'}}>
            Price
          </Text>
          <TextInput
            style={{backgroundColor:'#FFF'}}
            mode="outlined"
            outlineColor={colors.red}
            label="Price"
            placeholder="Price"
            value={price}
            onChangeText={(price) => setPrice(price)}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={{fontWeight:'bold'}}>
            Square Meter
          </Text>
          <TextInput
            style={{backgroundColor:'#FFF'}}
            outlineColor={colors.red}
            mode="outlined"
            label="Square Meter"
            placeholder="Square Meter"
            value={squareMeter}
            onChangeText={(squareMeter) => setSquareMeter(squareMeter)}
          />
        </View>
        <View style={{marginTop: 20}}>
          <DropDownPicker
            multiple={true}
            min={0}
            max={3}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <View style={{alignItems: 'center', paddingTop: 30, flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize: 14}}>Votre logement possède t-il un grenier ? </Text>
          <Switch 
          value={grenierSwitch} 
          onValueChange={onGrenierSwitch} />
        </View>
        <View style={{alignItems: 'center', paddingTop: 30, flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize: 14}}>Votre logement possède t-il un balcon ? </Text>
          <Switch 
          value={balconSwitch} 
          onValueChange={onBalconSwitch} />
        </View>
        <View style={{justifyContent:'center', alignItems:'center', paddingBottom:40}}>
          <Button style={{height:50, width: 100, alignItems:'center', justifyContent:'center'}} mode="contained" 
          onPress={ () => 
            addLogement({ variables: { 
              name: text,
              rooms: parseInt(rooms),
              price: parseFloat(price),
              squaremeter: parseFloat(squareMeter),
              grenier: grenierSwitch,
              balcon: balconSwitch,
              options: items
              } 
            })}>
            Valider
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 30,
  },
  titleGrey: {
    color: '#6E6E6E',
  },
  addPhotos: {
    height: Dimensions.get('window').width * 0.28,
    width: Dimensions.get('window').width * 0.28,
    borderColor: '#000',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
    marginTop: 0,
    borderRadius: 3,
    flexDirection: 'row',
  },
  addPhotosPlaceholder: {
    borderStyle: 'dashed',
  },
});

  export default AddHouse;
