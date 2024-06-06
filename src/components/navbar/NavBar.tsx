import { BlurView } from 'expo-blur';
import React, { Fragment } from "react";
import { Dimensions, Image } from "react-native";
import TransitionNavbarSelect from "./TransitionNavbarSelect";
import ButtonSmall from "../ButtonSmall";

const NavBar = (props) => {
    let navBarData = props.data
    let HighlightRendererComponent = props.highlightRenderer;

    let iconSize = 60;
    let itemDistance = 85
    let startX = (Dimensions.get('window').width / 2 - ((navBarData.length - 1) * itemDistance) / 2) - iconSize / 2

    return (
        <>
            <BlurView
                intensity={50}
                style={{
                    // backgroundColor: 'skyblue',
                    bottom: 0, left: 0, position: 'absolute',
                    width: Dimensions.get('window').width,
                    height: 92,
                    opacity: 1
                }} />
            <Image
                style={{
                    backgroundColor: 'skyblue',
                    bottom: 0, left: 0, position: 'absolute',
                    width: Dimensions.get('window').width,
                    height: (Dimensions.get('window').width * (300 / 1290)),
                    resizeMode: "contain",
                    opacity: 0.4
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
                            source={itemData.imgSrc}
                            text={(itemData.itemText as string).toLocaleUpperCase()}
                            fontStyle={{
                                // backgroundColor: 'skyblue',
                                top: 45, width: iconSize,
                                fontFamily: 'Arcon-Regular',
                                textAlign: 'center',
                                letterSpacing: 1.7,
                                color: '#000000',
                                fontSize: 9,
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
                bottomOffsetY={(Dimensions.get('window').width * (300 / 1290)-2)}
                startX={startX}
                itemDistance={itemDistance}
                 />
        </>


    );
}

export default NavBar;