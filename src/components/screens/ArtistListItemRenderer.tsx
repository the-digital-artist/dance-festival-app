import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import ActionArtistListOnDetailsBtn from '../../actions/ActionArtistListOnDetailsBtn';
import LTouchableOpacity from '../../core/LTouchableOpacity';
import ButtonSmall from '../ButtonSmall';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import LauncherController from '../../LauncherController';
import LText from '../../core/LText';

const ArtistListItemRenderer = ({ item, index }) => {
  const centerPieceWidth = Dimensions.get('screen').width - (5 + 45 + 35 + 35 + 5)
  const paddingLeftAndRight = 5;
  const itemHeight = 130;

  const imageSize = 100;
  const imageOffsetY = (itemHeight - imageSize) / 2

  const editionData = item['editionData'] != undefined ? item['editionData'] : [];


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

          <Image
            source={require('../../../assets/artist-itemrenderer-dividerline.png')}
            style={{
              position: 'absolute', resizeMode: 'contain', opacity: 0.5,
              left: Dimensions.get('screen').width - 130,
              top: imageOffsetY + 3, width: 2, height: 2 * (220 / 5),
            }}
          />

          <LText id='textHeadlineEditions' style={{
            position: 'absolute',
            top: imageOffsetY,
            left: Dimensions.get('screen').width - 120,
            width: 150, height: 11,
            // backgroundColor: 'indigo',
            textAlign: 'left',
            fontFamily: 'Cabin-Regular',
            letterSpacing: 1.0,
            color: '#FFFFFF',
            fontSize: 8,
          }}>WELL-BEING PRESENCE</LText>

          {editionData.map((editionName, i) => {
            // console.log("editiondata" + JSON.stringify(LauncherController.getInstance().staticImageMap[editionName]));

            return (
              <Image
                key={"editionImage" + item.fullName + editionName}
                source={LauncherController.getInstance().staticImageMap[editionName].imgSrc}
                style={{
                  position: 'absolute', resizeMode: 'cover', opacity: 1.0,
                  left: Dimensions.get('screen').width - 110 + i * 15, top: imageOffsetY + 20, width: 40, height: 40,
                }}
              />
            )
          })
          }

          <View
            style={{
              position: 'absolute',
              top: 30, left: 125,
              flexDirection: 'column',
              width: Dimensions.get('screen').width - imageSize - 160, 
              // backgroundColor: 'red',
            }}>
            <LText id='textArtistName'
              style={{
                top: 0, left: 0,
                fontFamily: 'Cabin-Regular',
                letterSpacing: 2.0,
                // backgroundColor: 'skyblue',
                textAlign: 'left',
                color: '#26272b',
                fontSize: 14,
              }}>{(item.fullName as string).toLocaleUpperCase()}
            </LText>

            {item.fullName != '' &&
              <ButtonSmall
                name={("focusItemArtistButton" + index)}
                source={null}
                style={{
                  top:15,
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
                  letterSpacing: 2.0,
                  color: '#FFFFFF',
                  fontSize: 9,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  top: 6
                }}
                visualProperties={{ alpha: 1 }}
                onSelect={() => { ActionArtistListOnDetailsBtn(item) }}
              />
            }


          </View>

        </>
      </LTouchableOpacity>
    </>
  );
}

export default ArtistListItemRenderer;