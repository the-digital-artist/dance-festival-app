
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Animated, Dimensions, Pressable } from 'react-native';
import DataModel from '../DataModel';
import LauncherController from '../LauncherController';
import ActionOnSessionSelection from '../ActionOnSessionSelection';


class ScheduleListItemToggle extends Component {

    onImg = null;
    offImg = null;

    posXTweenValue = null;
    targetPosXTweenValue = null;

    constructor(props) {
        super(props);

        //initially we check the item if the persisted data say so
        this.state = { isChecked: false, isVisble: true };
        this.onImg = require('../assets/icon_fav_active.png');
        this.offImg = require('../assets/icon_fav_inactive.png');

        //animations
        this.targetPosXTweenValue = props.isRightAligned ? 0 : 0;
        this.posXTweenValue = new Animated.Value(this.state.isChecked ? 0 : this.targetPosXTweenValue)
        this.state.isVisble =  !this.props.initiallyHidden;

    }

    render() {
        let buttonOffset = 150;
        let rightValue = this.props.isRightAligned ? buttonOffset : undefined;
        let leftValue = this.props.isRightAligned ? undefined : buttonOffset;
       


        return (
            
            <View style={{
                // backgroundColor: 'forestgreen',
                opacity:this.state.isVisble == true ? 1:0,
                position: 'absolute',
                top: 45,
                left: leftValue, right: rightValue,
                height: 25,
                width: 25,
            }}>

                    <Animated.Image
                        source={this.state.isChecked === true ? this.onImg : this.offImg}
                        style={{
                            // backgroundColor: 'greenyellow',
                            position: 'absolute',
                            top: 0,
                            height: 25,
                            width: 25,
                            resizeMode: 'cover'
                        }}
                    />

            </View>
        );
    }

    updateToggleState(value) {
        // console.log("ScheduleListItemToggle with id: " + this.props.referenceId + ' updateToggleState: ' + value);

        LauncherController.getInstance().storeData(this.props.referenceId, value);
        this.setState({ isChecked: value })
    }

    updateVisibilityState(value) {
        if(this.props.initiallyHidden) return;
        this.setState({ isVisble: value })
        // Animated.timing(this.posXTweenValue, {
        //     delay: 0,
        //     toValue: value == true ? 1 : 0,
        //     easing: Easing.quad,
        //     duration: 240,
        //     useNativeDriver: true,
        // }).start();
    }
}

export default ScheduleListItemToggle;