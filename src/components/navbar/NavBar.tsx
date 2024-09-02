import { BlurView } from 'expo-blur';
import React, { Fragment, PureComponent } from "react";
import { Dimensions, Image, Platform, View } from "react-native";
import TransitionNavbarSelect from "./TransitionNavbarSelect";
import ButtonSmall from "../ButtonSmall";



class NavBar extends PureComponent<any, any> {
    navBarData = [];

    static navBarIconSize = 90;
    static navBarItemDistance = 100
    static navBarStartX = 0;
    static navBarHeight = (Dimensions.get('screen').width * (300 / 1290))


    constructor(props) {
        super(props)
        this.navBarData = props.data;

        NavBar.navBarStartX = (Dimensions.get('screen').width / 2 - ((this.navBarData.length - 1) * NavBar.navBarItemDistance) / 2) - NavBar.navBarIconSize / 2

    }

    render() {
        let HighlightRendererComponent = this.props.highlightRenderer;


        return (
            <>
                {Platform.OS == "ios" &&
                    <BlurView
                        intensity={50}
                        style={{
                            // backgroundColor: 'skyblue',
                            // backgroundColor: '#232323',
                            bottom: 0, left: 0, position: 'absolute',
                            width: Dimensions.get('screen').width,
                            height: NavBar.navBarHeight,
                            opacity: 1
                        }} />
                }

                <Image
                    style={{
                        // backgroundColor: 'skyblue',
                        bottom: 0, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width,
                        height: NavBar.navBarHeight,
                        resizeMode: "cover",
                        opacity: ((Platform.OS == "ios")?0.6:1.0)
                    }}
                    source={require('../../../assets/navbar/navbar_bg.png')}
                />

                {this.navBarData.map((itemData, i) => {
                    return (
                        <Fragment key={'navBarItem' + i}>

                            <ButtonSmall
                                name={'navBarItem' + i}
                                style={{
                                    // backgroundColor: 'skyblue',
                                    position: 'absolute',
                                    bottom: 42,
                                    left: (NavBar.navBarStartX + (i * NavBar.navBarItemDistance)),
                                    width: NavBar.navBarIconSize, height: 40,
                                    opacity: 0.9
                                }}
                                visualProperties={{ alpha: 1, x: 0, y: 0, z: 0 }}
                                onSelect={() => {
                                    TransitionNavbarSelect(i)
                                }}
                                // source={itemData.imgSrc}
                                text={(itemData.itemText as string).toLocaleUpperCase()}
                                fontStyle={{
                                    // backgroundColor: 'skyblue',
                                    top: 20, width: NavBar.navBarIconSize,
                                    fontFamily: 'DINNeuzeitGroteskStd-Light',
                                    textAlign: 'center',
                                    letterSpacing: 1.7,
                                    color: '#000000',
                                    fontSize: 12,
                                }}
                            />
                        </Fragment>
                    );
                })}
                <HighlightRendererComponent
                    style={{
                        position: 'absolute',
                        width: NavBar.navBarIconSize, height: 5,
                        color: '#efeee3',
                    }}
                    bottomOffsetY={NavBar.navBarHeight - 5}
                    startX={NavBar.navBarStartX}
                    itemDistance={NavBar.navBarItemDistance}
                />
            </>
        );
    }
}

export default NavBar;