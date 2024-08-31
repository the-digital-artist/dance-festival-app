import React, { PureComponent } from "react";
import { Dimensions, Image, Platform, ScrollView, StyleSheet, View } from "react-native";
import ActionHistoryBackButton from "../../actions/ActionHistoryBackButton";
import LText from "../../core/LText";
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import ButtonSmall from "../ButtonSmall";
import ScreenHeader from "./ScreenHeader";
import ScreenHomeButton from "./ScreenHomeButton";
import TabBar from "../tabbar/TabBar";
import NavBar from "../navbar/NavBar";
import TransitionLinkToArtistPage from "../../transitions/TransitionLinkToArtistPage";


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
        LauncherController.getInstance().schedulerStackData[1].screenComponentRef = this;

        const sessionCategoryName = (item.level != undefined && item.level == 'M') ? " Masterclass " : " Special Track "
        const artistData1 = DataModel.getInstance().static.dataArtists[item.artistOne];
        const preSignupRequired = ((item.sessionMainTitle as string).toLowerCase().indexOf("absolute beginner") == -1)

        const specialTrackData = DataModel.getInstance().static.dataSpecialSessions[item.sessionMainTitle];
        const companyString = artistData1.artistCompany != undefined ? artistData1.artistCompany : '';

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
                        backgroundColor: '#f2a33a',
                        top: 0, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
                        opacity: 1
                    }}
                >
                    <Image
                        style={{
                            // backgroundColor: 'skyblue',
                            top: 0, left: 0, position: 'absolute',
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').height,
                            resizeMode: "cover",
                            opacity: 1.0
                        }}
                        source={require('../../../assets/screen-scheduler-bg.png')}
                    />
                </View>


                <>
                    <View id='bg' style={{
                        position: 'absolute',
                        top: 185, left: 0,
                        height: 180 - 50,
                        width: Dimensions.get('screen').width - 10,
                        opacity: 0.2,
                        padding: 0,
                        backgroundColor: '#382b38',
                    }}
                    />

                    <LText id='headerSessionDetails' style={{
                        position: 'absolute',
                        top: 150, left: 26,
                        fontFamily: 'Cabin-Regular',
                        // backgroundColor: 'skyblue',
                        textAlign: 'left',
                        letterSpacing: 1.0,
                        opacity: 0.5,
                        color: '#FFFFFF',
                        fontSize: 9,
                    }}>
                        {"SESSION DETAILS"}
                    </LText>

                    <Image
                        // name={("ScheduleListArtistDetailsButton" + item.fullName)}
                        source={artistData1.imgSrc}
                        style={{
                            position: 'absolute',
                            right: -40,
                            bottom: ((Platform.OS == 'android') ? 140 : 70),
                            width: 300,
                            height: 300,
                            opacity: 0.3

                        }}
                    // bgBoxVisible={false}
                    // visualProperties={{ alpha: 0.7 }}
                    // onSelect={() => {
                    // context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "ActionOpenSocialMediaApp" });
                    // ActionOpenSocialMediaApp("Instagram", item.insta)
                    // }}
                    />

                    <View
                        style={{
                            // backgroundColor: 'skyblue',
                            flexDirection: 'column',
                            left: 60,
                            top: 190,
                            width: Dimensions.get('screen').width / 2,
                            height: 120
                        }}>

                        <LText id='textSessionCategoryAndRoom' style={{
                            left: -5,
                            fontFamily: 'Cabin-Regular',
                            letterSpacing: 1.2,
                            opacity: 0.8,
                            padding: 2,
                            backgroundColor: '#382b38',
                            // backgroundColor: '#600f2c',
                            textAlign: 'left',
                            color: '#bcd4ee',
                            fontSize: 11,
                        }}>
                            {sessionCategoryName.toLocaleUpperCase() + "  |  " + (item.room ? (item.room as string).toLocaleUpperCase() + " " : "")}
                        </LText >


                        {preSignupRequired &&
                            <LText allowFontScaling={false} id='textPreSignup' style={{
                                top: 5,
                                left: 0,
                                width: Dimensions.get('screen').width - 90,
                                height: 15,
                                fontFamily: 'Cabin-Regular',
                                letterSpacing: 1.2,
                                // opacity: 0.5,
                                // backgroundColor: 'indigo',
                                textAlign: 'left',
                                color: '#FFFFFF',
                                fontSize: 10,
                            }}>
                                {"PRE-SIGNUP REQUIRED"}
                            </LText >
                        }
                          {
        (!preSignupRequired) &&

        <Image
          source={LauncherController.getInstance().staticImageList[LauncherController.getInstance().staticImageList.length - 1].imgSrc}
          style={{
            position: 'absolute',
            opacity: 0.5,
            top: 10,
            left: Dimensions.get('screen').width -145,
            width: 50,
            height: 50,
          }}
        >
        </Image>
      }


                        <LText allowFontScaling={false} id='textSessionMainTitle' style={{
                            top: 10,
                            left: 0,
                            width: 220,
                            fontFamily: 'DINCondensed-Bold',
                            // backgroundColor: 'indigo',
                            letterSpacing: 0.0,
                            textAlign: 'left',
                            color: '#e3dfbb',
                            fontSize: 23,
                        }}>

                            <LText>
                                {(item.sessionMainTitle ? (item.sessionMainTitle as string) : "") + "  "}
                            </LText>

                            <LText allowFontScaling={false} id='textSessionCount' style={{
                                fontFamily: 'Cabin-Regular',
                                // backgroundColor: 'indigo',
                                textAlign: 'left',
                                color: '#e3dfbb',
                                fontSize: 12,
                            }}>
                                {item.sessionSpecialTrackCount ? (item.sessionSpecialTrackCount as string).substring(1, item.sessionSpecialTrackCount.length - 1) : ""}
                            </LText>
                        </LText>


                        <LText allowFontScaling={false} id='textArtistName' style={{
                            top: 15,
                            left: 0,
                            width: 290, height: 16,
                            fontFamily: 'Cabin-Regular',
                            letterSpacing: 2.0,
                            // backgroundColor: 'indigo',
                            textAlign: 'left',
                            color: '#FFFFFF',
                            fontSize: 12,
                        }}>
                            {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
                        </LText>

                        <LText allowFontScaling={false} id='textArtistName' style={{
                            top: 15,
                            left: 0,
                            width: 290, height: 16,
                            fontFamily: 'Cabin-Regular',
                            letterSpacing: 2.0,
                            // backgroundColor: 'indigo',
                            textAlign: 'left',
                            color: '#FFFFFF',
                            fontSize: 12,
                        }}>
                            {item.artistCompany ? (item.artistCompany as string) : ""}
                        </LText>

                    </View >
                </>

                <LText allowFontScaling={false} id='textSessionMainTitle' style={{
                    top: 10,
                    left: 0,
                    width: 220,
                    fontFamily: 'DINCondensed-Bold',
                    // backgroundColor: 'indigo',
                    letterSpacing: 0.0,
                    textAlign: 'left',
                    color: '#e3dfbb',
                    fontSize: 23,
                }}>
                </LText>

                <ButtonSmall
        name={("artistScheduleDetailsButton" + item.id)
        }
        source={artistData1 ? artistData1.imgSrc : null}
        style={{
          position: 'absolute',
          // backgroundColor: 'skyblue',
          top: 210,
          right:  45,
          width: 80,
          height: 80,
        }}
        imageStyle={
          [{
            position: 'absolute',
            right: undefined, left: undefined,
            width: 80,
            height: 80,
            resizeMode: 'cover',
            opacity: 0.9,
          }]}
        bgBoxVisible={true}
        bgBoxStyle={{
          backgroundColor: '#232323',
          opacity: 0.1,
          left:-10,
          top:-10,
          width: 100,
          height: 100,
        }}
        visualProperties={{ alpha: 1 }}
        onSelect={() => {
          if (artistData1 == undefined) return;
          LauncherController.getInstance().context.navigationHistory.push({ out: "SchedulerScreen", transition: "TransitionLinkToArtistPage" });
          TransitionLinkToArtistPage(artistData1)
        }}
      />

                {specialTrackData != undefined &&
                    <ScrollView
                        style={{
                            // backgroundColor: 'skyblue',
                            top: 330, left: 20, position: 'absolute',
                            width: Dimensions.get('screen').width - 40,
                            height: Dimensions.get('screen').height - 330 - NavBar.navBarHeight,
                            opacity: 1
                        }}>


                         

                        <View
                            style={{
                                // backgroundColor: 'skyblue',
                                flexDirection: 'column',
                                top: 0, left: 5,
                                width: Dimensions.get('screen').width - 50,
                                opacity: 1
                            }}>



                            <LText id='headlineArtistInfo' style={{
                                top: 0, left: 0,
                                fontFamily: 'Cabin-Regular',
                                // backgroundColor: 'skyblue',
                                textAlign: 'left',
                                letterSpacing: 1.0,
                                opacity: 0.5,
                                color: '#FFFFFF',
                                fontSize: 9,
                            }}>
                                {"INSTRUCTORS / ARTISTS"}
                            </LText>

                            <LText id='textSessionArtistName' style={{
                                marginTop: 10,
                                top: 0, left: 30,
                                width: 190,
                                fontFamily: 'DINCondensed-Bold',
                                letterSpacing: 1.2,
                                //   backgroundColor: 'indigo',
                                textAlign: 'left',
                                color: '#e4a35e',
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
                                marginTop: 30,
                                left: 0,
                                top: 0,
                                fontFamily: 'Cabin-Regular',
                                // backgroundColor: 'skyblue',
                                textAlign: 'left',
                                letterSpacing: 1.0,
                                opacity: 0.5,
                                color: '#FFFFFF',
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
                                {item ? (specialTrackData.description as string) : ""}
                            </LText>
                        </View>
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