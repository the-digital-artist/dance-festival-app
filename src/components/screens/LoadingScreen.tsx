import React, { PureComponent } from "react";
import { Dimensions, Image, Platform } from "react-native";
import LComponent from "../../core/LComponent";
import LVideoPlayback from "../../core/LVideoPlayback";

class LoadingScreen extends PureComponent<any, any> {

    constructor({ props, children = null }) {
        super(props);
    }


    render() {
        // console.log('render LoadingScreen');
        let videoOffsetX = 0;

        return (
            <LComponent
                name='loadingScreenContainer'
                style={{ position: 'absolute' }}
                visualProperties={{ alpha: 1, x: 0, y: 0, z: 0, w: "windowWidth", h: "windowHeight" }}>

                <Image
                    style={{
                        position: 'absolute', top: Platform.OS == "ios" ? 0 : -12,
                        width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
                        resizeMode: "cover",
                    }}
                    source={require('../../../assets/splash.png')}
                />
                <LComponent
                    name="loadingImage"
                    pointerEvents="none"
                    style={{
                        position: 'absolute', left: 0, top: 0
                    }}
                    visualProperties={{
                        alpha: 0,
                    }}
                >
                    <Image
                        style={{
                            position: 'absolute', top: Platform.OS == "ios" ? 0 : -12,
                            width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
                            resizeMode: "cover",
                        }}
                        source={require('../../../assets/welcome.png')}
                    />
                   
                </LComponent>
            </LComponent>

        );
    }
}

export default LoadingScreen;