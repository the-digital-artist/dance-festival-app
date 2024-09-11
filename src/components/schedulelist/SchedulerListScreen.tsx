import React, { PureComponent, createRef } from "react";
import { Dimensions, Image, SectionList, View } from "react-native";
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



class SchedulerListScreen extends PureComponent {
    // scheduleListArray = [] //{flatListRef: reference, nativeGestureObj: native, data: dataModelList[0] }

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
        // let offsetY = 181;
        let offsetY = 165;


        // let focusItem = LauncherController.getInstance().context.focusedItemData;
        // const artistData = DataModel.getInstance().static.dataArtists[focusItem.artistOne];


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

                        // const dataSectionsForCurrentTab = [];
                        // console.log(" scheduleListPerTabArray.map((scheduleList, i)" + i)
                        // console.log(" scheduleListPerTabMapping2[i]" + (scheduleListPerTabMapping2[i] == undefined))

                        // for (let r = 0; r < scheduleListPerTabMapping2[i].length; r++) {
                        //     let idx = scheduleListPerTabMapping2[i][r];
                        //     dataSectionsForCurrentTab.push(DataModel.getInstance().dyn_dataScheduleListsBySection[idx])
                        // }

                        // console.log(" this.scheduleListArray.map((scheduleList, i) "+scheduleList.data.length);
                        // list = {flatListRef: createRef(), nativeGestureObj: Gesture.Native(), data: this.state.dataModelList[i] }
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


                                {/* <GestureDetector gesture={scheduleList.nativeGestureObj}> */}
                                    <SectionList
                                        ref={(list) => { scheduleList.flatListRef = list; }}
                                        style={{
                                            // backgroundColor: '#25649a',
                                            // borderTopWidth: 2,
                                            // borderColor:'#c75e2c',
                                            left: 0, top: 0,
                                            width: Dimensions.get('screen').width - offsetX,
                                            height: Dimensions.get('screen').height - offsetY - 10,
                                            opacity: 1
                                        }}
                                        sections={scheduleList.data}
                                        keyExtractor={item => item.id}
                                        renderItem={ScheduleListItem}
                                        renderSectionHeader={ScheduleListSectionRenderer}
                                        renderSectionFooter={({section: {title}}) => (
                                            <View style={{
                                                height: 10
                                            }} />
                                        )}
                                        ListFooterComponent={() => (
                                            <View style={{
                                                height: NavBar.navBarHeight + 170
                                            }} />
                                        )}

                                    />

                                    {/* <FlatList
                                            ref={(list) => { scheduleList.flatListRef = list; }}
                                            style={{
                                                // backgroundColor: '#25649a',
                                                // borderTopWidth: 2,
                                                // borderColor:'#c75e2c',
                                                left: 0, top: 20,
                                                width: Dimensions.get('screen').width - offsetX,
                                                height: Dimensions.get('screen').height - offsetY - 10,
                                                opacity: 1
                                            }}
                                            data={scheduleList.data}
                                            renderItem={ScheduleListItem}
                                            keyExtractor={item => item.id}
                                            ListFooterComponent={() => (
                                                <View style={{ 
                                                    height:NavBar.navBarHeight+50}}/>
                                            )}
                                        /> */}
                                {/* </GestureDetector> */}
                            </LComponent>
                        );
                    })
                }
                {/* {this.state.modelUpdateState == 1 && */}




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
                {/* <TextInput
                        style={{
                            top: 100,
                            left: 25,
                            height: 35,
                            width: Dimensions.get('screen').width - 50,
                            padding: 10,
                            backgroundColor: '#1c1919',
                            borderWidth: 1,
                            borderColor: "#3f3b4a",
                            color: '#FFFFFF',
                            fontFamily: 'Cabin-Regular',
                            textAlignVertical: 'center',
                            letterSpacing: 2.0,
                            fontSize: 12,
                            opacity: 0.7

                        }}
                        clearButtonMode={'while-editing'}
                        placeholder="SEARCH SESSSIONS"
                        onChangeText={(searchText) => {
                            console.log("TextInput Change" + searchText)
                            // this.setState({
                            //     searchTextInput: searchText,
                            //     modelUpdateState: 2,
                            //     dataModelList: DataModel.getInstance().dyn_dataScheduleListsByDay
                            // })
                        }}
                        defaultValue={""}
                    /> */}

                {/* {(Platform.OS == 'android') &&
                    <View
                        style={{
                            backgroundColor: '#7d7974',
                            bottom: (Dimensions.get('screen').width * (300 / 1290)) / 2 - 1, left: 0, position: 'absolute',
                            width: Dimensions.get('screen').width,
                            height: (Dimensions.get('screen').width * (300 / 1290)),
                            opacity: 0.8
                        }} />
                } */}
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