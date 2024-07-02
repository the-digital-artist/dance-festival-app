import { BlurView } from 'expo-blur';
import React, { Fragment } from "react";
import { Dimensions, Image, Platform, View } from "react-native";
import TransitionNavbarSelect from "./TransitionNavbarSelect";
import ButtonSmall from "../ButtonSmall";

const NavBar = (props) => {
    let navBarData = props.data
    let HighlightRendererComponent = props.highlightRenderer;

    let iconSize = 76;
    let itemDistance = 95
    let startX = (Dimensions.get('screen').width / 2 - ((navBarData.length - 1) * itemDistance) / 2) - iconSize / 2

    return (
        <>
            {/* {Platform.OS == "ios" &&
                <BlurView
                    intensity={50}
                    style={{
                        // backgroundColor: 'skyblue',
                        // backgroundColor: '#232323',
                        bottom: 0, left: 0, position: 'absolute',
                        width: Dimensions.get('window').width,
                        height: 95,
                        opacity: 1
                    }} />
            } */}

            <Image
                style={{
                    // backgroundColor: 'skyblue',
                    bottom: 0, left: 0, position: 'absolute',
                    width: Dimensions.get('screen').width,
                    height: (Dimensions.get('screen').width * (300 / 1290)),
                    resizeMode: "cover",
                    opacity: 1.0
                }}
                source={require('../../../assets/navbar/navbar_bg.png')}
            />

            {navBarData.map((itemData, i) => {
                return (
                    <Fragment key={'navBarItem' + i}>

                        <ButtonSmall
                            name={'navBarItem' + i}
                            style={{
                                // backgroundColor: 'skyblue',
                                position: 'absolute',
                                bottom: 42, left: (startX + (i * itemDistance)),
                                width: iconSize, height: 40,
                                opacity: 0.9
                            }}
                            visualProperties={{ alpha: 1, x: 0, y: 0, z: 0 }}
                            onSelect={() => { TransitionNavbarSelect(i) }}
                            // source={itemData.imgSrc}
                            text={(itemData.itemText as string).toLocaleUpperCase()}
                            fontStyle={{
                                // backgroundColor: 'skyblue',
                                top: 20, width: iconSize,
                                fontFamily: 'Arcon-Regular',
                                textAlign: 'center',
                                letterSpacing: 1.7,
                                color: '#f4f3ea',
                                fontSize: 11,
                            }}
                        />
                    </Fragment>
                );
            })}
            <HighlightRendererComponent
                style={{
                    position: 'absolute',
                    width: iconSize, height: 5,
                    color: '#fdfaf6',
                }}
                bottomOffsetY={(Dimensions.get('screen').width * (300 / 1290)) - 5}
                startX={startX}
                itemDistance={itemDistance}
            />
        </>


    );
}

export default NavBar;