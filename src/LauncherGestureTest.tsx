import React, { PureComponent, ReactNode } from "react";

import * as SplashScreen from 'expo-splash-screen';
import LauncherController from "./LauncherController";

import { Dimensions, FlatList, Text, View } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Eventl from "./core/LEventl";


class LauncherGestureTest extends PureComponent<any, any> {
    controller: LauncherController = null;

    state = {
        appIsInitialized: false
    };
    s
    constructor(props) {
        super(props)
        this.controller = LauncherController.getInstance();
        this.controller.view = this;

        SplashScreen.preventAutoHideAsync();

    }


    public render(): ReactNode {

        const native = Gesture.Native();
        native.onBegin(() => {
            console.log('Gesture.Native.onBegin');
        })


        const data = [
            { id: 1201, group: [1201, 1202, 1203, 1204, 1205], groupTitle: '', groupSubtitle: 'Browse Rooms:', itemType: 'type1', flagIncludeInNow: false, artistName: 'Alex Toledo', sessionMainTitle: 'Choreography & Interpretation', shortMainTitle: '', dateString: 'Sat, July 20th 2024', time: '11:00 - 12:00', room: `Room 01`, level: `1`, partnerWork: ``, levelSpecial: ``, startTime: '2024-07-20T11:00', endTime: '2024-06-14T12:00', floor: '', sessionSubtitle: '', sessionDescription: '', artistOne: 'Alexandra Toledo', artistTwo: '', flag: false },
            { id: 1202, group: [1201, 1202, 1203, 1204, 1205], groupTitle: '', groupSubtitle: '', itemType: 'type1', flagIncludeInNow: false, artistName: 'Alexander Carbó', sessionMainTitle: 'Afro-Conte﻿mporary', shortMainTitle: '', dateString: 'Sat, July 20th 2024', time: '11:00 - 12:00', room: `Room 02`, level: `0`, partnerWork: ``, levelSpecial: ``, startTime: '2024-07-20T11:00', endTime: '2024-06-14T12:00', floor: '', sessionSubtitle: '', sessionDescription: '', artistOne: 'Alexander Carbo', artistTwo: '', flag: true },
            { id: 1203, group: [1201, 1202, 1203, 1204, 1205], groupTitle: '', groupSubtitle: '', itemType: 'type1', flagIncludeInNow: false, artistName: 'Lynet', sessionMainTitle: 'Técnica Yoruba', shortMainTitle: '', dateString: 'Sat, July 20th 2024', time: '11:00 - 12:00', room: `Room 03`, level: `0`, partnerWork: ``, levelSpecial: ``, startTime: '2024-07-20T11:00', endTime: '2024-06-14T12:00', floor: '', sessionSubtitle: '', sessionDescription: '', artistOne: 'Lynet Rubio', artistTwo: '', flag: true },
            { id: 1204, group: [1201, 1202, 1203, 1204, 1205], groupTitle: '', groupSubtitle: '', itemType: 'type1', flagIncludeInNow: false, artistName: 'Silvio & Angela', sessionMainTitle: 'Rumba Guaguanco', shortMainTitle: '', dateString: 'Sat, July 20th 2024', time: '11:00 - 12:00', room: `Room 04`, level: `2`, partnerWork: `1`, levelSpecial: `1`, startTime: '2024-07-20T11:00', endTime: '2024-06-14T12:00', floor: '', sessionSubtitle: '', sessionDescription: '', artistOne: 'Silvio Perez', artistTwo: 'Angela Jauregui', flag: true },
            { id: 1205, group: [1201, 1202, 1203, 1204, 1205], groupTitle: '', groupSubtitle: '', itemType: 'type1', flagIncludeInNow: false, artistName: 'Sassan', sessionMainTitle: 'Rueda Técnica', shortMainTitle: '', dateString: 'Sat, July 20th 2024', time: '11:00 - 12:00', room: `Room 05`, level: `0`, partnerWork: ``, levelSpecial: ``, startTime: '2024-07-20T11:00', endTime: '2024-06-14T12:00', floor: '', sessionSubtitle: '', sessionDescription: '', artistOne: 'Sassan Alivaliollahi', artistTwo: '', flag: true },

        ]
        const ListItem = ({ item, index }) => {

            const pan = Gesture.Pan();
            pan.onBegin(() => {
                console.log('Gesture.Pan.onBegin');
            })
            pan.simultaneousWithExternalGesture(native)

            return (
                <GestureDetector gesture={pan}>
                    <View style={{
                        borderColor: '#232323',
                        borderWidth: 1,
                        width: Dimensions.get('screen').width,
                        height: 100,
                        backgroundColor: 'skyblue'
                    }} >
                        <Text>Index: {index}</Text>
                    </View>
                </GestureDetector>
            )
        }
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <GestureDetector gesture={native}>
                    <FlatList style={{
                        borderColor: '#232323',
                        borderWidth: 1,
                        top: 100,
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height - 100,
                        backgroundColor: 'black'
                    }}

                        data={data}
                        renderItem={ListItem}

                    />
                </GestureDetector>
            </GestureHandlerRootView>

        );
    }

    public componentDidMount() {
        (async () => {
            await this.controller.initialize()
            this.setState({ appIsInitialized: true })
            await SplashScreen.hideAsync();
            this.controller.processEvent(new Eventl("initComplete"));
        })();
    }

    public updateState(newStateName: string): void {
        this.setState({ appIsInitialized: true, currentState: newStateName });
        // console.log("update newState______" + JSON.stringify(newStateName, null, 2))
    }
    public componentWillUnmount() { }
}



export default LauncherGestureTest;