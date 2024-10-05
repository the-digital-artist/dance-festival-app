import React, { PureComponent, createRef } from "react";
import { Dimensions, FlatList, Image, Platform, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import LComponent from "../../core/LComponent";
import TransitionDataModelUpdate from "../../transitions/TransitionDataModelUpdate";
import ScheduleListItem from "../schedulelist/ScheduleListItem";
import TabBar from "../tabbar/TabBar";
import NavBar from "../navbar/NavBar";
import ScreenHeader from "../screens/ScreenHeader";
import ScreenHomeButton from "../screens/ScreenHomeButton";
import IDataDependentComponent from "../../IDataDependentComponent";



class SchedulerListScreen extends PureComponent implements IDataDependentComponent{
    // scheduleListArray = [] //{flatListRef: reference, nativeGestureObj: native, data: dataModelList[0] }

    state = {
        selectedTabIndex: 0,
        modelUpdateState: 0, //0-not-initialized, 1-for updating, 2-ready
        dataModelList: null
    }


    constructor(props) {
        super(props);

        LauncherController.getInstance().context.dataDependentComponents.push(this);

        this.state.modelUpdateState = 2;
        this.state.dataModelList = DataModel.getInstance().dyn_dataScheduleListsByDay;
    }

    render() {
        console.log("___________SchedulerScreen render ")
        let scheduleListArray = []
        if (this.state.dataModelList != null && this.state.modelUpdateState == 2) {
            //{flatListRef: reference, nativeGestureObj: native, data: dataModelList[0] }
            for (let i = 0; i < this.state.dataModelList.length; i++) {
                scheduleListArray.push({ flatListRef: createRef(), nativeGestureObj: Gesture.Native(), data: this.state.dataModelList[i].data })
                for (let j = 0; j < this.state.dataModelList[i].data.length; j++) {
                    const item = this.state.dataModelList[i].data[j];
                    item['refNativeGesture'] = scheduleListArray[i].nativeGestureObj;
                }
            }
        }



        let offsetX = 0;
        // let offsetY = 181;
        let offsetY = 155;


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
                        scheduleListArray.map((scheduleList, i) => {
                            // console.log(" this.scheduleListArray.map((scheduleList, i) "+scheduleList.data.length);
                            // list = {flatListRef: createRef(), nativeGestureObj: Gesture.Native(), data: this.state.dataModelList[i] }
                            return (
                                <LComponent
                                    key={"scheduleList" + i}
                                    name={'scheduleList' + i}
                                    style={{
                                        position: 'absolute',
                                        // backgroundColor: '#25649a',
                                        opacity: 0.5
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
                                            width: Dimensions.get('screen').width - offsetX,
                                            height: Dimensions.get('screen').height - offsetY,
                                            backgroundColor: '#25649a',
                                            opacity: 0.7
                                        }}
                                    />

                                        <FlatList
                                            ref={(list) => { scheduleList.flatListRef = list; }}
                                            style={{
                                                position: 'absolute',
                                                // backgroundColor: '#25649a',
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
                                        />
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
                    <TabBar offsetY={115} ></TabBar>
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
        this.setState({ modelUpdateState: 2, dataModelList: DataModel.getInstance().dyn_dataScheduleListsByDay })
    }
}

export default SchedulerListScreen;