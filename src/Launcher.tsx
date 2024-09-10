import React, { PureComponent, ReactNode } from "react";

import * as SplashScreen from 'expo-splash-screen';
import LauncherController from "./LauncherController";

import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavBar from "./components/navbar/NavBar";
import NavBarHighlight from "./components/navbar/NavBarHighlight";
import ArtistMainScreen from "./components/screens/ArtistMainScreen";
import HomeScreen from "./components/screens/HomeScreen";
import LoadingScreen from "./components/screens/LoadingScreen";
import SchedulerMainScreen from "./components/screens/SchedulerMainScreen";
import UpdateOverlayFragement from "./components/screens/UpdateOverlayFragement";
import Eventl from "./core/LEventl";
import StateDependentComponent from "./core/LStateDependentComponent";
import DataModel from "./DataModel";


class Launcher extends PureComponent<any, any> {
    controller: LauncherController = null;

    state = {
        appIsInitialized: false
    };
    s
    constructor(props) {
        super(props)

        SplashScreen.preventAutoHideAsync();
        // ActionUpdatesCheckAndPerform();

        this.controller = LauncherController.getInstance();
        this.controller.view = this;
    }

    public render(): ReactNode {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'transparent' }}>
                    {this.state.appIsInitialized ?
                        <>

                            <StateDependentComponent states={['loading', 'main']} controller={this.controller}>
                                {/* <DetailsScreen /> */}
                                <SchedulerMainScreen />
                                {/* <FocusFragment/> */}
                                <HomeScreen />
                                <ArtistMainScreen />
                                {/* <SettingsScreen /> */}

                                <NavBar highlightRenderer={NavBarHighlight} data={DataModel.getInstance().static.dataComponents.navBar} />
                                {/* <ScreenHeader text="" color='#FFFFFF' /> */}

                                {/* <LoginScreen/> */}
                                <UpdateOverlayFragement />
                            </StateDependentComponent>


                            <StateDependentComponent states={['splash', 'loading']} controller={this.controller}>
                                <LoadingScreen />
                            </StateDependentComponent>
                        </>
                        : null}
                </View>
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

export default Launcher;