import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import DataModel from "../../DataModel";
import ButtonSmall from "../ButtonSmall";
import TransitionLinkToSchedule from "../../transitions/TransitionLinkToSchedule";
import LauncherController from "../../LauncherController";
import ActionOpenMaps from "../../actions/ActionOpenMaps";
import HomeScreen from "./HomeScreen";

const HomeScreenProgramItem = ({ itemData, i }) => {
    const itemHeight = HomeScreen.homeProgramItemHeight;
    const itemSpacingY = HomeScreen.homeProgramItemSpacingY;

    const offsetXSmallerPart = 5;
    const widthSmallerPart = Dimensions.get("screen").width * 0.25 + 2 * offsetXSmallerPart;
    const widthBiggerPart = Dimensions.get("screen").width - widthSmallerPart

    const offsetXBiggerPart = widthSmallerPart + 10;
    const offsetYBiggerPart = 10;

    // console.log("HomeScreenProgramItem " + i)

    return (
        <View
            key={itemData.id + i + ""}
            style={{
                position: 'absolute',
                top: (i * (itemHeight + itemSpacingY)),
                left: 0,
                width: Dimensions.get("screen").width,
                height: itemHeight,
            }}
        >
            {itemData.type != 'type5' &&
                <>
                    {/* background */}
                    <View
                        style={{
                            position: 'absolute',
                            opacity: 0.05,
                            top: 0,
                            left: 0,
                            width: Dimensions.get("screen").width,
                            height: itemHeight,
                            backgroundColor: DataModel.dataStyles[itemData.type].bgColor
                        }}
                    ></View>

                    <Image
                        id='programItemBackgroundBg1'
                        source={DataModel.dataStyles[itemData.type].imgSrc}
                        style={{
                            position: 'absolute',
                            resizeMode: 'contain',
                            opacity: 0.6,
                            top: 0,
                            left: offsetXBiggerPart,
                            width: widthBiggerPart - 20,
                            height: itemHeight,
                        }}
                    />
                    <View
                        id='programItemBackgroundBg2'
                        style={{
                            position: 'absolute',
                            opacity: 0.1,
                            top: 0,
                            left: 0,
                            width: widthSmallerPart,
                            height: itemHeight,
                            backgroundColor: DataModel.dataStyles[itemData.type].bgColor
                        }}
                    ></View>


                    {/* content bigger part */}
                    <Text
                        id='programItemMainTitle'
                        allowFontScaling={false} style={[{
                            position: 'absolute',
                            top: offsetYBiggerPart + 26,
                            left: offsetXBiggerPart + 30,
                            width: widthBiggerPart - 70,
                            height: 30,
                            fontFamily: 'LuckiestGuy-Regular',
                            letterSpacing: 2.0,
                            fontSize: 20,
                            color: (DataModel.dataStyles[itemData.type].color1),
                            // backgroundColor: 'skyblue',
                            textAlign: 'left',
                        }]}>
                        {itemData.title}
                    </Text>


                    <Text
                        id='programItemDescriptionText'
                        allowFontScaling={false}
                        style={[{
                            position: 'absolute',
                            top: offsetYBiggerPart + 52,
                            left: offsetXBiggerPart + 30,
                            width: widthBiggerPart - 70,
                            height: itemHeight - 80 - 15,
                            fontFamily: 'RobotoCondensed-Medium',
                            letterSpacing: 0.5,
                            fontSize: 13,
                            color: (DataModel.dataStyles[itemData.type].color2),
                            // backgroundColor: 'blue',
                            textAlign: 'left',

                        }]}>
                        {itemData.description}
                    </Text>

                    {itemData.type == 'type1' &&
                        <ButtonSmall
                            name={("homeTileButtonToWorkshop" + i)}
                            source={require('../../../assets/tile-fullprogram-workshopplanner.png')}
                            style={{
                                position: 'absolute',
                                left: offsetXBiggerPart + 30,
                                top: offsetYBiggerPart + 100,
                                height: 26, width: 26,
                            }}
                            text={("Go To Workshop Planner" as string).toUpperCase()}
                            bgBoxVisible={true}
                            bgBoxStyle={{
                                backgroundColor: '#e2e1be',
                                height: 30, width: 200
                            }}
                            fontStyle={{
                                left:10,
                                height: 22,
                                width: 200,
                                fontFamily: 'Cabin-Regular',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                letterSpacing: 2.0,
                                color: '#232323',
                                fontSize: 9,
                            }}
                            visualProperties={{ alpha: 1 }}
                            onSelect={() => {
                                LauncherController.getInstance().context.navigationHistory.push({ out: 'HomeScreen', transition: 'TransitionLinkToSchedule' })
                                TransitionLinkToSchedule();
                            }}
                        />
                    }







                    {/* content smaller part */}
                    <Text
                        id='programItemDateTime'
                        allowFontScaling={false}
                        style={[{
                            position: 'absolute',
                            top: 20,
                            left: offsetXSmallerPart,
                            width: widthSmallerPart - 2 * offsetXSmallerPart,
                            height: 38,
                            fontFamily: 'RobotoCondensed-Medium',
                            // letterSpacing: 1.0,
                            fontSize: 14,
                            color: '#fdface',
                            // backgroundColor: 'indigo',
                            textAlign: 'center',

                        }]}>
                        {itemData.dateText + "\n" + itemData.timeText}
                    </Text>


                    <ButtonSmall
                        name={("homeTileLocationButton" + i)}
                        source={DataModel.dataLocation[itemData.location].imgSrc}
                        style={{
                            position: 'absolute',
                            // backgroundColor: 'red',
                            top: 60,
                            left: offsetXSmallerPart,
                            // left: Dimensions.get("screen").width * 0.75 - 10,
                            width: widthSmallerPart - 2 * offsetXSmallerPart,
                            height: 40,
                        }}
                        imageStyle={{
                            opacity: 1.0
                        }}
                        bgBoxVisible={false}
                        bgBoxStyle={{
                            backgroundColor: '#dfdad1',
                            left: -offsetXSmallerPart + widthSmallerPart / 2 - 80 / 2,
                            height: 40,
                            width: 80,
                            opacity: 0.1
                        }}
                        text={DataModel.dataLocation[itemData.location].locationName}
                        fontStyle={{
                            width: widthSmallerPart - 2 * offsetXSmallerPart,
                            height: 45,
                            top: 40,
                            left: 0,
                            textAlign: 'center',
                            fontFamily: 'RobotoCondensed-Medium',
                            letterSpacing: 0,
                            // backgroundColor: 'skyblue',
                            fontSize: 11,
                            textAlignVertical: 'center',
                            color: '#fdface',
                        }}
                        visualProperties={{ alpha: 1 }}
                        onSelect={() => { if (itemData.location != 'unknown') ActionOpenMaps(DataModel.dataLocation[itemData.location].mapObj) }}
                    />

                    {itemData.location != 'unknown' &&
                        <ButtonSmall
                            name={("homeTileLocationButton2" + i)}
                            // source={DataModel.dataLocation[itemData.location].imgSrc}
                            style={{
                                position: 'absolute',
                                top: (DataModel.dataLocation[itemData.location].locationName.length > 25 ? 130 : 120),
                                left: 2 * offsetXSmallerPart,
                                width: widthSmallerPart - 4 * offsetXSmallerPart,
                                height: 22,
                            }}
                            text={"OPEN MAPS"}
                            bgBoxVisible={true}
                            bgBoxStyle={{
                                backgroundColor: '#121212',
                                height: 22,
                                width: widthSmallerPart - 4 * offsetXSmallerPart,
                                opacity: 0.5
                            }}
                            fontStyle={{
                                height: 22,
                                width: widthSmallerPart - 4 * offsetXSmallerPart,
                                fontFamily: 'Cabin-Regular',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                letterSpacing: 2.0,
                                color: '#fdface',
                                fontSize: 9,
                            }}
                            visualProperties={{ alpha: 1 }}
                            onSelect={() => { ActionOpenMaps(DataModel.dataLocation[itemData.location].mapObj) }}
                        />
                    }


                </>
            }
        </View>
    );
}

export default HomeScreenProgramItem;