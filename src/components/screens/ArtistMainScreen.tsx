import React, { PureComponent } from "react";
import ArtistListScreen from "./ArtistListScreen";
import LComponent from "../../core/LComponent";
import { Dimensions, Platform, View } from "react-native";
import ArtistDetailsScreen from "./ArtistDetailsScreen";
import LauncherController from "../../LauncherController";
import ScreenHeader from "./ScreenHeader";
import HeaderNavigator from "./HeaderNavigator";


class ArtistMainScreen extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {

        // const stack = createNativeStackNavigator();
        // const headerOptions: any = {
        //     // headerTitle: (props) => <HeaderNavigator {...props} />
        //     // title: 'ARTIST PAGES',
        //     headerBackVisible: true,
        //     headerBackTitleVisible: false,
        //     headerTransparent: true,
        //     headerStyle: {
        //         backgroundColor: '#3f414d',
        //         fontFamily: "RobotoCondensed-Regular",
        //         fontWeight: 'bold',
        //         fontSize: 26,
        //     },
        //     headerTintColor: '#ffffff',
        //     headerTitleStyle: {
        //         fontFamily: "RobotoCondensed-Regular",
        //         fontWeight: 'normal',
        //         fontSize: 26,
        //     },
        // }

        return (
            <>
                <LComponent
                    name='artistsMainScreenContainer'
                    style={{
                        position: 'absolute',
                        backgroundColor: '#000000',
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height,
                    }}
                    visualProperties={{
                        alpha: 1,
                        x: Dimensions.get('screen').width, y: 0, z: 0
                    }}
                >

                    <LComponent
                        name='artistsSelectionScreenContainer'
                        style={{
                            position: 'absolute',
                            backgroundColor: '#000000',
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').height,
                        }}
                        visualProperties={{
                            alpha: 1,
                            x: 0, y: 0, z: 0
                        }}
                    >
                        <ArtistListScreen />
                    </LComponent>
                    <LComponent
                        name='artistsDetailsScreenContainer'
                        style={{
                            position: 'absolute',
                            backgroundColor: '#dd5163',
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').height,
                        }}
                        visualProperties={{
                            alpha: 0,
                            x: Dimensions.get('screen').width, y: 0, z: 0
                        }}
                    >
                        <ArtistDetailsScreen />
                    </LComponent>
                    {/* <NavigationContainer>
                        <stack.Navigator>
                            <stack.Screen name="ARTIST PAGES" component={ArtistListScreen}
                                options={headerOptions}
                            />
                            <stack.Screen name="ARTIST DETAILS" component={ArtistDetailsScreen}
                                options={headerOptions} />
                        </stack.Navigator>
                    </NavigationContainer> */}

                    {(Platform.OS == 'android') &&
                        <View
                            style={{
                                backgroundColor: '#EF4260',
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
    componentDidMount(): void { }
}

export default ArtistMainScreen;