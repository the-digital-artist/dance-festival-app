import React, { PureComponent } from "react";
import { Dimensions, Image, Platform, ScrollView, View } from "react-native";
import ActionHistoryBackButton from "../../actions/ActionHistoryBackButton";
import LText from "../../core/LText";
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import TransitionLinkToArtistPage from "../../transitions/TransitionLinkToArtistPage";
import ButtonSmall from "../ButtonSmall";
import NavBar from "../navbar/NavBar";
import ScheduleListItemType4 from "../schedulelist/ScheduleListItemType4";
import ScreenHeader from "../screens/ScreenHeader";
import ScreenHomeButton from "../screens/ScreenHomeButton";


class SchedulerSessionDetailsScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scrollPosY: 0
        };
    }

    render() {
        const context = LauncherController.getInstance().context
        const item = LauncherController.getInstance().context.schedulerFocusItem

        LauncherController.getInstance().schedulerStackComponentRef = this;

        const sessionCategoryName = (item.level != undefined && item.level == 'M') ? " Masterclass " : " Special Track "
        const artistData1 = DataModel.getInstance().static.dataArtists[item.artistOne];
        if (artistData1 == undefined) return;

        const preSignupRequired = ((item.sessionMainTitle as string).toLowerCase().indexOf("absolute beginner") == -1)

        const specialTrackData = DataModel.getInstance().static.dataSpecialSessions[item.sessionMainTitle];
        // const companyString = artistData1.artistCompany != undefined ? artistData1.artistCompany : '';

        // const scrollViewContent =
        //     Platform.OS == 'ios' ?
        //         (item.bio as string).length / 1100 * 1.5 * Dimensions.get('screen').height :
        //         (item.bio as string).length / 1100 * 1.7 * Dimensions.get('screen').height;

        // let socialBarData = [
        //     { id: 0, provider: "Instagram", account: item.insta, imgSrc: require('../../../assets/icon-social-insta-black.png') },
        //     // { id: 1, provider: "Youtube", account: "", imgSrc: require('../../../assets/icon-social-youtube.png') },
        //     // { id: 2, provider: "Facebook", account: "", imgSrc: require('../../../assets/icon-social-facebook.png') },
        //     // { id: 3, provider: "Web", account: "", imgSrc: require('../../../assets/icon-social-web.png') }
        // ]
        // let iconSize = 25;
        // let itemDistance = 40
        // let startX = Dimensions.get('screen').width - (20 + 5 + 30 + 30) - ((socialBarData.length - 1) * itemDistance + iconSize / 2);
        // // let startX = ((((socialBarData.length - 1) * itemDistance) / 2) - iconSize / 2 - 40)

        return (
            <>
                <View
                    style={{
                        backgroundColor: '#595462',
                        top: 0, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
                        opacity: 0.7
                    }}
                >

                </View>
                <Image
                    style={{
                        // backgroundColor: 'skyblue',
                        top: 0, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height,
                        resizeMode: "cover",
                        opacity: 0.8
                    }}
                    source={require('../../../assets/screen-scheduler-bg.png')}
                />

                <>

                    <LText id='headerSessionDetails' style={{
                        position: 'absolute',
                        top: 170, left: 26,
                        fontFamily: 'Cabin-Regular',
                        // backgroundColor: 'skyblue',
                        textAlign: 'left',
                        letterSpacing: 1.0,
                        opacity: 0.7,
                        color: '#2f2b29',
                        fontSize: 9,
                    }}>
                        {"SESSION DETAILS"}
                    </LText>

                    <View
                        style={{
                            position: 'absolute',
                            transform: [{ scale: (Dimensions.get('screen').width - 80) / Dimensions.get('screen').width }],
                            top: 165, left: 5,
                            width: Dimensions.get('screen').width - 10,
                            height: 190,
                            // backgroundColor: 'skyblue',
                            opacity: 1.0,
                        }}
                    >
                        <ScheduleListItemType4 item={item} showDetailsButton={false} />
                    </View>
                </>




                {true &&
                    <ScrollView
                        style={{
                            // backgroundColor: 'skyblue',
                            top: 355, left: 20, position: 'absolute',
                            width: Dimensions.get('screen').width - 40,
                            height: Dimensions.get('screen').height - 330 - NavBar.navBarHeight,
                            opacity: 1
                        }}>




                        <View
                            style={{
                                // backgroundColor: 'skyblue',
                                flexDirection: 'column',
                                top: 0, left: 0,
                                width: Dimensions.get('screen').width - 45,
                                opacity: 1
                            }}>



                            <LText id='headlineArtistInfo' style={{
                                top: 0, left: 0,
                                fontFamily: 'Cabin-Regular',
                                // backgroundColor: 'skyblue',
                                textAlign: 'left',
                                letterSpacing: 1.0,
                                opacity: 0.7,
                                color: '#2f2b29',
                                fontSize: 9,
                            }}>
                                {"PRACTITIONERS / ARTISTS"}
                            </LText>

                            <LText id='textSessionArtistName' style={{
                                marginTop: 10,
                                top: 0, left: 30,
                                width: 190,
                                fontFamily: 'Cabin-Regular',
                                letterSpacing: 1.2,
                                //   backgroundColor: 'indigo',
                                textAlign: 'left',
                                color: '#e2b078',
                                fontSize: 13,
                            }}>
                                {artistData1.fullName ? (artistData1.fullName as string).toLocaleUpperCase() : ""}
                            </LText >

                            <LText id='textArtistBio'
                                numberOfLines={2}
                                style={{
                                    marginTop: 5,
                                    top: 0, left: 30,
                                    width: Dimensions.get('screen').width - 70 - 25,
                                    fontFamily: 'Arcon-Regular',
                                    letterSpacing: 0.8,
                                    textAlign: 'justify',
                                    // backgroundColor: 'indigo',
                                    color: '#EFEFEF',
                                    fontSize: 14,
                                }}>
                                {artistData1.bio ? (artistData1.bio as string) : "Unfortunately, this artist did not provide any information."}
                            </LText>




                            <ButtonSmall
                                name={("ScheduleListArtistDetailsButton" + item.id)}
                                source={null}
                                style={{
                                    marginTop: 10,
                                    left: Dimensions.get('screen').width - 70 - 120,
                                    height: 23, width: 120,
                                }}
                                text={"ARTIST DETAILS"}
                                bgBoxVisible={true}
                                bgBoxStyle={{
                                    backgroundColor: '#1d1c24',
                                    height: 23, width: 120
                                }}
                                fontStyle={{
                                    width: 120,
                                    top: ((Platform.OS == 'android')) ? -2 : 5,
                                    color: '#FFFFFF',
                                    fontFamily: 'Cabin-Regular',
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    letterSpacing: 2.0,
                                    // color: '#FFFFFF',
                                    fontSize: 9,
                                    height: 23,
                                }}
                                visualProperties={{ alpha: 1 }}
                                onSelect={() => {
                                    if (artistData1 == undefined) return;
                                    LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerSessionDetailsScreen", transition: "TransitionLinkToArtistPage" });
                                    TransitionLinkToArtistPage(artistData1)
                                }}
                            />

                            <LText id='headlineDescription' style={{
                                marginTop: 15,
                                left: 0,
                                top: 0,
                                fontFamily: 'Cabin-Regular',
                                // backgroundColor: 'skyblue',
                                textAlign: 'left',
                                letterSpacing: 1.0,
                                opacity: 0.7,
                                color: '#2f2b29',
                                fontSize: 9,
                            }}>
                                {"DESCRIPTION"}
                            </LText>
                            <LText id='specialTrackFocusDescription' style={{
                                marginTop: 10,
                                top: 0, left: 30,
                                width: Dimensions.get('screen').width - 70 - 25,
                                fontFamily: 'Arcon-Regular',
                                letterSpacing: 0.8,
                                textAlign: 'justify',
                                // backgroundColor: 'indigo',
                                color: '#EFEFEF',
                                fontSize: 14,
                            }}>
                                {item ? (item.description as string) : ""}
                            </LText>
                        </View>
                        <View
                            style={{
                                height: 100,
                            }}
                        />
                    </ScrollView>

                }


                <ScreenHeader
                    text={"SESSION DETAILS"}
                    color='#f8f6d3'
                    textStyle={{ left: 50 }}
                    imgSrc={require('../../../assets/header-schedule-bg.png')} />
                    
                <ScreenHomeButton />


                <ButtonSmall
                    name={'backButtonSessionDetailsDetails'}
                    style={{
                        // backgroundColor: 'skyblue',
                        position: 'absolute',
                        top: 70, left: 0,
                        width: 40, height: 40,
                        opacity: 0.9
                    }}
                    visualProperties={{ alpha: 1, x: 0, y: 0, z: 0 }}
                    onSelect={() => { ActionHistoryBackButton(); }}
                    source={require('../../../assets/stack-backicon.png')}
                />
            </>
        );
    }
}

export default SchedulerSessionDetailsScreen;