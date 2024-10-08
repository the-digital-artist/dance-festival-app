import { Dimensions, StyleSheet, Text, View } from 'react-native';



const ScheduleListItemType3 = ({ item }) => {

  // console.log("ScheduleListItem: " + JSON.stringify(item, null, 2));
  if (item.itemType != 'type3') return;


  return (
    <>

      <View id='bg' style={{
        position: 'absolute',
        top: 0, left: 0,
        height: item.itemHeight,
        width: Dimensions.get('screen').width - 10,
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        opacity: 1.9,
        padding: 0,
        backgroundColor: '#f2aa3e',
      }}
      />

      <Text allowFontScaling={false} id='textPreSignup' style={{
        top: 30,
        left: 0,
        width: Dimensions.get('screen').width,
        fontFamily: 'RamaGothicEW01-Regular',
        letterSpacing: 1.9,
        // opacity: 0.5,
        // backgroundColor: 'indigo',
        textAlign: 'center',
        color: '#232323',
        fontSize: 18,
      }}>
        {item.sessionMainTitle ? (item.sessionMainTitle as string).toLocaleUpperCase() : ""}
      </Text >



    </>
  );
}

export default ScheduleListItemType3;