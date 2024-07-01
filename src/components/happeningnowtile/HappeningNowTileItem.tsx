import { useState } from 'react';
import { Dimensions, Image, Platform, Text, View } from 'react-native';
import LauncherController from '../../LauncherController';
import ButtonSmall from '../ButtonSmall';
import TransitionLinkToSchedule from '../../transitions/TransitionLinkToSchedule';
import { BlurView } from 'expo-blur';


const HappeningNowTileItem = ({ item }) => {
  // console.log("Rendering HappeningNowTileItem")

  if (item == undefined || item == null) return null;
  if (item.itemType == "type1" && item.flag == true) return null;

  if (item.itemType == "type1") {
    item.shortMainTitle = item.groupTitle;
    if (item.shortMainTitle == "Workshops")
      item.room = "Find details in the planner";
    if (item.shortMainTitle == "Night Parties")
      item.room = item.groupSubtitle;
  }

  let mainTitleOffsetY = (item.itemType == "type0" ? 45 : (item.itemType == "type2"?25:30))
  return (
    <>

{   item.itemType != "type0" &&
<View
          style={{
            backgroundColor: '#FBB03A', opacity: 0.2,
            top: 5,
            left: 0,
            height: 50, 
            width: Dimensions.get('screen').width - 60,
          }}/> 
        }

{   item.itemType != "type0" &&
      <Text allowFontScaling={false} id='textTimeWhatsHappening' style={{
        position: 'absolute',
        top: 15, left: 5,
        width: 80, height: 15,
        fontFamily: 'Cabin-Regular',
        opacity: 0.6,
        // backgroundColor: 'skyblue',
        textAlign: 'right',
        letterSpacing:0.6,
        color: '#232323',
        fontSize: 9,
      }}>
        {item.time}
      </Text>
}

      <Text allowFontScaling={false} id='textLocation' style={{
        position: 'absolute',
        top: 14,
        left: (item.itemType == "type0"?5+10:80 + 5 +10),

        width: (item.itemType == "type0"?Dimensions.get('screen').width-70:Dimensions.get('screen').width-60-(80 + 5 +10+10)), 
        height: 30,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 2.0,
        // backgroundColor: 'indigo',
        textAlign: (item.itemType == "type0"?'center':'left'),
        color: '#9F509F',
        fontSize: 11,
        opacity: item.type == 'type0' ? 0.8 : 1
      }}>
        {item.room ? (item.room as string).toLocaleUpperCase() : ""}
      </Text>

      <Text allowFontScaling={false} id='textSessionMainTitle'
        style={{
          position: 'absolute',
          top: mainTitleOffsetY,
          left: (80 + 5 +10),
          width: Dimensions.get('screen').width-60-(80 + 5 +10+10), 
          height: 28,
          fontFamily: item.itemType != "type2" ? 'LuckiestGuy-Regular' : 'Antonio-Regular',
          // backgroundColor: 'skyblue',
          textAlign: 'left',
          textAlignVertical: 'bottom',
          color: '#9F509F',
          fontSize: 21,
          opacity: item.type == 'type0' ? 0.8 : 1
        }}>
        {item.shortMainTitle ? (item.shortMainTitle as string) : ""}
      </Text>


    </>
  );
}

export default HappeningNowTileItem;