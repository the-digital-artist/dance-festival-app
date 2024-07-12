import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import ButtonSmall from '../ButtonSmall';
import TransitionArtistNavigateDown from '../../transitions/TransitionArtistNavigateDown';
import LauncherController from '../../LauncherController';
import LTouchableOpacity from '../../core/LTouchableOpacity';
import ActionArtistListOnDetailsBtn from '../../actions/ActionArtistListOnDetailsBtn';

const ArtistListItemRenderer = ({ item, index }) => {
  const centerPieceWidth = Dimensions.get('screen').width - (5 + 45 + 35 + 35 + 5)
  const paddingLeftAndRight = 5;
  const itemHeight = 130;

  const imageSize = 100;
  const imageOffsetY = (itemHeight-imageSize)/2


  return (
    <>

           
      <LTouchableOpacity
        name={("ArtistListItemRenderer"+index)}
        style={{
          backgroundColor: 'transparent',
          left: paddingLeftAndRight,
          height: itemHeight, width: Dimensions.get('screen').width - 2 * paddingLeftAndRight,
          borderTopColor: '#edc36a',
          borderTopWidth: 0,
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
        onPress={() => { ActionArtistListOnDetailsBtn(item)}}
        >

        <>
          <Image
            source={item.imgSrc}
            style={{
              position: 'absolute', resizeMode: 'cover', opacity: 1.0,
              left: 0, top: imageOffsetY, width: imageSize, height: imageSize,
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
            color: '#e7ad54',
            fontSize: 14,
          }}>{(item.fullName as string).toLocaleUpperCase()}
          </Text>

          {item.fullName != '' &&
            <ButtonSmall
              name={("focusItemArtistButton"+index)}
              source={null}
              style={{
                position: 'absolute',
                left: 140,
                top: 60,
                height: 26, width: 120,
              }}
              text={"ARTIST DETAILS"}
              bgBoxVisible={true}
              bgBoxStyle={{
                backgroundColor: '#f2a33a',
                height: 26, width: 120
              }}
              fontStyle={{
                width: 120,
                fontFamily: 'Cabin-Regular',
                textAlign: 'center',
                textAlignVertical: 'center',
                letterSpacing: 2.0,
                color: '#36373a',
                fontSize: 10,
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