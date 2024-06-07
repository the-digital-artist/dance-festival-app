import React, { PureComponent, createRef } from "react";
import { Dimensions, View } from "react-native";
import Animated from 'react-native-reanimated';
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import LComponent from "../../core/LComponent";
import ScheduleListItem from "../schedulelist/ScheduleListItem";
import TabBar from "../tabbar/TabBar";
import ScreenHeader from "./ScreenHeader";



class SchedulerScreen extends PureComponent {
    flatListRef: any[] = [];

    constructor(props) {
        super(props);

    }

    render() {
        // let scheduleData = DataModel.dataScheduleListsByDay[0].data;
        for (let i = 0; i < 1; i++) {
            this.flatListRef.push(createRef())
        }

        let offsetX = 0;
        let offsetY = 132;

        let focusItem = LauncherController.getInstance().context.focusedItemData;
        const artistData = DataModel.dataArtists[focusItem.artistOne];

        return (
            <>

                <LComponent
                    name='sessionScreenContainer'
                    style={{
                        position: 'absolute',
                        backgroundColor: '#fbc46c',
                    }}
                    visualProperties={{
                        alpha: 1.0, x: 'windowWidth', y: 0, z: 0, w: "windowWidth", h: "windowHeight"
                    }}
                >
    

                    {
                        DataModel.dataScheduleListsByDay.map((list, i) => {
                            return (
                                <LComponent
                                    key={"scheduleList" + i}
                                    name={'scheduleList' + i}
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: '#FBB03A',
                                    }}
                                    visualProperties={{
                                        alpha: 1,
                                        x: i * Dimensions.get('screen').width, y: offsetY, z: 0,
                                        w: Dimensions.get('screen').width - offsetX,
                                        h: Dimensions.get('screen').height - offsetY,
                                    }}
                                >
                                    {/* <GestureDetector gesture={Gesture.Native()}> */}


                                    <Animated.FlatList
                                        ref={(list) => this.flatListRef[i] = list}
                                        style={{
                                            position: 'absolute',
                                            backgroundColor: '#FBB03A',
                                            left: 0, top: 20,
                                            width: Dimensions.get('screen').width - offsetX,
                                            height: Dimensions.get('screen').height - offsetY - 10,
                                            opacity: 1
                                        }}
                                        data={list.data}
                                        renderItem={ScheduleListItem}
                                        keyExtractor={item => item.id}
                                    />
                                    {/* </GestureDetector> */}
                                </LComponent>
                            );
                        })
                    }

                    <TabBar ></TabBar>
                    <ScreenHeader text="FESTIVAL PROGRAM" color='#FBB03A' />
                    <View
                        style={{
                            backgroundColor: '#9F509F',
                            bottom: (Dimensions.get('screen').width * (300 / 1290))/2-1, left: 0, position: 'absolute',
                            width: Dimensions.get('screen').width,
                            height: (Dimensions.get('screen').width * (300 / 1290)),
                            opacity: 0.9
                        }} />
                </LComponent>

            </>
        );
    }
    componentDidMount(): void {
        LauncherController.getInstance().context.sessionListReference = this.flatListRef;
    }
}

export default SchedulerScreen;