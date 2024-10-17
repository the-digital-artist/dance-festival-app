import { Dimensions, Text, View } from 'react-native';
import React, { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import LText from '../../core/LText';
import ScheduleListItemType8 from './ScheduleListItemType8';
import ButtonSmall from '../ButtonSmall';



const ScheduleListItemType9 = ({ item }) => {
  // console.log("ScheduleListItem9: ");
  if (item.itemType != 'type9') return;

  const djData = item.djData;

  const paddingLeftAndRight = 5;

  const tileWidth = Dimensions.get('screen').width - (2 * paddingLeftAndRight + 45 + 35 + 35)
  const tileDistance = tileWidth + 10;
  const tileHeight = 220;

  let selectedIndex = 0;
  const offset = useSharedValue(0);
  const currentIndex = useDerivedValue(() => { return -offset.value / tileWidth });

  const animValues = []
  const animValuesAlpha = []
  const animValuesDeltaX = []

  for (let i = 0; i < djData.length; i++) {
    const dynamicValueX = useDerivedValue(() => { return ((i * tileDistance) - (currentIndex.value * tileDistance)) });
    const dynamicValueAlpha = useDerivedValue(() => {
      let currentCenterAlpha = 1 - Math.max(0, Math.min(1, Math.abs(i - currentIndex.value)));//gives you 1 for the incoming item and 0 for all outgoing
      return currentCenterAlpha; //scaling
    })
    const dynamicValueXRoom = useDerivedValue(() => {
      let scalingFactor = i > currentIndex.value ? -(tileWidth - 60) / 2 : (tileWidth - 60) / 2;
      let centerDeltaX = Math.max(0, Math.min(1, Math.abs(i - currentIndex.value)));//gives you 0 for the incoming item and 1 for all outgoing
      return (centerDeltaX * scalingFactor)
    });


    animValues.push(useAnimatedStyle(() => ({
      transform: [{ translateX: dynamicValueX.value }],
      opacity: dynamicValueAlpha.value / 0.6 + 0.4,
    })));
    animValuesAlpha.push(useAnimatedStyle(() => ({ opacity: dynamicValueAlpha.value })));
    animValuesDeltaX.push(useAnimatedStyle(() => ({ transform: [{ translateX: dynamicValueXRoom.value }] })));
  }

  const dynamicValueLeftButtonAlpha = useDerivedValue(() => { return Math.min(1, Math.max(0, currentIndex.value)) });
  const animValueLeftButtonAlpha = useAnimatedStyle(() => ({ opacity: dynamicValueLeftButtonAlpha.value }))

  const maxSelectedIndex = djData.length - 1;
  const dynamicValueRightButtonAlpha = useDerivedValue(() => { return Math.max(0, Math.min(1, maxSelectedIndex - currentIndex.value)) });
  const animValueRightButtonAlpha = useAnimatedStyle(() => ({ opacity: dynamicValueRightButtonAlpha.value }))

  const pressed = useSharedValue(false);
  const newIndex = useSharedValue(selectedIndex);

  const findClosestPoint = (snapPoints: Array<number>, targetPoint: number): number => {
    "worklet";

    if (snapPoints.length < 1) return -1;
    let targetDeltaMin = Math.abs(targetPoint - snapPoints[0]);
    let targetDeltaIdx = 0;
    for (let i = 0; i < snapPoints.length; i++) {
      let d = Math.abs(targetPoint - snapPoints[i])
      if (d < targetDeltaMin) { targetDeltaMin = d; targetDeltaIdx = i }
    }
    return snapPoints[targetDeltaIdx];
  }

  const offsetXStart = useSharedValue(0);
  const snapPoints = [];
  for (let i = 0; i < djData.length; i++) {
    snapPoints.push(i * -tileWidth);
  }


  // const outerNativeListGesture:NativeGesture = ((LauncherController.getInstance().context.dataDependentComponentSchedulerScreen as SchedulerScreen).nativeGesture as NativeGesture)
  // outerNativeListGesture
  //     .onBegin((e) => {
  //         console.log("nativeGesture start");
  //     })
  //     .onFinalize((e) => {
  //         console.log("nativeGesture start");
  //     });



  const gestureObj = Gesture.Pan()
    .blocksExternalGesture(item['refNativeGesture'])
    .minDistance(30)
    .failOffsetY(10)
    .onBegin((event) => {
      // console.log("pan start");
      pressed.value = true;
      offsetXStart.value = offset.value;
    })
    .onChange((event) => {
      // console.log("offset.value: "+(event.translationX + offsetXStart.value));
      offset.value = event.translationX + offsetXStart.value;
      // currentIndex.value = -event.translationX / tileDistance +currentIndexStart.value;
    })
    .onFinalize((event) => {
      // console.log("offset.value: "+(event.translationX + offsetXStart.value));
      offset.value = event.translationX + offsetXStart.value;
      pressed.value = false;
      const potentialStopPoint = offset.value + 0.1 * event.velocityX;
      let targetValue = findClosestPoint(snapPoints, potentialStopPoint)
      offset.value = withSpring(targetValue,
        {
          velocity: event.velocityX,
          mass: 1.2,
          damping: 27,
          stiffness: 383,
          overshootClamping: false,
          restDisplacementThreshold: 0.001,
          restSpeedThreshold: 2,
        }
      );
      newIndex.value = Math.round(currentIndex.value);
    });


  //now gesture handler and style prop tapping an individual tile/item of the group
  const tileTapGestureHandler = [];
  const tileTapVisualPropertyUpdate = [];
  for (let i = 0; i < djData.length; i++) {
    const tileTapStateIsPressed = useSharedValue(false);
    tileTapVisualPropertyUpdate.push(useAnimatedStyle(() => {
      return {
        transform: [{ scale: withSpring(tileTapStateIsPressed.value ? 1.2 : 1) }],
        backgroundColor: tileTapStateIsPressed.value ? 'yellow' : 'blue',
      };
    }))
    tileTapGestureHandler.push(
      Gesture.Tap()
        .onBegin(() => { console.log("pressed"); tileTapStateIsPressed.value = true; })
        .onFinalize(() => { tileTapStateIsPressed.value = false; }))
  }


  useEffect(() => {
    offset.value = (djData.length - 1) * -tileWidth;
    offset.value = withTiming(0, { duration: 500, easing: Easing.inOut(Easing.quad) })
  });


  const changeSelectedIndex = (delta) => {
    // console.log("currentIndex.value : " +currentIndex.value + "delta: " + delta);
    let newIdx = Math.round(currentIndex.value) + delta;
    if (newIdx < 0 || newIdx > djData.length - 1) return;
    offset.value = withTiming((newIdx * -tileWidth), {
      duration: 330,
      easing: Easing.inOut(Easing.quad),
    })
    return newIdx;
  };



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
        top: 30,
        left: 70,
        width: Dimensions.get('screen').width - 60 - 35,
        fontFamily: 'DINCondensed-Bold',
        // backgroundColor: 'indigo',
        letterSpacing: 0.7,
        textAlign: 'left',
        color: '#e1e7ac',
        fontSize: 22,
        opacity: 1.0
      }}>
        {(item.sessionMainTitle as string).toLocaleUpperCase()}
      </LText>

      <>
        <GestureDetector gesture={gestureObj}>

          <Animated.View
            id="touchCaptureArea"
            style={[{
              position: 'absolute',
              // backgroundColor: 'skyblue',
              left: 0,
              top: 30,
              height: 90, 
              width: Dimensions.get("screen").width - 2 * paddingLeftAndRight,
              opacity: 1
            }]}>
            {/* <View id='bg' style={{
                        position: 'absolute',
                        top: -45, left: 0,
                        height: mainItem.itemHeight,
                        width: Dimensions.get('screen').width - 10,
                        opacity: 0.1,
                        padding: 0,
                        backgroundColor: '#e3dfbb',
                    }}
                    /> */}

            {djData != undefined &&
              djData.map((item, i) => {
                return (
                  <ScheduleListItemType8
                    key={'ScheduleListItemType8' + item.id + i}
                    item={item}
                    index={i}
                    tileWidth={tileWidth}
                    tileHeight={tileHeight - 60}
                    tileOffsetLeft={((Dimensions.get('screen').width - tileWidth) / 2)}
                    tileOffsetTop={35}
                    dynamicVisualProperties0={animValues[i]}
                    dynamicVisualProperties1={animValuesAlpha[i]}
                    dynamicVisualProperties2={animValuesDeltaX[i]}
                  />

                );
              })
            }

          </Animated.View>
        </GestureDetector>

        <Animated.View style={
          [{
            position: 'absolute',
            left: (15), top: 115,
            width: 32, height: 28,
            // backgroundColor: 'skyblue'
          }, animValueLeftButtonAlpha]

        }>
          <ButtonSmall
            name={"BtnScrollLeft" + item.id}
            style={{
              position: 'absolute',
              left: (0), top: 0,
              width: 32, height: 28,
              opacity: 0.3
            }}
            visualProperties={{ x: 0, y: 0, z: 0 }}
            onSelect={() => { changeSelectedIndex(-1) }}
            source={require('../../../assets/button-prev.png')}
          />

        </Animated.View>


        <Animated.View style={
          [{
            position: 'absolute',
            left: (55 + 25 + tileWidth), top: 115,
            width: 32, height: 28,
            // backgroundColor: 'skyblue'
          }, animValueRightButtonAlpha]

        }>
          <ButtonSmall
            name={"BtnScrollRight" + item.id}
            style={{
              position: 'absolute',
              width: 32, height: 28,
              opacity: 0.3
            }}
            visualProperties={{ x: 0, y: 0, z: 0 }}
            onSelect={() => { changeSelectedIndex(1) }}
            source={require('../../../assets/button-next.png')}
          />
        </Animated.View>
      </>

    </>
  );
}

