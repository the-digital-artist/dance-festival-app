import { useState } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import LauncherController from '../../LauncherController';
import TransitionLinkToSchedule from '../../transitions/TransitionLinkToSchedule';
import ButtonSmall from '../ButtonSmall';
import HomeScreenProgramItem from '../screens/HomeScreenProgramItem';


const HappeningNowTile = (props) => {
  console.log("Rendering HappeningNowTile")

  const context = LauncherController.getInstance().context;
  const [currentTimeString, setCurrentTimeString] = useState(context.currentTimeString);
  context.happeningNowTimeUpdateFunction = (timeString) => { setCurrentTimeString(timeString) };

  return (
    <>
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

      <Text allowFontScaling={false} id='textHeadlineWhatsHappeningTime'
        style={[{
          position: 'absolute',
          top: 0,
          left: 30,
          height: 17,
          width: Dimensions.get('screen').width - (2 * 30),
          fontFamily: 'Cabin-Regular',
          letterSpacing: 2.0,
          fontSize: 14,
          color: '#4b262a',
          // backgroundColor: 'skyblue',
          textAlign: 'right',
        }]}>
        {currentTimeString}
      </Text>


      <View style={{
        position: 'absolute',
        backgroundColor: '#FBB03A',
        left: 30, top: 30,
        width: Dimensions.get('screen').width - (2 * 30),
        height: props.tileHeight + 130,
        opacity: 0.8
      }}>
      </View>

      <Image
        source={require('../../../assets/home-happening-banner.png')}
        style={{
          position: 'absolute', resizeMode: 'cover', opacity: 0.1,
          left: 30, top: 30,
          width: (Dimensions.get('screen').width - 2 * 30),
          height: props.tileHeight + 130,
        }}
      />



      {
        props.activeItems.map((item, i) => {
          return (
            <View
              key={'HappeningNowTileView' + i}
              style={{
                // backgroundColor: '#dd5163', opacity: 0.2,
                position: 'absolute',
                top: (30 + i * 50),
                left: 30,
                height: 50,
                width: Dimensions.get('screen').width - 60,
              }}>


              <HomeScreenProgramItem itemData={props.activeItems.length >= 1 ? props.activeItems[i] : context.happeningNowItemNoSession} i={0}/>
            </View>

          );
        })
      }


      <ButtonSmall
        name={("ButtonGoFestivalPlanner")}
        // source={require('../../../assets/button-info.png')}
        style={{
          position: 'absolute',
          top: (props.tileHeight + 130 - 20),
          left: 60,
          height: 35,
          width: (Dimensions.get('screen').width - 2 * 60),
        }}
        text={"GO TO FESTIVAL PLANNER"}
        bgBoxVisible={true}
        bgBoxStyle={{
          backgroundColor: '#9F509F',
          height: 35,
          width: (Dimensions.get('screen').width - 2 * 60),
        }}
        fontStyle={{
          fontFamily: 'Cabin-Regular',
          textAlign: 'center',
          textAlignVertical: 'center',
          letterSpacing: 2.0,
          color: '#FFFFFF',
          fontSize: 10,
          width: (Dimensions.get('screen').width - 2 * 60),
        }}
        visualProperties={{ alpha: 1 }}
        onSelect={() => { TransitionLinkToSchedule() }}
      />



    </>
  );
}

export default HappeningNowTile;