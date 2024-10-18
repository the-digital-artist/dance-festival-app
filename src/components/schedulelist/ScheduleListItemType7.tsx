import { Dimensions, Text, View } from 'react-native';
import LText from '../../core/LText';
import ButtonSmall from '../ButtonSmall';
import LauncherController from '../../LauncherController';
import TransitionLinkToArtistPage from '../../transitions/TransitionLinkToArtistPage';
import DataModel from '../../DataModel';



const ScheduleListItemType7 = ({ item }) => {

  // console.log("ScheduleListItem7: ");
  if (item.itemType != 'type7') return;

  let mainTitleColor = '#e1e7ac';
  if (item.sessionMainTitle.toLowerCase() == 'registration')
    mainTitleColor = '#bcbed4'

  const imageWidthArtistImagex1 = item.itemHeight;

  const isPerformance = (item.sessionMainTitle.toLowerCase().indexOf('performances') != -1)

  return (
    <>
      <View id='bg' style={{
        position: 'absolute',
        top: 0, left: -5,
        height: item.itemHeight,
        width: Dimensions.get('screen').width,
        opacity: 0.2,
        padding: 0,
        backgroundColor: '#382b38',
      }}
      />
      <LText allowFontScaling={false} id='textSessionMainTitle' style={{
        position: 'absolute',
        top: 35,
        left: 70,
        width: Dimensions.get('screen').width - 60 - 35,
        fontFamily: 'DINCondensed-Bold',
        // backgroundColor: 'indigo',
        letterSpacing: 0.5,
        textAlign: 'left',
        color: mainTitleColor,
        fontSize: 22,
        opacity: 1.0
      }}>
        {(item.sessionMainTitle as string).toLocaleUpperCase()}
      </LText>

      <LText allowFontScaling={false} id='textSessionMainTitle' style={{
        position: 'absolute',
        top: 65,
        left: 70,
        width: Dimensions.get('screen').width - 60 - 35-50,
        fontFamily: 'Arcon-Regular',
        // backgroundColor: 'indigo',
        letterSpacing: 2.7,
        textAlign: 'left',
        color: '#e7e7e2',
        fontSize: 13,
        opacity: 1.0
      }}>
        {(item.sessionSubtitle as string).toLocaleUpperCase()}
      </LText>

      {item.room != undefined && item.room != '' &&
        <Text allowFontScaling={false} id='textSessionCategoryAndRoom' style={{
          position: 'absolute',
          top: 5,
          left: 120,

          fontFamily: 'Cabin-Regular',
          letterSpacing: 1.2,
          opacity: 0.9,
          padding: 2,
          textAlign: 'left',
          color: '#FFFFFF',

          // backgroundColor: '#e7e7e2',
          backgroundColor: '#5f7a9b',
          // color: '#232323',
          fontSize: 11,
        }}>
          {(item.room ? " " + (item.room as string).toLocaleUpperCase() + " " : "")}
        </Text >
      }

      {isPerformance &&
        <ButtonSmall
          name={("artistImageButton1" + item.id)}
          source={LauncherController.getInstance().staticImageList['clifton_stennett'].imgSrc}
          style={{
            position: 'absolute',
            bottom: 5,
            right: 0,
            width: imageWidthArtistImagex1,
            height: imageWidthArtistImagex1,
          }}
          imageStyle={[{
            position: 'absolute',
            right: undefined, left: undefined,
            width: imageWidthArtistImagex1,
            height: imageWidthArtistImagex1,
            resizeMode: 'cover',
            opacity: 0.9,
          }]}
          bgBoxVisible={false}
          visualProperties={{ alpha: 1 }}
          onSelect={() => {
            LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage", data: {} });
            TransitionLinkToArtistPage(DataModel.getInstance().static.dataArtists['Clifton Stennett'])
          }}
        />
      }
    </>
  );
}

export default ScheduleListItemType7;