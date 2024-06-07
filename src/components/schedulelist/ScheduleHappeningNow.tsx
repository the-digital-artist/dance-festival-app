import { useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import LauncherController from '../../LauncherController';
import ButtonSmall from '../ButtonSmall';
import TransitionLinkToSchedule from '../../transitions/TransitionLinkToSchedule';


const ScheduleHappeningNow = ({ initialItem }) => {
  console.log("Rendering ScheduleHappeningNow")

  const [currentTimeString, setCurrentTimeString] = useState(LauncherController.getInstance().context.currentTimeString);
  const [activeItem, setActiveItem] = useState(initialItem);
  
  
  LauncherController.getInstance().context.happeningNowTimeUpdateFunction = (timeString) => { setCurrentTimeString(timeString) };
  LauncherController.getInstance().context.happeningNowItemUpdateFunction = () => { setActiveItem(LauncherController.getInstance().context.happeningNowItem[0]) };

  const item = activeItem;

  if (item == undefined || item == null) return null;
  if (item.itemType == "type1" && item.flag == true) return null;

  if (item.itemType == "type1") {
    item.sessionMainTitle = item.groupTitle;
    if (item.groupTitle == "Workshops")
      item.room = "Browse All Sessions and Rooms in the Planner";
    if (item.groupTitle == "Night Parties")
      item.room = item.groupSubtitle;
  }
  const paddingLeftAndRight = 5;
  let itemHeight = 110;

  return (
    <>
      {/* <View
                                style={{
                                    position: 'absolute',
                                      backgroundColor: '#FBB03A',
                                    left: 30, top: 30,
                                    transform: [{ scale: 0.8 }],
                                    opacity: 1
                                }}>
                            </View> */}
      <Text allowFontScaling={false} id='textHeadlineWhatsHappening'
        style={[{
          position: 'absolute',
          top: 0,
          left: 30,
          height: 17,
          fontFamily: 'Cabin-Regular',
          letterSpacing: 2.0,
          fontSize: 14,
          color: '#4b262a',
          // backgroundColor: 'skyblue',
          textAlign: 'center',
        }]}>
        {"WHAT'S HAPPENING NOW"}
      </Text>
      <View style={{
        position: 'absolute',
        backgroundColor: '#FBB03A',
        left: 30, top: 30,
        width: Dimensions.get('screen').width - (2 * 30), height: 130,
        opacity: 0.8
      }}>
      </View>

      <Text allowFontScaling={false} id='textTime' style={{
        position: 'absolute',
        top: 42, left: -10,
        width: 80, height: 17,
        fontFamily: 'Antonio-Regular',
        // backgroundColor: 'skyblue',
        textAlign: 'right',
        color: '#232323',
        fontSize: 14,
        opacity: item.type == 'type0' ? 0.5 : 0.8
      }}>
        {currentTimeString}
      </Text>

      <Image
        source={require('../../../assets/home-happening-banner.png')}
        style={{
          position: 'absolute', resizeMode: 'contain', opacity: 0.15,
          left: 30, top: 30,
          width: (Dimensions.get('screen').width - 2 * 30),
          height: 130,
        }}
      />
      <View
        style={{
          // backgroundColor: '#dd5163', opacity: 0.2,
          top: 30,
          left: 30,
          height: 50, width: Dimensions.get('screen').width - 60,
        }}>


        <>

          <Text allowFontScaling={false} id='textSessionMainTitle'
            style={{
              position: 'absolute',
              top: activeItem.itemType != "type2" ? 10 : 5,
              left: (Dimensions.get('screen').width) / 2 - 120,
              width: Dimensions.get('screen').width - 90 - 30,
              fontFamily: activeItem.itemType != "type2" ? 'ArtBrush' : 'Antonio-Regular',
              // backgroundColor: 'indigo',
              textAlign: 'left',
              color: '#9F509F',
              fontSize: 22,
              opacity: activeItem.type == 'type0' ? 0.8 : 1
            }}>
            {activeItem.sessionMainTitle ? (activeItem.sessionMainTitle as string) : ""}
          </Text>


          <Text allowFontScaling={false} id='textLocation' style={{
            position: 'absolute',
            top: (activeItem.sessionMainTitle && (activeItem.sessionMainTitle as string).length>20) ? 59:35, 
            left: (Dimensions.get('screen').width) / 2 - 120,
            width: 220, height: 50,
            fontFamily: 'Cabin-Regular',
            letterSpacing: 2.0,
            // backgroundColor: 'indigo',
            textAlign: 'left',
            color: '#9F509F',
            fontSize: 11,
            opacity: activeItem.type == 'type0' ? 0.8 : 1
          }}>
            {activeItem.room ? (activeItem.room as string).toLocaleUpperCase() : ""}
          </Text>
        </>
      </View>



      <ButtonSmall
        name={("InfoButtonHome")}
        // source={require('../../../assets/button-info.png')}
        style={{
          position: 'absolute',
          top: (110), left: (Dimensions.get('screen').width) / 2 - 90,
          height: 35, width: 190
        }}
        text={"GO TO FESTIVAL PLANNER"}
        bgBoxVisible={true}
        bgBoxStyle={{
          backgroundColor: '#9F509F',
          height: 35, width: 190,
        }}
        fontStyle={{
          fontFamily: 'Cabin-Regular',
          textAlign: 'center',
          textAlignVertical: 'center',
          letterSpacing: 2.0,
          color: '#FFFFFF',
          fontSize: 10,
          width: 190,
        }}
        visualProperties={{ alpha: 1 }}
        onSelect={() => { TransitionLinkToSchedule() }}
      />



    </>
  );
}

export default ScheduleHappeningNow;