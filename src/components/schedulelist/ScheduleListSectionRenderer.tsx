import { BlurView } from "expo-blur";
import { Dimensions, Image, Text, View } from "react-native";



const ScheduleListSectionRenderer = ({ section: { title } }) => {

  let color = '#907b86';
  const colorMapping = {
    'Opening': {color1:  "#2c252d", opacity1: 1 },
    'Main Fair': {color1:  "#2c252d", opacity1: 1 },
    'Closing': {color1:  "#2c252d", opacity1: 1 },
    'Group Classes, Conversations, Outside' : {color1:  "#8d4487", opacity1: 1 }, 
    'Massage' : {color1:  "#907b86", opacity1: 0 }, 
    'Crafty Corner' : {color1:  "#907b86", opacity1: 0 }, 
  }

  return (
    <View
      style={{
        width: Dimensions.get('screen').width,
        height: 30,
        opacity:colorMapping[title] != undefined ? colorMapping[title].opacity1 : 1.0,
        backgroundColor: colorMapping[title] != undefined ? colorMapping[title].color1 : color,
      }}
    >
      {/* { <Image source={require('../../../assets/schedulelist-section-opening.png')}
          style={{
            position:'absolute',
            width: Dimensions.get('screen').width,
            resizeMode: 'contain',
            opacity: 1.0,
            height: 30,
            // backgroundColor: '#d5b0b4'
          }}
        /> 
} */}

      <Text allowFontScaling={false} id='textSessionCategoryAndRoom' style={{
        position: 'absolute',
        top: 5,
        left: 0,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 2.2,
        opacity: 1.0,
        padding: 2,
        // backgroundColor: '#e8b18c',
        width: Dimensions.get('screen').width,
        textAlign: 'center',
        color: '#EFEFEF',
        fontSize: 12,
      }}>
        {title.toLocaleUpperCase()}
      </Text >
    </View>
  );
}

export default ScheduleListSectionRenderer;