import React, { PureComponent } from "react";
import { Dimensions, Image, Platform, ScrollView, Text, View } from "react-native";
import LauncherController from "../../LauncherController";
import ActionOpenBrowserWithURL from "../../actions/ActionOpenBrowserWithURL";
import LComponent from "../../core/LComponent";
import ButtonSmall from "../ButtonSmall";
import HappeningNowTile from "../happeningnowtile/HappeningNowTile";
import ScreenHeader from "./ScreenHeader";
import EarlyPassesTile from "./EarlyPassesTile";
import ActionUpdateHappeningNow from "../happeningnowtile/ActionUpdateHappeningNow";


class HomeScreen extends PureComponent<any, any> {
    scrollViewRef = null;

    constructor(props) {
        super(props);
        this.state = { 
            activeItems: [LauncherController.getInstance().context.happeningNowItemNoSession],
            scrollPosY: 0,
        };
    }

    render() {
        // console.log('rendering HomeScreen');
        const screenHeaderHeight = (Dimensions.get('screen').width * (350 / 1290)) - 5
        const navBarHeight = (Dimensions.get('screen').width * (300 / 1290));

        let contentSpace = Dimensions.get("screen").height > 800 ? Dimensions.get("screen").height - screenHeaderHeight - navBarHeight : 100;
        let distanceTiles = Dimensions.get("screen").height > 800 ? contentSpace / 3 - 30 : 190;

        const context = LauncherController.getInstance().context;
        //happeningNowOffset
        context.happeningNowItemUpdateFunction = () => {
            if (context.happeningNowItems.length == 0)
                this.setState({ activeItems: [LauncherController.getInstance().context.happeningNowItemNoSession],  scrollPosY: this.state.scrollPosY  })
            else
                this.setState({ activeItems: context.happeningNowItems,  scrollPosY: this.state.scrollPosY });
        };
        const happeningNowTileItemHeight = 50;
        const happeningNowTileHeight = (this.state.activeItems.length - 1) * (happeningNowTileItemHeight);
        const happeningNowTotalDistance = 130+happeningNowTileHeight+50;

        // console.log("ScreenHeight: "+Dimensions.get("screen").height+" Content Space: "+contentSpace)


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
                            width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
                            resizeMode: "cover",
                            opacity: 1
                        }}
                        source={require('../../../assets/screen-home-bg.png')}
                    />
        {/* <Image
                    source={require('../../../assets/logo-full.png')}
                    style={{
                        position: 'absolute', resizeMode: 'contain', opacity: 1.0,
                        left: (Dimensions.get('screen').width -200) / 2, top: 100,
                        width: Dimensions.get('screen').width - (2 * 80),
                        height: Dimensions.get('screen').width - (2 * 80) * 800 / 768,
                    }}
                /> */}
                    <Image
                        source={require('../../../assets/logo-white.png')}
                        style={{
                            position: 'absolute', resizeMode: 'contain', 
                            opacity: (Dimensions.get("screen").height < 800 ? 0.1 : 1.0-(0.7*Math.min(1,Math.max(0,this.state.scrollPosY/20)))),
                            left: 80,
                            top: (Dimensions.get("screen").height < 800 ?
                                (Dimensions.get("screen").height / 2 - (Dimensions.get('screen').width - (2 * 80) * (815 / 1313)) / 2) :
                                contentSpace / 3 - (Dimensions.get('screen').width - (2 * 80) * (815 / 1313)) / 2),
                            width: Dimensions.get('screen').width - (2 * 80),
                            height: Dimensions.get('screen').width - (2 * 80) * 815 / 1313,
                        }}
                    />

                    {/* <ScreenHeader text="WELCOME MY FRIEND" color='#FFFFFF' /> */}
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
                        width: Dimensions.get("screen").width,
                        height: Dimensions.get("screen").height - (screenHeaderHeight),
                        // backgroundColor: 'red'
                    }}
                    onScroll={(e)=>{ 
                        // console.log( e.nativeEvent.contentOffset.y);
                        this.setState({activeItems: this.state.activeItems, scrollPosY: e.nativeEvent.contentOffset.y})
                    }} 
                    >

                        <View
                            style={[{
                                top: contentSpace / 3,
                                width: Dimensions.get("screen").width,
                                height: (contentSpace/3+happeningNowTotalDistance+200+navBarHeight+(Platform.OS == "ios"?30:230)),
                                left: 0,
                                // backgroundColor: 'skyblue',
                            }]}>

                            {/* <HappeningNowTile activeItems={ this.state.activeItems} tileHeight={happeningNowTileHeight}/> */}
                            {/* <EarlyPassesTile offsetY={Math.max(distanceTiles, happeningNowTotalDistance)} /> */}
                        </View>
                    </ScrollView>

                    {(Platform.OS == 'android') &&
                        <View
                            style={{
                                backgroundColor: '#9F509F',
                                bottom: (Dimensions.get('screen').width * (300 / 1290)) / 2 - 1, left: 0, position: 'absolute',
                                width: Dimensions.get('screen').width,
                                height: (Dimensions.get('screen').width * (300 / 1290)),
                                opacity: 0.8
                            }} />
                    }
                </LComponent>


            </>

        );
    }
    componentDidMount(): void {
        ActionUpdateHappeningNow();
    }
}

export default HomeScreen;