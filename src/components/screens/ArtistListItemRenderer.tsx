import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import ButtonSmall from '../ButtonSmall';
import TransitionArtistNavigateDown from '../../transitions/TransitionArtistNavigateDown';

const ArtistListItemRenderer = ({ item, index }) => {
  const centerPieceWidth = Dimensions.get('screen').width - (5 + 45 + 35 + 35 + 5)
  const paddingLeftAndRight = 5;
  let itemHeight = 130;

  return (
    <>
      {/* <Image
                    style={{
                        // backgroundColor: 'skyblue',
                        top: 5, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width,
                        height: (Dimensions.get('screen').width * (300 / 1290)),
                        resizeMode: "contain",
                        opacity: 0.1
                    }}
                    source={require('../../../assets/tabbar/tabbar_bg.png')}
                /> */}
      <View
        style={{
          backgroundColor: 'transparent',
          left: paddingLeftAndRight,
          height: itemHeight, width: Dimensions.get('screen').width - 2 * paddingLeftAndRight,
          borderTopColor: '#edc36a',
          borderTopWidth: 0,
          borderBottomColor: 'black',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}>

        <>
          <Image
            source={item.imgSrc}
            style={{
              position: 'absolute', resizeMode: 'cover', opacity: 1.0,
              left: 0, top: 0, width: 130, height: 130,
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
            color: '#dd5163',
            fontSize: 14,
          }}>{(item.name as string).toLocaleUpperCase()}
          </Text>

          {item.name != '' &&
            <ButtonSmall
              name={("focusItemArtistButton")}
              source={null}
              style={{
                position: 'absolute',
                left: 140,
                top: 60,
                height: 26, width: 100,
              }}
              text={"ARTIST DETAILS"}
              bgBoxVisible={true}
              bgBoxStyle={{
                backgroundColor: '#EF4260',
                height: 26, width: 100
              }}
              fontStyle={{
                width: 100,
                fontFamily: 'Cabin-Regular',
                textAlign: 'center',
                textAlignVertical: 'center',
                letterSpacing: 2.0,
                color: '#FFFFFF',
                fontSize: 8.5,
              }}
              visualProperties={{ alpha: 1 }}
              onSelect={() => { TransitionArtistNavigateDown(item) }}
            />
          }
        </>

      </View>


    </>
  );
}

export default ArtistListItemRenderer;