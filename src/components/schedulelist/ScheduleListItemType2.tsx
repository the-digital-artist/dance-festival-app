import { Dimensions, StyleSheet, Text, View } from 'react-native';
import LText from '../../core/LText';
import LComponent from '../../core/LComponent';

const ScheduleListItemType2 = ({ item }) => {
  // console.log("ScheduleListItem: " + JSON.stringify(item, null, 2));
  if (item.itemType != 'type2') return;
  return (
    <>
      <View id='bg' style={{
        position: 'absolute',
        top: 0, left: 0,
        height: item.itemHeight,
        width: Dimensions.get('screen').width,
        opacity: 0.1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#FFFFFF',
        padding: 0,
        backgroundColor: '#382b38',
      }}
      />

      {/* <LText allowFontScaling={false} id='textSessionMainTitle' style={{
        position: 'absolute',
        top: 0,
        left: (4 + 35),
        width: Dimensions.get('screen').width - 70,
        fontFamily: 'RobotoCondensed-Regular',
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#fefefe',
        fontSize: (14),
        opacity: 1.0
      }}>
        {(item.groupTitle as string).toLocaleUpperCase()}
      </LText> */}

      <LText allowFontScaling={false} id='textSessionMainTitle' style={{
        position: 'absolute',
        top: 10,
        left: (4 + 15),
        width: Dimensions.get('screen').width/2-15,
        fontFamily: 'RobotoCondensed-Regular',
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#fefefe',
        fontSize: (15),
        opacity: 1.0
      }}>
        {(item.sessionMainTitle as string)}
      </LText>


      <LText allowFontScaling={false} id='textSessionArtistName' style={{
        position: 'absolute',
        top: 20,
        right: (4 + 15),
        height: 12 + 4,
        width: Dimensions.get('screen').width/2-15,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 2.0,
        fontSize: 13,
        // backgroundColor: 'indigo',
        textAlign: 'right',
        color: '#3f3639',
        // fontSize: (fontSizeArtistName),
      }}>
        {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
      </LText >
    </>
  );
}

export default ScheduleListItemType2;