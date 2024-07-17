import { Dimensions, Image, SafeAreaView, Text, View } from 'react-native';

const ScreenHeader = (props) => {
  let itemHeight = 100;

  return (
    <>
     {props.showBgBox &&  <View style={{
        position: 'absolute',
        backgroundColor: '#c7b49c',
        width: Dimensions.get('screen').width,
        height: itemHeight,
        opacity: 1.0
      }}
      />
    }
      <Image
        style={{
          // backgroundColor: 'skyblue',
          top: 0, left: 0, position: 'absolute',
          width: Dimensions.get('screen').width,
          height: (Dimensions.get('screen').width * (460 / 1290)),
          resizeMode: "contain",
          opacity: 1.0
        }}
        source={props.imgSrc}
      />
      <Text allowFontScaling={false} id='textHeader' style={[{
        position:'absolute',
        top: 80, left: 30,
        width: Dimensions.get('screen').width - 40, height: 32,
        fontFamily: 'DINNeuzeitGroteskStd-Light',
        // backgroundColor: 'skyblue',
        letterSpacing: 4.0,
        textAlign: 'left',
        color: props.color,
        fontSize: 20,
        opacity: 0.7
      }, props.textStyle]}>
        {props.text}
      </Text>
    </>
  );
}

export default ScreenHeader;