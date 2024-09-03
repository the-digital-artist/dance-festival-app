import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import ActionArtistListOnDetailsBtn from '../../actions/ActionArtistListOnDetailsBtn';
import LTouchableOpacity from '../../core/LTouchableOpacity';
import ButtonSmall from '../ButtonSmall';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const ArtistListItemRenderer = ({ item, index }) => {
  const centerPieceWidth = Dimensions.get('screen').width - (5 + 45 + 35 + 35 + 5)
  const paddingLeftAndRight = 5;
  const itemHeight = 130;

  const imageSize = 100;
  const imageOffsetY = (itemHeight - imageSize) / 2


  return (
    <>


      <LTouchableOpacity
        name={("ArtistListItemRenderer" + index)}
        style={{
          // position: 'absolute',
          backgroundColor: 'transparent',
          left: paddingLeftAndRight,
          height: itemHeight, width: Dimensions.get('screen').width - 2 * paddingLeftAndRight,
          borderTopColor: '#78747c',
          borderTopWidth: 0,
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
        onPress={() => { ActionArtistListOnDetailsBtn(item) }}
      >
        <>
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'transparent',
              left: -paddingLeftAndRight,
              height: itemHeight, width: Dimensions.get('screen').width,
              // borderTopColor: '#edc36a',
              borderTopWidth: 0,
              // borderBottomColor: 'black',
              // borderBottomWidth: StyleSheet.hairlineWidth,
              opacity: 0.56
            }} />
          <Image
            source={item.imgSrc}
            style={{
              position: 'absolute', resizeMode: 'cover', opacity: 1.0,
              left: 10, top: imageOffsetY, width: imageSize, height: imageSize,
            }}
          />

          <Text allowFontScaling={false} id='textArtistName' style={{
            position: 'absolute',
            top: 30, left: 140,
            width: 290, height: 19,
            fontFamily: 'Cabin-Regular',
            letterSpacing: 2.0,
            // backgroundColor: 'indigo',
            textAlign: 'left',
            color: '#26272b',
            fontSize: 14,
          }}>{(item.fullName as string).toLocaleUpperCase()}
          </Text>

          {item.fullName != '' &&
            <ButtonSmall
              name={("focusItemArtistButton" + index)}
              source={null}
              style={{
                position: 'absolute',
                left: 140,
                top: 60,
                height: 26, width: 120,
              }}
              text={"MORE DETAILS"}
              bgBoxVisible={true}
              bgBoxStyle={{
                backgroundColor: '#4c4a4d',
                height: 23, width: 120
              }}
              fontStyle={{
                width: 120,
                fontFamily: 'Cabin-Regular',
                textAlign: 'center',
                textAlignVertical: 'center',
                letterSpacing: 2.0,
                color: '#FFFFFF',
                fontSize: 9,
                top: 6
              }}
              visualProperties={{ alpha: 1 }}
              onSelect={() => { ActionArtistListOnDetailsBtn(item) }}
            />
          }
        </>
      </LTouchableOpacity>
    </>
  );
}

export default ArtistListItemRenderer;