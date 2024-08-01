import { useState, useEffect } from "react";

import { View, Dimensions, SectionList, SafeAreaView, Alert } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import DataModel from '../DataModel';

import ScheduleList from "./ScheduleList";
import LauncherController from "../LauncherController";

const _navigation = null;

const SchedulePlannerScreen = ({ navigation }) => {
    
    LauncherController.getInstance().navigator = navigation;
    this._navigation = navigation;
    let offsetX = 0;
    let offsetY = 10;
    let scheduleData = DataModel.dataScheduleWithSections;

    // console.log("HomeScreen:\n\n");
    // console.log(JSON.stringify(data, null, 2));


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
            <View
                style={{
                    left: 0, top: 0, position: 'absolute',
                    // backgroundColor: 'red',
                    width: offsetX, height: Dimensions.get('window').height
                }}
            ></View>

            <View
                style={{
                    left: offsetX, top: 0, position: 'absolute',
                    // backgroundColor: 'red',
                    width: Dimensions.get('window').width - offsetX, height: offsetY
                }}
            ></View>

            <ScheduleList
                dataModel={scheduleData}
                style={{
                    // backgroundColor: 'pink',
                    left: offsetX, top: offsetY + 0,
                    width: Dimensions.get('window').width - offsetX
                }}
            >

            </ScheduleList>
        </SafeAreaView>
    );
};

export default SchedulePlannerScreen
