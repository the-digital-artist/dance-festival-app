import { Dimensions, Text } from 'react-native';



const ScheduleListItemType3 = ({ item }) => {

  // console.log("ScheduleListItem: " + JSON.stringify(item, null, 2));
  if (item.itemType != 'type3') return;


  return (
    <>

      {/* time line  centered (small)
      <Text allowFontScaling={false} id='textTime' style={{
        position: 'absolute',
        top: 15, left: 2,
        width: 70, height: 15,
        fontFamily: 'DINNeuzeitGroteskStd-Light',
        // backgroundColor: 'skyblue',
        textAlign: 'right',
        color: '#58503e',
        fontSize: 11,
      }}>
        {item.time}
      </Text> */}

      <Text allowFontScaling={false} id='textSessionMainTitle' style={{
        position: 'absolute',
        top: 10, left: 90,
        width: Dimensions.get('screen').width-90-30,
        fontFamily: 'DINCondensed-Bold',
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#312816',
        fontSize: 25,
        opacity:0.7
      }}>
        {item.sessionMainTitle ? (item.sessionMainTitle as string) : ""}
      </Text>


      <Text allowFontScaling={false} id='textLocation' style={{
        position: 'absolute',
        bottom: (item.artistName.length>20?49:29), left: 90,
        width: 290, height: 16,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 2.0,
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#312816',
        fontSize: 12,
      }}>
        {item.room ? (item.room as string).toLocaleUpperCase() : ""}
      </Text>

      <Text allowFontScaling={false} id='textDJLineUp' style={{
        position: 'absolute',
        bottom: (item.artistName.length>20?10:-5), left: 90,
        width: 290,  height: 32,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 1.5,
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#312816',
        fontSize: 12,
      }}>
        {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
      </Text>
    </>
  );
}

export default ScheduleListItemType3;