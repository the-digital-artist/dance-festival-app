import React, { PureComponent, createRef } from "react";
import { Dimensions, Image, SectionList, Text, View } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import LComponent from "../../core/LComponent";
import LText from "../../core/LText";
import TransitionDataModelUpdate from "../../transitions/TransitionDataModelUpdate";
import NavBar from "../navbar/NavBar";
import ScheduleListItem from "../schedulelist/ScheduleListItem";
import ScheduleListSectionRenderer from "../schedulelist/ScheduleListSectionRenderer";
import ScreenHeader from "../screens/ScreenHeader";
import ScreenHomeButton from "../screens/ScreenHomeButton";
import TabBar from "../tabbar/TabBar";
import { FlashList } from "@shopify/flash-list";
import SchedulerListComponent from "./SchedulerListComponent";



class SchedulerListScreen extends PureComponent<any, any> {
    state = {
        selectedTabIndex: 0,
        modelUpdateState: 0, //0-not-initialized, 1-for updating, 2-ready
        dataModelList: null
    }


    descriptions = []
    constructor(props) {
        super(props);

        LauncherController.getInstance().context.dataDependentComponentSchedulerScreen = this;
        this.descriptions = DataModel.getInstance().static.dataComponents.schedulerTabDescriptions;

        this.state.modelUpdateState = 2;
        this.state.dataModelList = DataModel.getInstance().dyn_dataScheduleListsBySection;
    }

    render() {
        // console.log("___________SchedulerScreen render ")
        const scheduleListPerTabMapping = {
            'Opening': 0,
            'Main Fair': 0,
            'Closing': 0,
            'Group Classes, Conversations, Outside': 1,
            'Massages': 2,
            'Crafty Corner': 3,
        }
        const scheduleListPerTabMapping2 = {
            0: [0, 1, 2],
            1: [3],
            2: [4],
            3: [5],
        }

        let scheduleListPerTabArray = []
        if (this.state.dataModelList != null && this.state.modelUpdateState == 2) {
            let i = 0;
            for (let s in scheduleListPerTabMapping2) {
                const dataSectionsForCurrentTab = [];
                if (scheduleListPerTabMapping2[i] == undefined) return null;

                for (let r = 0; r < scheduleListPerTabMapping2[i].length; r++) {
                    let idx = scheduleListPerTabMapping2[i][r];
                    dataSectionsForCurrentTab.push(DataModel.getInstance().dyn_dataScheduleListsBySection[idx])
                }
                scheduleListPerTabArray.push(
                    {
                        flatListRef: createRef(),
                        nativeGestureObj: Gesture.Native(),
                        data: dataSectionsForCurrentTab
                    })
                for (let j = 0; j < this.state.dataModelList[i].data.length; j++) {
                    const item = this.state.dataModelList[i].data[j];
                    item['refNativeGesture'] = scheduleListPerTabArray[i].nativeGestureObj;
                }
                i++;
            }
        }

        let offsetX = 0;
        let offsetY = 165;

        const selectedDayIndex = LauncherController.getInstance().tabBarIndex

        return (
            <>

                <Image
                    style={{
                        // backgroundColor: 'skyblue',
                        top: 0, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height,
                        resizeMode: "cover",
                        opacity: 1.0
                    }}
                    source={require('../../../assets/screen-scheduler-bg.png')}
                />

                {this.state.modelUpdateState == 2 &&
                    scheduleListPerTabArray.map((scheduleList, i) => {
                        return (
                            <LComponent
                                key={"scheduleList" + i}
                                name={'scheduleList' + i}
                                style={{
                                    position: 'absolute',
                                    // backgroundColor: '#25649a',
                                    opacity: 1.0
                                }}
                                visualProperties={{
                                    alpha: 1 - Math.max(Math.min(1, i - selectedDayIndex), 0) / 2,
                                    x: (i - selectedDayIndex) * Dimensions.get('screen').width,
                                    y: offsetY, z: 0,
                                    w: Dimensions.get('screen').width - offsetX,
                                    h: Dimensions.get('screen').height - offsetY,
                                }}
                            >
                                <View
                                    style={{
                                        position: 'absolute',
                                        borderTopWidth: 6,
                                        borderBottomWidth: 6,
                                        borderColor: '#c75e2c',
                                        width: Dimensions.get('screen').width - offsetX,
                                        height: Dimensions.get('screen').height - offsetY,
                                        backgroundColor: '#cbb7b8',
                                        opacity: 1.0
                                    }}
                                />
                                <LText
                                    style={{
                                        top: 6,
                                        color: '#231e28',
                                        fontFamily: 'Cabin-Regular',
                                        letterSpacing: 1.2,
                                        textAlign: 'justify',
                                        backgroundColor: '#d6b6a9',
                                        padding: Dimensions.get('screen').width * 0.06,
                                        opacity: 0.8
                                    }}>
                                    {this.descriptions[i]}
                                </LText>

                                <SchedulerListComponent
                                    data={scheduleList.data}
                                    style={{
                                        left: 0, top: 0,
                                        width: Dimensions.get('screen').width - offsetX,
                                        height: Dimensions.get('screen').height - offsetY - 10,
                                        opacity: 1
                                    }} />

                            </LComponent>
                        );
                    })
                }

                <ScreenHeader
                    text={"SCHEDULE"}
                    textStyle={{ top: 65 }}
                    color='#FFFFFF'
                    imgSrc={require('../../../assets/header-schedule-bg.png')} />

                <TabBar
                    offsetY={115}
                    data={DataModel.getInstance().static.dataComponents.schedulerTabBar}
                />

                <ScreenHomeButton />
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
        this.setState({ modelUpdateState: 2, dataModelList: DataModel.getInstance().dyn_dataScheduleListsBySection })
    }
}

export default SchedulerListScreen;