import { Dimensions, Image, SafeAreaView, Text, View } from 'react-native';

const   ScreenHeader = (props) => {
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
      <Image
        style={{
          // backgroundColor: 'skyblue',
          top: 0, left: 0, position: 'absolute',
          width: Dimensions.get('screen').width,
          height: (Dimensions.get('screen').width * (350 / 1290)),
          resizeMode: "contain",
          opacity: 0.1
        }}
        source={require('../../../assets/tabbar/tabbar_bg.png')}
      />
      <Text allowFontScaling={false} id='textHeader' style={{
        top: 55, left: 30,
        width: Dimensions.get('screen').width - 40, height: 32,
        fontFamily: 'Antonio-Regular',
        // backgroundColor: 'skyblue',
        letterSpacing: 1.5,
        textAlign: 'left',
        color: props.color,
        fontSize: 26,
      }}>
        {props.text}
      </Text>


    </>


  );
}

export default ScreenHeader;