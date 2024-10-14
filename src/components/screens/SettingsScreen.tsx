import * as Application from 'expo-application';
import React, { Fragment, PureComponent } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import DataModel from "../../DataModel";
import LauncherController from '../../LauncherController';
import ActionLinkEarlyBirdTickets from "../../actions/ActionLinkEarlyBirdTickets";
import ActionMoreContactFestival from "../../actions/ActionMoreContactFestival";
import ActionMoreHarrasmentLink from '../../actions/ActionMoreHarrasmentLink';
import ActionMoreNewsletterSignup from "../../actions/ActionMoreNewsletterSignup";
import ActionOpenSocialMediaApp from "../../actions/ActionOpenSocialMediaApp";
import LComponent from "../../core/LComponent";
import ButtonSmall from "../ButtonSmall";
import NavBar from "../navbar/NavBar";
import SettingsItemRenderer from "./SettingsItemRenderer";

class SettingsScreen extends PureComponent {

    static settingsItemRendererHeight = 50;
    static settingsListData = [
        { title: "Get Your Ticket", action: ActionLinkEarlyBirdTickets },
        { title: "Contact Festival Organizers", action: ActionMoreContactFestival },
        { title: "Sign-up for our Newsletter", action: ActionMoreNewsletterSignup },
        { title: "Harrasment Policy and Reporting", action: ActionMoreHarrasmentLink },
    ]

    constructor(props) {
        super(props);

        let currentTime = Date.now();
        // let borderChangeTitleTime =  Date.parse(DataModel.dataTicketSales.earlyBirdStartTimeString);        //YYYY-MM-DDTHH:mm:ss.sssZ
        // SettingsScreen.settingsListData[0].title =   ((currentTime<borderChangeTitleTime)?"Get Your Last-Minute Ticket":"Get Your Special Early-Bird Ticket")
    }

    render() {

        let socialBarData = [
            { id: 0, itemText: "Instagram", account: "caldac_con", imgSrc: require('../../../assets/icon-social-insta.png') },
            { id: 2, itemText: "Youtube", account: "UCxRKiakhperjgBCZxrrUlZw", imgSrc: require('../../../assets/icon-social-youtube.png') },
            { id: 3, itemText: "Facebook", account: "230103017070827", imgSrc: require('../../../assets/icon-social-facebook.png') },
            { id: 4, itemText: "Web", account: "https://www.caldacon.org", imgSrc: require('../../../assets/icon-social-web.png') }
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



                <LComponent
                    style={{
                        position: 'absolute',
                        // backgroundColor: 'red',
                        left: 0, top: 290,
                        width: Dimensions.get('screen').width,
                        opacity: 1.0,
                        flex: 1, flexDirection: 'column'
                    }}>


                    <LComponent
                        style={{
                            position: 'relative',
                            width: Dimensions.get('screen').width - 0,
                            height: (SettingsScreen.settingsItemRendererHeight * SettingsScreen.settingsListData.length),
                        }}
                    >
                        {/* FIRST LIST with Settings and Contact Items */}

                        <View style={{
                            position: 'absolute',
                            backgroundColor: '#1c1919',
                            left: 0, top: 0,
                            width: Dimensions.get('screen').width - 0,
                            height: (SettingsScreen.settingsItemRendererHeight * SettingsScreen.settingsListData.length),
                            opacity: 0.4,
                        }}
                        />


                        <FlatList
                            style={{
                                position: 'absolute',
                                // backgroundColor: '#1c1919',
                                left: 0, top: 0,
                                width: Dimensions.get('screen').width - 0,
                                height: (SettingsScreen.settingsItemRendererHeight * SettingsScreen.settingsListData.length),
                                opacity: 1,
                            }}
                            // contentContainerStyle={{borderRadius: 6, overflow: 'hidden'}}
                            data={SettingsScreen.settingsListData}
                            renderItem={SettingsItemRenderer}
                        />

                    </LComponent>


                    <Text allowFontScaling={false} id='textList1' style={[{
                        // position: 'absolute',
                        marginTop: 30,
                        width: Dimensions.get('screen').width,
                        letterSpacing: 2.0,
                        fontSize: 12,
                        color: '#e9e3de',
                        textAlign: 'center',
                    }]}>
                        {"FOLLOW US ALONG"}
                    </Text>

                    <LComponent
                        style={{
                            position: 'relative',
                            width: Dimensions.get('screen').width,
                            height: iconSize + 50,
                        }}>




                        {socialBarData.map((itemData, i) => {
                            return (
                                <Fragment key={'socalBarFrag' + i}>

                                    <ButtonSmall
                                        name={'socialBarItem' + i}
                                        style={{
                                            // backgroundColor: 'skyblue',
                                            position: 'absolute',
                                            top: 20, left: (startX + (i * itemDistance)),
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
                                            top: iconSize + 5, width: iconSize + 18,
                                            fontFamily: 'Arcon-Regular',
                                            textAlign: 'center',
                                            letterSpacing: 0.8,
                                            color: '#c2b6ad',
                                            fontSize: 7.5,
                                        }}
                                    />
                                </Fragment>
                            );
                        })}

                    </LComponent>


                </LComponent>

                <Text allowFontScaling={false} id='version' style={[{
                    position: 'absolute',
                    bottom: (NavBar.navBarHeight + 20),
                    left: 45,
                    height: 80,
                    width: Dimensions.get('screen').width - (45 * 2),
                    fontFamily: 'Cabin-Regular',
                    letterSpacing: 2.0,
                    fontSize: 7,
                    opacity: 0.2,
                    color: '#5c5c5c',
                    // backgroundColor: 'skyblue',
                    textAlign: 'center',
                }]}>
                    {"BUILD: " + Application.nativeBuildVersion +
                        " - MODEL: " + DataModel.getInstance().static.modelVersion + "\n" +
                        " - UPDATE: " + LauncherController.getInstance().updateInfo}
                </Text>
            </LComponent>
        );
    }
}

export default SettingsScreen;