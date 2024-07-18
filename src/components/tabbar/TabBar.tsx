import React, { Fragment } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import LauncherController from "../../LauncherController";
import TransitionTabbarSelect from "./TransitionTabbarSelect";
import ButtonSmall from "../ButtonSmall";
import { useAnimatedStyle, useDerivedValue, useSharedValue } from "react-native-reanimated";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const TabBar = (props) => {
    let tabBarData = LauncherController.getInstance().tabBarData;
    // [
    //     { id: 0, itemText: "Friday", associatedScreenName: "scheduleList0", imgSrc: null },
    //     { id: 1, itemText: "Saturday", associatedScreenName: "scheduleList1", imgSrc: null },
    //     { id: 2, itemText: "Sunday", associatedScreenName: "scheduleList2", imgSrc: null }
    // ]

    let offsetY = props.offsetY==undefined?112:props.offsetY;

    let itemWidth =  (Dimensions.get('screen').width/tabBarData.length);
    let itemHeight = 43;
    let itemHeightSelectedOffset = 8;
    let itemSpread = (Dimensions.get('screen').width/tabBarData.length)
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
                backgroundColor: '#8cb5d8',
                top: offsetY + itemHeightSelectedOffset, left: 0, position: 'absolute',
                width: Dimensions.get('screen').width,
                height: itemHeight - itemHeightSelectedOffset,
                //  borderTopColor: 'white',
                //  borderTopWidth: StyleSheet.hairlineWidth,
                opacity: 0.55
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
                                backgroundColor: '#25649a',
                                position: 'absolute',
                                width: itemWidth, height: itemHeight,
                            }}
                            onSelect={() => { 
                                TransitionTabbarSelect(itemData, i, currentIndex)
                             } }
                            source={itemData.imgSrc}
                            text={(itemData.itemText as string).toLocaleUpperCase()}
                            fontStyle={{
                                fontFamily: 'Arcon-Regular',
                                letterSpacing: 1.7,
                                color: '#FFFFFF',
                                fontSize: 12,
                                opacity: 1.0,
                                top:18
                            }}
                        />

                    </Fragment>
                );
            })}


        </>
    );
}

export default TabBar;