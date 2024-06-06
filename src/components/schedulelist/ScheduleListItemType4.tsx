import { Text } from 'react-native';
import ButtonSmall from '../ButtonSmall';
import TransitionLinkToArtistPage from '../../transitions/TransitionLinkToArtistPage';
import DataModel from '../../DataModel';



const ScheduleListItemType4 = ({ item }) => {

  // console.log("ScheduleListItem: " + JSON.stringify(item, null, 2));
  if (item.itemType != 'type4') return;

  return (
    <>
      <Text allowFontScaling={false} id='textSessionMainTitle' style={{
        position: 'absolute',
        top: 10, left: 90,
        width: 300,
        fontFamily: 'ArtBrush',
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#EF4260',
        fontSize: 25,
      }}>
        {item.sessionMainTitle ? (item.sessionMainTitle as string) : ""}
      </Text>


      <Text allowFontScaling={false} id='textLocation' style={{
        position: 'absolute',
        bottom: 55, left: 90,
        width: 290, height: 16,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 2.0,
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#58503e',
        fontSize: 12,
      }}>
        {item.room ? (item.room as string).toLocaleUpperCase() : ""}
      </Text>

      <Text allowFontScaling={false} id='textArtist' style={{
        position: 'absolute',
        bottom: 38, left: 90,
        width: 290, height: 16,
        fontFamily: 'Cabin-Regular',
        letterSpacing: 2.0,
        // backgroundColor: 'indigo',
        textAlign: 'left',
        color: '#58503e',
        fontSize: 12,
      }}>
        {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
      </Text>

      {(item.artistOne != '') &&

        <ButtonSmall
          name={("artistButton")}
          source={null}
          style={{
            position: 'absolute',
            left:  90,
            bottom: (10),
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