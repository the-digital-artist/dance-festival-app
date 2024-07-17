import React, { PureComponent, createRef } from "react";
import { Dimensions, FlatList, Platform, Text, View } from "react-native";
import Animated from 'react-native-reanimated';
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import LComponent from "../../core/LComponent";
import TransitionDataModelUpdate from "../../transitions/TransitionDataModelUpdate";
import ScheduleListItem from "../schedulelist/ScheduleListItem";
import TabBar from "../tabbar/TabBar";
import ScreenHeader from "./ScreenHeader";
import { Gesture, GestureDetector, NativeViewGestureHandler } from "react-native-gesture-handler";
import ScreenHomeButton from "./ScreenHomeButton";



class SchedulerScreen extends PureComponent {
    scheduleListArray = [] //{flatListRef: reference, nativeGestureObj: native, data: dataModelList[0] }

    state = {
        selectedTabIndex: 0,
        modelUpdateState: 0, //0-not-initialized, 1-for updating, 2-ready
        dataModelList: null
    }


    constructor(props) {
        super(props);

        LauncherController.getInstance().context.dataDependentComponentSchedulerScreen = this;

        this.state.modelUpdateState = 2;
        this.state.dataModelList = DataModel.dyn_dataScheduleListsByDay;
    }

    render() {
        // console.log("___________SchedulerScreen render ")
        for (let i = 0; i < this.state.dataModelList.length; i++) {
            this.scheduleListArray.push({ flatListRef: createRef(), nativeGestureObj: Gesture.Native(), data: this.state.dataModelList[i].data })
            for (let j = 0; j < this.state.dataModelList[i].data.length; j++) {
                const item = this.state.dataModelList[i].data[j];
                item['refNativeGesture'] = this.scheduleListArray[i].nativeGestureObj;
            }
        }



        let offsetX = 0;
        let offsetY = 141;

        // let focusItem = LauncherController.getInstance().context.focusedItemData;
        // const artistData = DataModel.dataArtists[focusItem.artistOne];


        const selectedDayIndex = LauncherController.getInstance().tabBarIndex

        return (
            <>

                <LComponent
                    name='sessionScreenContainer'
                    style={{
                        position: 'absolute',
                        backgroundColor: '#25649a',
                    }}
                    visualProperties={{
                        alpha: 1.0, x: 'windowWidth', y: 0, z: 0, w: "windowWidth", h: "windowHeight"
                    }}
                >
                    <ScreenHeader
                        text={"WORKSHOP SCHEDULE"}
                        textStyle={{ top: 65 }}
                        color='#FFFFFF'
                        imgSrc={require('../../../assets/header-schedule-bg.png')} />



                    {this.state.modelUpdateState == 2 &&
                        this.scheduleListArray.map((scheduleList, i) => {
                            // console.log(" this.scheduleListArray.map((scheduleList, i) "+scheduleList.data.length);
                            // list = {flatListRef: createRef(), nativeGestureObj: Gesture.Native(), data: this.state.dataModelList[i] }
                            return (
                                <LComponent
                                    key={"scheduleList" + i}
                                    name={'scheduleList' + i}
                                    style={{
                                        position: 'absolute',
                                        backgroundColor: '#25649a',
                                    }}
                                    visualProperties={{
                                        alpha: 1 - Math.max(Math.min(1, i - selectedDayIndex), 0) / 2,
                                        x: (i - selectedDayIndex) * Dimensions.get('screen').width, y: offsetY, z: 0,
                                        w: Dimensions.get('screen').width - offsetX,
                                        h: Dimensions.get('screen').height - offsetY,
                                    }}
                                >

                                    <GestureDetector gesture={scheduleList.nativeGestureObj}>
                                        <FlatList
                                            ref={(list) => { scheduleList.flatListRef = list; }}
                                            style={{
                                                position: 'absolute',
                                                backgroundColor: '#25649a',
                                                left: 0, top: 20,
                                                width: Dimensions.get('screen').width - offsetX,
                                                height: Dimensions.get('screen').height - offsetY - 10,
                                                opacity: 1
                                            }}
                                            data={scheduleList.data}
                                            renderItem={ScheduleListItem}
                                            keyExtractor={item => item.id}
                                        />
                                    </GestureDetector>
                                </LComponent>
                            );
                        })
                    }
                    {/* {this.state.modelUpdateState == 1 && */}




                    <ScreenHeader
                        text={"WORKSHOP SCHEDULE"}
                        textStyle={{ top: 65 }}
                        color='#FFFFFF'
                        imgSrc={require('../../../assets/header-schedule-bg.png')} />
                    <TabBar ></TabBar>
                    <ScreenHomeButton />


                    {(Platform.OS == 'android') &&
                        <View
                            style={{
                                backgroundColor: '#7d7974',
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
        // LauncherController.getInstance().context.sessionListReference = this.flatListRef;
    }

    startModelUpdate() {
        // console.log("___________SchedulerScreen setting state 1");
        this.setState({ modelUpdateState: 1, dataModelList: null })
        TransitionDataModelUpdate();
    }
    finishModelUpdate() {
        // console.log("___________SchedulerScreen finishModelUpdate -  update (state 2)");
        this.setState({ modelUpdateState: 2, dataModelList: DataModel.dyn_dataScheduleListsByDay })
    }
}

export default SchedulerScreen;