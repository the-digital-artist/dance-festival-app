import React, { PureComponent } from "react";
import { Dimensions, Image, LayoutChangeEvent, NativeSyntheticEvent, Platform, Text, TextLayoutEventData, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LauncherController from "../../LauncherController";
import LComponent from "../../core/LComponent";
import NavBar from "../navbar/NavBar";
import LText from "../../core/LText";
import SubHeadline from "../SubHeadline";
import TransitionArtistNavigateDown from "../../transitions/TransitionArtistNavigateDown";
import ButtonSmall from "../ButtonSmall";
import ArtistDetailsScheduleItem from "./ArtistDetailsScheduleItem";


class ArtistDetailsConnectPage extends PureComponent<any, any> {

    gestureRef: any = React.createRef();
    scrollViewRef: any = React.createRef();
    maxScrollValue;
    opacity: number = 0.0;

    items = [{
        "id": 20301,
        "itemType": "type1",
        "artistName": "De’jon & Clo",
        "sessionMainTitle": "Salsa On 2 partnerwork",
        "time": "12:00 PM - 1:00 PM",
        "room": "AURORA 1",
        "level": "1",
        "group": [
            20301,
            20302,
            20303,
            20304,
            20305,
            20306,
            20307,
            20308
        ],
        "groupTitle": "Workshops",
        "groupSubtitle": "",
        "shortMainTitle": "",
        "dateString": "Sat, October 19, 2024",
        "startTime": "2024-10-19T12:00:00.000Z",
        "endTime": "2024-10-19T13:00:00.000Z",
        "place": "",
        "sessionSubtitle": "",
        "sessionDescription": "",
        "artistOne": "De’jon & Clo",
        "artistTwo": "",
        "artistLocation": "DALLAS",
        "flag": false,
        "flagIncludeInNow": false,
        "artistCompany": "",
        "sessionSpecialTrackCount": "(2 of 2)"
    },
    {
        "id": 30201,
        "itemType": "type1",
        "artistName": "De’jon & Clo",
        "sessionMainTitle": "Salsa On 2 Partnerwork",
        "time": "12:00 PM - 1:00 PM",
        "room": "AURORA 1",
        "level": "1",
        "group": [
            30201,
            30202,
            30203,
            30204,
            30205,
            30206,
            30207,
            30208
        ],
        "groupTitle": "Workshops",
        "groupSubtitle": "",
        "shortMainTitle": "",
        "dateString": "Sun, October 20, 2024",
        "startTime": "2024-10-20T12:00:00.000Z",
        "endTime": "2024-10-20T13:00:00.000Z",
        "place": "",
        "sessionSubtitle": "",
        "sessionDescription": "",
        "artistOne": "De’jon & Clo",
        "artistTwo": "",
        "artistLocation": "DALLAS",
        "flag": false,
        "flagIncludeInNow": false,
        "artistCompany": "",
        "sessionSpecialTrackCount": ""
    }
    ]


    scrollHandler = (e) => {
        this.opacity = 0
        // 1.0 - Math.min(
        //     // 1 * Math.min(1, Math.max(0, (this.maxScrollValue - e.nativeEvent.contentOffset.y) / 80)),
        //     1 * Math.min(1, Math.max(0, e.nativeEvent.contentOffset.y / 30))
        // )
        // console.log("this.opacity "+this.opacity+ " ");
        this.setState({ scrollPosY: e.nativeEvent.contentOffset.y })
        this.forceUpdate()
    }


    constructor(props) {
        super(props);
        this.state = {
            scrollPosY: 0,
            heightThresholdPassed: false,
        };
        LauncherController.getInstance().context.artistFocusItemUpdateListeners.push(() => {
            if (this.scrollViewRef.current != null) this.scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
            this.forceUpdate()
        });
    }

    render() {
        // console.log("render update "+this.opacity);
        const item = LauncherController.getInstance().context.artistFocusItem
        const artistBiography = (item != undefined && item.bio != undefined && item.bio.length > 0) ? (item.bio as string) : "Stay tuned - more information coming soon"


        const maskStart = Dimensions.get('screen').height * (1590 / 2796)
        const maskStart2 = Dimensions.get('screen').height * (1736 / 2796)
        const artistImageOffsetBottom = ((Platform.OS == 'android') ? NavBar.navBarHeight : NavBar.navBarHeight - 20)
        const artistImageSize = Dimensions.get('screen').height - artistImageOffsetBottom - maskStart;


        const padding = 35;

        const offerValid = true;

        return (
            <>
                <ScrollView
                    // simultaneousHandlers={[this.gestureRef]}
                    ref={this.scrollViewRef}
                    style={{
                        // backgroundColor: 'red',
                        top: 160, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height - 180 - NavBar.navBarHeight - 20,
                        opacity: 1
                    }}
                    onScroll={this.scrollHandler}
                    onMomentumScrollEnd={this.scrollHandler}
                    onScrollBeginDrag={this.scrollHandler}
                    onScrollEndDrag={this.scrollHandler}
                    onScrollToTop={this.scrollHandler}
                >

                    <View style={{
                        //  backgroundColor: 'skyblue',
                        top: 0, left: padding,
                        width: Dimensions.get('screen').width - 2 * padding,
                        flex: 1, flexDirection: 'column',
                    }}>


                        {/* <Image
                            style={{
                                //    marginTop: 15,
                                // top: 210, left: padding, 
                                width: Dimensions.get('screen').width - 2 * padding,
                                height: (Dimensions.get('screen').width - 2 * padding) * (195 / 1500),
                                resizeMode: "contain",
                                opacity: 1.0
                            }}
                            source={require('../../../assets/artistconnect/dejon-clo-allsessions.png')} />
                       */}


                        <SubHeadline
                            text={"CONNECT WITH ARTIST"}
                            style={{ position: 'relative', marginTop: 30, marginBottom: 15 }}
                        />
                        <LText
                            id='academyoffer'
                            style={{
                                marginBottom: 15,
                                fontFamily: 'Arcon-Regular',
                                letterSpacing: 1,
                                textAlign: 'justify',
                                color: '#EFEFEF',
                                fontSize: 14,
                            }}
                        >
                            {"De’Jon & Clo VIP All Access offers online classes for Salsa On2, Bachata Fusion & Dominicana, Turn & Spin Drills, Ladies Styling, Pachanga & Stretching & Warm-Up Routines with a fresh class every month."}
                        </LText>

                        <View
                            style={{
                                //  backgroundColor: 'skyblue',
                                width: (Dimensions.get('screen').width - 2 * 30),
                                height: 130,
                                opacity: 1.0
                            }}
                        >

                            {/* <Image
                                source={require('../../../assets/hometile-overlay-shine.png')}
                                style={{
                                    position: 'absolute',
                                    resizeMode: 'cover', opacity: 0.15,
                                    left: 0,
                                    width: (Dimensions.get('screen').width - 2 * 30),
                                    height: 130,
                                }} /> */}
                            <Image
                                style={{
                                    //    backgroundColor: 'skyblue',
                                    top: 0,
                                    left: 0,
                                    width: (Dimensions.get('screen').width - 2 * padding),
                                    height: (Dimensions.get('screen').width - 2 * padding) * (400 / 1200),
                                    resizeMode: "contain",
                                    opacity: 1.0
                                }}
                                source={require('../../../assets/artistconnect/dejon-clo-banner.png')} />


                        </View>
                        <ButtonSmall
                            name={("claimOfferButton" + 129467)}
                            style={{
                                top: -55,
                                left: Dimensions.get('screen').width / 2 - padding - (offerValid ? 155 : 120) / 2,
                                height: 30, width: (offerValid ? 155 : 120),

                            }}
                            text={offerValid ? "LEARN MORE..." : "ALREADY CLAIMED"}
                            bgBoxVisible={true}
                            bgBoxStyle={{
                                backgroundColor: (offerValid ? '#000000' : '#d6c8cb'),
                                height: 30, width: (offerValid ? 155 : 120),
                                opacity: 0.8
                            }}
                            fontStyle={{
                                width: (offerValid ? 155 : 120),
                                fontFamily: 'Cabin-Regular',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                letterSpacing: 2.0,
                                color: (offerValid ? '#FFFFFF' : '#010101'),
                                fontSize: 10,
                            }}
                            visualProperties={{ alpha: 1 }}
                            onSelect={() => {
                                LauncherController.getInstance().context.navigationHistory.push({ out: 'ArtistConnectPage', transition: 'TransitionArtistNavigateDown', data: {} })
                                TransitionArtistNavigateDown(item, 2)
                            }}
                        />





                        <SubHeadline
                            text={"GALLERY"}
                            style={{ position: 'relative', marginTop: 5, marginBottom: 15 }}
                        />

                        <Image
                            style={{
                                //  backgroundColor: 'skyblue',
                                marginTop: 15,
                                left: -padding,
                                width: Dimensions.get('screen').width,
                                height: (Dimensions.get('screen').width - 2 * padding) * (680 / 1053),
                                resizeMode: "contain",
                                opacity: 1.0
                            }}
                            source={require('../../../assets/artistconnect/dejon-clo-gallerythumb.png')} />




                        <SubHeadline
                            text={"BIOGRAPHIES"}
                            style={{ position: 'relative', marginTop: 30, marginBottom: 15 }}
                        />

                        <LText
                            id='artistBioFocus'
                            style={{
                                top: 0, margin: 0, marginBottom: 15,
                                width: Dimensions.get('screen').width - 2 * padding,
                                // height: (artistBiography as string).length / 1100 * 1.2 * Dimensions.get('screen').height,
                                fontFamily: 'Arcon-Regular',
                                letterSpacing: 1,
                                textAlign: 'justify',
                                color: '#EFEFEF',
                                fontSize: 15,
                            }}
                            onLayout={(e: LayoutChangeEvent) => {
                                let totalContentHeight = (30 + e.nativeEvent.layout.height + Dimensions.get('screen').height * (900 / 2796))
                                let scrollWindowHeight = (Dimensions.get('screen').height - 180 - NavBar.navBarHeight - 20)
                                this.maxScrollValue = totalContentHeight - scrollWindowHeight;

                                this.setState({
                                    scrollPosY: this.state.scrollPosY,
                                    heightThresholdPassed: false,
                                    // heightThresholdPassed: (e.nativeEvent.layout.height + 180 > (maskStart))
                                })
                            }}
                        >
                            {artistBiography}
                        </LText>




                        <SubHeadline
                            text={"ALL SESSIONS"}
                            style={{ position: 'relative', marginTop: 30, marginBottom: 15 }}
                        />

                        <View
                            style={{
                                //    marginTop: 15,
                                // top: 210, left: padding, 
                                width: Dimensions.get('screen').width - 2 * padding,
                                marginTop: 15, marginBottom: 30,
                                height: 150,
                                opacity: 1.0
                            }}>
                            <View
                                style={{
                                    width: Dimensions.get('screen').width - 2 * padding,
                                    marginTop: 0, marginBottom: 30,
                                    height: 75,
                                }}>

                                <ArtistDetailsScheduleItem
                                    item={this.items[0]}
                                    rowHeight={75}
                                    tileWidth={Dimensions.get('screen').width - 2 * padding}
                                    tileOffsetTop={0}
                                    tileOffsetLeft={0} />
                            </View>


                            <View
                                style={{
                                    width: Dimensions.get('screen').width - 2 * padding,
                                    marginTop: 0, marginBottom: 30,
                                    height: 75,
                                }}>
                                <ArtistDetailsScheduleItem
                                    item={this.items[1]}
                                    rowHeight={75}
                                    tileWidth={Dimensions.get('screen').width - 2 * padding}
                                    tileOffsetTop={0}
                                    tileOffsetLeft={0} />
                            </View>

                        </View>
                    </View>

                </ScrollView>

                <LComponent
                    name={"artistImageOverlay" + item.fullName}
                    pointerEvents="none"
                    style={{
                        // backgroundColor: 'skyblue',
                        top: 0, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height,
                    }}>
                    <Image

                        style={{
                            // backgroundColor: 'skyblue',
                            top: 0, left: 0, position: 'absolute',
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').height,
                            resizeMode: "stretch",
                            opacity: this.opacity
                        }}
                        source={require('../../../assets/screen-artists-bg-masked.png')} />

                    {item.imgSrc != null && <Image
                        // name={("ScheduleListArtistDetailsButton" + item.fullName)}
                        source={item.imgSrc}
                        style={{
                            // backgroundColor:'skyblue',
                            position: 'absolute',
                            right: -40,
                            bottom: artistImageOffsetBottom,
                            width: artistImageSize,
                            height: artistImageSize,
                            opacity: this.opacity

                        }}
                    />
                    }
                </LComponent>

                {this.state.heightThresholdPassed &&
                    <View
                        style={{
                            position: 'absolute',
                            // bottom: artistImageSize-50+((Platform.OS == 'android') ? NavBar.navBarHeight + 50 : NavBar.navBarHeight - 20),
                            // top: Dimensions.get('screen').height-artistImageSize-NavBar.navBarHeight+45, 
                            top: maskStart2,
                            left: 35,
                            backgroundColor: 'transparent',
                            opacity: 1.0 - (1.0 * Math.min(1, Math.max(0, this.state.scrollPosY / 10)))
                        }}
                    >
                        <LText
                            id='artistBioFocus'
                            style={{
                                width: Dimensions.get('screen').width - artistImageSize + 40,
                                // height: (artistBiography as string).length / 1100 * 1.2 * Dimensions.get('screen').height,
                                fontFamily: 'Arcon-Regular',
                                letterSpacing: 1.0,
                                // textAlign: 'justify',
                                // backgroundColor: 'indigo',
                                color: '#7a87a6',
                                fontSize: 10,
                            }}
                        >
                            {"SCROLL TO READ MORE"}
                        </LText>
                    </View>
                }
            </>
        );
    }
}

export default ArtistDetailsConnectPage;