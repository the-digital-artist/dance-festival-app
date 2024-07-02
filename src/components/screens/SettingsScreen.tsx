import React, { Fragment, PureComponent } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import LComponent from "../../core/LComponent";
import SettingsItemRenderer from "./SettingsItemRenderer";
import ButtonSmall from "../ButtonSmall";
import ActionOpenSocialMediaApp from "../../actions/ActionOpenSocialMediaApp";
import DataModel from "../../DataModel";
import * as Application from 'expo-application';
import ActionMoreDownloadPdf from "../../actions/ActionMoreDownloadPdf";
import ActionMoreContactAppDev from "../../actions/ActionMoreContactAppDev";
import ActionMoreContactFestival from "../../actions/ActionMoreContactFestival";

class SettingsScreen extends PureComponent {

    static settingsItemRendererHeight = 50;
    static settingsListData = [
        // { title: "Download Full Schedule as PDF", action: ActionMoreDownloadPdf },
        // { title: "Contact QALDF Organizers", action: ActionMoreContactFestival},
        // { title: `Contact App Creator`, action: ActionMoreContactAppDev },
        // { title: "About App" }
    ]

    constructor(props) {
        super(props);
    }

    render() {

        let socialBarData = [
            { id: 0, itemText: "Instagram", account: "patifestival_berlin", imgSrc: require('../../../assets/icon-social-insta.png') },
            { id: 3, itemText: "Facebook", account: "171550106045951", imgSrc: require('../../../assets/icon-social-facebook.png') },
            { id: 4, itemText: "Web", account: "https://patifestival.com", imgSrc: require('../../../assets/icon-social-web.png') }
        ]

        let iconSize = 35;
        let itemDistance = 60
        let startX = (Dimensions.get('screen').width / 2 - ((socialBarData.length - 1) * itemDistance) / 2) - iconSize / 2

        return (
            <LComponent
                name='settingsScreenContainer'
                style={{
                    position: 'absolute',
                    backgroundColor: '#232323',
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height,
                }}
                visualProperties={{
                    alpha: 0,
                    x: Dimensions.get('screen').width, y: 0, z: 0
                }}
            >
                <Image
                    style={{
                        // backgroundColor: 'skyblue',
                        top: 0, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
                        resizeMode: "cover",
                        opacity: 1
                    }}
                    source={require('../../../assets/screen-settings-bg.png')}
                />

                {/* <Image
                    source={require('../../../assets/logo-full.png')}
                    style={{
                        position: 'absolute', resizeMode: 'contain', opacity: 1.0,
                        left: (Dimensions.get('screen').width - 150) / 2, top: 100,
                        width: 150,
                        height: 150 * 800 / 768,
                    }}
                /> */}


                {/* <ScreenHeader text="SETTINGS" color='#eeecdf' /> */}



                {/* FIRST LIST with Settings and Contact Items */}

                {/* <View style={{
                    position: 'absolute',
                    backgroundColor: '#1c1919',
                    left: 0, top: 290,
                    width: Dimensions.get('screen').width - 0,
                    height: (SettingsScreen.settingsItemRendererHeight * SettingsScreen.settingsListData.length + 2 * 5),
                    opacity: 0.4,
                }}
                /> */}


                {/* <FlatList
                    style={{
                        position: 'absolute',
                        // backgroundColor: '#1c1919',
                        left: 0, top: 295,
                        width: Dimensions.get('screen').width - 0,
                        height: (SettingsScreen.settingsItemRendererHeight * SettingsScreen.settingsListData.length),
                        opacity: 1,
                    }}
                    // contentContainerStyle={{borderRadius: 6, overflow: 'hidden'}}
                    data={SettingsScreen.settingsListData}
                    renderItem={SettingsItemRenderer}
                /> */}



                <Text allowFontScaling={false} id='textList1' style={[{
                    position: 'absolute',
                    top: 390,
                    left: 0,
                    height: 15,
                    width: Dimensions.get('screen').width,
                    fontFamily: 'Cabin-Regular',
                    letterSpacing: 2.0,
                    fontSize: 12,
                    color: '#e9e3de',
                    // backgroundColor: 'skyblue',
                    textAlign: 'center',
                }]}>
                    {"FOLLOW US ALONG"}
                </Text>




                {socialBarData.map((itemData, i) => {
                    return (
                        <Fragment key={'socalBarFrag' + i}>

                            <ButtonSmall
                                name={'socialBarItem' + i}
                                style={{
                                    // backgroundColor: 'skyblue',
                                    position: 'absolute',
                                    top: 420, left: (startX + (i * itemDistance)),
                                    width: iconSize, height: iconSize,
                                    opacity: 1.0
                                }}
                                visualProperties={{ alpha: 1, x: 0, y: 0, z: 0 }}
                                onSelect={() => { ActionOpenSocialMediaApp(itemData.itemText, itemData.account) }}
                                source={itemData.imgSrc}
                                text={(itemData.itemText as string).toLocaleUpperCase()}
                                fontStyle={{
                                    // backgroundColor: 'skyblue',
                                    left: -8,
                                    top: 40, width: iconSize + 18,
                                    fontFamily: 'Arcon-Regular',
                                    textAlign: 'center',
                                    letterSpacing: 1.0,
                                    color: '#c2b6ad',
                                    fontSize: 7,
                                }}
                            />
                        </Fragment>
                    );
                })}

                <Text allowFontScaling={false} id='version' style={[{
                    position: 'absolute',
                    top: (290+65),
                    left: 45,
                    height: 80,
                    width: Dimensions.get('screen').width - (45 * 2),
                    fontFamily: 'Cabin-Regular',
                    letterSpacing: 2.0,
                    fontSize: 5,
                    opacity:0.5,
                    color: '#5c5c5c',
                    // backgroundColor: 'skyblue',
                    textAlign: 'center',
                }]}>
                   {"BUILD VERSION: "+Application.nativeBuildVersion + " - MODEL VERSION: "+DataModel.modelVersion}
                </Text>


                {/* 
            <Text allowFontScaling={false} id='textNotificationsExplanations' style={[{
                            position: 'absolute',
                            top: 200,
                            left: 45,
                            height: 80,
                            width: Dimensions.get('screen').width-(45*2),
                            fontFamily: 'Cabin-Regular',
                            letterSpacing: 2.0,
                            fontSize: 10,
                            color: '#eeecdf',
                            // backgroundColor: 'skyblue',
                            textAlign: 'left',
                        }]}>
                         IF YOU LIKE, WE CAN SEND YOU A NOTIFICATION WHENEVER IMPORTANT FESTIVAL UPDATES HAPPEN (FOR EXAMPLE ROOM CHANGES). YOU NEED TO PROVIDE PERMISSIONS IN YOUR SETTINGS.
                        </Text>

            <ButtonSmall
                            name={("SettingsButton")}
                            style={{
                                position: 'absolute',
                                top: (280), left: 45,
                                height: 35, width: Dimensions.get('screen').width - (2 * 15)
                            }}
                            text={"ENABLE PUSH NOTIFICATIONS"}
                            bgBoxVisible={true}
                            bgBoxStyle={{
                                backgroundColor: '#eeecdf',
                                height: 35, width: 210
                            }}
                            fontStyle={{
                                fontFamily: 'Cabin-Regular',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                letterSpacing: 2.0,
                                color: '#000000',
                                fontSize: 10,
                                width: 210,
                            }}
                            visualProperties={{ alpha: 1 }}
                            onSelect={() => {  }}
                        /> */}
            </LComponent>
        );
    }
}

export default SettingsScreen;