import { Component, useState } from 'react';

import { View, ScrollView, Dimensions, SafeAreaView, Text, StyleSheet, Image, Pressable } from 'react-native';


import LauncherController from '../LauncherController';
import ActionOpenMaps from "../ActionOpenMaps";
import ArtistDetailItemRenderer from './ArtistDetailItemRenderer';
import ActionGoWorkshopPlanner from '../ActionGoWorkshopPlanner';
import ProgramLocationItem from './ProgramLocationItem';
import ProgramContentItem from './ProgramContentItem';

class ProgramScreen extends Component {
  imgSourceIconLocation = null;
  imgSourceButtonWorkshopPlanner = null;


  constructor(props) {
    super(props);

    console.log("FestivalProgramScreen");
    this.imgSourceIconLocation = require('../assets/icon_location_black.png');
    this.imgSourceButtonWorkshopPlanner = require('../assets/button_workshop_planner.png');

    LauncherController.getInstance().navigator = props.navigation;
  }




  render() {

    let offsetX = 15;
    let offsetY = 15;

    return (

      <SafeAreaView style={{ flex: 1, backgroundColor: '#000000'}}>
        <View
          style={{
            left: 0, top: 20, position: 'absolute',
            backgroundColor: '#ffbf11',
            width: Dimensions.get('window').width, height: Dimensions.get('window').height
          }}
        ></View>

        <ScrollView
        contentContainerStyle={{
          // backgroundColor: 'lightsteelblue',
          height: 1500

        }}
          style={{
            flex:1,
            
            left: offsetX, top: 20, position: 'absolute',
            flex: 1, backgroundColor: 'transparent',
            width: (Dimensions.get('window').width - 2 * offsetX), height: Dimensions.get('window').height-50
          }}>
                  
                  <Pressable
            style={{
              // backgroundColor: 'greenyellow',
              position: 'absolute',
              top: 15,
              left:0, right: undefined,
              width: 200, height: 33,
              // backgroundColor: 'lavender',
              // opacity: 0.3,
              position: 'absolute',
            }}
            onPress={() => {
              ActionGoWorkshopPlanner(this.props.navigation);
            }}>

            <Image
              source={this.imgSourceButtonWorkshopPlanner}
              style={{
                // backgroundColor: 'greenyellow',
                position: 'absolute',
                top: 0,
                left: 0, right: undefined,
                width: 263, height: 39,
                resizeMode: 'contain'
              }}
            />

          </Pressable>         

{/* Thursday */}


          <View
            style={{
              left: 0, top: 70, position: 'absolute',
              backgroundColor: '#171205',
              width: Dimensions.get('window').width, height: 40
            }}
          >
            <Text id='datetime'
              style={{
                // backgroundColor: 'skyblue',
                transform: [{ scale: 1 }],
                position: 'absolute', top: 8,
                left: offsetX, right: undefined,
                fontFamily: 'RamaGothicEW01-Regular',
                color: '#FFFFFF',
                fontSize: 24,
                textAlign: 'left',
                fontWeight: 'normal',
              }}>
              Thursday, 10 Oct 2024
            </Text>

            {/* Thu Location Item */}
            <ProgramLocationItem
              style={{
                left: 0, top: 40, position: 'absolute',
                // backgroundColor: 'lightsteelblue',
                width: (Dimensions.get('window').width - 2 * offsetX), height: 70
              }}
              contentItem={{
                mainLocation: "To Be Announced",
                subline: "To Be Announced",
                actionKey: "To Be Announced"
              }
              }
            />



            {/* Thu PreParty Item */}

            <ProgramContentItem
              style={{
                left: 0, top: 95, position: 'absolute',
                // backgroundColor: 'lightsteelblue',
                width: (Dimensions.get('window').width - 2 * offsetX), height: 100
              }}
              contentItem={{
                time: "20:00 - 02:00",
                mainTitle: "Pre-Party",
                subLine: "Social dance party on 4 Floors \nEntry 8 €"
              }}
            />
          </View>


{/* Friday */}


          <View
            style={{
              left: 0, top: 280, position: 'absolute',
              backgroundColor: '#171205',
              width: Dimensions.get('window').width, height: 40
            }}
          >
            <Text id='datetime'
              style={{
                // backgroundColor: 'skyblue',
                transform: [{ scale: 1 }],
                position: 'absolute', top: 8,
                left: offsetX, right: undefined,
                fontFamily: 'RamaGothicEW01-Regular',
                color: '#FFFFFF',
                fontSize: 24,
                textAlign: 'left',
                fontWeight: 'normal',
              }}>
              Friday, 11 Oct 2024
            </Text>

            <ProgramLocationItem
              style={{
                left: 0, top: 40, position: 'absolute',
                // backgroundColor: 'lightsteelblue',
                width: (Dimensions.get('window').width - 2 * offsetX), height: 70
              }}
              contentItem={{
                mainLocation: "Tangotanzen macht Schön",
                subline: "Oranienstraße 185, 10999 Berlin",
                actionKey: "Tangotanzen Macht Schön"
              }
              }
            />

            <ProgramContentItem
              style={{
                left: 0, top: 95, position: 'absolute',
                // backgroundColor: 'lightsteelblue',
                width: (Dimensions.get('window').width - 2 * offsetX), height: 150
              }}
              contentItem={{
                time: "21:00 - 03:00",
                mainTitle: "Party",
                subLine: 
"21:00-22:00 Class with Timo Lingnau:\n\
            Salsa Cubana Partnerwork\n\
22:00-23:00 Party - DJ Line-up:\n\
            DJANE Estefi (Barcelona)\n\
            DJ Rafi (Amsterdam)\n\
            DJ EC (Cuba / Berlin)"
              }}
            />
          </View>



{/* Saturday */}
          <View
            style={{
              left: 0, top: 540, position: 'absolute',
              backgroundColor: '#171205',
              width: Dimensions.get('window').width, height: 40
            }}
          >
            <Text id='datetime'
              style={{
                // backgroundColor: 'skyblue',
                transform: [{ scale: 1 }],
                position: 'absolute', top: 8,
                left: offsetX, right: undefined,
                fontFamily: 'RamaGothicEW01-Regular',
                color: '#FFFFFF',
                fontSize: 24,
                textAlign: 'left',
                fontWeight: 'normal',
              }}>
              Saturday, 10 Feb 2024
            </Text>

            <ProgramLocationItem
              style={{
                left: 0, top: 40, position: 'absolute',
                // backgroundColor: 'lightsteelblue',
                width: (Dimensions.get('window').width - 2 * offsetX), height: 70
              }}
              contentItem={{
                mainLocation: "TAK Theater Aufbau",
                subline: "Prinzenstrasse 85f, 10969 Berlin",
                actionKey: "TAK Theater Aufbau"
              }
              }
            />

            <ProgramContentItem
              style={{
                left: 0, top: 95, position: 'absolute',
                // backgroundColor: 'lightsteelblue',
                width: (Dimensions.get('window').width - 2 * offsetX), height: 130
              }}
              contentItem={{
                time: "10:00 - 18:10",
                mainTitle: "Workshops",
                subLine: "Use the Workshop Planner to\nbrowse sessions and plan your schedule."
              }}
            />



          <Pressable
            style={{
              // backgroundColor: 'greenyellow',
              position: 'absolute',
              top: 185,
              left:110, right: undefined,
              width: 200, height: 33,
              // backgroundColor: 'lavender',
              // opacity: 0.3,
              position: 'absolute',
            }}
            onPress={() => {
              ActionGoWorkshopPlanner(this.props.navigation);
            }}>

            <Image
              source={this.imgSourceButtonWorkshopPlanner}
              style={{
                // backgroundColor: 'greenyellow',
                position: 'absolute',
                top: 0,
                left: 0, right: undefined,
                width: 223, height: 33,
                resizeMode: 'contain'
              }}
            />

          </Pressable>

            <ProgramContentItem
              style={{
                left: 0, top: 225, position: 'absolute',
                // backgroundColor: 'lightsteelblue',
                width: (Dimensions.get('window').width - 2 * offsetX), height: 135
              }}
              contentItem={{
                time: "20:00 - 04:30",
                mainTitle: "Party with Rueda",
                subLine: "20:00-21:00   Rueda with Lucas & Kimmy\n22:00-04:30   Party - Line-up:\n\tDJ Rafi (Amsterdam)\n\tDJANE Estefi (Barcelona)\n\tDJ Tamboly (Berlin)"
              }}
            />

          </View>



{/* Sunday */}
<View
            style={{
              left: 0, top: 915, position: 'absolute',
              backgroundColor: '#171205',
              width: Dimensions.get('window').width, height: 40
            }}
          >
            <Text id='datetime'
              style={{
                // backgroundColor: 'skyblue',
                transform: [{ scale: 1 }],
                position: 'absolute', top: 8,
                left: offsetX, right: undefined,
                fontFamily: 'RamaGothicEW01-Regular',
                color: '#FFFFFF',
                fontSize: 24,
                textAlign: 'left',
                fontWeight: 'normal',
              }}>
              Sunday, 11 Feb 2024
            </Text>

            <ProgramLocationItem
              style={{
                left: 0, top: 40, position: 'absolute',
                // backgroundColor: 'lightsteelblue',
                width: (Dimensions.get('window').width - 2 * offsetX), height: 70
              }}
              contentItem={{
                mainLocation: "TAK Theater Aufbau",
                subline: "Prinzenstrasse 85f, 10969 Berlin",
                actionKey: "TAK Theater Aufbau"
              }
              }
            />

            <ProgramContentItem
              style={{
                left: 0, top: 95, position: 'absolute',
                // backgroundColor: 'lightsteelblue',
                width: (Dimensions.get('window').width - 2 * offsetX), height: 130
              }}
              contentItem={{
                time: "11:00 - 17:40",
                mainTitle: "Workshops",
                subLine: "Use the Workshop Planner to\nbrowse sessions and plan your schedule."
              }}
            />



          <Pressable
            style={{
              // backgroundColor: 'greenyellow',
              position: 'absolute',
              top: 185,
              left:110, right: undefined,
              width: 200, height: 33,
              // backgroundColor: 'lavender',
              // opacity: 0.3,
              position: 'absolute',
            }}
            onPress={() => {
              ActionGoWorkshopPlanner(this.props.navigation);
            }}>

            <Image
              source={this.imgSourceButtonWorkshopPlanner}
              style={{
                // backgroundColor: 'greenyellow',
                position: 'absolute',
                top: 0,
                left: 0, right: undefined,
                width: 223, height: 33,
                resizeMode: 'contain'
              }}
            />

          </Pressable>

            <ProgramContentItem
              style={{
                left: 0, top: 225, position: 'absolute',
                // backgroundColor: 'lightsteelblue',
                width: (Dimensions.get('window').width - 2 * offsetX), height: 105
              }}
              contentItem={{
                time: "20:00 - 01:00",
                mainTitle: "Party",
                subLine: "with\nDJ Puma\nDJ EC (Cuba/Berlin)"
              }}
            />

          </View>








        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default ProgramScreen;