import { Dimensions, Image, SafeAreaView, Text, View } from 'react-native';

const ScreenHeader = (props) => {
  let itemHeight = 100;

  return (
    <>

      <View style={{
        position: 'absolute',
        backgroundColor: '#c7b49c',
        width: Dimensions.get('screen').width,
        height: itemHeight,
        opacity: 1.0
      }}
      ></View>

      <Text allowFontScaling={false} id='textHeader'
        style={[{
          top: 60, left: 30,
          width: Dimensions.get('screen').width - 40, height: 32,
          fontFamily: 'DINNeuzeitGroteskStd-Light',
          // backgroundColor: 'skyblue',
          letterSpacing: 2.4,
          textAlign: 'left',
          color: props.color,
          fontSize: 23,
        }, props.textStyle]}>
        {props.text}
      </Text>
    </>
  );
}

export default ScreenHeader;