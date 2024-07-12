import React, { PureComponent } from "react";
import { Dimensions, Image, Platform, ScrollView, Text, View } from "react-native";
import LauncherController from "../../LauncherController";
import LComponent from "../../core/LComponent";
import ButtonSmall from "../ButtonSmall";
import ActionUpdateHappeningNow from "../happeningnowtile/ActionUpdateHappeningNow";
import NavBar from "../navbar/NavBar";
import ScreenHeader from "./ScreenHeader";
import TransitionLinkToSchedule from "../../transitions/TransitionLinkToSchedule";
import { BlurView } from "expo-blur";
import DataModel from "../../DataModel";
import ActionOpenMaps from "../../actions/ActionOpenMaps";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";


class HomeScreen extends PureComponent<any, any> {
    scrollViewRef = null;
    itemHeight = Dimensions.get('screen').width * 0.75 * (556 / 980);
    itemSpacingY = 10;

    constructor(props) {
        super(props);
        this.state = {
            activeItems: [LauncherController.getInstance().context.happeningNowItemNoSession],
            scrollPosY: 0,
        };
    }

    render() {
        // console.log('rendering HomeScreen');
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
                            opacity: (Dimensions.get("screen").height < 800 ? 0.1 : 1.0 - (0.45 * Math.min(1, Math.max(0, this.state.scrollPosY / 100)))),
                            left: 80,
                            // backgroundColor: 'red',
                            top: screenHeaderHeight + 15,
                            width: Dimensions.get('screen').width - (2 * 80),
                            height: Dimensions.get('screen').width - (2 * 80) * 1313 / 815,
                        }}
                    />
                    <ScreenHeader text={"WELCOME MY FRIEND"} color='#9F9F90' />

                    <ScrollView style={{
                        position: 'absolute',
                        top: screenHeaderHeight, left: 0,
                        width: Dimensions.get("screen").width,
                        height: Dimensions.get("screen").height - screenHeaderHeight - navBarHeight,
                        // backgroundColor: 'red'
                    }}
                        onScroll={(e) => {
                            // console.log(e.nativeEvent.contentOffset.y);
                            this.setState({ activeItems: this.state.activeItems, scrollPosY: e.nativeEvent.contentOffset.y })
                        }}
                    >

                        <View
                            style={{
                                top: 240 + this.itemSpacingY,
                                // backgroundColor:'red',
                                width: Dimensions.get("screen").width,
                                height: this.itemHeight * DataModel.dataModelProgram.length,
                            }}>
                            {Platform.OS == "ios" && <BlurView
                                intensity={17}
                                style={{
                                    // backgroundColor:'skyblue',
                                    position: 'absolute',
                                    opacity: 1.0,
                                    left: 0,
                                    top: 5,
                                    width: Dimensions.get("screen").width,
                                    height: this.itemHeight * DataModel.dataModelProgram.length - 5,

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


                            {DataModel.dataModelProgram.map((itemData, i) => {
                                return (
                                    <View
                                        key={itemData.id + i + ""}
                                        style={{
                                            position: 'absolute',
                                            opacity: 1.0,
                                            top: (i * (this.itemHeight + this.itemSpacingY)),
                                            left: 0,
                                            width: Dimensions.get("screen").width,
                                            height: this.itemHeight,
                                        }}
                                    >
                                        {itemData.type != 'type5' &&
                                            <>
                                                <Image
                                                    source={DataModel.dataStyles[itemData.type].imgSrc}
                                                    style={{
                                                        position: 'absolute',
                                                        resizeMode: 'cover',
                                                        opacity: 0.6,
                                                        top: 0,
                                                        left: -7,
                                                        width: Dimensions.get("screen").width * 0.75,
                                                        height: this.itemHeight,
                                                    }}
                                                />
                                                <Image
                                                    source={DataModel.dataStyles[itemData.type].imgSrc}
                                                    style={{
                                                        position: 'absolute',
                                                        resizeMode: 'cover',
                                                        opacity: 0.1,
                                                        top: 0,
                                                        left: Dimensions.get("screen").width * 0.75 - 20,
                                                        width: Dimensions.get("screen").width * 0.25 + 20,
                                                        height: this.itemHeight,
                                                    }}
                                                />
                                                <Text allowFontScaling={false} id='textTitle' style={[{
                                                    position: 'absolute',
                                                    top: 20,
                                                    left: 30,
                                                    width: Dimensions.get("screen").width * 0.75 - 55,
                                                    height: 45,
                                                    fontFamily: 'LuckiestGuy-Regular',
                                                    letterSpacing: 2.0,
                                                    fontSize: 20,
                                                    color: (DataModel.dataStyles[itemData.type].color1),
                                                    // backgroundColor: 'skyblue',
                                                    textAlign: 'left',
                                                }]}>
                                                    {itemData.title}
                                                </Text>


                                                <Text allowFontScaling={false} id='textDescription' style={[{
                                                    position: 'absolute',
                                                    top: 50,
                                                    left: 30,
                                                    width: Dimensions.get("screen").width * 0.75 - 65,
                                                    height: this.itemHeight - 80 - 15,
                                                    fontFamily: 'RobotoCondensed-Medium',
                                                    letterSpacing: 0.5,
                                                    fontSize: 13,
                                                    color: (DataModel.dataStyles[itemData.type].color2),
                                                    // backgroundColor: 'blue',
                                                    textAlign: 'left',

                                                }]}>
                                                    {itemData.description}
                                                </Text>
                                                <Text allowFontScaling={false} id='textDateTime' style={[{
                                                    position: 'absolute',
                                                    top: 20,
                                                    right: 15,
                                                    width: Dimensions.get("screen").width * 0.25 - 15,
                                                    height: 38,
                                                    fontFamily: 'RobotoCondensed-Medium',
                                                    // letterSpacing: 1.0,
                                                    fontSize: 14,
                                                    color: '#fdface',
                                                    // backgroundColor: 'indigo',
                                                    textAlign: 'center',

                                                }]}>
                                                    {itemData.dateText + "\n" + itemData.timeText}
                                                </Text>
                                                {/* 
                                                <Text allowFontScaling={false} id='textPasses' style={[{
                                                    position: 'absolute',
                                                    bottom: 20+6,
                                                    left: 30+20+12,
                                                    // width: Dimensions.get("screen").width * 0.75 - 30 - 15,
                                                    fontFamily: 'RobotoCondensed-Medium',
                                                    letterSpacing: 0.5,
                                                    
                                                    fontSize: 12,
                                                    color: (DataModel.dataStyles[itemData.type].color3),
                                                    opacity: 1.0,
                                                    // backgroundColor: 'black',
                                                    textAlign: 'left',

                                                }]}>
                                                    {itemData.location}
                                                </Text> */}
                                                <ButtonSmall
                                                    name={("homeTileLocationButton" + i)}
                                                    source={DataModel.dataLocation[itemData.location].imgSrc}
                                                    style={{
                                                        position: 'absolute',
                                                        // backgroundColor: 'red',
                                                        top: 60,
                                                        left:  Dimensions.get("screen").width * 0.75-10,
                                                        width: Dimensions.get("screen").width * 0.25,
                                                        height: 40,
                                                    }}
                                                    bgBoxVisible={false}
                                                    bgBoxStyle={{
                                                        backgroundColor: (DataModel.dataStyles[itemData.type].color2),
                                                        height: 30, width: 200
                                                    }}
                                                    text={DataModel.dataLocation[itemData.location].locationName}
                                                    fontStyle={{
                                                        width: Dimensions.get("screen").width * 0.25, 
                                                        height: 45,
                                                        top: 40, 
                                                        left:0,
                                                        textAlign: 'center',
                                                        fontFamily: 'RobotoCondensed-Medium',
                                                        letterSpacing: 0,
                                                        // backgroundColor: 'skyblue',
                                                        fontSize: 11,
                                                        textAlignVertical: 'center',
                                                        color: '#fdface',
                                                    }}
                                                    visualProperties={{ alpha: 1 }}
                                                    onSelect={() => { if(itemData.location!='unknown') ActionOpenMaps(DataModel.dataLocation[itemData.location].mapObj) }}
                                                />

                                               { itemData.location!='unknown' &&
                                                <ButtonSmall
                                                    name={("homeTileLocationButton2" + i)}
                                                    // source={DataModel.dataLocation[itemData.location].imgSrc}
                                                    style={{
                                                        position: 'absolute',
                                                        top: (DataModel.dataLocation[itemData.location].locationName.length>25?147:130),
                                                        right: 15,
                                                        width: 90,
                                                        height: 22,
                                                    }}
                                                    text={"OPEN MAPS"}
                                                    bgBoxVisible={true}
                                                    bgBoxStyle={{
                                                      backgroundColor: '#121212',
                                                      height: 22, width: 90,
                                                      opacity:0.5
                                                    }}
                                                    fontStyle={{
                                                        height: 22, width: 90,
                                                      fontFamily: 'Cabin-Regular',
                                                      textAlign: 'center',
                                                      textAlignVertical: 'center',
                                                      letterSpacing: 2.0,
                                                      color: '#fdface',
                                                      fontSize: 9,
                                                    }}
                                                    visualProperties={{ alpha: 1 }}
                                                    onSelect={() => { ActionOpenMaps(DataModel.dataLocation[itemData.location].mapObj) }}
                                                />
                                            }

                                                {/* <Image
                                                    source={DataModel.dataLocation[itemData.location].imgSrc}
                                                    style={{
                                                        position: 'absolute',
                                                        resizeMode: 'contain',
                                                        opacity: 0.7,
                                                        bottom: 30,
                                                        right: 15,
                                                        width: 70,
                                                        height: 34,
                                                    }}
                                                /> */}

                                                {itemData.type == 'type1' &&
                                                    <ButtonSmall
                                                        name={("homeTileButtonToWorkshop" + i)}
                                                        source={require('../../../assets/tile-fullprogram-workshopplanner.png')}
                                                        style={{
                                                            position: 'absolute',
                                                            left: 30,
                                                            top: 100,
                                                            height: 26, width: 26,
                                                        }}
                                                        text={"Go To Workshop Planner"}
                                                        bgBoxVisible={true}
                                                        bgBoxStyle={{
                                                            backgroundColor: (DataModel.dataStyles[itemData.type].color2),
                                                            height: 30, width: 200
                                                        }}
                                                        fontStyle={{
                                                            width: 200,
                                                            fontFamily: 'RobotoCondensed-Medium',
                                                            letterSpacing: 0.5,
                                                            fontSize: 14,
                                                            textAlignVertical: 'center',
                                                            color: (DataModel.dataStyles[itemData.type].color3),
                                                        }}
                                                        visualProperties={{ alpha: 1 }}
                                                        onSelect={() => {
                                                            LauncherController.getInstance().context.navigationHistory.push({ out: 'HomeScreen', transition: 'TransitionLinkToSchedule' })
                                                            TransitionLinkToSchedule();
                                                        }}
                                                    />
                                                }
                                            </>
                                        }
                                    </View>
                                );
                            })}
                        </View>


                    </ScrollView>

                    {(Platform.OS == 'android') &&
                        <View
                            style={{
                                backgroundColor: '#9F509F',
                                bottom: (Dimensions.get('screen').width * (300 / 1290)) / 2 - 1, left: 0, position: 'absolute',
                                width: Dimensions.get('screen').width,
                                height: (Dimensions.get('screen').width * (300 / 1290)),
                                opacity: 0.8
                            }} />
                    }
                </LComponent>
            </>
        );
    }
    componentDidMount(): void {
        ActionUpdateHappeningNow();
    }
}

export default HomeScreen;