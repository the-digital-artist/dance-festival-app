import { useState } from 'react';

import { StyleSheet, TouchableOpacity, Text, Image, View, ScrollView, Dimensions, SafeAreaView, Pressable } from 'react-native';

import DataModel from '../DataModel';

import LauncherController from '../LauncherController';
import ActionOpenMaps from "../ActionOpenMaps";
import ArtistDetailItemRenderer from './ArtistDetailItemRenderer';

const DetailsScreen = ({ navigation }) => {
  let offsetX = 0;
  let offsetY = 0;

  let dataItem = LauncherController.getInstance().detailsItem;

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <View
        style={{
          left: 0, top: 0, position: 'absolute',
          backgroundColor: '#ffbf11',
          width: offsetX, height: Dimensions.get('window').height
        }}
      ></View>

      <View
        style={{
          left: offsetX, top: 0, position: 'absolute',
          backgroundColor: 'white',
          width: Dimensions.get('window').width - offsetX, height: offsetY
        }}
      ></View>

      <ScrollView style={{
        left: offsetX, top: offsetY,
        flex: 1, backgroundColor: '#000000'
      }}>
        <View style={{
          height: 1000, width: Dimensions.get('window').width,
          backgroundColor: 'black',
        }}>

          {/* When & Where */}

          <View style={{
            position: 'absolute', top: 10, left: 0,
            height: 160, width: Dimensions.get('window').width,
            borderTopColor: 'white',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomColor: 'white',
            borderBottomWidth: StyleSheet.hairlineWidth
          }}>
            <Text style={{
              fontFamily: 'RamaGothicEW01-Regular',
              position: 'absolute', top: 5, left: 15,
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 'normal',
              height: 44,
            }}>When & Where</Text>

            <View style={{
              position: 'absolute', top: 50, left: 35,
              height: 200, width: Dimensions.get('window').width
            }}>
              <Text id='textDate' style={{
                position: 'absolute', top: 0, left: 0,
                fontFamily: 'AktivGrotesk-Regular',
                color: '#FFFFFF',
                fontSize: 12,
                height: 44,
              }}>
                {dataItem.date}
              </Text>

              <Text id='textTime' style={{
                position: 'absolute', top: 15, left: 0,
                fontFamily: 'AktivGrotesk-Regular',
                color: '#FFFFFF',
                fontSize: 12,
                height: 44,
              }}>
                {dataItem.time}
              </Text>

              <Text id='textPlace' style={{
                position: 'absolute', top: 30, left: 0,
                fontFamily: 'AktivGrotesk-Regular',
                color: '#FFFFFF',
                fontSize: 12,
                height: 44,
              }}>
                {dataItem.place}
              </Text>

              <Text style={{
                fontFamily: 'AktivGrotesk-Regular',
                position: 'absolute', top: 0, left: 130,
                color: '#FFFFFF',
                fontSize: 17,
                fontWeight: 'normal',
                height: 44,
              }}>{dataItem.sessionSubtitle}</Text>

              <Text style={{
                fontFamily: 'RamaGothicEW01-Regular',
                position: 'absolute', top: 17, left: 130,
                color: '#FFFFFF',
                fontSize: 30,
                fontWeight: 'normal',
                height: 44,
              }}>{dataItem.artistName}</Text>
            </View>

            {/* <Image
              source={require('../assets/button_addtoplaner.png')}
              style={{
                position: 'absolute', top: 105, left: -33,
                height: 40, resizeMode: 'contain'
              }} /> */}
          </View>


          {/* Artists Panel */}

          <View style={{
            position: 'absolute', top: 140, left: 0,
            height: dataItem.artistTwo != '' ? 400 : 205, width: Dimensions.get('window').width,
            backgroundColor: 'black',
            borderTopColor: 'white',
            borderTopWidth: StyleSheet.hairlineWidth,
          }}>

            <Text style={{
              fontFamily: 'RamaGothicEW01-Regular',
              position: 'absolute', top: 5, left: 15,
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 'normal',
              height: 44,
            }}>Artists</Text>


            <ArtistDetailItemRenderer
              dataItemArtist={dataItem.artistOne}
              style={{
                position: 'absolute', top: 40, left: 30
              }}
            />

            <ArtistDetailItemRenderer
              dataItemArtist={dataItem.artistTwo}
              style={{
                position: 'absolute', top: 220, left: 30
              }}
            />

          </View>

          {/* Location */}
          <View style={{
            position: 'absolute', top: dataItem.artistTwo != '' ? 540 : 365, left: 0,
            height: 220, width: Dimensions.get('window').width,
            backgroundColor: 'black',
            borderTopColor: 'white',
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomColor: 'white',
            borderBottomWidth: StyleSheet.hairlineWidth
          }}>
            <Text style={{
              fontFamily: 'RamaGothicEW01-Regular',
              position: 'absolute', top: 5, left: 15,
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 'normal',
              height: 44,
            }}>Location</Text>


            <Text id='locationName' style={{
              fontFamily: 'RamaGothicEW01-Regular',
              position: 'absolute', top: 40, left: 30,
              color: '#FFFFFF',
              fontSize: 30,
              fontWeight: 'normal',
              height: 44,
            }}>TAK Theater Aufbau Kreuzberg</Text>

            <Text style={{
              position: 'absolute', top: 75, left: 30,
              color: '#FFFFFF',
              fontFamily: 'AktivGrotesk-Regular',
              fontSize: 14,
              flex: 1
            }}>
              Prinzenstrasse 85f, 10969 Berlin, Germany
            </Text>

            <Image
              source={require('../assets/tak_logo.png')}
              style={{
                position: 'absolute',
                top: 95, left: -32,
                height: 40, resizeMode: 'contain'
              }} />


            <View style={{
              position: 'absolute', top: 150, left: 30,
              width: 150, height: 40,
              backgroundColor: '#febc11'
            }}
            >
              <Text style={{
                position: 'absolute', top: 14, left: 60,
                color: '#000000',
                fontFamily: 'AktivGrotesk-Regular',
                fontSize: 12,
                flex: 1
              }}>Open Maps</Text>
              <Image
                source={require('../assets/button_icon_openmaps.png')}
                style={{
                  position: 'absolute', top: 10, left: 20,
                  width: 20, height: 20, resizeMode: 'cover'
                }} />
            </View>


            <Pressable
              style={{
                // backgroundColor: 'greenyellow',
                position: 'absolute',
                top: 150, left: 30, right: undefined,
                width: 150, height: 45,
                // backgroundColor: 'lavender',
                // opacity: 0.3,
                position: 'absolute',
              }}
              onPress={() => {
                ActionOpenMaps("TAK Theater Aufbau");
              }}>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default DetailsScreen;