import { Dimensions, Image, Text, View } from 'react-native';

const HeaderNavigator = (props) => {
  let itemHeight = 100;

  return (
    <>
      <View style={{
        // position: 'absolute',
        // flex:1, 
        backgroundColor: '#EF4260',
        top:-60,
        left:-16,
        width:  Dimensions.get('screen').width,
        height: 100,
        opacity: 0.5
      }}
      >

<Image
          style={{
            backgroundColor: 'skyblue',
            top: 0, left: 0, position: 'absolute',
            width: Dimensions.get('screen').width,
            height: (Dimensions.get('screen').width * (300 / 1290)),
            resizeMode: "contain",
            opacity: 0.3
          }}
          source={require('../../../assets/tabbar/tabbar_bg.png')}
        />
        <Text allowFontScaling={false} id='textArtistPages' style={{
          // position: 'absolute',
          top: 43, left: 30,
          width: Dimensions.get('screen').width - 40, height: 100,
          fontFamily: 'RobotoCondensed-Regular',
          // backgroundColor: 'indigo',
          textAlign: 'left',
          color:'#000000',
          fontSize: 26,
        }}>
          {"ARTIST PAGES"}
        </Text>
 
      </View>


    </>


  );
}

export default HeaderNavigator;