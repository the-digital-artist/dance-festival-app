import { Dimensions, Text } from 'react-native';



const ScheduleListItemType2 = ({ item }) => {

  // console.log("ScheduleListItem: " + JSON.stringify(item, null, 2));
  if (item.itemType != 'type2') return;

  return (
    <>

      <Text allowFontScaling={false} id='textSessionMainTitle' style={{
        position: 'absolute',
        top: 7, left: 90,
        width: Dimensions.get('screen').width-90-30,
        fontFamily: 'Antonio-Regular',
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#58503e',
        fontSize: 22,
      }}>
        {item.sessionMainTitle ? (item.sessionMainTitle as string).toLocaleUpperCase() : ""}
      </Text>


      <Text allowFontScaling={false} id='textLocation' style={{
        position: 'absolute',
        top: 40, left: 90,
        width: 290, height: 22,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 2.0,
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#58503e',
        fontSize: 12,
      }}>
        {item.room ? (item.room as string).toLocaleUpperCase() : ""}
      </Text>
    </>
  );
}

export default ScheduleListItemType2;