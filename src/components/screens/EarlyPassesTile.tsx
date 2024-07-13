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
                    height: 140,
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
                {'EARLY BIRD PASSES'}
            </Text>

            <Text allowFontScaling={false} id='textLocation' style={[{
                position: 'absolute',
                top: props.offsetY + 5,
                left: Dimensions.get('screen').width / 2 - Dimensions.get('screen').width * (2 / 3) / 2,
                width: Dimensions.get('screen').width * (2 / 3),
                height: 17,
                fontFamily: 'RobotoCondensed-Medium',
                letterSpacing: 0.5,
                fontSize: 13,
                color: '#121212'

            }]}>GRAB YOUR TICKET FOR NEXT YEAR 2025</Text>



            {/* <Image
                source={require('../../../assets/home-happening-banner.png')}
                style={{
                    position: 'absolute',
                    resizeMode: 'cover', opacity: 0.4,
                    left: 30,
                    top: props.offsetY + 30,
                    width: (Dimensions.get('screen').width - 2 * 30),
                    height: 120,
                }}
            /> */}


            {/* <ButtonSmall
                name={("BtnTicketBanner")}
                style={{
                    position: 'absolute',
                    left: 30,
                    top: props.offsetY + 5,
                    width: (Dimensions.get('screen').width - 2 * 30),
                    height: 130,
                }}
                bgBoxVisible={false}
                // defaultSource={require('../../../assets/hometile-earlybird-button.png')}
                source={require('../../../assets/hometile-earlybird-button.png')}
                imageStylestyle={{
                    position: 'absolute', resizeMode: 'contain', opacity: 1.0,
                }}
                visualProperties={{ alpha: 1 }}
                onSelect={() => { ActionOpenBrowserWithTicketURL() }}
                onError={(nativeEvent) => { console.log() }}
            /> */}

            <Text
                id='programItemDescriptionText'
                allowFontScaling={false}
                style={[{
                    position: 'absolute',
                    top: 30,
                    left: Dimensions.get('screen').width / 2 - Dimensions.get('screen').width * (2 / 3) / 2,
                    width: Dimensions.get('screen').width * (2 / 3),
                    height: 70,
                    fontFamily: 'RobotoCondensed-Medium',
                    letterSpacing: 0.5,
                    fontSize: 13,
                    color: '#FFFFFF',
                    // backgroundColor: 'blue',
                    textAlign: 'center',

                }]}>
                {`Early bird passes are out now. Don't be late and get your ticket  with this special early-bird price.`}
            </Text>


            <ButtonSmall
                name={("BtnTicketPage")}
                style={{
                    position: 'absolute',
                    top: (props.offsetY + 90),
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
                    color: '#fdface',
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