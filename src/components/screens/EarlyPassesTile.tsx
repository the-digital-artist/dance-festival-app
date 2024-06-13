import { useState } from 'react';
import { Dimensions, Image, Platform, Text, View } from 'react-native';
import LauncherController from '../../LauncherController';
import ButtonSmall from '../ButtonSmall';
import TransitionLinkToSchedule from '../../transitions/TransitionLinkToSchedule';
import HappeningNowTileItem from '../happeningnowtile/HappeningNowTileItem';
import { BlurView } from 'expo-blur';
import ActionOpenBrowserWithURL from '../../actions/ActionOpenBrowserWithURL';


const EarlyPassesTile = (props) => {
  // console.log("Rendering EarlyPassesTile")

  return (
    <>
        <Text allowFontScaling={false} id='textLocation' style={[{
                                position: 'absolute',
                                top: props.offsetY,
                                left: 30,
                                height: 17,
                                fontFamily: 'Cabin-Regular',
                                letterSpacing: 2.0,
                                fontSize: 14,
                                color: '#4b262a',
                                // backgroundColor: 'skyblue',
                                textAlign: 'center',
                            }]}>
                                GRAB YOUR TICKET FOR NEXT YEAR 2025
                            </Text>



                            <View style={{
                                position: 'absolute',
                                backgroundColor: '#9f509f',
                                left: 30,
                                top: props.offsetY + 30,
                                width: Dimensions.get('screen').width - (2 * 30), 
                                height: 170,
                                opacity: 0.8
                            }}>
                            </View>

                            <Image
                                source={require('../../../assets/home-happening-banner.png')}
                                style={{
                                    position: 'absolute', 
                                    resizeMode: 'cover', opacity: 0.4,
                                    left: 30,
                                    top: props.offsetY + 30,
                                    width: (Dimensions.get('screen').width - 2 * 30),
                                    height: 170,
                                }}
                            />



                            <Text allowFontScaling={false} id='textEarlyBird1' style={{
                                position: 'absolute',
                                top: props.offsetY + 50,
                                left: 30,
                                width: Dimensions.get('screen').width - (2 * 30),
                                fontFamily: 'ArtBrush',
                                // backgroundColor: 'indigo',
                                textAlign: 'center',
                                color: '#FFFFFF',
                                fontSize: 24,
                                opacity: 0.9
                            }}>
                                2025 Early Bird Passes
                            </Text>


                            <ButtonSmall
                                name={("BtnTicketBanner")}
                                style={{
                                    position: 'absolute',
                                    left: 30,
                                    top: props.offsetY + 50,
                                    width: (Dimensions.get('screen').width - 2 * 30),
                                    height: 130,
                                }}
                                bgBoxVisible={false}
                                defaultSource={require('../../../assets/hometile-earlybird-button.png')}
                                source={{
                                    uri: 'https://the-artist.digital/qaldf/hometile-earlybird-button.png',
                                  }}
                                imageStylestyle={{
                                    position: 'absolute', resizeMode: 'contain', opacity: 1.0,
                                }}
                                visualProperties={{ alpha: 1 }}
                                onSelect={() => { ActionOpenBrowserWithURL() }}
                            />

                  
                            <ButtonSmall
                                name={("BtnTicketPage")}
                                style={{
                                    position: 'absolute',
                                    top: (props.offsetY + 150),
                                    left: 60,
                                    height: 35,
                                    width: (Dimensions.get('screen').width - 2 * 60),
                                }}
                                text={"GO TO TICKET WEBPAGE"}
                                bgBoxVisible={true}
                                bgBoxStyle={{
                                    backgroundColor: '#262730',
                                    height: 35, 
                                    width: (Dimensions.get('screen').width - 2 * 60),
                                }}
                                fontStyle={{
                                    fontFamily: 'Cabin-Regular',
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    letterSpacing: 2.0,
                                    color: '#EFEFEF',
                                    fontSize: 10,
                                    width: (Dimensions.get('screen').width - 2 * 60),
                                }}
                                visualProperties={{ alpha: 1 }}
                                onSelect={() => { ActionOpenBrowserWithURL() }}
                            />
    </>
  );
}

export default EarlyPassesTile;