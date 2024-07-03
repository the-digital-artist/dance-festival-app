import React, { PureComponent } from "react";
import { Animated, Dimensions, Image, Text, View } from "react-native";
import LComponent from '../../core/LComponent';
import ScheduleListItemType1 from '../schedulelist/ScheduleListItemType1';
import LauncherController from "../../LauncherController";
import DataModel from "../../DataModel";
import ButtonSmall from "../ButtonSmall";
import TransitionLinkToArtistPage from "../../transitions/TransitionLinkToArtistPage";

class FocusFragment extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        let offsetY = 105;

        const item:any = LauncherController.getInstance().context.focusedItemData;
        const centerPieceWidth = Dimensions.get('screen').width - (5 + 45 + 35 + 35 + 5)
        const artistData = DataModel.dataArtists[item.artistOne];
        LauncherController.getInstance().context.focusedItemComponent = this;
        const verticalOffsetTitleLength = item.lineCount != undefined ? (item.lineCount * 19) : 19;

        return (
            <>
                <LComponent
                    name="focusItemContainer"
                    style={{
                        position: 'absolute',
                        top: offsetY,
                    }}
                    visualProperties={{ alpha: 0, x: 500, y: 0, z: 0, w: "windowWidth", h: 150 }}
                >

                    <View style={{
                        top: 70,
                        left: (Dimensions.get('screen').width - centerPieceWidth) / 2 + 5
                    }}>

                        <LComponent
                            name={"ScheduleItemFrame1_" + item.id}
                            style={{
                                backgroundColor: '#ffffff',
                                borderColor: '#9F509F',
                                borderLeftWidth: 3,
                                borderRightWidth: 3,
                                borderTopWidth: 0,
                                borderBottomWidth: 3
                            }}
                            visualProperties={{ alpha: 0.68, x: 0, y: 20, h: (145 - 30), w: centerPieceWidth }}
                        />

                        <LComponent
                            name={"ScheduleItemFrame2_" + item.id}
                            style={{
                                backgroundColor: 'transparent',
                                borderColor: '#9F509F',
                                borderLeftWidth: 3,
                                borderRightWidth: 3,
                                borderTopWidth: 20,
                                borderBottomWidth: 0
                            }}
                            visualProperties={{ alpha: 1, x: 0, y: 20, h: (145 - 30), w: centerPieceWidth }}
                        />
                        <LComponent
                            name={"ScheduleItemBoundary_" + item.id}
                            style={{
                                // backgroundColor: 'skyblue'
                            }}
                            visualProperties={{ alpha: 1, x: 0, y: 20, h: (145 - 30), w: centerPieceWidth }}
                        >
                            <Animated.Text allowFontScaling={false} id='textSessionMainTitle' style={{
                                position: 'absolute',
                                top: 26,
                                right: (item.orientation == 'right' ? undefined : (4 + 35)),
                                left: (item.orientation == 'left' ? undefined : (4 + 35)),
                                width: 170,
                                fontFamily: 'DINCondensed-Bold',
                                // backgroundColor: 'indigo',
                                textAlign: (item.orientation == 'right' ? 'left' : 'right'),
                                color: '#58503e',
                                fontSize: 17,
                            }}>
                                {item.sessionMainTitle}
                            </Animated.Text>

                            <Animated.Text allowFontScaling={false} id='textSessionArtistName' style={{
                                position: 'absolute',
                                top: (26 + verticalOffsetTitleLength),
                                right: (item.orientation == 'right' ? undefined : (4 + 35)),
                                left: (item.orientation == 'left' ? undefined : (4 + 35)),
                                height: 22, width: 300,
                                fontFamily: 'Cabin-Regular',
                                letterSpacing: 2.0,
                                // backgroundColor: 'indigo',
                                textAlign: (item.orientation == 'right' ? 'left' : 'right'),
                                color: '#58503e',
                                fontSize: 14,
                            }}>
                                {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
                            </Animated.Text >
                        </LComponent>

                    </View>




                    <LComponent
                        name={"focusItemContent"}
                        style={{}}
                        visualProperties={{ alpha: 0, w: "windowWidth" }}
                    >

                        <Image
                            source={artistData ? artistData.imgSrc : null}
                            style={[{
                                // backgroundColor: 'greenyellow',
                                position: 'absolute',
                                top: 450,
                                right: (item.orientation == 'right' ? -35 : undefined),
                                left: (item.orientation == 'left' ? -35 : undefined),
                                width: 220, height: 220,
                                resizeMode: 'cover'
                            }]}
                        />


                        <Text allowFontScaling={false} id='textLabelArtist' style={{
                            position: 'absolute',
                            top: 180,
                            left: 90,
                            height: 15,
                            // backgroundColor: 'indigo'
                            fontFamily: 'Arcon-Regular',
                            textAlign: 'center',
                            letterSpacing: 1.7,
                            color: '#232323',
                            fontSize: 7,
                        }}>
                            DATE / TIME
                        </Text>


                        <Text allowFontScaling={false} id='textDate' style={{
                            position: 'absolute',
                            top: 195,
                            left: 100,
                            height: 15,
                            fontFamily: 'DINNeuzeitGroteskStd-Light',
                            // backgroundColor: 'indigo'
                            textAlign: 'right',
                            color: '#6b4688',
                            fontSize: 12,
                        }}>
                            {(item.dateString as string).toLocaleUpperCase()}
                        </Text>


                        <Text allowFontScaling={false} id='textTime' style={{
                            position: 'absolute',
                            top: 195,
                            left: 200,
                            height: 15,
                            fontFamily: 'DINNeuzeitGroteskStd-Light',
                            // backgroundColor: 'indigo'
                            textAlign: 'right',
                            color: '#6b4688',
                            fontSize: 12,
                        }}>
                            {(item.time as string).toLocaleUpperCase()}
                        </Text>





                        <Text allowFontScaling={false} id='textLabelArtist' style={{
                            position: 'absolute',
                            top: 230,
                            left: 90,
                            height: 15,
                            // backgroundColor: 'indigo'
                            fontFamily: 'Arcon-Regular',
                            textAlign: 'center',
                            letterSpacing: 1.7,
                            color: '#232323',
                            fontSize: 7,
                        }}>
                            LOCATION
                        </Text>



                        <Text allowFontScaling={false} id='textDate' style={{
                            position: 'absolute',
                            top: 245,
                            left: 100,
                            height: 15,
                            fontFamily: 'DINNeuzeitGroteskStd-Light',
                            // backgroundColor: 'indigo'
                            textAlign: 'right',
                            color: '#6b4688',
                            fontSize: 12,
                        }}>
                            {(item.room as string).toLocaleUpperCase() + " - " + (item.place as string).toLocaleUpperCase()}
                        </Text>

                        <Text allowFontScaling={false} id='textLabelArtist' style={{
                            position: 'absolute',
                            top: 280,
                            left: 90,
                            height: 15,
                            // backgroundColor: 'indigo'
                            fontFamily: 'Arcon-Regular',
                            textAlign: 'center',
                            letterSpacing: 1.7,
                            color: '#232323',
                            fontSize: 7,
                        }}>
                            LEVEL
                        </Text>


                        <Text allowFontScaling={false} id='textDate' style={{
                            position: 'absolute',
                            top: 295,
                            left: 100,
                            height: 15,
                            fontFamily: 'DINNeuzeitGroteskStd-Light',
                            // backgroundColor: 'indigo'
                            textAlign: 'right',
                            color: '#6b4688',
                            fontSize: 12,
                        }}>
                            {'INTERMEDIATE'}
                        </Text>

                        <Text allowFontScaling={false} id='textDescription' style={{
                            position: 'absolute',
                            top: 330,
                            left: 90,
                            height: 15,
                            // backgroundColor: 'indigo'
                            fontFamily: 'Arcon-Regular',
                            textAlign: 'center',
                            letterSpacing: 1.7,
                            color: '#232323',
                            fontSize: 7,
                        }}>
                            SESSION DESCRIPTION
                        </Text>


                        <Text allowFontScaling={false} id='textSessionDescriptiionFocus' style={{
                            position: 'absolute',
                            top: (345),
                            height: 200, width: (centerPieceWidth) / 2,
                            fontFamily: 'Arcon-Regular',
                            letterSpacing: 1,
                            // backgroundColor: 'indigo',
                            right: (item.orientation == 'right' ? undefined : (100)),
                            left: (item.orientation == 'left' ? undefined : (100)),
                            color: '#232323',
                            fontSize: 8.5,
                        }}>
                            {item.sessionDescription ? (item.sessionDescription as string) : "-"}
                        </Text>






                        <Text allowFontScaling={false} id='textLabelArtist' style={{
                            position: 'absolute',
                            top: 450,
                            left: 90,
                            height: 15,
                            // backgroundColor: 'indigo'
                            fontFamily: 'Arcon-Regular',
                            textAlign: 'center',
                            letterSpacing: 1.7,
                            color: '#232323',
                            fontSize: 7,
                        }}>
                            ARTIST INFO
                        </Text>



                        {/* <Text allowFontScaling={false} id='textSessionArtistNameFocus' style={{
                        position: 'absolute',
                        top: (390),
                        left: (Dimensions.get('screen').width - centerPieceWidth) / 2 + 5,
                        height: 22, width: 300,
                        fontFamily: 'Cabin-Regular',
                        letterSpacing: 2.0,
                        // backgroundColor: 'indigo',
                        textAlign: 'left',
                        color: '#232323',
                        fontSize: 16,
                    }}>
                        {item.artistName ? (item.artistName as string).toLocaleUpperCase() : ""}
                    </Text> */}

                        <Text allowFontScaling={false} id='textSessionArtistBioFocus' style={{
                            position: 'absolute',
                            top: (465),
                            height: 200, width: (centerPieceWidth) / 2,
                            fontFamily: 'Arcon-Regular',
                            letterSpacing: 1,
                            textAlign: item.orientation == 'right' ? 'left' : 'right',
                            right: (item.orientation == 'right' ? undefined : (100)),
                            left: (item.orientation == 'left' ? undefined : (100)),
                            color: '#232323',
                            fontSize: 8.5,
                        }}>
                            {artistData ? (artistData.shortBio as string) : ""}
                        </Text>


                        <ButtonSmall
                            name={("focusItemArtistButton")}
                            source={null}
                            style={{
                                position: 'absolute',
                                right: (item.orientation == 'right' ? undefined : (100)),
                                left: (item.orientation == 'left' ? undefined : (100)),
                                top: 545,
                                height: 26, width: 120,
                            }}
                            text={"GO TO ARTIST PAGE"}
                            bgBoxVisible={true}
                            bgBoxStyle={{
                                backgroundColor: '#EF4260',
                                height: 26, width: 120
                            }}
                            fontStyle={{
                                width: 120,
                                fontFamily: 'Cabin-Regular',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                letterSpacing: 2.0,
                                color: '#FFFFFF',
                                fontSize: 8,
                            }}
                            visualProperties={{ alpha: 1 }}
                            onSelect={() => { TransitionLinkToArtistPage(artistData) }}
                        />
                    </LComponent>
                </LComponent>
            </>
        );
    }

    setDataItem(item) {
        this.setState({ dataItem: item });
    }
}

export default FocusFragment;