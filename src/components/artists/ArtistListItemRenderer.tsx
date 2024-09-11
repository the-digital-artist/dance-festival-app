import { Dimensions, Image, StyleSheet, View } from 'react-native';
import LauncherController from '../../LauncherController';
import ActionArtistListOnDetailsBtn from '../../actions/ActionArtistListOnDetailsBtn';
import LText from '../../core/LText';
import LTouchableOpacity from '../../core/LTouchableOpacity';
import ButtonSmall from '../ButtonSmall';

//Data Item Example:
// "Debbie Pacheco": {
//     "fullName": "Debbie Pacheco",
//     "pronouns": "",
//     "artistLocation": "",
//     "artistCompany": "",
//     "editionData": [
//       "01-2024"
//     ],
//     "insta": "@__mysticwellness",
//     "web": "https://www.mystic-wellness.com",
//     "bio": "13 years ago, I walked into my first yoga studio with excruciating back pain and a desperate need for change. I was nervous about finding the right studio because I didn't fit the \"typical yoga image.\" But I stumbled upon a new studio in town and was welcomed with open arms into a loving and supportive community. This experience transformed me, and I finally felt like I was stepping into my truest form.\n\nDuring my yoga teacher training, I discovered my passion for creating a diverse and welcoming community. As a Latina (first generation Salvadoran), I often felt like I didn't belong in the wellness world, and I knew that I wanted to change that by giving everyone a space to practice as they are. With continued studies and the development of my own healing rituals, I created MYSTIC WELLNESS - a transformative space that is designed to revitalize you, no matter your background.\n\nMy teachings of sound meditation, Kundalini Yoga, and plant medicine guidance are all-inclusive, led from the heart, and infused with fun. Let me help you find your inner mystic and embark on a journey of finding your essence.",
//     "shortBio": "",
//     "facebook": "",
//     "portrait": "debbie_pacheco",
//     "email": "debbie@mystic-wellness.com",
//     "phone": "415-818-7799"
//   },

const ArtistListItemRenderer = ({ item, index }) => {
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
                  top: 15,
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