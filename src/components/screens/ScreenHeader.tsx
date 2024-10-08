import Constants from 'expo-constants';
import { Dimensions, Image, Text, View } from 'react-native';



const ScreenHeader = (props) => {
  let itemHeight = 100;
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <>
      <View style={{
        // backgroundColor: '#100505',
        // top: statusBarHeight,

        width: Dimensions.get('window').width, height: 80
      }}>

        <View style={{
          position: "absolute",
          backgroundColor: '#ffbf11',
          width: Dimensions.get('window').width, height: 10
        }} />
      </View>
      <Text allowFontScaling={false} id='textHeader'
        style={[{
          position: "absolute",
          top: statusBarHeight+10+15,
          left: 20,
          width: Dimensions.get('screen').width - 40, height: 32,
          fontFamily: 'RamaGothicEW01-Regular',
          // backgroundColor: 'skyblue',
          color: '#ffbf11',
          // color: '#ffffff',
          fontSize: 24,
          letterSpacing: 3,
          textAlign: 'left',
        }, props.textStyle]}>
        {props.text}
      </Text>
    </>
  );
}

export default ScreenHeader;