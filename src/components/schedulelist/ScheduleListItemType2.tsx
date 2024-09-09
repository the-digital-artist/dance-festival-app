import { Dimensions, StyleSheet, Text, View } from 'react-native';
import LText from '../../core/LText';
import LComponent from '../../core/LComponent';
import ButtonSmall from '../ButtonSmall';
import DataModel from '../../DataModel';
import LauncherController from '../../LauncherController';
import TransitionLinkToArtistPage from '../../transitions/TransitionLinkToArtistPage';

const ScheduleListItemType2 = ({ item }) => {
  // console.log("ScheduleListItem: " + JSON.stringify(item, null, 2));
  if (item.itemType != 'type2') return;

  const artistData1 = DataModel.getInstance().static.dataArtists[item.artistOne];
  const artistImageSize = item.itemHeight;

  return (
    <>
      <View id='bg' style={{
        position: 'absolute',
        top: 0, left: 0,
        height: item.itemHeight,
        width: Dimensions.get('screen').width,
        opacity: 0.1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#FFFFFF',
        padding: 0,
        backgroundColor: '#382b38',
      }}
      />

      {/* <LText allowFontScaling={false} id='textSessionMainTitle' style={{
        position: 'absolute',
        top: 0,
        left: (4 + 35),
        width: Dimensions.get('screen').width - 70,
        fontFamily: 'RobotoCondensed-Regular',
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#fefefe',
        fontSize: (14),
        opacity: 1.0
      }}>
        {(item.groupTitle as string).toLocaleUpperCase()}
      </LText> */}

      <View
        style={{
          position: 'absolute',
          top: 0,
          left: (artistImageSize),
          width: Dimensions.get('screen').width / 2 - 16,
          height:item.itemHeight-1,
          backgroundColor: '#421552',
          opacity: 0.1
        }}


      />
      <LText allowFontScaling={false} id='textSessionMainTitle' style={{
        position: 'absolute',
        top: 5,
        left: (artistImageSize + 13),
        width: Dimensions.get('screen').width / 2 - 35,
        fontFamily: 'RobotoCondensed-Regular',
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#fefefe',
        fontSize: (15),
        opacity: 1.0
      }}>
        {(item.sessionMainTitle as string)}
      </LText>


      <LText allowFontScaling={false} id='textSessionArtistName' style={{
        position: 'absolute',
        top: 25,
        right: (15),
        width: Dimensions.get('screen').width - (Dimensions.get('screen').width / 2 - 30) - (artistImageSize + 13) - (4 + 35),
        fontFamily: 'Cabin-Regular',
        letterSpacing: 2.0,
        fontSize: 10,
        // backgroundColor: 'skyblue',
        textAlign: 'right',
        color: '#3f3639',
        // fontSize: (fontSizeArtistName),
      }}>
        {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
      </LText >

      <ButtonSmall
        name={("artistImageButton1" + item.id)
        }
        source={artistData1 ? artistData1.imgSrc : null}
        style={{
          position: 'absolute',
          // backgroundColor: 'skyblue',
          top: 0,
          left: 0,
          width: artistImageSize,
          height: artistImageSize,
        }}
        imageStyle={
          [{
            position: 'absolute',
            right: undefined, left: undefined,
            width: artistImageSize,
            height: artistImageSize,
            resizeMode: 'cover',
            opacity: 0.9,
          }]}
        bgBoxVisible={false}
        visualProperties={{ alpha: 1 }}
        onSelect={() => {
          if (artistData1 == undefined) return;
          LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage" });
          TransitionLinkToArtistPage(artistData1)
        }}
      />
    </>
  );
}

export default ScheduleListItemType2;