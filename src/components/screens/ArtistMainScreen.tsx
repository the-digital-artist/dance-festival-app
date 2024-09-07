import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { PureComponent } from "react";
import { Dimensions, Platform, View } from "react-native";
import LComponent from "../../core/LComponent";
import ArtistListScreen from "./ArtistListScreen";
import ArtistDetailsScreen from "./ArtistDetailsScreen";

class ArtistMainScreen extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
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