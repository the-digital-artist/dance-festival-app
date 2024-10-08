import React, { Fragment, PureComponent } from "react";
import { Dimensions, Image, Platform, Text, View } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import LauncherController from "../../LauncherController";
import ActionHistoryBackButton from "../../actions/ActionHistoryBackButton";
import ActionOpenSocialMediaApp from "../../actions/ActionOpenSocialMediaApp";
import TweenManager from "../../core/LTweenManager";
import ButtonSmall from "../ButtonSmall";
import ScreenHeader from "../screens/ScreenHeader";
import ScreenHomeButton from "../screens/ScreenHomeButton";
import ArtistDetailsBioComponent from "./ArtistDetailsBioComponent";
import TransitionArtistNavigateDown from "../../transitions/TransitionArtistNavigateDown";
import LText from "../../core/LText";


class ArtistDetailsScreen extends PureComponent {

    scrollRef: any = React.createRef();

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

        const artistBiography = (item != undefined && item.bio != undefined && item.bio.length > 0) ? (item.bio as string) : "Stay tuned - more information coming soon"

        const scrollViewContent =
            Platform.OS == 'ios' ?
                (artistBiography as string).length / 1100 * 1.5 * Dimensions.get('screen').height :
                (artistBiography as string).length / 1100 * 1.7 * Dimensions.get('screen').height;

        let socialBarData = [
            { id: 0, provider: "Instagram", account: item.insta, imgSrc: require('../../../assets/icon-social-insta.png') },
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
                    <Image
                        style={{
                            backgroundColor: 'skyblue',
                            top: 0, left: 0, position: 'absolute',
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').height,
                            resizeMode: "cover",
                            opacity: 1.0
                        }}
                        source={require('../../../assets/screen-artists-bg.png')} />
                    <LText id='textLabelArtist' style={{
                        position: 'absolute',
                        top: 130,
                        left: 35,
                        // backgroundColor: 'indigo'
                        fontFamily: 'RamaGothicEW01-Regular',
                        textAlign: 'center',
                        letterSpacing: 2.1,
                        color: '#FFFFFF',
                        fontSize: 26,
                    }}>
                        {(item.fullName as string).toLocaleUpperCase()}
                    </LText>

                    {(item.insta != undefined && item.insta != '') &&
                        socialBarData.map((itemData, i) => {
                            return (
                                <Fragment key={'socalBarFrag' + i}>

                                    <ButtonSmall
                                        name={'instagramButtonItem' + i}
                                        style={{
                                            // backgroundColor: 'skyblue',
                                            position: 'absolute',
                                            top: 130, right: (30 + (i * itemDistance)),
                                            width: iconSize, height: iconSize,
                                            opacity: 1.0
                                        }}
                                        visualProperties={{ alpha: 0.7, x: 0, y: 0, z: 0 }}
                                        onSelect={() => {
                                            context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "ActionOpenSocialMediaApp", data: {} });
                                            ActionOpenSocialMediaApp(itemData.provider, itemData.account)
                                        }}
                                        source={itemData.imgSrc}
                                    // text={''}
                                    />
                                </Fragment>
                            );
                        })}

                    <ArtistDetailsBioComponent />
                </View>


                <ScreenHeader
                    text={"   ARTIST DETAILS"}
                    color='#f8f6d3'
                    textStyle={{ left: 50 }}
                    imgSrc={require('../../../assets/header-artists-bg.png')} />

                <ScreenHomeButton />


                <ButtonSmall
                    name={'backButtonArtistDetails'}
                    style={{
                        // backgroundColor: 'skyblue',
                        position: 'absolute',
                        top: 70, left: 0,
                        width: 40, height: 40,
                        opacity: 0.9
                    }}
                    visualProperties={{ alpha: 1, x: 0, y: 0, z: 0 }}
                    onSelect={() => {
                        //what if this was a deeplink into this page from somewhere else outside of the stack
                        let previousInteraction = context.navigationHistory[context.navigationHistory.length - 1];
                        if (previousInteraction.out == 'ArtistListScreen') {
                            //default case, we came from artist list screen, use history mechanism to go back
                            ActionHistoryBackButton();
                        } else if (previousInteraction.out == 'SchedulerScreen') {
                            //deeplink
                            //from the scheduler screen, use history back mechanism to undo deeplink
                            ActionHistoryBackButton();
                        } else {
                            //probably navbar, we came here but dont want to go back. need to go one level up in stack.
                            context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "TransitionArtistNavigateDown", data: {} });
                            TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 0)
                        }
                    }}
                    source={require('../../../assets/stack-backicon.png')}
                />
            </>
        );
    }
}

export default ArtistDetailsScreen;