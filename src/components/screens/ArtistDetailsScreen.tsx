import React, { Fragment, PureComponent } from "react";
import { Dimensions, Image, Platform, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LauncherController from "../../LauncherController";
import ActionOpenSocialMediaApp from "../../actions/ActionOpenSocialMediaApp";
import ButtonSmall from "../ButtonSmall";
import ScreenHeader from "./ScreenHeader";
import ActionHistoryBackButton from "../../actions/ActionHistoryBackButton";


class ArtistDetailsScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scrollPosY: 0
        };
    }

    render() {
        const context = LauncherController.getInstance().context
        const item = LauncherController.getInstance().context.artistFocusItem

        const logoScrollAlphaReductionDelta = 0.9

        // console.log("Setting Reference")
        LauncherController.getInstance().artistStackData[1].screenComponentRef = this;

        const scrollViewContent =
            Platform.OS == 'ios' ?
                (item.bio as string).length / 1100 * 1.5 * Dimensions.get('screen').height :
                (item.bio as string).length / 1100 * 1.7 * Dimensions.get('screen').height;

        let socialBarData = [
            { id: 0, provider: "Instagram", account: item.insta, imgSrc: require('../../../assets/icon-social-insta-black.png') },
            // { id: 1, provider: "Youtube", account: "", imgSrc: require('../../../assets/icon-social-youtube.png') },
            // { id: 2, provider: "Facebook", account: "", imgSrc: require('../../../assets/icon-social-facebook.png') },
            // { id: 3, provider: "Web", account: "", imgSrc: require('../../../assets/icon-social-web.png') }
        ]
        let iconSize = 25;
        let itemDistance = 40
        let startX = Dimensions.get('screen').width - (20 + 5 + 30 + 30) - ((socialBarData.length - 1) * itemDistance + iconSize / 2);
        // let startX = ((((socialBarData.length - 1) * itemDistance) / 2) - iconSize / 2 - 40)

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
                    <ScrollView
                        style={{
                            backgroundColor: '#eeac55',
                            top: 0, left: 20, position: 'absolute',
                            width: Dimensions.get('screen').width - 40,
                            height: Dimensions.get('screen').height,
                            opacity: 1
                        }}
                        // onScroll={(e) => {
                        //     // console.log('scrollViewContent'+scrollViewContent)
                        //     // console.log('contentOffset'+e.nativeEvent.contentOffset.y)
                        //     // this.setState({ scrollPosY: e.nativeEvent.contentOffset.y })
                        // }}
                    >

                        <View
                            style={{

                                backgroundColor: '#eeac55',
                                top: 0, left: 5,
                                width: Dimensions.get('screen').width - 50,
                                height: scrollViewContent,
                                opacity: 1
                            }}>
                            <Text allowFontScaling={false} id='textLabelArtist' style={{
                                position: 'absolute',
                                top: 160,
                                left: 30,
                                height: 20,
                                // backgroundColor: 'indigo'
                                fontFamily: 'Arcon-Regular',
                                textAlign: 'center',
                                letterSpacing: 1.7,
                                color: '#48423b',
                                fontSize: 17,
                            }}>
                                {(item.fullName as string).toLocaleUpperCase()}
                            </Text>
                            <Text allowFontScaling={false} id='artistBioFocus' style={{
                                position: 'absolute',
                                top: (200), left: 30,
                                width: Dimensions.get('screen').width - 70 - 25,
                                height: (item.bio as string).length / 1100 * 1.2 * Dimensions.get('screen').height,
                                fontFamily: 'Arcon-Regular',
                                letterSpacing: 1,
                                textAlign: 'justify',
                                // backgroundColor: 'indigo',
                                color: '#232323',
                                fontSize: 15,
                            }}>
                                {item ? (item.bio as string) : ""}
                            </Text>
                        </View>

                        {item.insta != '' && socialBarData.map((itemData, i) => {
                            return (
                                <Fragment key={'socalBarFrag' + i}>

                                    <ButtonSmall
                                        name={'instagramButtonItem' + i}
                                        style={{
                                            // backgroundColor: 'skyblue',
                                            position: 'absolute',
                                            top: 130, left: (startX + (i * itemDistance)),
                                            width: iconSize, height: iconSize,
                                            opacity: 1.0
                                        }}
                                        visualProperties={{ alpha: 0.7, x: 0, y: 0, z: 0 }}
                                        onSelect={() => {
                                            context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "ActionOpenSocialMediaApp" });
                                            ActionOpenSocialMediaApp(itemData.provider, itemData.account)
                                        }}
                                        source={itemData.imgSrc}
                                        text={''}
                                    />
                                </Fragment>
                            );
                        })}

                    </ScrollView>




                </View>

                <Image
                    // name={("ScheduleListArtistDetailsButton" + item.fullName)}
                    source={item.imgSrc}
                    style={{
                        position: 'absolute',
                        right: -40,
                        bottom: ((Platform.OS == 'android') ? 70: 0),
                        width: 300,
                        height: 300,
                        opacity: 0.9
                      
                    }}
                    // bgBoxVisible={false}
                    // visualProperties={{ alpha: 0.7 }}
                    // onSelect={() => {
                        // context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "ActionOpenSocialMediaApp" });
                        // ActionOpenSocialMediaApp("Instagram", item.insta)
                    // }}
                    />


                <ScreenHeader
                    text={"ARTIST DETAILS"}
                    color='#f8f6d3'
                    textStyle={{ left: 50 }}
                />
                {/* <ScreenHomeButton /> */}

                <ButtonSmall
                    name={'backButtonArtistDetails'}
                    style={{
                        // backgroundColor: 'skyblue',
                        position: 'absolute',
                        top: 50, left: 0,
                        width: 40, height: 40,
                        opacity: 0.9
                    }}
                    visualProperties={{ alpha: 1, x: 0, y: 0, z: 0 }}
                    onSelect={() => { ActionHistoryBackButton(); }}
                    // text={'BACK'}
                    // fontStyle={{
                    //     width:40,
                    //     top:42,
                    //     fontFamily: 'Arcon-Regular',
                    //     textAlign: 'center',
                    //     letterSpacing: 1.7,
                    //     color: '#f8f6d3',
                    //     fontSize: 7,

                    // }}
                    source={require('../../../assets/stack-backicon.png')}
                />
            </>
        );
    }
}

export default ArtistDetailsScreen;