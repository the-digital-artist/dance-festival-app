import React, { Component } from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import LauncherController from "../../LauncherController";
import ActionOpenBrowserWithURL from "../../actions/ActionOpenBrowserWithURL";
import LComponent from "../../core/LComponent";
import TransitionLinkToSchedule from "../../transitions/TransitionLinkToSchedule";
import ButtonSmall from "../ButtonSmall";
import ScheduleHappeningNow from "../schedulelist/ScheduleHappeningNow";
import ScreenHeader from "./ScreenHeader";


class HomeScreen extends Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {currentTimeStr: "00:00" };
    }

    render() {
        const screenHeaderHeight = (Dimensions.get('window').width * (350 / 1290))-5
        const navBarHeight = (Dimensions.get('window').width * (300 / 1290));



        let contentSpace = Dimensions.get("window").height>800?Dimensions.get("window").height-screenHeaderHeight-navBarHeight:100;
        let distanceTiles = Dimensions.get("window").height>800?contentSpace/3 -30:190;

        // console.log("ScreenHeight: "+Dimensions.get("window").height+" Content Space: "+contentSpace)


        return (
            <>
                <LComponent
                    name='homeScreenContainer'
                    style={{ position: 'absolute' }}
                    visualProperties={{ alpha: 1.0, x: 0, y: 0, z: 0, w: "windowWidth", h: "windowHeight" }}
                >

                    <Image
                        style={{
                            // backgroundColor: 'skyblue',
                            top: 0, left: 0, position: 'absolute',
                            width: Dimensions.get('window').width, height: Dimensions.get('window').height,
                            resizeMode: "cover",
                            opacity: 1
                        }}
                        source={require('../../../assets/screen-home-bg.png')}
                    />

                    <Image
                        source={require('../../../assets/logo-white.png')}
                        style={{
                            position: 'absolute', resizeMode: 'contain', opacity: (Dimensions.get("window").height<800?0.1:0.8),
                            left: 80, 
                            top: (Dimensions.get("window").height<800?
                             (Dimensions.get("window").height/2- (Dimensions.get('window').width - (2 * 80) * (815 / 1313))/2):
                             contentSpace/3-(Dimensions.get('window').width - (2 * 80) * (815 / 1313))/2),
                            width: Dimensions.get('window').width - (2 * 80),
                            height: Dimensions.get('window').width - (2 * 80) * 815 / 1313,
                        }}
                    />

                    <ScreenHeader text="WELCOME MY FRIEND" color='#FFFFFF' />
                    {/* <Image
                        source={require('../../../assets/logo-white.png')}
                        style={{
                            position: 'absolute', resizeMode: 'contain', opacity: 1,
                            right: 30, top: 45,
                            width: 80,
                            height: 80 * 815 / 1313,
                        }}
                    /> */}


                    <ScrollView style={{
                        position: 'absolute',
                        top: screenHeaderHeight, left: 0,
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height-(screenHeaderHeight),
                        // backgroundColor: 'red'
                    }
                    }>

                        <View
                            style={[{
                                position: 'absolute',
                                top: contentSpace/3,
                                width: Dimensions.get("window").width,
                                left: 0,
                                // backgroundColor: 'skyblue',
                            }]}>
                       
                                <ScheduleHappeningNow initialItem={LauncherController.getInstance().context.happeningNowItem[0]} />
                  

                            <Text allowFontScaling={false} id='textLocation' style={[{
                                position: 'absolute',
                                top: distanceTiles,
                                left: 30,
                                height: 15,
                                fontFamily: 'Cabin-Regular',
                                letterSpacing: 2.0,
                                fontSize: 14,
                                color: '#4b262a',
                                // backgroundColor: 'skyblue',
                                textAlign: 'center',
                            }]}>
                                GRAB YOUR 2025 TICKET
                            </Text>

                            <View style={{
                                position: 'absolute',
                                backgroundColor: '#9f509f',
                                left: 30, 
                                top: distanceTiles+30,
                                width: Dimensions.get('window').width - (2 * 30), height: 130,
                                opacity: 0.8
                            }}>
                            </View>

                            <Image
                                source={require('../../../assets/home-happening-banner.png')}
                                style={{
                                    position: 'absolute', resizeMode: 'contain', opacity: 1.0,
                                    left: 30, 
                                    top: distanceTiles+30,
                                    width: (Dimensions.get('window').width - 2 * 30),
                                    height: 130,
                                }}
                            />



                            <Text allowFontScaling={false} id='textSessionMainTitle' style={{
                                position: 'absolute',
                                top: distanceTiles+50,
                                left: 30,
                                width: Dimensions.get('window').width - (2 * 30),
                                fontFamily: 'ArtBrush',
                                // backgroundColor: 'indigo',
                                textAlign: 'center',
                                color: '#FFFFFF',
                                fontSize: 25,
                                opacity: 0.9
                            }}>
                                2025 Early Bird Passes
                            </Text>


                            {/* <Text allowFontScaling={false} id='textSessionMainTitle' style={{
            position: 'absolute',
            top: 250,
            left: 30,
            width:Dimensions.get('window').width - (2 * 30),
            fontFamily: '',
            // backgroundColor: 'indigo',
            textAlign: 'center',
            color: '#FFFFFF',
            fontSize: 25,
            opacity: 0.9
          }}>
                     - First 50 Tickets - only 159
- Next 100 179
                  
          </Text> */}



                            <ButtonSmall
                                name={("BtnTicketPage")}
                                style={{
                                    position: 'absolute',
                                    top: (distanceTiles+95), left: (Dimensions.get('window').width) / 2 - 90,
                                    height: 35, width: 190
                                }}
                                text={"GO TO TICKET WEBPAGE"}
                                bgBoxVisible={true}
                                bgBoxStyle={{
                                    backgroundColor: '#dd5163',
                                    height: 35, width: 190,
                                }}
                                fontStyle={{
                                    fontFamily: 'Cabin-Regular',
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    letterSpacing: 2.0,
                                    color: '#FFFFFF',
                                    fontSize: 10,
                                    width: 190,
                                }}
                                visualProperties={{ alpha: 1 }}
                                onSelect={() => { ActionOpenBrowserWithURL() }}
                            />


                        </View>


                    </ScrollView>


                </LComponent>


            </>

        );
    }
}

export default HomeScreen;