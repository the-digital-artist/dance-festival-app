import React, { PureComponent } from "react";
import { Dimensions, Image, Platform, ScrollView, Text, View } from "react-native";
import LauncherController from "../../LauncherController";
import LComponent from "../../core/LComponent";
import ButtonSmall from "../ButtonSmall";
import ActionUpdateHappeningNow from "../happeningnowtile/ActionUpdateHappeningNow";
import NavBar from "../navbar/NavBar";
import ScreenHeader from "./ScreenHeader";
import TransitionLinkToSchedule from "../../transitions/TransitionLinkToSchedule";
import { BlurView } from "expo-blur";


class HomeScreen extends PureComponent<any, any> {
    scrollViewRef = null;
    itemHeight = Dimensions.get('screen').width * 0.75 * (556 / 980);
    itemSpacingY = 10;

    dataStyles = {
        'type3': { note: 'bootcamp', imgSrc: require('../../../assets/tile-fullprogram-itembg4.png'), imgSrcLocation: require('../../../assets/tile-fullprogram-locationicon.png'), color1: '#312816', color2: '#f8f6d3', color3: '#010101' },
        'type1': { note: 'workshops', imgSrc: require('../../../assets/tile-fullprogram-itembg1.png'), imgSrcLocation: require('../../../assets/tile-fullprogram-locationicon.png'), color1: '#312816', color2: '#312816', color3: '#f8f6d3' },
        'type2': { note: 'city', imgSrc: require('../../../assets/tile-fullprogram-itembg3.png'), imgSrcLocation: require('../../../assets/tile-fullprogram-locationicon.png'), color1: '#f8f6d3', color2: '#312816', color3: '#FFFFFF' },
        'type4': { note: 'party', imgSrc: require('../../../assets/tile-fullprogram-itembg2.png'), imgSrcLocation: require('../../../assets/tile-fullprogram-locationicon.png'), color1: '#f8f6d3', color2: '#f2aa3e', color3: '#FFFFFF' },
    }
    dataLocation = {
        'altemuenze': { imgSrc: require('../../../assets/location-icons/location-alte-muenze.png'), locationName: `Alte Münze` },
        'bebop': { imgSrc: require('../../../assets/location-icons/location-bebop.png'), locationName: `Bebop` },
        'belushis': { imgSrc: require('../../../assets/location-icons/location-belushis.png'), locationName: `Belushi's Mitte`, },
        'berlindanceinstitute': { imgSrc: require('../../../assets/location-icons/location-berlin-dance-institute.png'), locationName: `Berlin Dance Institute` },
        'soda': { imgSrc: require('../../../assets/location-icons/location-soda.png'), locationName: `Soda Club` },
        'unknown': { imgSrc: require('../../../assets/location-icons/location-unknown.png'), locationName: `Location to be announced` },

    }
    dataModel = [
        // { id: 0, type: 'type5', title: 'EMPTY', dateText: "", timeText: "", location: '', locationAdress: '', tickets: [], startTime: '', endTime: '', description: "" },
        { id: 2, type: 'type4', title: 'PREPARTY', dateText: "Thu, 18.07.24", timeText: "20:15 - 01:00", location: 'soda', locationAdress: 'Schönhauser Allee 36, 10435 Berlin', tickets: ['Berlin Experience Ticket', "All-Inclusive Pass,"], startTime: '', endTime: '', description: "Join us for a social dance extravaganza across 5 dancefloors featuring Salsa Cubana, Mambo, Bachata, Zouk, and Kizomba." },
        { id: 3, type: 'type2', title: 'CITY TOUR', dateText: "Fri, 19.07.24", timeText: "13:15 - 15:30", location: 'unknown', tickets: ['Berlin Experience Ticket', "All-Inclusive Pass,"], startTime: '', endTime: '', description: "Two-hour city tour through Berlin's historic city center. Dance some Ruedas at iconic landmarks and immerse yourself in the city's rich history and culture. Our experienced filmmaker will capture these joyous moments, filming you as you dance in front of Berlin's most famous sights, creating lasting memories and stunning footage." },
        { id: 4, type: 'type4', title: 'ROOFTOP SOCIAL', dateText: "Fri, 19.07.24", timeText: "15:30 - 20:00", location: `belushis`, locationAdress: 'Ziegelstraße 28, 10117 Berlin', tickets: ['Berlin Experience Ticket', "All-Inclusive Pass,"], startTime: '', endTime: '', description: "Lively Dance-Social on a breathtaking rooftop in the city center. Enjoy the spectacular summer evening sky, savor ice-cold drinks and dance the afternoon away in a beautiful, relaxed atmosphere." },
        { id: 5, type: 'type3', title: 'Beginner Bootcamp', dateText: "Fri, 19.07.24", timeText: "18:00 - 20:30", location: 'bebop', locationAdress: 'Pfuelstraße 5, 10997 Berlin', tickets: ['Berlin Experience Ticket', "All-Inclusive Pass,"], startTime: '', endTime: '', description: "Lively Dance-Social on a breathtaking rooftop in the city center. Enjoy the spectacular summer evening sky, savor ice-cold drinks and dance the afternoon away in a beautiful, relaxed atmosphere." },
        { id: 6, type: 'type4', title: 'Welcome Party', dateText: "Fri, 19.07.24", timeText: "21:00 - 03:00", location: 'bebop', locationAdress: 'Pfuelstraße 5, 10997 Berlin', tickets: ['Berlin Experience Ticket', "All-Inclusive Pass,"], startTime: '', endTime: '', description: "Official Festival Party\n  21:00 - 22:00: Preparty Workshop\n  22:00 - 03:00: Party" },
        { id: 7, type: 'type1', title: 'Workshops', dateText: "Sat, 20.07.24", timeText: "11:00 - 18:00", location: 'berlindanceinstitute', locationAdress: 'Egelingzeile 6, 12103 Berlin', tickets: ['Berlin Experience Ticket', "All-Inclusive Pass,"], startTime: '', endTime: '', description: "50+ workshops spanning five rooms over two days" },
        { id: 8, type: 'type4', title: 'Gala Party', dateText: "Sat, 20.07.24", timeText: "21:00 - 04:00", location: 'altemuenze', locationAdress: 'Molkenmarkt 2, 10179 Berlin', tickets: ['Berlin Experience Ticket', "All-Inclusive Pass,"], startTime: '', endTime: '', description: " 21:00 - 22:00: Preparty Workshop\n 22:00 - 04:00: Gala Party\n 23:00: Orishas Show & Rumba Abierta" },
        { id: 9, type: 'type1', title: 'Workshops', dateText: "Sun, 21.07.24", timeText: "11:00 - 18:00", location: 'berlindanceinstitute', locationAdress: 'Egelingzeile 6, 12103 Berlin', tickets: ['Berlin Experience Ticket', "All-Inclusive Pass,"], startTime: '', endTime: '', description: "50+ workshops spanning five rooms over two days" },
        { id: 10, type: 'type4', title: 'Goodbye Party', dateText: "Sun, 21.07.24", timeText: "20:15 - 01:00", location: 'soda', locationAdress: 'Schönhauser Allee 36, 10435 Berlin', tickets: ['Berlin Experience Ticket', "All-Inclusive Pass,"], startTime: '', endTime: '', description: "Special:  23:00: Show" },
        { id: 11, type: 'type5', title: 'EMPTY', dateText: "", timeText: "", location: '', locationAdress: '', tickets: [], startTime: '', endTime: '', description: "" },
        { id: 12, type: 'type5', title: 'EMPTY', dateText: "", timeText: "", location: '', locationAdress: '', tickets: [], startTime: '', endTime: '', description: "" },

    ]




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
        const navBarHeight = NavBar.navBarHeight;

