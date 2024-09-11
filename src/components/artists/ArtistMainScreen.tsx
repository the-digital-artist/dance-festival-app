import React, { PureComponent } from "react";
import { Dimensions } from "react-native";
import LComponent from "../../core/LComponent";
import ArtistDetailsScreen from "./ArtistDetailsScreen";
import ArtistListScreen from "./ArtistListScreen";

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
                </LComponent>

            </>
        );
    }
    componentDidMount(): void { }
}

export default ArtistMainScreen;