import { Component } from 'react';
import { View, ScrollView, Dimensions, SafeAreaView, Text, StyleSheet, Image, Pressable } from 'react-native';
import LauncherController from '../LauncherController';
import ActionOpenMaps from "../ActionOpenMaps";
import ActionGoWorkshopPlanner from '../ActionGoWorkshopPlanner';

class ProgramLocationItem extends Component {
  imgSourceIconLocation = null;
  imgSourceButtonWorkshopPlanner = null;


  constructor(props) {
    super(props);

    this.imgSourceIconLocation = require('../assets/icon_location_black.png');
    this.imgSourceButtonWorkshopPlanner = require('../assets/button_workshop_planner.png');

    LauncherController.getInstance().navigator = props.navigation;
  }




  render() {

    let offsetX = 15;
    let offsetY = 15;
    let item = this.props.contentItem;

    return (
      <View
        style={this.props.style}
        onPress={() => {
          ActionOpenMaps("Kesselhaus Kulturbrauerei");
        }}
      >


        <View id='sessionBackgroundPanel'
          style={{
            left: 0, top: 0, position: 'absolute',
            backgroundColor: '#f9d061',
            width: (Dimensions.get('window').width - 2 * offsetX), height: this.props.style.height - 17,
            // borderBottomColor: 'black',
            // borderBottomWidth: StyleSheet.hairlineWidth,

          }}
        />

        <Text id='locationHeadline'
          onPress={() => {
            ActionOpenMaps(item.actionKey);
          }}
          style={{
            // backgroundColor: 'lightsteelblue',
            transform: [{ scale: 1 }],
            position: 'absolute',
            top: 10,
            left: offsetX, right: undefined,
            fontFamily: 'AktivGrotesk-Regular',
            color: '#000000',
            fontSize: 12,
            width: 70,
            textAlign: 'left',
            fontWeight: 'normal',
          }}>
          Location:
        </Text>


        <Image
          source={this.imgSourceIconLocation}
          style={{
            // backgroundColor: 'greenyellow',
            position: 'absolute',
            left: 81,
            top: 8,
            height: 22,
            width: 22,
            resizeMode: 'cover'
          }}
        />

        <Text id='locationHeadline'
          onPress={() => {
            ActionOpenMaps(item.actionKey);
          }}
          style={{
            // backgroundColor: 'lightsteelblue',
            transform: [{ scale: 1 }],
            position: 'absolute',
            top: 5,
            left: 110, right: undefined,
            fontFamily: 'RamaGothicEW01-Regular',
            textDecorationLine: 'underline',
            color: '#000000',
            fontSize: 22,
            textAlign: 'left',
            fontWeight: 'normal',
          }}>
          {item.mainLocation}
        </Text>
        <Text id='locationSubline'
          onPress={() => {
            ActionOpenMaps(item.actionKey);
          }}
          style={{
            // backgroundColor: 'lightsteelblue',
            transform: [{ scale: 1 }],
            position: 'absolute',
            top: 33,
            left: 110, right: undefined,
            fontFamily: 'AktivGrotesk-Regular',
            // textDecorationLine: 'underline',
            lineHeight: 15,
            color: '#000000',
            fontSize: 12,
            width: (Dimensions.get('window').width - 4 * offsetX - 110),
            textAlign: 'left',
            fontWeight: 'normal',
          }}>
          {item.subline}

        </Text>
        <Pressable
          style={{
            // backgroundColor: 'greenyellow',
            position: 'absolute',
            top: 5,
            left: 77, right: undefined,
            width: 30, height: 30,
            // backgroundColor: 'lavender',
            // opacity: 0.3,
            position: 'absolute',
          }}
          onPress={() => {
            ActionOpenMaps(item.actionKey);
          }}>
        </Pressable>

      </View>)
  }
}

export default ProgramLocationItem;

