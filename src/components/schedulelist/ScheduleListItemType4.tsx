import { Dimensions, Image, Platform, Text, View } from 'react-native';
import DataModel from '../../DataModel';
import LauncherController from '../../LauncherController';
import TransitionLinkToArtistPage from '../../transitions/TransitionLinkToArtistPage';
import ButtonSmall from '../ButtonSmall';
import LText from '../../core/LText';
import ActionSessionListOnDetailsBtn from '../../actions/ActionSessionListOnDetailsBtn';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


//Special Sessions
const ScheduleListItemType4 = ({ item, showDetailsButton = true }) => {

  // console.log("ScheduleListItem: " + JSON.stringify(item, null, 2));
  if (item.itemType != 'type4') return;

  const sessionCategoryName = (item.groupTitle == "Massage") ? "Massage Zone" : "Crafty Corner"
  
  const artistData1 = DataModel.getInstance().static.dataArtists[item.artistOne];
  const artistData2 = item.artistTwo ? DataModel.getInstance().static.dataArtists[item.artistTwo] : null;
  const verticalOffsetTitleLength = item.lineCount != undefined ? (item.lineCount * 19) : 19;
  const preSignupRequired = ((item.sessionMainTitle as string).toLowerCase().indexOf("absolute beginner") == -1)

  const artistImageSize = item.itemHeight - 52;


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
        top: 0,
        left: 85,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 1.2,
        opacity: 0.5,
        padding: 2,
        // backgroundColor: '#382b38',
        // backgroundColor: '#600f2c',
        textAlign: 'left',
        color: '#232323',
        fontSize: 11,
      }}>
        {sessionCategoryName.toLocaleUpperCase() + "  |  " + (item.room ? (item.room as string).toLocaleUpperCase() + " " : "")}
      </Text >
      <ButtonSmall
        name={("artistImageButton1" + item.id)
        }
        source={artistData1 ? artistData1.imgSrc : null}
        style={{
          position: 'absolute',
          backgroundColor: '#999999',
          top: 34,
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

      <View
        style={{
          position: 'absolute',
          top: 33 + artistImageSize - 25, left: 0,
          height: 27,
          width: artistImageSize,
          opacity: 0.6,
          padding: 0,
          backgroundColor: '#232323',
        }} />



      <Text allowFontScaling={false} id='textArtistName' style={{
        position: 'absolute',
        top: 33 + artistImageSize - 20,
        left: 0,
        width: artistImageSize, height: 16,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 1.7,
        fontSize: 11,
        // backgroundColor: 'indigo',
        textAlign: 'center',
        color: '#FFFFFF',

      }}>
        {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
      </Text>

      <View
        style={{
          // backgroundColor: 'skyblue',
          flexDirection: 'column',
          left: artistImageSize + 15,
          top: 43,
          width: Dimensions.get('screen').width - artistImageSize - 15 - 35,
          height: item.itemHeight - 43 - 15 - 10

        }}>

        {preSignupRequired && <Text allowFontScaling={false} id='textPreSignup' style={{
          right: 0,
          height: 15,
          fontFamily: 'Cabin-Regular',
          letterSpacing: 1.2,
          // opacity: 0.5,
          // backgroundColor: '#121212',
          textAlign: 'right',
          color: '#FFFFFF',
          fontSize: 10,
        }}>
          {"PRE-SIGNUP REQUIRED"}
        </Text >
        }


        <LText allowFontScaling={false} id='textSessionMainTitle' style={{
          top: 10,
          right: 0,
          fontFamily: 'RobotoCondensed-Regular',
          // backgroundColor: 'indigo',
          letterSpacing: 0.0,
          textAlign: 'right',
          opacity: 0.9,
          color: '#f5e3d4',
          fontSize: 21,
        }}>

          <Text>
            {(item.sessionMainTitle ? (item.sessionMainTitle as string) : "") + "  "}
          </Text>

          {item.sessionSpecialTrackCount != undefined &&
            <Text allowFontScaling={false} id='textSessionCount' style={{
              fontFamily: 'Cabin-Regular',
              // backgroundColor: 'indigo',
              textAlign: 'left',
              color: '#e3dfbb',
              fontSize: 12,
            }}>
              {item.sessionSpecialTrackCount ? (item.sessionSpecialTrackCount as string).substring(1, item.sessionSpecialTrackCount.length - 1) : ""}
            </Text>
          }


        </LText>
        {showDetailsButton &&
          <ButtonSmall
            name={("ScheduleListArtistDetailsButton" + item.id)}
            source={null}
            style={{
              left: Dimensions.get('screen').width - 130 - artistImageSize - 50,
              top: 20,
              height: 23, width: 130,
            }}
            text={"SESSION INFO"}
            bgBoxVisible={true}
            bgBoxStyle={{
              backgroundColor: '#32292e',
              // borderWidth: 1,
              // borderColor: '#8336a3',
              opacity: 1.0,
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
        }
      </View >






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