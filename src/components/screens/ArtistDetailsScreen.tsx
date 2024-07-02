import React, { Fragment, PureComponent } from "react";
import { Dimensions, Image, Platform, Pressable, Text, View } from "react-native";
import LComponent from "../../core/LComponent";
import TransitionScreenL3toL2 from "../../transitions/TransitionScreenL3toL2";
import LauncherController from "../../LauncherController";
import { ScrollView } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import ButtonSmall from "../ButtonSmall";
import ActionOpenSocialMediaApp from "../../actions/ActionOpenSocialMediaApp";


class ArtistDetailsScreen extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const item = LauncherController.getInstance().context.artistFocusItem

        const scrollViewContent =
            Platform.OS == 'ios' ?
                (item.bio as string).length / 1100 * 1.2 * Dimensions.get('screen').height :
                (item.bio as string).length / 1100 * 1.5 * Dimensions.get('screen').height;

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
                        }}>



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
                                fontSize: 16,
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
                                        name={'socialBarItem' + i}
                                        style={{
                                            // backgroundColor: 'skyblue',
                                            position: 'absolute',
                                            top: 130, left: (startX + (i * itemDistance)),
                                            width: iconSize, height: iconSize,
                                            opacity: 1.0
                                        }}
                                        visualProperties={{ alpha: 0.7, x: 0, y: 0, z: 0 }}
                                        onSelect={() => { ActionOpenSocialMediaApp(itemData.provider, itemData.account) }}
                                        source={itemData.imgSrc}
                                        text={''}
                                    />
                                </Fragment>
                            );
                        })}

                    </ScrollView>




                </View>

                {/* <BlurView
                
                        intensity={10}
                        style={{
                            position: 'absolute', opacity: 1.0,
                            right: -80, bottom: -40, width: 300, height: 300,
                        }}>

                     
                    </BlurView> */}
                <Image
                    source={item.imgSrc}
                    style={{
                        position: 'absolute', resizeMode: 'cover', opacity: 0.9,
                        right: -40, bottom: 0, width: 300, height: 300,
                    }}
                />
                {/* <Image
                        style={{
                            // backgroundColor: 'skyblue',
                            top: 0, left: 0, position: 'absolute',
                            width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
                            resizeMode: "contain",
                            opacity: 1
                        }}
                        source={require('.,/../../assets/screen-mockup-artistscreen.png')}
                    /> */}



                {/* 
                <Pressable id='buttonBack'
                    style={{
                        position: 'absolute',
                        top: 30,
                        left: 0,
                        width: Dimensions.get('screen').width, height: 60,
                        // backgroundColor: 'indigo',
                    }}
                    onPress={() => { TransitionScreenL3toL2() }}
                /> */}
            </>
        );
    }
}

export default ArtistDetailsScreen;