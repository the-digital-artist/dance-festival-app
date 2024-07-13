import { Dimensions, Image, SafeAreaView, Text, View } from 'react-native';

const ScreenHeader = (props) => {
  let itemHeight = 100;

  return (
    <>

      <View style={{
        position: 'absolute',
        backgroundColor: '#d5d5d5',
        width: Dimensions.get('screen').width,
        height: itemHeight,
        opacity: 0.1
      }}
      ></View>

      <Text allowFontScaling={false} id='textHeader'
        style={[{
          top: 60, left: 30,
          width: Dimensions.get('screen').width - 40, height: 32,
          fontFamily: 'LuckiestGuy-Regular',
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