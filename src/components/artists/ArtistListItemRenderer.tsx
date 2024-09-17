import { Dimensions, Image, Text, View } from 'react-native';
import ActionArtistListOnDetailsBtn from '../../actions/ActionArtistListOnDetailsBtn';
import ButtonSmall from '../ButtonSmall';
import LTouchableOpacity from '../../core/LTouchableOpacity';
import { memo, PureComponent, ReactNode } from 'react';

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

class ArtistListItemRenderer extends PureComponent<any, any> {
  constructor(props) {
    super(props)
  }

  render(): ReactNode {
    
    const paddingLeftAndRight = 5;
    const itemHeight = 130;

    const imageSize = 100;
    const imageOffsetY = (itemHeight - imageSize) / 2


    return (
      <>
        <View
          style={{
            backgroundColor: '#1a202e',
            left: -paddingLeftAndRight,
            height: itemHeight, width: Dimensions.get('screen').width,
            borderTopWidth: 0,
            opacity: 0.56
          }} />

        <Image
          source={this.props.item.imgSrc}
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
          color: '#eda253',
          fontSize: 14,
        }}>{(this.props.item.fullName as string).toLocaleUpperCase()}
        </Text>

        {this.props.item.fullName != '' &&
          <ButtonSmall
            name={("focusItemArtistButton" + this.props.index)}
            style={{
              position: 'absolute',
              left: 140,
              top: 60,
              height: 26, width: 120,
            }}
            text={"ARTIST DETAILS"}
            bgBoxVisible={true}
            bgBoxStyle={{
              backgroundColor: '#d6c8cb',
              height: 23, width: 120
            }}
            fontStyle={{
              width: 120,
              fontFamily: 'Cabin-Regular',
              textAlign: 'center',
              textAlignVertical: 'center',
              letterSpacing: 2.0,
              color: '#010101',
              fontSize: 9,
              top: 6
            }}
            visualProperties={{ alpha: 1 }}
            onSelect={() => { ActionArtistListOnDetailsBtn(this.props.item) }}
          />
        }
      </>
    );
  }
}

export default ArtistListItemRenderer;