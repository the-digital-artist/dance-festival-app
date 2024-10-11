import React, { PureComponent } from "react";
import LComponent from "../core/LComponent";
import LText from "../core/LText";
import TweenManager from "../core/LTweenManager";

class ButtonText extends PureComponent<any, any> {
    componentName = null;

    constructor(props) {
        super(props);
        this.componentName = this.props.name == undefined ? "component" + Math.floor(Math.random() * 100000000) : this.props.name;
    }

    render() {
        return (
            <>
                <LComponent
                    style={this.props.style}
                    name={this.props.name}
                    visualProperties={{ alpha: 1 }}
                    onStartShouldSetResponder={(e) => { return this.onStartShouldSetResponder(e) }}
                    onResponderGrant={(e) => { return this.onResponderGrant(e) }}
                    onResponderRelease={(e) => { return this.onResponderRelease(e) }}
                    onResponderTerminate={(e) => { return this.onResponderTerminate(e) }}
                >

                    {this.props.text && (
                        <LText allowFontScaling={false} id={'textButton' + this.props.name}
                            style={this.props.fontStyle}>
                            {this.props.text}
                        </LText>)
                    }
                </LComponent>
            </>
        );
    }

    onStartShouldSetResponder(e) {
        // console.log('onStartShouldSetResponder');
        return true;
    }
    onResponderGrant(e) {
        // console.log('onResponderGrant ' + e.nativeEvent.locationX);
        this.onPressIn();
    }
    onResponderRelease(e) {
        // console.log('onResponderRelease');
        this.onPress();
    }
    onResponderTerminate(e) {
        // console.log('onResponderTerminate');
        this.onPressOut();
    }
    // onMoveShouldSetResponder() {
    //   console.log('onMoveShouldSetResponder');
    //   return false;
    // }
    // onResponderReject() {
    //   console.log('onResponderReject');
    // }
    // onResponderMove(e) {
    //   console.log('onResponderMove ' + e.nativeEvent.locationX);
    // }



    onPressIn() {
        // console.log('onPressIn');
        TweenManager.tween().to(this.componentName, 30, { alpha: 0.34 });
    }

    onPressOut() {
        // console.log('onPressOut');
        TweenManager.tween().to(this.componentName, 0, { alpha: 1.0 });
    }

    onPress() {
        // console.log('onPress');
        TweenManager.tween().to(this.componentName, 0, { alpha: 1.0 });
        if (this.props.onPress == undefined) return;
        this.props.onPress();
    }
}

export default ButtonText;
