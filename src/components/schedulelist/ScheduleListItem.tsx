import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import LauncherController from '../../LauncherController';
import ScheduleItemGroupRe from './ScheduleItemGroupRe';
import ScheduleListItemType2 from './ScheduleListItemType2';
import ScheduleListItemType3 from './ScheduleListItemType3';
import ScheduleListItemType4 from './ScheduleListItemType4';


const ScheduleListItem = ({ item, index }) => {
  // console.log('ScheduleListItem ' + item.id)

  if (item == undefined || item == null) return null;
  if (item.itemType == "type1" && item.flag == true) return null;
  if (item.flagIncludeInNow == true) return null;

  const centerPieceWidth = Dimensions.get('screen').width - (5 + 45 + 35 + 35 + 5)
  const paddingLeftAndRight = 5;

  let itemHeight = 110;
  let group = item.group;
  if (group.length == 0) group = [{ id: item.id, obj: item }]

  if (item.itemType == 'type1')
    itemHeight = (item.sessionMainTitle as string).length > 25 ? 200 : 200;
  else if (item.itemType == 'type2')
    itemHeight = (item.room == "" ? 50 : 65);
  else if (item.itemType == 'type3') {
    itemHeight = 40
    if ((item.sessionMainTitle as string).length > 20) itemHeight += 30;
    if ((item.artistName as string).length > 20) itemHeight += 30;
  }
  else if (item.itemType == 'type4')
    itemHeight = (item.sessionMainTitle as string).length > 20 ? 200 : 185;
  else if (item.itemType == 'type5')
    itemHeight = 100;

  item['assignedListIndex'] = index;
  item['itemHeight'] = itemHeight;

  let orientation = 'left';
  if (item.itemType == 'type1') {
    orientation = (LauncherController.getInstance().context['sessionListCount']++) % 2 == 0 ? 'left' : 'right'
  }

  const overwriteGroupTitles = true;
  const groupMainTitle = overwriteGroupTitles ? ("Parallel Workshop Sessions" as string).toLocaleUpperCase() : (item.groupTitle)
  const groupSubTitle = overwriteGroupTitles ? ("Swipe to Browse Rooms:" as string).toLocaleUpperCase() : (item.groupSubtitle as string).toLocaleUpperCase()


  // const flatListRef = (LauncherController.getInstance().context.dataDependentComponentSchedulerScreen as SchedulerScreen).flatListRef[0];

  // console.log('flatListRef is undefined ' + (flatListRef.current == undefined))
  return (
    <>
      <View
        style={{
          // backgroundColor: '#FBB03A',
          left: paddingLeftAndRight,
          height: itemHeight, width: Dimensions.get('screen').width - 2 * paddingLeftAndRight,
          borderTopColor: '#FFFFFF',
          borderTopWidth: 0,
          borderBottomWidth: (item.itemType == "type5"?0:StyleSheet.hairlineWidth),
          borderBottomColor: '#EFEFEF',
        }}>


        {/* {item.itemType == "type1" ?
        {/* {item.itemType == "type1" ?
          <>
            <Image
              source={require('../../../assets/sessionitem-frame.png')}
              style={{
                position: 'absolute', resizeMode: 'contain', opacity: 0.2,
                left: 0, top: 74, width: Dimensions.get('screen').width, height: itemHeight - 88,
              }}
            />
          </>
          : null} */}

        {item.itemType == "type1" ? <ScheduleItemGroupRe
          mainItem={item}
          group={group}
          orientation={orientation}
          rowHeight={itemHeight} /> : null}
        {item.itemType == "type2" ? <ScheduleListItemType2 item={item} /> : null}
        {item.itemType == "type3" ? <ScheduleListItemType3 item={item} /> : null}
        {item.itemType == "type4" ? <ScheduleListItemType4 item={item} /> : null}

        {item.itemType == "type1" && item.group.length>1?
          <>
            {index <= 1 && <Text allowFontScaling={false} id='textGroupTitle' style={{
              position: 'absolute',
              top: 8,
              left: 90,
              width: 300,
              fontFamily: 'Cabin-Regular',
              letterSpacing: 1.0,
              textAlign: 'left',
              color: '#90a0b9',
              fontSize: 12,
            }}>
              {("Browse Sessions In Different Rooms" as string).toLocaleUpperCase()}
            </Text>
            }

            <Text allowFontScaling={false} id='textGroupSubTitle' style={{
              position: 'absolute',
              top: index > 1 ? 8 : (8 + 12 + 3),
              left: 90,
              width: 290, height: 16,
              // backgroundColor: 'indigo',
              fontFamily: 'Cabin-Regular',
              letterSpacing: 2.0,
              textAlign: 'left',
              color: '#fefefe',
              fontSize: 12,
            }}>{groupSubTitle}
            </Text>
          </>
          : null}
      </View>

      <Text allowFontScaling={false} id='textTime' style={{
        position: 'absolute',
        top: 10, left: 6,
        width: 70, height: 15,
        fontFamily: 'DINNeuzeitGroteskStd-Light',
        // backgroundColor: 'skyblue',
        textAlign: 'right',
        color: '#ede8e3',
        fontSize: 12,
      }}>
        {item.time}
      </Text>
    </>
  );
}

export default ScheduleListItem;