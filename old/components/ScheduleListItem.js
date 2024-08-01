import { StyleSheet, TouchableOpacity, Text, View, Dimensions, Button, Pressable } from 'react-native';

import ScheduleListItemToggle from './ScheduleListItemToggle';
import ActionPopulateAndGoDetailsScreen from '../ActionPopulateAndGoDetailsScreen';
import ScheduleListItemPart from './ScheduleListItemPart';
import LauncherController from '../LauncherController';
import { useEffect, useRef } from 'react';
import ActionOnSessionSelection from '../ActionOnSessionSelection';


const ScheduleListItem = ({ item }) => {
  // console.log("ScheduleListItem: ");
  // console.log(JSON.stringify(item, null, 2))

  let paddingLeftAndRight = 5;
  let isLargeItem = (item.session2.sessionDescription != undefined && item.session2.sessionDescription != '') ||
    (item.session1.sessionDescription != undefined && item.session1.sessionDescription != '')
  let selectedSessionId = null;
  let itemHeight = isLargeItem ? 150 : 100


  const refToggle1 = useRef(null);
  const refToggle2 = useRef(null);

  const refItemPart1 = useRef(null);
  const refItemPart2 = useRef(null);

  let firstRun = true;

  useEffect(() => {
    if (!firstRun) return;
    firstRun = false;

    if (LauncherController.getInstance().persistedList[item.session1.id] == '1') {
      console.log("item.session1.id: " + item.session1.id + " is selected in persistance");
      ActionOnSessionSelection(refToggle1, refToggle2, refItemPart1, refItemPart2, true);
    }

    if (LauncherController.getInstance().persistedList[item.session2.id] == '1') {
      console.log("item.session2.id: " + item.session2.id + " is selected in persistance");
      ActionOnSessionSelection(refToggle2, refToggle1, refItemPart2, refItemPart1, true);
    }
  });

  return (
    <View
      style={{

        backgroundColor: 'black',
        left: 0,
        height: itemHeight, width: Dimensions.get('window').width,
        borderTopColor: 'white',
        borderTopWidth: 0,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}>


      {/* time line  centered (small)*/}
      <Text id='textTime' style={{
        position: 'absolute', top: 10, left: 5,
        width: (Dimensions.get('window').width - 10), height: 15,
        fontFamily: 'AktivGrotesk-Regular',
        // backgroundColor: 'skyblue',
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 12,
      }}>
        {item.session1.time}
      </Text>

      {/* session 1 (left) - class name and artistname  */}
      <ScheduleListItemPart
        ref={refItemPart1}
        item={item}
        referenceId={item.session1.id}
        sessionId={'session1'}
        alignment={'left'}
        isLargeItem={isLargeItem}
        navigation={this._navigation}
      />

      {/* session 2 (right) - class name and artistname  */}
      <ScheduleListItemPart
        ref={refItemPart2}
        item={item}
        referenceId={item.session2.id}
        sessionId={'session2'}
        alignment={'right'}
        isLargeItem={isLargeItem}
        navigation={this._navigation}
      />


      {/* toggle image to mark as favorite */}
          <ScheduleListItemToggle
            ref={refToggle1}
            itemRef={refItemPart1}
            otherRef={refToggle2}
            referenceId={item.session1.id}
            isRightAligned={false}
            selectedAsFavorite={false}
            initiallyHidden={item.session1.artistName==''?true:false}
          /> 
      {
        item.session1.artistName != '' ?
          <Pressable
            style={{
              top: 45,
              left: 147, right: undefined,
              height: 30,
              width: 30,
              // backgroundColor: 'lavender',
              opacity: 0.3,
              position: 'absolute',
            }}
            onPress={() => {
              ActionOnSessionSelection(refToggle1, refToggle2, refItemPart1, refItemPart2);
            }}>
            <View
              style={{
                top: 0,
                height: 30,
                width: 30,
                backgroundColor: 'transparent',
                position: 'absolute'
              }} />

          </Pressable> : null
      }


          <ScheduleListItemToggle
            ref={refToggle2}
            itemRef={refItemPart2}
            otherRef={refToggle1}
            referenceId={item.session2.id}
            isRightAligned={true}
            selectedAsFavorite={false}
            initiallyHidden={item.session2.artistName==''?true:false}
          /> 
          
      {
        item.session2.artistName != '' ?
          <Pressable
            style={{
              top: 45,
              left: undefined, right: 147,
              height: 30,
              width: 30,
              // backgroundColor: 'lavenderblush',
              opacity: 0.3,
              position: 'absolute',
            }}
            onPress={() => {
              ActionOnSessionSelection(refToggle2, refToggle1, refItemPart2, refItemPart1);
            }}>
            <View
              style={{
                top: 0,

                height: 30,
                width: 30,
                // backgroundColor: 'forestgreen',
                position: 'absolute'
              }} />
          </Pressable> : null
      }


    </View>
  );
}

export default ScheduleListItem;