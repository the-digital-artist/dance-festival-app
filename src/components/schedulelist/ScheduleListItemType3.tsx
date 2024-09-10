import { Dimensions, Image, Platform, Text, View } from 'react-native';
import DataModel from '../../DataModel';
import LText from '../../core/LText';
import ButtonSmall from '../ButtonSmall';
import LauncherController from '../../LauncherController';
import TransitionLinkToArtistPage from '../../transitions/TransitionLinkToArtistPage';


// 'Main Fair Room': 'type3',
const ScheduleListItemType3 = ({ item, orientation }) => {

  // console.log("ScheduleListItem: " + JSON.stringify(item, null, 2));
  if (item.itemType != 'type3') return;

  const sessionCategoryName = "BOOTH"
  const artistData1 = DataModel.getInstance().static.dataArtists[item.artistOne];
  const artistData2 = item.artistTwo ? DataModel.getInstance().static.dataArtists[item.artistTwo] : null;
  const verticalOffsetTitleLength = item.lineCount != undefined ? (item.lineCount * 19) : 19;
  const preSignupRequired = false;

  const artistImageSize = item.itemHeight - 52;

  const itemOrientation: string = 'left'//orientation


  const companyString = artistData1.artistCompany != undefined ? artistData1.artistCompany : '';

  return (
    <>
      <View id='bg' style={{
        position: 'absolute',
        top: 0, left: 0,
        height: item.itemHeight - 50,
        width: Dimensions.get('screen').width - 10,
        opacity: 0.2,
        padding: 0,
        backgroundColor: '#382b38',
      }}
      />

      {/* <Text allowFontScaling={false} id='textSessionCategoryAndRoom' style={{
        position: 'absolute',
        top: 7,
        left: Dimensions.get('screen').width/2-56,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 1.2,
        opacity: 0.4,
        padding: 2,
        backgroundColor: '#382b38',
        // backgroundColor: '#600f2c',
        textAlign: 'left',
        color: '#bcd4ee',
        fontSize: 11,
      }}> */}
      {/* {sessionCategoryName.toLocaleUpperCase() + "  |  " + (item.room ? (item.room as string).toLocaleUpperCase() + " " : "")} */}
      {/* {(item.room ? (item.room as string).toLocaleUpperCase() + " " : "")} */}
      {/* </Text > */}

      <View
        style={{
          position: 'absolute',
          // backgroundColor: 'skyblue',
          flex: 1, flexDirection: 'column',
          left: (itemOrientation == 'left' ? artistImageSize : undefined),
          right: (itemOrientation == 'right' ? artistImageSize : undefined),
          top: 0,
          width: Dimensions.get('screen').width - artistImageSize - 40,
          height: 130
        }}>

        <LText allowFontScaling={false} id='textSessionMainTitle' style={{
          top: 10,
          left: (itemOrientation == 'left' ? 25 : undefined),
          right: (itemOrientation == 'right' ? 25 : undefined),
          fontFamily: 'RobotoCondensed-Regular',
          // backgroundColor: 'indigo',
          letterSpacing: 0.0,
          textAlign: itemOrientation,
          color: '#d2cbd1',
          fontSize: 20,
        }}>

          <LText>
            {(item.sessionMainTitle ? (item.sessionMainTitle as string) : "") + "  "}
          </LText>

        </LText>

        <Text allowFontScaling={false} id='textArtistName' style={{
          top: 15,
          right: (itemOrientation == 'right' ? 25 : undefined),
          left: (itemOrientation == 'left' ? 25 : undefined),
          fontFamily: 'Cabin-Regular',
          letterSpacing: 2.0,
          fontSize: 13,
          // backgroundColor: 'indigo',
          textAlign: (itemOrientation == 'left' ? 'left' : 'right'),
          color: '#FFFFFF',

        }}>
          {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
        </Text>

      </View >

      <ButtonSmall
        name={("artistImageButton1" + item.id)
        }
        source={artistData1 ? artistData1.imgSrc : null}
        style={{
          position: 'absolute',
          // backgroundColor: 'skyblue',
          top: Platform.OS == 'ios' ? -1 : 0,
          right: (itemOrientation == 'right' ? 0 : undefined),
          left: (itemOrientation == 'left' ? 0 : undefined),
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
            opacity: 1.0,
          }]}
        bgBoxVisible={false}
        visualProperties={{ alpha: 1 }}
        onSelect={() => {
          if (artistData1 == undefined) return;
          LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage" });
          TransitionLinkToArtistPage(artistData1)
        }}
      />

      <ButtonSmall
        name={("ScheduleListArtistDetailsButton" + item.id)}
        source={null}
        style={{
          position: 'absolute',
          left: (itemOrientation == 'left' ? 160 : undefined),
          right: (itemOrientation == 'right' ? 160 : undefined),
          bottom:  60,
          height: 23, width: 120,
        }}
        text={"DETAILS"}
        bgBoxVisible={true}
        bgBoxStyle={{
          backgroundColor: '#232323',
          opacity: 0.5,
          height: 23, width: 120
        }}
        fontStyle={{
          width: 120,
          top: ((Platform.OS == 'android')) ? -2 : 5,
          color: '#FFFFFF',
          fontFamily: 'Cabin-Regular',
          textAlign: 'center',
          textAlignVertical: 'center',
          letterSpacing: 2.0,
          // color: '#FFFFFF',
          fontSize: 9,
          height: 23,
        }}
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

export default ScheduleListItemType3;