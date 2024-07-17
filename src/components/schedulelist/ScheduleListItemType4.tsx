import { Dimensions, Image, Text } from 'react-native';
import ButtonSmall from '../ButtonSmall';
import TransitionLinkToArtistPage from '../../transitions/TransitionLinkToArtistPage';
import DataModel from '../../DataModel';



const ScheduleListItemType4 = ({ item }) => {

  // console.log("ScheduleListItem: " + JSON.stringify(item, null, 2));
  if (item.itemType != 'type4') return;

  const sessionCategoryName = (item.level != undefined && item.level == 'M') ? " Masterclass " : " Bachata Beginner Track "

  return (
    <>
          {item.level != undefined &&
        <>
          <Text allowFontScaling={false} id='textSessionLevel' style={{
            position: 'absolute',
            top: 10, left: 90,
            // right: (item.orientation == 'right' ? undefined : (4 + 35)),
            // left: (item.orientation == 'left' ? undefined : (4 + 35)),
            // height: levelImageSize,
            // width: Dimensions.get('screen').width - 90,
            fontFamily: 'Cabin-Regular',
            letterSpacing: 1.2,
            opacity: 0.8,
            padding:2,
            backgroundColor: '#312816',
            textAlign: 'left',
            color: '#232323',
            fontSize: 11,
          }}>
            {sessionCategoryName.toLocaleUpperCase()}
          </Text >
        </>
      }

      <Text allowFontScaling={false} id='textSessionMainTitle' style={{
        position: 'absolute',
        top: 32, left: 90,
        width: Dimensions.get('screen').width-90-30,
        fontFamily: 'DINCondensed-Bold',
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#EF4260',
        fontSize: 25,
      }}>
        {item.sessionMainTitle ? (item.sessionMainTitle as string) : ""}
      </Text>

      <Text allowFontScaling={false} id='textPreSignup' style={{
            position: 'absolute',
            bottom: 66, left: 90,
            // right: (item.orientation == 'right' ? undefined : (4 + 35)),
            // left: (item.orientation == 'left' ? undefined : (4 + 35)),
            // height: levelImageSize,
            width: Dimensions.get('screen').width - 90,
            fontFamily: 'Cabin-Regular',
            letterSpacing: 1.2,
            // opacity: 0.5,
            // backgroundColor: 'indigo',
            textAlign: 'left',
            color: '#58503e',
            fontSize: 10,
          }}>
            {"PRE-SIGNUP REQUIRED"}
          </Text >
      <Text allowFontScaling={false} id='textLocation' style={{
        position: 'absolute',
        bottom: 40, left: 90,
        width: 290, height: 16,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 2.0,
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#232323',
        fontSize: 12,
      }}>
        {item.artistName ? (item.artistName as string).toLocaleUpperCase()+"  |  "+ (item.room ? (item.room as string).toLocaleUpperCase() : ""): ""}
      </Text>


      {/* <Text allowFontScaling={false} id='textArtist' style={{
        position: 'absolute',
        bottom: 38, left: 90,
        width: Dimensions.get('screen').width-90-30, height: 16,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 2.0,
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#232323',
        fontSize: 12,
      }}>
        {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
      </Text> */}

      {(item.artistOne != '') &&

        <ButtonSmall
          name={("artistButton"+item.id)}
          source={null}
          style={{
            position: 'absolute',
            left: 87,
            bottom: (14),
            height: 23, width: 100,
          }}
          text={"ARTIST DETAILS"}
          bgBoxVisible={true}
          bgBoxStyle={{
            backgroundColor: '#EF4260',
            height: 23, width: 100
          }}
          fontStyle={{
            width: 100,
            fontFamily: 'Cabin-Regular',
            textAlign: 'center',
            textAlignVertical: 'center',
            letterSpacing: 2.0,
            color: '#FFFFFF',
            fontSize: 8,
          }}
          visualProperties={{ alpha: 1 }}
          onSelect={() => {
            TransitionLinkToArtistPage(DataModel.dataArtists[item.artistOne])
          }}
        />
      }
    </>
  );
}

export default ScheduleListItemType4;