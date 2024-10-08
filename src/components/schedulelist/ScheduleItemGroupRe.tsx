import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { Gesture, GestureDetector, NativeGesture } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import ButtonSmall from "../ButtonSmall";
import ScheduleListItemType1 from "./ScheduleListItemType1";
import SchedulerScreen from "../screens/SchedulerScreen";
import LauncherController from "../../LauncherController";

const ScheduleItemGroupRe = ({ mainItem, group, orientation, rowHeight }) => {
    // console.log('ScheduleItemGroupRe render')
    const paddingLeftAndRight = 5;

    const tileWidth = Dimensions.get('screen').width/2
    const tileDistance = tileWidth+1;
    const tileHeight = rowHeight != undefined ? rowHeight : 100;

    let selectedIndex = 0;
    const offset = useSharedValue(0);
    const currentIndex = useDerivedValue(() => { return -offset.value / tileWidth });

    const animValues = []
    const animValuesAlpha = []
    const animValuesDeltaX = []

    for (let i = 0; i < group.length; i++) {
        const dynamicValueX = useDerivedValue(() => { return ((i * tileDistance) - (currentIndex.value * tileDistance)) });
        const dynamicValueAlpha = useDerivedValue(() => {
            let currentCenterAlpha = 1// 1 - Math.max(0, Math.min(1, Math.abs(i - currentIndex.value)));//gives you 1 for the incoming item and 0 for all outgoing
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

    const maxSelectedIndex = group.length - 1;
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
    for (let i = 0; i < group.length; i++) {
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
        .blocksExternalGesture(mainItem['refNativeGesture'])
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
    for (let i = 0; i < group.length; i++) {
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
        offset.value = (group.length - 1)* -tileWidth;
        offset.value = withTiming(0, { duration: 500, easing: Easing.inOut(Easing.quad) })
    });


    const changeSelectedIndex = (delta) => {
        // console.log("currentIndex.value : " +currentIndex.value + "delta: " + delta);
        let newIdx = Math.round(currentIndex.value) + delta;
        if (newIdx < 0 || newIdx > group.length - 1) return;
        offset.value = withTiming((newIdx * -tileWidth), {
            duration: 330,
            easing: Easing.inOut(Easing.quad),
        })
        return newIdx;
    };

    return (
        <>
            {/* <GestureDetector gesture={gestureObj}> */}
                <Animated.View 
                id="touchCaptureArea"
                    style={[{
                    position: 'absolute',
                    // backgroundColor: 'skyblue',
                    left: 0, top: 70,
                    height: 90, width: Dimensions.get("screen").width - 2 * paddingLeftAndRight,
                    opacity: 1
                }]}>

                    {
                        group.map((item, i) => {
                            return (
                                <ScheduleListItemType1
                                    key={'ScheduleListItemType1' + i}
                                    item={group[i].obj}
                                    assignedListIndex={mainItem['assignedListIndex']}
                                    orientation={(i%2==0?'left':'right')}
                                    tileWidth={tileWidth}
                                    rowHeight={tileHeight - 35}
                                    group={group}
                                    groupIndex={i}
                                    groupIndexUpdateFunction={changeSelectedIndex}
                                    paddingLeftAndRight={paddingLeftAndRight}
                                    tileOffsetLeft={0}
                                    tileOffsetTop={-46}
                                    dynamicVisualProperties0={animValues[i]}
                                    // dynamicVisualProperties1={animValuesAlpha[i]}
                                    // dynamicVisualProperties2={animValuesDeltaX[i]}
                                    tileTapGestureHandler={tileTapGestureHandler[i]}
                                    tileTapVisualPropertyUpdate={tileTapVisualPropertyUpdate[i]}
                                />

                            );
                        })
                    }

                </Animated.View>
            {/* </GestureDetector> */}


            {/* <Animated.View style={
                [{
                    position: 'absolute',
                    left: (0), top: 37,
                    width: 32, height: 28,
                    // backgroundColor: 'skyblue'
                }, animValueLeftButtonAlpha]

            }>
                <ButtonSmall
                    name={"BtnScrollLeft" + mainItem.id}
                    style={{
                        position: 'absolute',
                        left: (0), top: 0,
                        width: 32, height: 28,
                        opacity: 1.0
                    }}
                    visualProperties={{ x: 0, y: 0, z: 0 }}
                    onSelect={() => { 
                       console.log('  changeSelectedIndex(-1) | currentIndex.value: '+currentIndex.value);
                        changeSelectedIndex(-1) 
                    }}
                    source={require('../../../assets/button-prev.png')}
                />

            </Animated.View>


            <Animated.View style={
                [{
                    position: 'absolute',
                    left: Dimensions.get('screen').width-32, top: 37,
                    width: 32, height: 28,
                    // backgroundColor: 'skyblue'
                }, animValueRightButtonAlpha]

            }>
                <ButtonSmall
                    name={"BtnScrollRight" + mainItem.id}
                    style={{
                        position: 'absolute',
                        width: 32, height: 28 ,
                        opacity: 1.0
                    }}
                    visualProperties={{ x: 0, y: 0, z: 0 }}
                    onSelect={() => { 
                        console.log('  changeSelectedIndex(-1) | currentIndex.value: '+currentIndex.value);
                        changeSelectedIndex(1) 
                    }}
                    source={require('../../../assets/button-next.png')}
                />
            </Animated.View> */}
        </>
    );


}

export default ScheduleItemGroupRe;