import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import LauncherController from '../../LauncherController';
import ScheduleItemGroupRe from './ScheduleItemGroupRe';
import ScheduleListItemType2 from './ScheduleListItemType2';
import ScheduleListItemType3 from './ScheduleListItemType3';
import ScheduleListItemType4 from './ScheduleListItemType4';


const ScheduleListItem = ({ item, index }) => {

  if (item == undefined || item == null) return null;
  if (item.itemType == "type1" && item.flag == true) return null;
  if (item.flagIncludeInNow == true) return null;

  const centerPieceWidth = Dimensions.get('screen').width - (5 + 45 + 35 + 35 + 5)
  const paddingLeftAndRight = 5;

  let itemHeight = 110;
  let group = item.group;
  if (group.length == 0) group = [{ id: item.id, obj: item }]

  if (item.itemType == 'type1')
    itemHeight = (item.sessionMainTitle as string).length > 25 ? 190 : 190;
  else if (item.itemType == 'type2')
    itemHeight = (item.room == "" ? 50 : 65);
  else if (item.itemType == 'type3') {
    itemHeight = 80
    if((item.sessionMainTitle as string).length > 20) itemHeight+=30;
    if((item.artistName as string).length > 20) itemHeight+=30;
  }
  else if (item.itemType == 'type4')
    itemHeight = (item.sessionMainTitle as string).length > 20 ? 164 : 138;
  else if (item.itemType == 'type5')
    itemHeight = 200;

  item['assignedListIndex'] = index;


  let orientation = 'left';
  if (item.itemType == 'type1') {
    orientation = (LauncherController.getInstance().context['sessionListCount']++) % 2 == 0 ? 'left' : 'right'
  }



  return (
    <>
      <View
        style={{
          // backgroundColor: '#FBB03A',
          left: paddingLeftAndRight,
          height: itemHeight, width: Dimensions.get('screen').width - 2 * paddingLeftAndRight,
          borderTopColor: '#edc36a',
          borderTopWidth: 0,
          borderBottomColor: 'white',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}>


        {item.itemType == "type1" ?
          <>
            <Image
              source={require('../../../assets/sessionitem-frame.png')}
              style={{
                position: 'absolute', resizeMode: 'contain', opacity: 0.2,
                left: 0, top: 74, width: Dimensions.get('screen').width, height: itemHeight - 88,
              }}
            />
          </>
          : null}

        {item.itemType == "type1" ? <ScheduleItemGroupRe
          mainItem={item}
          group={group}
          orientation={orientation}
          rowHeight={itemHeight} /> : null}
        {item.itemType == "type2" ? <ScheduleListItemType2 item={item} /> : null}
        {item.itemType == "type3" ? <ScheduleListItemType3 item={item} /> : null}
        {item.itemType == "type4" ? <ScheduleListItemType4 item={item} /> : null}

        {item.itemType == "type1" ?
          <>
            <Text allowFontScaling={false} id='textGroupTitle' style={{
              position: 'absolute',
              top: 8,
              left: 90,
              width: 300,
              fontFamily: 'ArtBrush',
              // backgroundColor: 'indigo',
              textAlign: 'left',
              color: '#9F509F',
              fontSize: 25,
            }}>
              {item.groupTitle}
            </Text>

            <Text allowFontScaling={false} id='textGroupSubTitle' style={{
              position: 'absolute',
              top: 35, left: 90,
              width: 290, height: 16,
              fontFamily: 'Cabin-Regular',
              letterSpacing: 2.0,
              // backgroundColor: 'indigo',
              textAlign: 'left',
              color: '#58503e',
              fontSize: 12,
            }}>{(item.groupSubtitle as string).toLocaleUpperCase()}
            </Text>
          </>
          : null}
      </View>

      <Text allowFontScaling={false} id='textTime' style={{
        position: 'absolute',
        top: 10, left: 6,
        width: 70, height: 15,
        fontFamily: 'Antonio-Regular',
        // backgroundColor: 'skyblue',
        textAlign: 'right',
        color: '#58503e',
        fontSize: 11,
      }}>
        {item.time}
      </Text>
    </>
  );
}

export default ScheduleListItem;