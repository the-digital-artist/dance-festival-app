import React, { PureComponent } from "react";
import { Dimensions, Platform, View } from "react-native";
import LComponent from "../../core/LComponent";
import SchedulerListScreen from "./SchedulerListScreen";
import SchedulerSessionDetailsScreen from "./SchedulerSessionDetailsScreen";

class SchedulerMainScreen extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <LComponent
                    name='schedulerMainScreenContainer'
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

                    <LComponent
                        name='schedulerSelectionScreenContainer'
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
                        <SchedulerListScreen />
                    </LComponent>
                    <LComponent
                        name='schedulerDetailsScreenContainer'
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
                        <SchedulerSessionDetailsScreen />
                    </LComponent>

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
                </LComponent>

            </>
        );
    }
    componentDidMount(): void { }
}

export default SchedulerMainScreen;