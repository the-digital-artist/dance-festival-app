import React, { PureComponent } from "react";
import { Dimensions, Image, View } from "react-native";
import LauncherController from "../../LauncherController";
import ActionHistoryBackButton from "../../actions/ActionHistoryBackButton";
import ButtonSmall from "../ButtonSmall";
import ScreenHeader from "../screens/ScreenHeader";
import ScreenHomeButton from "../screens/ScreenHomeButton";
import ActionWebLink from "../../actions/ActionWebLink";


class ArtistOfferScreen extends PureComponent {

    scrollRef: any = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            scrollPosY: 0
        };
        LauncherController.getInstance().context.artistFocusItemUpdateListeners.push(() => {
            // if (this.scrollViewRef.current != null) this.scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
            this.forceUpdate()
        });

        LauncherController.getInstance().artistStackData[2].screenComponentRef = this;
    }

    render() {
        const item = LauncherController.getInstance().context.artistFocusItem
        const offerValid = true;
        const context = LauncherController.getInstance().context
        return (
            <View
                style={{
                    backgroundColor: '#000000',
                    position: 'absolute',
                    top: 0, left: 0,
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height,
                    opacity: 1
                }}
            >
                <Image
                    style={{
                        //    marginTop: 15,
                        // top: 210, left: padding, 
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height,
                        resizeMode: "cover",
                        opacity: 1.0
                    }}
                    source={{
                        uri: `https://the-artist.digital/artistconnect/${item.portrait}-fulloffer.jpg`,
                    }}
                // source={require('../../../assets/artistconnect/dejon-clo-fulloffer.png')} 
                />
                <ButtonSmall
                    name={("subscribeButton" + 129467)}
                    style={{
                        position: 'absolute',
                        top: Dimensions.get('screen').height / 2 + 20,
                        left: Dimensions.get('screen').width / 2 - (offerValid ? 200 : 120) / 2,
                        height: 35, width: (offerValid ? 200 : 120),
                    }}
                    text={offerValid ? "OPEN SUBSCRIPTION PAGE" : "ALREADY SUBSCRIBED"}
                    bgBoxVisible={true}
                    bgBoxStyle={{
                        backgroundColor: (offerValid ? '#663848' : '#d6c8cb'),
                        height: 35, width: (offerValid ? 200 : 120)
                    }}
                    fontStyle={{
                        width: (offerValid ? 200 : 120),
                        fontFamily: 'Cabin-Regular',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        letterSpacing: 2.0,
                        color: (offerValid ? '#FFFFFF' : '#010101'),
                        fontSize: 10,
                    }}
                    visualProperties={{ alpha: 1 }}
                    onSelect={() => {
                        ActionWebLink(`https://the-artist.digital/artistconnect/${item.portrait}-subscribe.html`)
                    }}
                />
                {/* 
                <ScreenHeader
                    text={"DE'JON & CLO"}
                    color='#f8f6d3'
                    textStyle={{ left: 50 }}
                    imgSrc={require('../../../assets/header-artists-bg.png')} />  */}

                <ScreenHomeButton />


                <ButtonSmall
                    name={'backButtonOfferScreen'}
                    style={{
                        // backgroundColor: 'skyblue',
                        position: 'absolute',
                        top: 70, left: 0,
                        width: 40, height: 40,
                        opacity: 0.9
                    }}
                    visualProperties={{ alpha: 1, x: 0, y: 0, z: 0 }}
                    onSelect={() => {
                        //what if this was a deeplink into this page from somewhere else outside of the stack
                        let previousInteraction = context.navigationHistory[context.navigationHistory.length - 1];
                        if (previousInteraction.out == 'ArtistConnectPage') {
                            ActionHistoryBackButton();
                        }
                    }}
                    source={require('../../../assets/stack-backicon.png')}
                />
            </View>
        );
    }
}

export default ArtistOfferScreen;