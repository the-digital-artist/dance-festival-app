import { BlurView } from "expo-blur";
import { Dimensions, Image, Platform, Text, View } from "react-native";

const ArtistListSectionRenderer = ({ section: { title } }) => {

  let color = '#ffffff';
  const colorMapping = {
    'Current Edition "Autumn Abundance"': { color1: "#c2b9cb", opacity1: 0.5 },
    'Previous Editions': { color1: "#ccd9f3", opacity1: 0.5 },
  }

  return (
    <View
      style={{
        width: Dimensions.get('screen').width,
        height: 45,
      }}
    >
      {Platform.OS == "ios" && <BlurView
        intensity={30}
        style={{
          position: 'absolute',
          top: 0,
          width: Dimensions.get('screen').width,
          height: 45,
          opacity: 1.0,
          // backgroundColor:'skyblue'

        }} />
      }

      <View
        style={{
          position: 'absolute',
          width: Dimensions.get('screen').width,
          top: 0,
          height: 45,
          opacity: 0.75,
          backgroundColor: colorMapping[title] != undefined ? colorMapping[title].color1 : color,
        }}
      >
        {/* {(title as string).startsWith('Cur') &&
        <Image source={require('../../../assets/editions/03-2024-headline.png')}
          style={{
            position: 'absolute',
            resizeMode: 'contain',
            opacity: 1.0,
            height: 30,
            width: 30 * 200/97,
            right: 30,
            top:5,
            // backgroundColor: '#d5b0b4'
          }}
        />
      } */}

        <Text allowFontScaling={false} id='textSessionCategoryAndRoom' style={{
          position: 'absolute',
          top: 12,
          left: 0,
          fontFamily: 'Cabin-Regular',
          letterSpacing: 2.2,
          opacity: 1.0,
          padding: 2,
          width: Dimensions.get('screen').width,
          textAlign: 'center',
          color: '#232323',
          fontSize: 12,
        }}>
          {title.toLocaleUpperCase()}
        </Text >
      </View>
    </View>
  );
}

export default ArtistListSectionRenderer;