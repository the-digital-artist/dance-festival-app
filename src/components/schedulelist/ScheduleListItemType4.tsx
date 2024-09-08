import { Dimensions, Image, Platform, Text, View } from 'react-native';
import DataModel from '../../DataModel';
import LauncherController from '../../LauncherController';
import TransitionLinkToArtistPage from '../../transitions/TransitionLinkToArtistPage';
import ButtonSmall from '../ButtonSmall';
import LText from '../../core/LText';
import ActionSessionListOnDetailsBtn from '../../actions/ActionSessionListOnDetailsBtn';


//Special Sessions
const ScheduleListItemType4 = ({ item }) => {

  // console.log("ScheduleListItem: " + JSON.stringify(item, null, 2));
  if (item.itemType != 'type4') return;

  const sessionCategoryName = (item.level != undefined && item.level == 'M') ? " Masterclass " : " Special Track "
  const artistData1 = DataModel.getInstance().static.dataArtists[item.artistOne];
  const artistData2 = item.artistTwo ? DataModel.getInstance().static.dataArtists[item.artistTwo] : null;
  const verticalOffsetTitleLength = item.lineCount != undefined ? (item.lineCount * 19) : 19;
  const preSignupRequired = ((item.sessionMainTitle as string).toLowerCase().indexOf("absolute beginner") == -1)

  const artistImageSize = item.itemHeight;


  const companyString = artistData1.artistCompany != undefined ? artistData1.artistCompany : '';
  return (
    <>
      <View id='bg' style={{
        position: 'absolute',
        top: 33, left: 0,
        height: item.itemHeight - 50,
        width: Dimensions.get('screen').width - 10,
        opacity: 0.2,
        padding: 0,
        backgroundColor: '#382b38',
      }}
      />

      <Text allowFontScaling={false} id='textSessionCategoryAndRoom' style={{
        position: 'absolute',
        top: 7,
        left: 85,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 1.2,
        opacity: 0.8,
        padding: 2,
        backgroundColor: '#382b38',
        // backgroundColor: '#600f2c',
        textAlign: 'left',
        color: '#bcd4ee',
        fontSize: 11,
      }}>
        {sessionCategoryName.toLocaleUpperCase() + "  |  " + (item.room ? (item.room as string).toLocaleUpperCase() + " " : "")}
      </Text >

      <View
        style={{
          // backgroundColor: 'skyblue',
          flex: 1, flexDirection: 'column',
          left: 85,
          top: 43,
          width: Dimensions.get('screen').width / 2,
          height: 40
        }}>

        {preSignupRequired && <Text allowFontScaling={false} id='textPreSignup' style={{
          left: 0,
          width: Dimensions.get('screen').width - 90,
          height: 15,
          fontFamily: 'Cabin-Regular',
          letterSpacing: 1.2,
          // opacity: 0.5,
          // backgroundColor: 'indigo',
          textAlign: 'left',
          color: '#FFFFFF',
          fontSize: 10,
        }}>
          {"PRE-SIGNUP REQUIRED"}
        </Text >
        }


        <LText allowFontScaling={false} id='textSessionMainTitle' style={{
          top: 10,
          left: 0,
          width: 220,
          fontFamily: 'RobotoCondensed-Regular',
          // backgroundColor: 'indigo',
          letterSpacing: 0.0,
          textAlign: 'left',
          color: '#e3dfbb',
          fontSize: 23,
        }}>

          <Text>
            {(item.sessionMainTitle ? (item.sessionMainTitle as string) : "") + "  "}
          </Text>

          <Text allowFontScaling={false} id='textSessionCount' style={{
            fontFamily: 'Cabin-Regular',
            // backgroundColor: 'indigo',
            textAlign: 'left',
            color: '#e3dfbb',
            fontSize: 12,
          }}>
            {item.sessionSpecialTrackCount ? (item.sessionSpecialTrackCount as string).substring(1, item.sessionSpecialTrackCount.length - 1) : ""}
          </Text>
        </LText>


        <Text allowFontScaling={false} id='textArtistName' style={{
          top: 15,
          left: 0,
          width: 290, height: 16,
          fontFamily: 'Cabin-Regular',
          letterSpacing: 2.0,
          fontSize: 13,
          // backgroundColor: 'indigo',
          textAlign: 'left',
          color: '#FFFFFF',

        }}>
          {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
        </Text>

      </View >
      <ButtonSmall
        name={("ScheduleListArtistDetailsButton" + item.id)}
        source={null}
        style={{
          position: 'absolute',
          left: 80,
          top: item.itemHeight - 55,
          height: 23, width: 130,
        }}
        text={"SESSION INFO"}
        bgBoxVisible={true}
        bgBoxStyle={{
          backgroundColor: '#600f2c',
          opacity: 0.4,
          height: 23, width: 130
        }}
        fontStyle={{
          width: 130,
          top: ((Platform.OS == 'android')) ? -2 : 5,
          color: '#EFEFEF',
          fontFamily: 'Cabin-Regular',
          textAlign: 'center',
          textAlignVertical: 'center',
          letterSpacing: 2.0,
          fontSize: 9,
          height: 23,
        }}
        visualProperties={{ alpha: 1 }}
        onSelect={() => {
          ActionSessionListOnDetailsBtn(item)
        }}
      />

      <ButtonSmall
        name={("artistImageButton1" + item.id)
        }
        source={artistData1 ? artistData1.imgSrc : null}
        style={{
          position: 'absolute',
          backgroundColor: 'skyblue',
          top: 30,
          left: Dimensions.get('screen').width - 150,
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
        bgBoxStyle={{
          backgroundColor: '#FFFFFF',
          opacity: 0.1,
          left: -5,
          width: artistImageSize,
          height: artistImageSize,
        }}
        visualProperties={{ alpha: 1 }}
        onSelect={() => {
          if (artistData1 == undefined) return;
          LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage" });
          TransitionLinkToArtistPage(artistData1)
        }}
      />


      {
        (false && !preSignupRequired) &&

        <Image
          source={LauncherController.getInstance().staticImageList[LauncherController.getInstance().staticImageList.length - 1].imgSrc}
          style={{
            position: 'absolute',
            opacity: 0.8,
            top: 140,
            left: Dimensions.get('screen').width - 145,
            width: 50,
            height: 50,
          }}
        >
        </Image>
      }
    </>
  );
}

export default ScheduleListItemType4;