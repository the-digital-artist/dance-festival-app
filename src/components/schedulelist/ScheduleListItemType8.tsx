import { Dimensions, Image, Text, View } from 'react-native';
import LText from '../../core/LText';
import Animated from 'react-native-reanimated';



const ScheduleListItemType8 = ({
  item,
  index,
  tileWidth,
  tileHeight,
  tileOffsetLeft,
  tileOffsetTop,
  dynamicVisualProperties0,
  dynamicVisualProperties1,
  dynamicVisualProperties2,

}) => {

  // console.log("ScheduleListItem8: ");

  const djStyleAndRoom = item.room
  const djEntries = item.items;


  return (
    <>
      <Animated.View
        style={[{
          position: 'absolute',
          left: tileOffsetLeft, top: tileOffsetTop,
          height: tileHeight, width: tileWidth,
          opacity: 1,
          // backgroundColor:'red',
        }, dynamicVisualProperties0]}
      >

        <Image
          source={require('../../../assets/hometile-overlay-shine.png')}
          style={{
            backgroundColor: 'greenyellow',
            position: 'absolute',
            left: 0, top: 0,
            opacity: 0.2,
            width: tileWidth,
            height: tileHeight - 30,
            resizeMode: 'cover'
          }}
        />
        {item.room != undefined && item.room != '' &&
          <>

            {/* <View
            // name={"ScheduleItemFrame2_" + item.id}
            style={{
              position: 'absolute',
              backgroundColor: 'transparent',
              borderColor: '#5e8099',
              borderLeftWidth: 3,
              // borderRightWidth: 3,
              borderTopWidth: 20,
              borderBottomWidth: 0,
              opacity: 1,
              left: 0,
              top: 20,
              height: tileHeight,
              width: tileWidth
            }}/> */}
            <Text allowFontScaling={false}
              id='textSessionCategoryAndRoom'
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                fontFamily: 'DINCondensed-Regular',
                textAlign: 'center',
                color: '#232323',
                fontSize: 15,
                opacity: 0.8,
                padding: 2,
                width: tileWidth,
                height: 20,
                backgroundColor: '#e7e7e2',
                // backgroundColor: '#600f2c',
                // textAlign: 'center',
                // color: '#232323',
                // fontSize: 11,
              }}>
              {(djStyleAndRoom ? " " + (djStyleAndRoom as string).toLocaleUpperCase() + " " : "")}
            </Text >
          </>
        }


        {djEntries.map((djItem, i) => {
          //if the time is in US format, we want sections with AM and PM being very small
          const timeTextFields = []
          const timeStringArray = djItem.time != undefined ? (djItem.time as string).toLowerCase().split('m') : [];
          for (let k = 0; k < timeStringArray.length; k++) {
            const s = timeStringArray[k]
            const charAmOrPm = s.charAt(s.length - 1);
            if (charAmOrPm != 'a' && charAmOrPm != 'p') {
              timeTextFields.push({ type: 'normal', str: s });
              continue;
            }
            timeTextFields.push({ type: 'normal', str: s.substring(0, s.length - 2) });
            timeTextFields.push({ type: 'high', str: (" " + s.substring(s.length - 1) + 'm') });
          }

          return (
            <View
            key={`djItemId` + djItem.id+i}
              style={{
                position: 'absolute',
                top: 35 + i * 20,
                left: 0 + 20,
                width: tileWidth - 20 - 20,
                height: 14,
                // backgroundColor: 'skyblue',
                // backgroundColor: 'indigo',
                opacity: 1.0
              }}>
              <LText id='textTime' style={{
                position: 'absolute',
                top: 3, left: -3,
                width: 100, height: 15,
                fontFamily: 'DINNeuzeitGroteskStd-Light',
                // backgroundColor: 'skyblue',
                textAlign: 'left',
                color: '#ede8e3',
                fontSize: 12,
              }}>
                {
                  timeTextFields.map((textItem, i) => {
                    return (
                      <LText
                        id={'djTextTime' + i}
                        key={`djTextTime` + i}
                        style={{
                          top: textItem.type == 'high' ? 1 : 5, margin: 0,
                          width: 70, height: 15,
                          fontFamily: 'DINNeuzeitGroteskStd-Light',
                          // backgroundColor: 'red',
                          textAlign: 'left',
                          color: '#ede8e3',
                          fontSize: djItem.type == 'high' ? 7 : 12,
                        }}>
                        {textItem.str}
                      </LText>
                    )
                  })
                }
              </LText>

              <LText
                id='testDjName' style={{
                  position: 'absolute',
                  top: 0,
                  left: djItem.time == '' ? 0 : 53,
                  fontFamily: 'Arcon-Regular',
                  // backgroundColor: 'indigo',
                  letterSpacing: 1.2,
                  textAlign: djItem.time == '' ? 'center' : 'left',
                  color: '#e7e7e2',
                  fontSize: 13,
                  opacity: 1.0
                }}>
                <LText> {djItem.artistName}</LText>
                <LText style={{
                  position: 'relative',
                  top: -3,
                  left: 9,
                  // backgroundColor: 'indigo',
                  fontFamily: 'Cabin-Regular',
                  letterSpacing: 1.2,
                  // opacity: 0.5,
                  // backgroundColor: 'indigo',
                  color: '#232323',
                  fontSize: 8.5,

                  textAlign: 'left',
                  opacity: 1.0
                }}>
                  {(djItem.artistLocation != '' ? "    " + (djItem.artistLocation).toLocaleUpperCase() + '' : '')}
                </LText>
              </LText>
              {/* <LText
            key={'djentry' + i + item.id}
            id='textSessionMainTitle' style={{
              position: 'absolute',
              top: 50 + i * 20,
              left: tileOffsetLeft+250,
              fontFamily: 'DINCondensed-Bold',
              // backgroundColor: 'indigo',
              letterSpacing: 0.7,
              textAlign: 'right',
              color: '#e1e7ac',
              fontSize: 12,
              opacity: 1.0
            }}>
            {(item.artistLocation).toLocaleUpperCase()}
          </LText> */}
            </View>
          )
        })
        }
      </Animated.View>
    </>
  );
}

export default ScheduleListItemType8;