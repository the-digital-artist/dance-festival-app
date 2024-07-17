import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { PureComponent } from "react";
import { Dimensions, Platform, View } from "react-native";
import LComponent from "../../core/LComponent";
import ArtistListScreen from "./ArtistListScreen";

class ArtistMainScreen extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {

        const stack = createNativeStackNavigator();
        const headerOptions: any = {
            // headerTitle: (props) => <HeaderNavigator {...props} />
            // title: 'ARTIST PAGES',
            headerBackVisible: true,
            headerBackTitleVisible: false,
            headerTransparent: true,
            headerStyle: {
                backgroundColor: '#EF4260',
                fontFamily: "DINNeuzeitGroteskStd-Light",
                fontWeight: 'bold',
                fontSize: 26,
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
                fontFamily: "DINNeuzeitGroteskStd-Light",
                fontWeight: 'normal',
                fontSize: 26,
            },
        }

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

                    <ArtistListScreen />
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
    componentDidMount(): void { }
}

export default ArtistMainScreen;