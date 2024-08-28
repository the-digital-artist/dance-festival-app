import { Dimensions, Image, Text, View } from 'react-native';
import ActionOpenBrowserWithTicketURL from '../../actions/ActionOpenBrowserWithURL';
import ButtonSmall from '../ButtonSmall';
import TransitionScreenToScreen from '../../transitions/TransitionScreenToScreen';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


const LoginTile = (props) => {
    // console.log("Rendering EarlyPassesTile")

    const tileHeight = 280;

    return (
        <>
            <View
                style={{
                    position: 'absolute',
                    opacity: 0.2,
                    top: 0,
                    left: 0,
                    width: Dimensions.get("screen").width,
                    height: tileHeight,
                    backgroundColor: '#3e3b3a'
                }}
            ></View>
            <Text allowFontScaling={false} id='textHeader'
                style={{
                    top: props.offsetY - 25,
                    left: 0,
                    width: Dimensions.get('screen').width,
                    height: 32,
                    color: '#f8f6d3',
                    fontFamily: 'Cabin-Regular',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    letterSpacing: 2.0,
                    fontSize: 12
                }}>
                {'CALDAC ACCOUNT'}
            </Text>



            <View style={{
                position: 'absolute',
                backgroundColor: '#355a7d',
                left: 30,
                top: props.offsetY + 30,
                width: Dimensions.get('screen').width - (2 * 30),
                height: tileHeight - 50,
                opacity: 0.5
            }}>
            </View>

            <Image
                source={require('../../../assets/home-happening-banner.png')}
                style={{
                    position: 'absolute',
                    resizeMode: 'cover', opacity: 0.5,
                    left: 30,
                    top: props.offsetY + 40,
                    width: (Dimensions.get('screen').width - 2 * 30),
                    height: tileHeight - 70,
                }}
            />



            <Text allowFontScaling={false} id='textEarlyBird1' style={{
                position: 'absolute',
                top: props.offsetY + 60,
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
                {("CALDAC ACCOUNT").toLocaleUpperCase()}
            </Text>

            <Text allowFontScaling={false} id='textEarlyBird1' style={{
                position: 'absolute',
                top: props.offsetY + 100,
                left: 45,
                width: Dimensions.get('screen').width - (2 * 45),
                fontFamily: 'Cabin-Regular',
                // backgroundColor: 'indigo',
                textAlign: 'center',
                letterSpacing: 1.3,
                color: '#FFFFFF',
                fontSize: 12,
                opacity: 0.9
            }}>
                {("Get special 2025 early bird rates, detailed workshop recap videos and special discounts for artist's online classes. And the best thing - it's free :-) ".toLocaleUpperCase())}
            </Text>


            <ButtonSmall
                name={("BtnAccountLearnMore")}
                style={{
                    position: 'absolute',
                    top: (props.offsetY + tileHeight - 80),
                    left: 60,
                    height: 35,
                    width: (Dimensions.get('screen').width - 2 * 60 - 10) / 2,
                    opacity :0.5
                }}
                text={"LEARN MORE"}
                bgBoxVisible={true}
                bgBoxStyle={{
                    backgroundColor: '#232323',
                    height: 35,
                    width: (Dimensions.get('screen').width - 2 * 60 - 10) / 2,
                }}
                fontStyle={{
                    fontFamily: 'Cabin-Regular',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    letterSpacing: 2.0,
                    color: '#FFFFFF',
                    fontSize: 10,
                    width: (Dimensions.get('screen').width - 2 * 60 - 10) / 2,
                }}
                visualProperties={{ alpha: 0.2 }}
                // onSelect={() => { /* TransitionScreenToScreen("homeScreenContaienr","loginScreenContainer") */ }}
            />

            <ButtonSmall
                name={("BtnAccountSignIn")}
                style={{
                    position: 'absolute',
                    top: (props.offsetY + tileHeight - 80),
                    right: 60,
                    height: 35,
                    width: (Dimensions.get('screen').width - 2 * 60 - 10) / 2,
                    opacity :0.5
                }}
                text={"SIGN-IN"}
                bgBoxVisible={true}
                bgBoxStyle={{
                    backgroundColor: '#232323',
                    height: 35,
                    width: (Dimensions.get('screen').width - 2 * 60 - 10) / 2,
                }}
                fontStyle={{
                    fontFamily: 'Cabin-Regular',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    letterSpacing: 2.0,
                    color: '#FFFFFF',
                    fontSize: 10,
                    width: (Dimensions.get('screen').width - 2 * 60 - 10) / 2,
                }}
                visualProperties={{ alpha: 0.2 }}
                // onSelect={() => { /*TransitionScreenToScreen("homeScreenContainer","loginScreenContainer") */ }}
            />
        </>
    );
}

export default LoginTile;