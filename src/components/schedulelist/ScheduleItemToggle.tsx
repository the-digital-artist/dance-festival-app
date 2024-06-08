
import React, { PureComponent } from 'react';
import { Image } from 'react-native';
import LTouchableOpacity from '../../core/LTouchableOpacity';


class ScheduleItemToggle extends PureComponent<any, any> {

    onImg = null;
    offImg = null;

    posXTweenValue = null;
    targetPosXTweenValue = null;

    constructor(props) {
        super(props);

        let initialIsCheckedState = this.props.initialCheckedState!=undefined?this.props.initialCheckedState:false;
        //initially we check the item if the persisted data say so
        this.state = { isChecked: initialIsCheckedState, visible: true };
        this.onImg = this.props.sourceOn;
        this.offImg = this.props.sourceOff
    }

    render() {
        return (
            <>
                <LTouchableOpacity
                    name={this.props.name}
                    style={[this.props.style]}
                    visualProperties={this.props.visualProperties}
                    onPress={() => {this.onSelect()}}
                >
                    <Image
                        style={{
                            top: 0, left: 0, position: 'absolute',
                            width: this.props.style.width, height: this.props.style.height,
                            resizeMode: "contain",
                            opacity: 1
                        }}
                        source={this.state.isChecked === true ? this.onImg : this.offImg}
                    />
                </LTouchableOpacity>
            </>

        );
    }

    onSelect() {
        let newState = !this.state.isChecked;
        this.setState({isChecked: newState})
        if (this.props.onSelect == undefined) return;
        this.props.onSelect(newState);
    }

    updateToggleState(value) {
        // console.log("ScheduleListItemToggle with id: " + this.props.referenceId + ' updateToggleState: ' + value);

        // LauncherController.getInstance().storeData(this.props.referenceId, value);
        this.setState({ isChecked: value })
    }
    // getToggleState() {
    //     return this.state.isChecked
    // }

    updateVisibilityState(value) {
        this.setState({ isVisible: value })
    }
}

export default ScheduleItemToggle;