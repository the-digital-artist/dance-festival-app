import { Dimensions, Image, StyleSheet, View } from 'react-native';
import TransitionArtistNavigateDown from '../../transitions/TransitionArtistNavigateDown';
import ButtonSmall from '../ButtonSmall';
import SettingsScreen from './SettingsScreen';

const SettingsItemRenderer = ({ item, index }) => {
  const centerPieceWidth = Dimensions.get('screen').width - (5 + 45 + 35 + 35 + 5)
  const paddingLeftAndRight = 25;

  return (
    <>
      <View
        style={{
          backgroundColor: 'transparent',
          left: paddingLeftAndRight,
          height: SettingsScreen.settingsItemRendererHeight,
          width: Dimensions.get('screen').width - 2 * paddingLeftAndRight,
          borderTopColor: '#edc36a',
          borderTopWidth: 0,
          borderBottomColor: 'black',
          borderBottomWidth: index>=SettingsScreen.settingsListData.length-1?0:StyleSheet.hairlineWidth,
        }}>

        <>
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
            fontStyle={{
              left: 30,
              width: Dimensions.get('screen').width - (2 * 30),
              fontFamily: 'Cabin-Regular',
              textAlign: 'left',
              textAlignVertical: 'center',
              letterSpacing: 2.0,
              color: '#FFFFFF',
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