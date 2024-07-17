import { BlurView } from "expo-blur";
import React, { PureComponent } from "react";
import { Dimensions, Image, Platform, ScrollView, Text, View } from "react-native";
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import LComponent from "../../core/LComponent";
import NavBar from "../navbar/NavBar";
import EarlyPassesTile from "./EarlyPassesTile";
import HomeScreenProgramItem from "./HomeScreenProgramItem";
import ScreenHeader from "./ScreenHeader";



class HomeScreen extends PureComponent<any, any> {

    static homeProgramItemHeight = 165;
    static homeProgramItemSpacingY = 6;

    scrollViewRef = null;

    constructor(props) {
        super(props);
        this.state = {
            activeItems: [],
            scrollPosY: 0,
        };
    }

    render() {
        // console.log('HomeScreen Render');
        const screenHeaderHeight = (Dimensions.get('screen').width * (350 / 1290)) - 5
        const navBarHeight = NavBar.navBarHeight;

        let contentSpace = Dimensions.get("screen").height > 800 ? Dimensions.get("screen").height - screenHeaderHeight - navBarHeight : 100;
        let distanceTiles = Dimensions.get("screen").height > 800 ? contentSpace / 3 - 30 : 190;

        const context = LauncherController.getInstance().context;
        //happeningNowOffset
        context.happeningNowItemUpdateFunction = () => {
            if (context.happeningNowItems.length == 0)
                this.setState({ activeItems: [LauncherController.getInstance().context.happeningNowItemNoSession], scrollPosY: this.state.scrollPosY })
            else
                this.setState({ activeItems: context.happeningNowItems, scrollPosY: this.state.scrollPosY });
        };
        const happeningNowTileItemHeight = 50;
        const happeningNowTileHeight = (this.state.activeItems.length - 1) * (happeningNowTileItemHeight);
        const happeningNowTotalDistance = 130 + happeningNowTileHeight + 50;
        // console.log("ScreenHeight: "+Dimensions.get("screen").height+" Content Space: "+contentSpace)

        const logoScrollAlphaReductionDelta = (Platform.OS == 'android')?0.92:0.45;

        return (
            <>
                <LComponent
                    name='homeScreenContainer'
                    style={{ position: 'absolute' }}
                    visualProperties={{ alpha: 1.0, x: 0, y: 0, z: 0, w: "windowWidth", h: "windowHeight" }}
                >
                    <Image
                        style={{
                            // backgroundColor: 'skyblue',
                            top: 0, left: 0, position: 'absolute',
                            width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
                            resizeMode: "cover",
                            opacity: 1
                        }}
                        source={require('../../../assets/screen-home-bg.png')}
                    />
                    <Image
                        source={require('../../../assets/logo-white.png')}
                        style={{
                            position: 'absolute', resizeMode: 'contain',
                            opacity: (Dimensions.get("screen").height < 800 ? 0.1 : 1.0 - (logoScrollAlphaReductionDelta * Math.min(1, Math.max(0, this.state.scrollPosY / 100)))),
                            left: 80,
                            // backgroundColor: 'red',
                            top: screenHeaderHeight + 15,
                            width: Dimensions.get('screen').width - (2 * 80),
                            height: Dimensions.get('screen').width - (2 * 80) * 1313 / 815,
                        }}
                    />
                    <ScreenHeader text={"WELCOME MY FRIEND"} color='#f8f6d3' />

                    <ScrollView style={{
                        position: 'absolute',
                        top: screenHeaderHeight, left: 0,
                        width: Dimensions.get("screen").width,
                        height: ((Platform.OS == 'android')?
                                    Dimensions.get("screen").height - screenHeaderHeight - navBarHeight:
                                    Dimensions.get("screen").height - screenHeaderHeight),
                        // backgroundColor: 'red'
                    }}
                        onScroll={(e) => {
                            this.setState({ activeItems: this.state.activeItems, scrollPosY: e.nativeEvent.contentOffset.y })
                        }}
                    >
                        {(Date.now() > Date.parse(DataModel.dataTicketSales.earlyBirdStartTimeString)) &&
                            <View
                                style={{
                                    top: Dimensions.get("screen").height > 800 ? 240 : 40,
                                    // backgroundColor:'red',
                                    width: Dimensions.get("screen").width,
                                    height: 190,
                                }}>
                                {Platform.OS == "ios" && <BlurView
                                    intensity={17}
                                    style={{
                                        // backgroundColor:'skyblue',
                                        position: 'absolute',
                                        opacity: 1.0,
                                        left: 0,
                                        top: 0,
                                        width: Dimensions.get("screen").width,
                                        height: (HomeScreen.homeProgramItemHeight + HomeScreen.homeProgramItemSpacingY) * DataModel.dataModelProgram.length - 5,

                                    }} />
                                }
                                <EarlyPassesTile offsetY={0} />
                            </View>

                        }

                        {/* {(LauncherController.getInstance().context.happeningNowItems.length > 0) &&
                            <View
                                style={{
                                    top: Dimensions.get("screen").height > 800 ? 240 : 40,
                                    // backgroundColor:'red',
                                    width: Dimensions.get("screen").width,
                                    height: 190,
                                }}>
                                {Platform.OS == "ios" && <BlurView
                                    intensity={17}
                                    style={{
                                        // backgroundColor:'skyblue',
                                        position: 'absolute',
                                        opacity: 1.0,
                                        left: 0,
                                        top: 0,
                                        width: Dimensions.get("screen").width,
                                        height: (HomeScreen.homeProgramItemHeight + HomeScreen.homeProgramItemSpacingY) * DataModel.dataModelProgram.length - 5,

                                    }} />
                                }
                                <HappeningNowTile 
                                offsetY={0} 
                                activeItems={LauncherController.getInstance().context.happeningNowItems} />
                            </View>
                        } */}

                        <View
                            style={{
                                top: Dimensions.get("screen").height > 800 ? 240 + HomeScreen.homeProgramItemSpacingY : 40,
                                // backgroundColor:'red',
                                width: Dimensions.get("screen").width,
                                height: (HomeScreen.homeProgramItemHeight + HomeScreen.homeProgramItemSpacingY) * DataModel.dataModelProgram.length,
                            }}>
                            {Platform.OS == "ios" && <BlurView
                                intensity={17}
                                style={{
                                    // backgroundColor:'skyblue',
                                    position: 'absolute',
                                    opacity: 1.0,
                                    left: 0,
                                    top: 0,
                                    width: Dimensions.get("screen").width,
                                    height: (HomeScreen.homeProgramItemHeight + HomeScreen.homeProgramItemSpacingY) * DataModel.dataModelProgram.length - 5,

                                }} />
                            }
                            <Text allowFontScaling={false} id='textHeader'
                                style={{
                                    top: -25,
                                    left: 0,
                                    width: Dimensions.get('screen').width, height: 32,
                                    color: '#f8f6d3',
                                    fontFamily: 'Cabin-Regular',
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    letterSpacing: 2.0,
                                    fontSize: 12
                                }}>
                                {'PROGRAM OVERVIEW'}
                            </Text>


                            {DataModel.dyn_dataModelProgram.map(
                                (itemData, i) => HomeScreenProgramItem({ itemData, i })
                            )}
                        </View>
                    </ScrollView>

                    {/* {(Platform.OS == 'android') &&
                        <View
                            style={{
                                backgroundColor: '#7d7974',
                                bottom: (Dimensions.get('screen').width * (300 / 1290)) / 2 - 1, left: 0, position: 'absolute',
                                width: Dimensions.get('screen').width,
                                height: (Dimensions.get('screen').width * (300 / 1290)),
                                opacity: 0.8
                            }} />
                    } */}
                </LComponent>
            </>
        );
    }
    componentDidMount(): void {
        // ActionUpdateHappeningNow();
    }
}

export default HomeScreen;