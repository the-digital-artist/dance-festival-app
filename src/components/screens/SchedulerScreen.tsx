import React, { PureComponent, createRef } from "react";
import { Dimensions, Platform, Text, View } from "react-native";
import Animated from 'react-native-reanimated';
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import LComponent from "../../core/LComponent";
import TransitionDataModelUpdate from "../../transitions/TransitionDataModelUpdate";
import ScheduleListItem from "../schedulelist/ScheduleListItem";
import TabBar from "../tabbar/TabBar";
import ScreenHeader from "./ScreenHeader";



class SchedulerScreen extends PureComponent {
    flatListRef: any[] = [];
    state = {
        selectedTabIndex: 0,

        modelUpdateState: 0, //0-not-initialized, 1-for updating, 2-ready
        dataModelList: null
    }


    constructor(props) {
        super(props);

        LauncherController.getInstance().context.dataDependentComponentSchedulerScreen = this;

        this.state.modelUpdateState = 2;
        this.state.dataModelList = DataModel.dataScheduleListsByDay;
    }

    render() {
        // console.log("___________SchedulerScreen render ")
        for (let i = 0; i < 1; i++) {
            this.flatListRef.push(createRef())
        }

        let offsetX = 0;
        let offsetY = 132;

        // let focusItem = LauncherController.getInstance().context.focusedItemData;
        // const artistData = DataModel.dataArtists[focusItem.artistOne];


        const selectedDayIndex = LauncherController.getInstance().tabBarIndex

        return (
            <>

                <LComponent
                    name='sessionScreenContainer'
                    style={{
                        position: 'absolute',
                        backgroundColor: '#64615f',
                    }}
                    visualProperties={{
                        alpha: 1.0, x: 'windowWidth', y: 0, z: 0, w: "windowWidth", h: "windowHeight"
                    }}
                >



                    {this.state.modelUpdateState == 2 &&
                        this.state.dataModelList.map((list, i) => {
                            return (
                                <LComponent
                                    key={"scheduleList" + i}
                                    name={'scheduleList' + i}
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: '#f8f6d3',
                                    }}
                                    visualProperties={{
                                        alpha: 1 - Math.max(Math.min(1, i - selectedDayIndex), 0) / 2,
                                        x: (i - selectedDayIndex) * Dimensions.get('screen').width, y: offsetY, z: 0,
                                        w: Dimensions.get('screen').width - offsetX,
                                        h: Dimensions.get('screen').height - offsetY,
                                    }}
                                >
                                    {/* <GestureDetector gesture={Gesture.Native()}> */}


                                    <Animated.FlatList
                                        ref={(list) => this.flatListRef[i] = list}
                                        style={{
                                            position: 'absolute',
                                            backgroundColor: '#f8f6d3',
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
                    {/* {this.state.modelUpdateState == 1 && */}




                    <TabBar ></TabBar>
                    <ScreenHeader text={"WORKSHOP SCHEDULE"} color='#f8f6d3' />
                    {(Platform.OS == 'android') &&
                        <View
                            style={{
                                backgroundColor: '#FBB03A',
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
        // console.log("___________SchedulerScreen componentDidMount");
        LauncherController.getInstance().context.sessionListReference = this.flatListRef;
    }

    startModelUpdate() {
        // console.log("___________SchedulerScreen setting state 1");
        this.setState({ modelUpdateState: 1, dataModelList: null })
        TransitionDataModelUpdate();
    }
    finishModelUpdate() {
        // console.log("___________SchedulerScreen finishModelUpdate -  update (state 2)");
        this.setState({ modelUpdateState: 2, dataModelList: DataModel.dataScheduleListsByDay })
    }
}

export default SchedulerScreen;