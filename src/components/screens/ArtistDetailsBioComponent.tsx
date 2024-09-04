import React, { PureComponent } from "react";
import { Dimensions, Image, LayoutChangeEvent, NativeSyntheticEvent, Platform, Text, TextLayoutEventData, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LauncherController from "../../LauncherController";
import LComponent from "../../core/LComponent";
import NavBar from "../navbar/NavBar";


class ArtistDetailsBioComponent extends PureComponent<any, any> {
    gestureRef: any = React.createRef();
    scrollViewRef: any = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            scrollPosY: 0,
            heightThresholdPassed: false,
        };
        LauncherController.getInstance().context.artistFocusItemUpdateListeners.push(() => { 
            if(this.scrollViewRef.current != null) this.scrollViewRef.current.scrollTo({x:0,y:0, animated:true});
            this.forceUpdate() 
        });
    }

    render() {
        const item = LauncherController.getInstance().context.artistFocusItem

        const artistBiography = (item != undefined && item.bio != undefined && item.bio.length > 0) ? (item.bio as string) : "Stay tuned - more information coming soon"
        // artistBiography = artistBiography.replace(/[\n]/g, "\n\n");
        const maskStart = Dimensions.get('screen').height*(1590/2796)
        const maskStart2 = Dimensions.get('screen').height*(1736/2796)
        const artistImageOffsetBottom = ((Platform.OS == 'android') ? NavBar.navBarHeight + 50 : NavBar.navBarHeight - 20)
        const artistImageSize = Dimensions.get('screen').height-artistImageOffsetBottom-maskStart;

        // const gestureObj = Gesture.Pan()
        // gestureObj
        //     .simultaneousWithExternalGesture(this.scrollRef)
        //     .onBegin((event) => {
        //         console.log("pan start");
        //         // TweenManager.tween().to("artistImageOverlay" + item.fullName, 300, { alpha: 0 })
        //     })
        //     .onChange((event) => {
        //         // console.log("offset.value: " + (event.translationX));
        //     })
        //     .onFinalize((event) => {
        //         // console.log("offset.value: " + (event.translationX));
        //     })
        //     .withRef(this.gestureRef);

        return (
            <>
                <ScrollView
                    // simultaneousHandlers={[this.gestureRef]}
                    ref={this.scrollViewRef}
                    style={{
                        // backgroundColor: 'red',
                        top: 180, left: 20, position: 'absolute',
                        width: Dimensions.get('screen').width - 40,
                        height: Dimensions.get('screen').height - 180 - NavBar.navBarHeight - 20,
                        opacity: 1
                    }}
                    onScroll={(e) => {
                        this.setState({ scrollPosY: e.nativeEvent.contentOffset.y })
                    }}
                    onLayout={(e) => {
                        // this.setState({ showMoreButton: (e.layout.height>=100)})
                    }}
                >


                    <Text
                        id='artistBioFocus'
                        style={{
                            top: 0, margin: 15,
                            width: Dimensions.get('screen').width - 40 - 25,
                            // height: (artistBiography as string).length / 1100 * 1.2 * Dimensions.get('screen').height,
                            fontFamily: 'Arcon-Regular',
                            letterSpacing: 1,
                            textAlign: 'justify',
                            // lineHeight:17,
                            // backgroundColor: 'indigo',
                            color: '#EFEFEF',
                            fontSize: 15,
                        }}
                        onLayout={(e: LayoutChangeEvent) => {
                            // console.log("________________Text onLayout "+(e.nativeEvent.layout.height)+" "+Dimensions.get('screen').height);
                            // this.setState({ showMoreButton: (e.layout.height>=100)})
                            // console.log('maskStart: '+maskStart+'artistBioFocusText.height: '+e.nativeEvent.layout.height);
                            
                            this.setState({
                                scrollPosY: this.state.scrollPosY,
                                heightThresholdPassed: (e.nativeEvent.layout.height+180>(maskStart))
                            })
                        }}
                        onTextLayout={(e: NativeSyntheticEvent<TextLayoutEventData>) => {
                            // console.log("________________Text onTextLayout "+(e.nativeEvent.lines == undefined));
                            // this.setState({ showMoreButton: (e.layout.height>=100)})
                        }}
                    >
                        {artistBiography}
                    </Text>
                    <View
                     style={{
                        width: Dimensions.get('screen').width - 40 - 25,
                        height: Dimensions.get('screen').height*(700/2796),
                    }}
                    />

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
                            opacity: 1.0 - (1 * Math.min(1, Math.max(0, this.state.scrollPosY / 10)))
                        }}
                        source={require('../../../assets/screen-artists-bg-masked.png')} />

                    <Image
                        // name={("ScheduleListArtistDetailsButton" + item.fullName)}
                        source={item.imgSrc}
                        style={{
                            // backgroundColor:'skyblue',
                            position: 'absolute',
                            right: -40,
                            bottom: artistImageOffsetBottom,
                            width: artistImageSize,
                            height: artistImageSize,
                            opacity: 1.0 - (0.9 * Math.min(1, Math.max(0, this.state.scrollPosY / 10)))

                        }}
                    />
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
                        <Text
                            id='artistBioFocus'
                            style={{
                                width:Dimensions.get('screen').width-artistImageSize+40,
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
                        </Text>
                    </View>
                }
            </>
        );
    }
}

export default ArtistDetailsBioComponent;