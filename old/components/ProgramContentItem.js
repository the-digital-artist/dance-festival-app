import { Component } from 'react';
import { View, ScrollView, Dimensions, SafeAreaView, Text, StyleSheet, Image, Pressable } from 'react-native';
import LauncherController from '../LauncherController';
import ActionOpenMaps from "../ActionOpenMaps";
import ActionGoWorkshopPlanner from '../ActionGoWorkshopPlanner';

class ProgramContentItem extends Component {
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



    return(
    <View 
    style={this.props.style}
    >
     
     <View id='sessionBackgroundPanel'
            style={{
              left: 0, top: 5, position: 'absolute',
              backgroundColor: '#f9d061',
              width: (Dimensions.get('window').width - 2 * offsetX), height: this.props.style.height,
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,

            }}
          />

          <Text id='timeText'
            style={{
              // backgroundColor: 'lightsteelblue',
              position: 'absolute', 
              top: 25,
              left: offsetX, right: undefined,
              fontFamily: 'AktivGrotesk-Regular',
              color: '#000000',
              fontSize: 12,
              textAlign: 'left',
              fontWeight: 'normal',
            }}>
           
           {item.time}
          </Text>


          <Text id='sessionTitle'
            style={{
              // backgroundColor: 'lightsteelblue',
              position: 'absolute', 
              top: 20,
              left: 110, right: undefined,
              fontFamily: 'RamaGothicEW01-Semibold',
              color: '#000000',
              fontSize: 27,
              textAlign: 'left',
              fontWeight: 'normal',
            }}>
           {item.mainTitle}
          </Text>
          <Text id='sessionSub'
            style={{
              // backgroundColor: 'lightsteelblue',
              transform: [{ scale: 1 }],
              position: 'absolute', 
              top: 55,
              left: 110, right: undefined,
              fontFamily: 'AktivGrotesk-Regular',
              lineHeight: 15,
              color: '#000000',
              fontSize: 12,
              width: (Dimensions.get('window').width - 2* offsetX - 110),
              textAlign: 'left',
              fontWeight: 'normal',
            }}>
              {item.subLine}
           
          </Text>

   

    </View>)
  }
}

export default ProgramContentItem;

