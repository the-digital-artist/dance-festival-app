import * as Application from 'expo-application';
import React, { Fragment, PureComponent } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import DataModel from "../../DataModel";
import ActionMoreContactFestival from "../../actions/ActionMoreContactFestival";
import ActionLinkEarlyBirdTickets from "../../actions/ActionLinkEarlyBirdTickets";
import ActionMoreNewsletterSignup from "../../actions/ActionMoreNewsletterSignup";
import ActionOpenSocialMediaApp from "../../actions/ActionOpenSocialMediaApp";
import LComponent from "../../core/LComponent";
import ButtonSmall from "../ButtonSmall";
import NavBar from "../navbar/NavBar";
import SettingsItemRenderer from "./SettingsItemRenderer";
import { useUpdates } from 'expo-updates';
import LauncherController from '../../LauncherController';

class SettingsScreen extends PureComponent {

    static settingsItemRendererHeight = 50;
    static settingsListData = [
        { title: "Get Early Bird Pass 2025", action: ActionLinkEarlyBirdTickets },
        { title: "Contact Festival Organizers", action: ActionMoreContactFestival},
        { title: "Sign-up for our Newsletter", action: ActionMoreNewsletterSignup},
        // { title: `Contact App Creator`, action: ActionMoreContactAppDev },
        // { title: "About App" }
    ]

    constructor(props) {
        super(props);

        let currentTime = Date.now();
        // let borderChangeTitleTime =  Date.parse(DataModel.dataTicketSales.earlyBirdStartTimeString);        //YYYY-MM-DDTHH:mm:ss.sssZ
        // SettingsScreen.settingsListData[0].title =   ((currentTime<borderChangeTitleTime)?"Get Your Last-Minute Ticket":"Get Your Special Early-Bird Ticket")
    }

    render() {

        let socialBarData = [
            { id: 0, itemText: "Instagram", account: "fiesta_elegante", imgSrc: require('../../../assets/icon-social-insta.png') },
            { id: 1, itemText: "Facebook", account: "100090149059629",  imgSrc: require('../../../assets/icon-social-facebook.png') },
            { id: 2, itemText: "Web", account: "https://www.berlinsalsafestival.com", imgSrc: require('../../../assets/icon-social-web.png') }
        ]

        let iconSize = 35;
        let itemDistance = 60
        let startX = (Dimensions.get('screen').width / 2 - ((socialBarData.length - 1) * itemDistance) / 2) - iconSize / 2

        const socialBarOffsetY = 500;

        return (
            <LComponent
                name='settingsScreenContainer'
                style={{
                    position: 'absolute',
                    backgroundColor: '#f1ac42',
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height,
                }}
                visualProperties={{
                    alpha: 0,
                    x: Dimensions.get('screen').width, y: 0, z: 0
                }}
            >
                {/* <Image
                    style={{
                        // backgroundColor: 'skyblue',
                        top: 0, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
                        resizeMode: "cover",
                        opacity: 1
                    }}
                    source={require('../../../assets/screen-settings-bg.png')}
                /> */}

                <Image
                    source={require('../../../assets/logo-white.png')}
                    style={{
                        position: 'absolute', resizeMode: 'contain', opacity: 1.0,
                        left: (Dimensions.get('screen').width - 90) / 2, top: 120,
                        width: 90,
                        height: 90 * 800 / 768,
                    }}
                />


                {/* <ScreenHeader text="SETTINGS" color='#eeecdf' /> */}



                {/* FIRST LIST with Settings and Contact Items */}

                <View style={{
                    position: 'absolute',
                    backgroundColor: 'white',
                    left: 0, top: 290,
                    width: Dimensions.get('screen').width - 0,
                    height: (SettingsScreen.settingsItemRendererHeight * SettingsScreen.settingsListData.length + (1 * 5)),
                    opacity: 0.4,
                }}
                />


                <FlatList
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
                />



                <Text allowFontScaling={false} id='textList1' style={[{
                    position: 'absolute',
                    top: socialBarOffsetY,
                    left: 0,
                    height: 15,
                    width: Dimensions.get('screen').width,
                    fontFamily: 'Cabin-Regular',
                    letterSpacing: 2.0,
                    fontSize: 12,
                    color: '#FFFFFF',
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
                                    top: socialBarOffsetY+30, left: (startX + (i * itemDistance)),
                                    width: iconSize, height: iconSize,
                                    opacity: 1.0
                                }}
                                visualProperties={{ alpha: 1, x: 0, y: 0, z: 0 }}
                                onSelect={() => { 
                                    ActionOpenSocialMediaApp(itemData.itemText, itemData.account) 
                                }}
                                source={itemData.imgSrc}
                                text={(itemData.itemText as string).toLocaleUpperCase()}
                                fontStyle={{
                                    // backgroundColor: 'skyblue',
                                    left: -8,
                                    top: 40, width: iconSize + 18,
                                    fontFamily: 'Arcon-Regular',
                                    textAlign: 'center',
                                    letterSpacing: 0.8,
                                    color: '#FFFFFF',
                                    fontSize: 7.5,
                                }}
                            />
                        </Fragment>
                    );
                })}

                <Text allowFontScaling={false} id='version' style={[{
                    position: 'absolute',
                    bottom: (NavBar.navBarHeight+20),
                    left: 45,
                    height: 80,
                    width: Dimensions.get('screen').width - (45 * 2),
                    fontFamily: 'Cabin-Regular',
                    letterSpacing: 2.0,
                    fontSize: 7,
                    opacity:0.2,
                    color: '#5c5c5c',
                    // backgroundColor: 'skyblue',
                    textAlign: 'center',
                }]}>
                   {"BUILD: "+Application.nativeBuildVersion + 
                   " - MODEL: "+DataModel.getInstance().static.modelVersion+"\n"+
                   " - UPDATE: "+LauncherController.getInstance().updateInfo}
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