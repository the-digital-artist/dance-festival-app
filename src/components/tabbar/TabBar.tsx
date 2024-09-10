import React, { Fragment } from "react";
import { Dimensions, View } from "react-native";
import { useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated";
import ButtonSmall from "../ButtonSmall";
import TransitionTabbarSelect from "./TransitionTabbarSelect";

const TabBar = (props) => {
    let tabBarData = (props.data != undefined) ?
                        props.data :
                        ([
                            { id: 0, itemText: "Main Fair", associatedScreenName: "scheduleList0", imgSrc: null },
                            { id: 1, itemText: "Sessions", associatedScreenName: "scheduleList1", imgSrc: null },
                            { id: 2, itemText: "Massage", associatedScreenName: "scheduleList2", imgSrc: null },
                            { id: 3, itemText: "Crafty Corners", associatedScreenName: "scheduleList3", imgSrc: null }
                        ])

    let offsetY = props.offsetY == undefined ? 112 : props.offsetY;

    let itemWidth = (Dimensions.get('screen').width / tabBarData.length);
    let itemHeight = 50;
    let itemHeightSelectedOffset = 8;
    let itemSpread = (Dimensions.get('screen').width / tabBarData.length)
    let startX = (Dimensions.get('screen').width / 2 - ((tabBarData.length - 1) * itemSpread) / 2) - itemWidth / 2

    const currentIndex = useSharedValue(0);
    const selectedIndex = useSharedValue(0);

    const animValuesHighlight = []
    const animValuesText = []
    for (let i = 0; i < tabBarData.length; i++) {
        const dynamicValueAlpha = useDerivedValue(() => {
            let currentCenterAlpha = 1 - Math.max(0, Math.min(1, Math.abs(i - currentIndex.value)));//gives you 1 for the incoming item and 0 for all outgoing
            return currentCenterAlpha;
        })
        animValuesHighlight.push(useAnimatedStyle(() => ({
            opacity: dynamicValueAlpha.value
        })));
        animValuesText.push(useAnimatedStyle(() => ({
            opacity: dynamicValueAlpha.value * 0.5 + 0.5
        })));
    }

    return (
        <>

            <View style={{
                pointerEvents: 'none',
                backgroundColor: '#dac4a7',
                top: offsetY + itemHeightSelectedOffset, left: 0, position: 'absolute',
                width: Dimensions.get('screen').width,
                height: itemHeight - itemHeightSelectedOffset,
                //  borderTopColor: 'white',
                //  borderTopWidth: StyleSheet.hairlineWidth,
                opacity: 0.73
            }}>
                {/* <Image
                    style={{
                        width: Dimensions.get('screen').width,
                        height: (Dimensions.get('screen').width * (300 / 1290)),
                        resizeMode: "contain",
                        opacity: 0.2    
                    }}
                    source={require('../../../assets/tabbar/tabbar_bg.png')}
                /> */}
            </View>

            {tabBarData.map((itemData, i) => {
                return (
                    <Fragment key={'tabBarItemFragment' + i}>
                        <ButtonSmall
                            name={'tabBarItem' + i}
                            style={{
                                position: 'absolute',
                                top: offsetY, left: (startX + (i * itemSpread)),
                                width: itemWidth, height: itemHeight,
                                opacity: 1.0

                            }}
                            visualProperties={{ alpha: 1, x: 0, y: 0, z: 0 }}
                            dynamicVisualPropertiesHightlight={animValuesHighlight[i]}
                            dynamicVisualPropertiesText={animValuesText[i]}
                            bgBoxVisible={true}
                            bgBoxStyle={{
                                backgroundColor: '#c75e2c',
                                // opacity: 0.9,
                                position: 'absolute',
                                width: itemWidth, height: itemHeight,
                            }}
                            onSelect={() => {
                                TransitionTabbarSelect(itemData, i, currentIndex)
                            }}
                            source={itemData.imgSrc}
                            text={(itemData.itemText as string)}
                            fontStyle={{
                                fontFamily: 'RobotoCondensed-Regular',
                                letterSpacing: 0,
                                left: 5,
                                color: '#FFFFFF',
                                width: itemWidth-6, 
                                // backgroundColor:'skyblue',
                                height: itemHeight-15,
                                textAlignVertical: 'center',
                                fontSize: 14,
                                opacity: 1.0,
                                top: 12
                            }}
                        />

                    </Fragment>
                );
            })}


        </>
    );
}

export default TabBar;