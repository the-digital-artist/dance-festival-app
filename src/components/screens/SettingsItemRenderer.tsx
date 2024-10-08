import { Dimensions, Image, StyleSheet, View } from 'react-native';
import TransitionArtistNavigateDown from '../../transitions/TransitionArtistNavigateDown';
import ButtonSmall from '../ButtonSmall';
import SettingsScreen from './SettingsScreen';

const SettingsItemRenderer = ({ item, index }) => {
  const centerPieceWidth = Dimensions.get('screen').width - (5 + 45 + 35 + 35 + 5)
  const paddingLeftAndRight = 25;

  return (
    <>
      {/* <Image
        style={{
          // backgroundColor: 'skyblue',
          top: 0, left: 0, position: 'absolute',
          width: Dimensions.get('screen').width,
          height: SettingsScreen.settingsItemRendererHeight,
          resizeMode: "repeat",
          opacity: 0.02
        }}
        source={require('../../../assets/tabbar/tabbar_bg.png')}
      /> */}
      <View
        style={{
          backgroundColor: 'transparent',
          left: paddingLeftAndRight,
          height: SettingsScreen.settingsItemRendererHeight,
          width: Dimensions.get('screen').width - 2 * paddingLeftAndRight,
          borderTopColor: 'white',
          borderTopWidth: 0,
          borderBottomColor: 'white',
          borderBottomWidth: index>=2?0:StyleSheet.hairlineWidth,
        }}>

        <>
          {/* <Image
            source={item.imgSrc}
            style={{
              position: 'absolute', resizeMode: 'cover', opacity: 1.0,
              left: 0, top: 0, width: 130, height: 130,
            }}
          /> */}


          <ButtonSmall
            name={("moreScreenListItemAction"+index)}
            source={null}
            style={{
              position: 'absolute',
              left: 0,
              top: 10,
              height: 30, width: Dimensions.get('screen').width,
            }}
            text={(item.title as string).toLocaleUpperCase()}
            bgBoxVisible={false}
            bgBoxStyle={{
              // backgroundColor: '#edad12',
              backgroundColor: '#EF4260',
              height: 30, width: Dimensions.get('screen').width - (2 * 30)
            }}
            fontStyle={{
              left: 30,
              width: Dimensions.get('screen').width - (2 * 30),
              fontFamily: 'Cabin-Regular',
              textAlign: 'left',
              textAlignVertical: 'center',
              letterSpacing: 2.0,
              color: '#281a05',
              opacity: 0.7,
              fontSize: 12,
            }}
            visualProperties={{ alpha: 1 }}
            onSelect={() => { item.action()}}
          />
        </>

      </View>


    </>
  );
}

export default SettingsItemRenderer;