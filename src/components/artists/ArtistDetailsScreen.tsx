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


class ArtistDetailsScreen extends PureComponent {
    gestureRef: any = React.createRef();
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
        LauncherController.getInstance().artistStackComponentRef = this;

        const artistBiography = (item != undefined && item.bio != undefined && item.bio.length > 0) ? (item.bio as string) : "Stay tuned - more information coming soon"

        const scrollViewContent =
            Platform.OS == 'ios' ?
                (artistBiography as string).length / 1100 * 1.5 * Dimensions.get('screen').height :
                (artistBiography as string).length / 1100 * 1.7 * Dimensions.get('screen').height;

        let socialBarData = [
            { id: 0, provider: "Instagram", account: item.insta.substring(1), imgSrc: require('../../../assets/icon-social-insta.png') },
            // { id: 1, provider: "Youtube", account: "", imgSrc: require('../../../assets/icon-social-youtube.png') },
            // { id: 2, provider: "Facebook", account: "", imgSrc: require('../../../assets/icon-social-facebook.png') },
            // { id: 3, provider: "Web", account: "", imgSrc: require('../../../assets/icon-social-web.png') }
        ]
        let iconSize = 25;
        let itemDistance = 40
        let startX = Dimensions.get('screen').width - (20 + 5 + 30 + 30) - ((socialBarData.length - 1) * itemDistance + iconSize / 2);
        // let startX = ((((socialBarData.length - 1) * itemDistance) / 2) - iconSize / 2 - 40)


        // const offsetXStart = useSharedValue(0);
        const gestureObj = Gesture.Pan()
        // .minDistance(30)
        // .failOffsetY(10)
        gestureObj
            .simultaneousWithExternalGesture(this.scrollRef)
            .onBegin((event) => {
                console.log("pan start");
                TweenManager.tween().to("artistImageOverlay" + item.fullName, 300, { alpha: 0 })
            })
            .onChange((event) => {
                console.log("offset.value: " + (event.translationX));
                // offset.value = event.translationX + offsetXStart.value;
                // currentIndex.value = -event.translationX / tileDistance +currentIndexStart.value;
            })
            .onFinalize((event) => {
                console.log("offset.value: " + (event.translationX));
                // offset.value = event.translationX + offsetXStart.value;
                // pressed.value = false;
                // const potentialStopPoint = offset.value + 0.1 * event.velocityX;
                // let targetValue = findClosestPoint(snapPoints, potentialStopPoint)
                // offset.value = withSpring(targetValue,
                //     {
                //         velocity: event.velocityX,
                //         mass: 1.2,
                //         damping: 27,
                //         stiffness: 383,
                //         overshootClamping: false,
                //         restDisplacementThreshold: 0.001,
                //         restSpeedThreshold: 2,
                //     }
                // );
                // newIndex.value = Math.round(currentIndex.value);
            })
            .withRef(this.gestureRef);

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
                    <Text allowFontScaling={false} id='textLabelArtist' style={{
                        position: 'absolute',
                        top: 130,
                        left: 35,
                        height: 20,
                        // backgroundColor: 'indigo'
                        fontFamily: 'Arcon-Regular',
                        textAlign: 'center',
                        letterSpacing: 1.7,
                        color: '#e2b078',
                        fontSize: 17,
                    }}>
                        {(item.fullName as string).toLocaleUpperCase()}
                    </Text>
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
                                            context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "ActionOpenSocialMediaApp" });
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
                    onSelect={() => { ActionHistoryBackButton(); }}
                    source={require('../../../assets/stack-backicon.png')}
                />
            </>
        );
    }
}

export default ArtistDetailsScreen;