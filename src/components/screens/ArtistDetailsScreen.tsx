import React, { PureComponent } from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import LComponent from "../../core/LComponent";
import TransitionScreenL3toL2 from "../../transitions/TransitionScreenL3toL2";
import LauncherController from "../../LauncherController";
import { ScrollView } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";


class ArtistDetailsScreen extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const item = LauncherController.getInstance().context.artistFocusItem

        let offsetX = 0;
        let offsetY = 50;

        return (
            <>
                <View
                    style={{
                        backgroundColor: '#EF4260',
                        top: 0, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
                        opacity: 1
                    }}
                >
                    <ScrollView
                        style={{
                            backgroundColor: '#ec556f',
                            top: 0, left: 20, position: 'absolute',
                            width: Dimensions.get('screen').width - 40, 
                            height: Dimensions.get('screen').height,
                            opacity: 1
                        }}>



                        <View
                            style={{

                                backgroundColor: '#ec556f',
                                top: 0, left: 5,
                                width: Dimensions.get('screen').width - 50,
                                height: (item.bio as string).length/1100*1.2 * Dimensions.get('screen').height,
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
                                color: '#232323',
                                fontSize: 16,
                            }}>
                                {(item.fullName as string).toLocaleUpperCase()}
                            </Text>
                            <Text allowFontScaling={false} id='artistBioFocus' style={{
                                position: 'absolute',
                                top: (200), left: 30,
                                width: Dimensions.get('screen').width - 70 - 25,
                                height: (item.bio as string).length/1100*1.2 * Dimensions.get('screen').height,
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
                        position: 'absolute', resizeMode: 'cover', opacity: 0.7,
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




                <Pressable id='buttonBack'
                    style={{
                        position: 'absolute',
                        top: 30,
                        left: 0,
                        width: Dimensions.get('screen').width, height: 60,
                        // backgroundColor: 'indigo',
                    }}
                    onPress={() => { TransitionScreenL3toL2() }}
                />
            </>
        );
    }
}

export default ArtistDetailsScreen;