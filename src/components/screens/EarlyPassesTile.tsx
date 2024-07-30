import { Dimensions, Image, Text, View } from 'react-native';
import ActionOpenBrowserWithTicketURL from '../../actions/ActionOpenBrowserWithURL';
import ButtonSmall from '../ButtonSmall';


const EarlyPassesTile = (props) => {
    // console.log("Rendering EarlyPassesTile")

    return (
        <>
            <View
                style={{
                    position: 'absolute',
                    opacity: 0.2,
                    top: 0,
                    left: 0,
                    width: Dimensions.get("screen").width,
                    height: 230,
                    backgroundColor: '#3e3b3a'
                }}
            ></View>
            <Text allowFontScaling={false} id='textHeader'
                style={{
                    top: -25,
                    left: 0,
                    width: Dimensions.get('screen').width, height: 32,
                    color: '#f8f6d3',
                    fontFamily: 'Cabin-Regular',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    letterSpacing: 2.0,
                    fontSize: 12
                }}>
                {'GET TICKETS'}
            </Text>



                            <View style={{
                                position: 'absolute',
                                backgroundColor: '#355a7d',
                                left: 30,
                                top: props.offsetY + 30,
                                width: Dimensions.get('screen').width - (2 * 30), 
                                height: 170,
                                opacity: 0.5
                            }}>
                            </View>

                            <Image
                                source={require('../../../assets/home-happening-banner.png')}
                                style={{
                                    position: 'absolute', 
                                    resizeMode: 'cover', opacity: 0.5,
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
                                fontFamily: 'DINCondensed-Bold',
                                // backgroundColor: 'indigo',
                                letterSpacing: 1.0,
                                textAlign: 'center',
                                color: '#FFFFFF',
                                fontSize: 24,
                                opacity: 0.9
                            }}>
                                {("2024 Early Bird Passes").toLocaleUpperCase()}
                            </Text>

                            <Text allowFontScaling={false} id='textEarlyBird1' style={{
                                position: 'absolute',
                                top: props.offsetY + 90,
                                left: 45,
                                width: Dimensions.get('screen').width - (2 * 45),
                                fontFamily: 'Cabin-Regular',
                                // backgroundColor: 'indigo',
                                textAlign: 'center',
                                letterSpacing:1.3,
                                color: '#FFFFFF',
                                fontSize: 12,
                                opacity: 0.9
                            }}>
                                {("Join us for Colorado’s Hottest Afro Latin Dance Event. Current sale will end August 31, 2024".toLocaleUpperCase())}
                            </Text>

                            


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
                    backgroundColor: '#232323',
                    height: 35,
                    width: (Dimensions.get('screen').width - 2 * 60),
                }}
                fontStyle={{
                    fontFamily: 'Cabin-Regular',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    letterSpacing: 2.0,
                    color: '#FFFFFF',
                    fontSize: 10,
                    width: (Dimensions.get('screen').width - 2 * 60),
                }}
                visualProperties={{ alpha: 1 }}
                onSelect={() => { ActionOpenBrowserWithTicketURL() }}
            />
        </>
    );
}

export default EarlyPassesTile;