        let contentSpace = Dimensions.get("screen").height > 800 ? Dimensions.get("screen").height - screenHeaderHeight - navBarHeight : 100;
        let distanceTiles = Dimensions.get("screen").height > 800 ? contentSpace / 3 - 30 : 190;

        const context = LauncherController.getInstance().context;
        //happeningNowOffset
        context.happeningNowItemUpdateFunction = () => {
            if (context.happeningNowItems.length == 0)
                this.setState({ activeItems: [LauncherController.getInstance().context.happeningNowItemNoSession], scrollPosY: this.state.scrollPosY })
            else
                this.setState({ activeItems: context.happeningNowItems, scrollPosY: this.state.scrollPosY });
        };
        const happeningNowTileItemHeight = 50;
        const happeningNowTileHeight = (this.state.activeItems.length - 1) * (happeningNowTileItemHeight);
        const happeningNowTotalDistance = 130 + happeningNowTileHeight + 50;

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
                            opacity: (Dimensions.get("screen").height < 800 ? 0.1 : 1.0 - (0.45 * Math.min(1, Math.max(0, this.state.scrollPosY / 100)))),
                            left: 80,
                            // backgroundColor: 'red',
                            top: screenHeaderHeight + 15,
                            width: Dimensions.get('screen').width - (2 * 80),
                            height: Dimensions.get('screen').width - (2 * 80) * 1313 / 815,
                        }}
                    />
                    <ScreenHeader text={"WELCOME MY FRIEND"} color='#9F9F90' />

                    <ScrollView style={{
                        position: 'absolute',
                        top: screenHeaderHeight, left: 0,
                        width: Dimensions.get("screen").width,
                        height: Dimensions.get("screen").height - screenHeaderHeight - navBarHeight,
                        // backgroundColor: 'red'
                    }}
                        onScroll={(e) => {
                            // console.log(e.nativeEvent.contentOffset.y);
                            this.setState({ activeItems: this.state.activeItems, scrollPosY: e.nativeEvent.contentOffset.y })
                        }}
                    >



                        <View
                            style={{
                                top: 240 + this.itemSpacingY,
                                // backgroundColor:'red',
                                width: Dimensions.get("screen").width,
                                height: this.itemHeight * this.dataModel.length,
                            }}>
                            {Platform.OS == "ios" && <BlurView
                                intensity={17}
                                style={{
                                    // backgroundColor:'skyblue',
                                    position: 'absolute',
                                    opacity: 1.0,
                                    left: 0,
                                    top: 5,
                                    width: Dimensions.get("screen").width,
                                    height: this.itemHeight * this.dataModel.length-5,

                                }} />
                            }
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
                                {'PROGRAM OVERVIEW'}
                            </Text>


                            {this.dataModel.map((itemData, i) => {
                                return (
                                    <View
                                        key={itemData.id + i + ""}
                                        style={{
                                            position: 'absolute',
                                            opacity: 1.0,
                                            top: (i * (this.itemHeight + this.itemSpacingY)),
                                            left: 0,
                                            width: Dimensions.get("screen").width,
                                            height: this.itemHeight,
                                        }}
                                    >
                                        {itemData.type != 'type5' &&
                                            <>
                                                <Image
                                                    source={this.dataStyles[itemData.type].imgSrc}
                                                    style={{
                                                        position: 'absolute',
                                                        resizeMode: 'cover',
                                                        opacity: 0.6,
                                                        top: 0,
                                                        left: -7,
                                                        width: Dimensions.get("screen").width * 0.75,
                                                        height: this.itemHeight,
                                                    }}
                                                />
                                                <Image
                                                    source={this.dataStyles[itemData.type].imgSrc}
                                                    style={{
                                                        position: 'absolute',
                                                        resizeMode: 'cover',
                                                        opacity: 0.2,
                                                        top: 0,
                                                        left: Dimensions.get("screen").width * 0.75 - 20,
                                                        width: Dimensions.get("screen").width * 0.25 + 20,
                                                        height: this.itemHeight,
                                                    }}
                                                />
                                                <Text allowFontScaling={false} id='textTitle' style={[{
                                                    position: 'absolute',
                                                    top: 20,
                                                    left: 30,
                                                    width: Dimensions.get("screen").width * 0.75 - 55,
                                                    height: 45,
                                                    fontFamily: 'LuckiestGuy-Regular',
                                                    letterSpacing: 2.0,
                                                    fontSize: 20,
                                                    color: (this.dataStyles[itemData.type].color1),
                                                    // backgroundColor: 'skyblue',
                                                    textAlign: 'left',
                                                }]}>
                                                    {itemData.title}
                                                </Text>


                                                <Text allowFontScaling={false} id='textDescription' style={[{
                                                    position: 'absolute',
                                                    top: 50,
                                                    left: 30,
                                                    width: Dimensions.get("screen").width * 0.75 - 65,
                                                    height: this.itemHeight - 80 - 15,
                                                    fontFamily: 'RobotoCondensed-Medium',
                                                    letterSpacing: 0.5,
                                                    fontSize: 13,
                                                    color: (this.dataStyles[itemData.type].color2),
                                                    // backgroundColor: 'blue',
                                                    textAlign: 'left',

                                                }]}>
                                                    {itemData.description}
                                                </Text>
                                                <Text allowFontScaling={false} id='textDateTime' style={[{
                                                    position: 'absolute',
                                                    top: 20,
                                                    right: 7,
                                                    width: Dimensions.get("screen").width * 0.25 - 15,
                                                    height: this.itemHeight,
                                                    fontFamily: 'RobotoCondensed-Medium',
                                                    // letterSpacing: 1.0,
                                                    fontSize: 14,
                                                    color: '#fdface',
                                                    // backgroundColor: 'indigo',
                                                    textAlign: 'right',

                                                }]}>
                                                    {itemData.dateText + "\n" + itemData.timeText}
                                                </Text>
                                                {/* 
                                                <Text allowFontScaling={false} id='textPasses' style={[{
                                                    position: 'absolute',
                                                    bottom: 20+6,
                                                    left: 30+20+12,
                                                    // width: Dimensions.get("screen").width * 0.75 - 30 - 15,
                                                    fontFamily: 'RobotoCondensed-Medium',
                                                    letterSpacing: 0.5,
                                                    
                                                    fontSize: 12,
                                                    color: (this.dataStyles[itemData.type].color3),
                                                    opacity: 1.0,
                                                    // backgroundColor: 'black',
                                                    textAlign: 'left',

                                                }]}>
                                                    {itemData.location}
                                                </Text> */}
                                                <ButtonSmall
                                                    name={("homeTileLocationButton" + i)}
                                                    source={(this.dataStyles[itemData.type].imgSrcLocation)}
                                                    style={{
                                                        position: 'absolute',
                                                        left: 20,
                                                        bottom: 22,
                                                        height: 22, width: 22,
                                                    }}
                                                    bgBoxVisible={false}
                                                    bgBoxStyle={{
                                                        backgroundColor: (this.dataStyles[itemData.type].color1),
                                                        height: 22, width: 22
                                                    }}
                                                    text={this.dataLocation[itemData.location].locationName}
                                                    fontStyle={{
                                                        left: 20,
                                                        width: 200,
                                                        textAlign: 'left',
                                                        fontFamily: 'RobotoCondensed-Medium',
                                                        letterSpacing: 0.5,
                                                        fontSize: 12,
                                                        color: (this.dataStyles[itemData.type].color3),
                                                    }}
                                                    visualProperties={{ alpha: 1 }}
                                                    onSelect={() => {
                                                        // LauncherController.getInstance().context.navigationHistory.push({out:'ArtistListScreen', transition:'TransitionArtistNavigateDown' })
                                                        // TransitionArtistNavigateDown(item, 1) 
                                                    }}
                                                />

                                                <Image
                                                    source={this.dataLocation[itemData.location].imgSrc}
                                                    style={{
                                                        position: 'absolute',
                                                        resizeMode: 'cover',
                                                        opacity: 0.3,
                                                        bottom: 30,
                                                        right: 15,
                                                        width: 70,
                                                        height: 20,
                                                    }}
                                                />

                                                {itemData.type == 'type1' &&
                                                    <ButtonSmall
                                                        name={("homeTileButtonToWorkshop" + i)}
                                                        source={null}
                                                        style={{
                                                            position: 'absolute',
                                                            left: 30,
                                                            top: 90,
                                                            height: 26, width: 200,
                                                        }}
                                                        text={"GO TO WORKSHOP PLANNER"}
                                                        bgBoxVisible={true}
                                                        bgBoxStyle={{
                                                            backgroundColor: (this.dataStyles[itemData.type].color3),
                                                            height: 26, width: 200
                                                        }}
                                                        fontStyle={{
                                                            width: 200,
                                                            fontFamily: 'Cabin-Regular',
                                                            textAlign: 'center',
                                                            textAlignVertical: 'center',
                                                            letterSpacing: 2.0,
                                                            color: (this.dataStyles[itemData.type].color2),
                                                            fontSize: 10,
                                                        }}
                                                        visualProperties={{ alpha: 1 }}
                                                        onSelect={() => {
                                                            LauncherController.getInstance().context.navigationHistory.push({ out: 'HomeScreen', transition: 'TransitionLinkToSchedule' })
                                                            TransitionLinkToSchedule();
                                                        }}
                                                    />
                                                }
                                            </>
                                        }
                                    </View>
                                );
                            })}
                        </View>





                        {/* <OverallProgramTile /> */}
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