export default ScheduleListItemType9;



// "djData": [
//   {
//       "room": "Aurora 1:\nSALSA/BACHATA",
//       "items": [
//           {
//               "id": 100300,
//               "itemType": "type8",
//               "artistName": "DJ JENRRY",
//               "sessionMainTitle": "",
//               "time": "",
//               "room": "Aurora 1:\nSALSA/BACHATA",
//               "level": "",
//               "group": [],
//               "groupTitle": "",
//               "groupSubtitle": "",
//               "shortMainTitle": "",
//               "dateString": "",
//               "startTime": "",
//               "endTime": "",
//               "place": "",
//               "sessionSubtitle": "",
//               "sessionDescription": "",
//               "artistOne": "",
//               "artistTwo": "",
//               "artistLocation": "DENVER",
//               "flag": false,
//               "flagIncludeInNow": false,
//               "djData": []
//           },
//           {
//               "id": 100400,
//               "itemType": "type8",
//               "artistName": "DJ TOMMY",
//               "sessionMainTitle": "",
//               "time": "",
//               "room": "Aurora 1:\nSALSA/BACHATA",
//               "level": "",
//               "group": [],
//               "groupTitle": "",
//               "groupSubtitle": "",
//               "shortMainTitle": "",
//               "dateString": "",
//               "startTime": "",
//               "endTime": "",
//               "place": "",
//               "sessionSubtitle": "",
//               "sessionDescription": "",
//               "artistOne": "",
//               "artistTwo": "",
//               "artistLocation": "DENVER",
//               "flag": false,
//               "flagIncludeInNow": false,
//               "djData": []
//           },
//           {
//               "id": 100500,
//               "itemType": "type8",
//               "artistName": "DJ MAMBO TRIBE",
//               "sessionMainTitle": "",
//               "time": "",
//               "room": "Aurora 1:\nSALSA/BACHATA",
//               "level": "",
//               "group": [],
//               "groupTitle": "",
//               "groupSubtitle": "",
//               "shortMainTitle": "",
//               "dateString": "",
//               "startTime": "",
//               "endTime": "",
//               "place": "",
//               "sessionSubtitle": "",
//               "sessionDescription": "",
//               "artistOne": "",
//               "artistTwo": "",
//               "artistLocation": "FLORIDA",
//               "flag": false,
//               "flagIncludeInNow": false,
//               "djData": []
//           }
//       ]
//   }
// ]
// },
// {
// "id": 100600,