import React, { PureComponent } from "react";
import LComponent from "../../core/LComponent";
import { Dimensions, Text } from "react-native";

class UpdateOverlayFragement extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <LComponent

                    name='waitForUpdateCoverSchedule'
                    style={{
                        position: 'absolute',
                        backgroundColor: '#fdface',
                    }}
                    visualProperties={{
                        alpha: 0.5, x: "windowWidth", y: 0, z: 0,  w: "windowWidth", h: "windowHeight"
                    }}
                >
                    <Text allowFontScaling={false} id='textInterruptionScheduleUpdate' style={[{
                        position: 'absolute',
                        top: 350,
                        left: 0,
                        height: 45,
                        width: Dimensions.get('screen').width,
                        fontFamily: 'Cabin-Regular',
                        letterSpacing: 2.0,
                        fontSize: 12,
                        color: '#232323',
                        // backgroundColor: 'skyblue',
                        textAlign: 'center',
                    }]}>
                        {"PARDON THE INTERRUPTION.\nTHERE ARE SCHEDULE UPDATES.\nTHIS SHOULD NOT TAKE LONG..."}
                    </Text>
                </LComponent>
            </>
        );
    }


}

export default UpdateOverlayFragement;