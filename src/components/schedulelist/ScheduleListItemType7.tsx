import { Dimensions, Text, View } from 'react-native';
import LText from '../../core/LText';



const ScheduleListItemType7 = ({ item }) => {

  // console.log("ScheduleListItem7: ");
  if (item.itemType != 'type7') return;

  let mainTitleColor = '#e1e7ac';
  if (item.sessionMainTitle.toLowerCase() == 'registration')
    mainTitleColor = '#8989BB'

  return (
    <>
      <View id='bg' style={{
        position: 'absolute',
        top: 0, left: -5,
        height: item.itemHeight,
        width: Dimensions.get('screen').width,
        opacity: 0.2,
        padding: 0,
        backgroundColor: '#382b38',
      }}
      />
      <LText allowFontScaling={false} id='textSessionMainTitle' style={{
        position: 'absolute',
        top: 35,
        left: 70,
        width: Dimensions.get('screen').width - 60-35,
        fontFamily: 'DINCondensed-Bold',
        // backgroundColor: 'indigo',
        letterSpacing: 0.5,
        textAlign: 'left',
        color: mainTitleColor,
        fontSize: 22,
        opacity: 1.0
      }}>
        {(item.sessionMainTitle as string).toLocaleUpperCase()}
      </LText>

      <LText allowFontScaling={false} id='textSessionMainTitle' style={{
        position: 'absolute',
        top: 65,
        left: 70,
        width: Dimensions.get('screen').width - 60-35,
        fontFamily: 'Arcon-Regular',
        // backgroundColor: 'indigo',
        letterSpacing: 2.7,
        textAlign: 'left',
        color: '#e7e7e2',
        fontSize: 13,
        opacity: 1.0
      }}>
        {(item.sessionSubtitle as string).toLocaleUpperCase()}
      </LText>

{item.room !=undefined && item.room!='' &&
      <Text allowFontScaling={false} id='textSessionCategoryAndRoom' style={{
        position: 'absolute',
        top: 10,
        right: 10,
        
        fontFamily: 'Cabin-Regular',
        letterSpacing: 1.2,
        opacity: 0.8,
        padding: 2,
        backgroundColor: '#382b38',
        textAlign: 'left',
        color: '#bcd4ee',

        // backgroundColor: '#e7e7e2',
        // backgroundColor: '#600f2c',
        // color: '#232323',
        fontSize: 11,
      }}>
        {(item.room ? " "+(item.room as string).toLocaleUpperCase() + " " : "")}
      </Text >
}
        </>
  );
}

export default ScheduleListItemType7;