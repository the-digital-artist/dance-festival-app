import { PureComponent } from "react";
import { Pressable, View } from "react-native";
import LComponent from "./LComponent";
import TweenManager from "./LTweenManager";

class LTouchableOpacity extends PureComponent<any, any> {
  componentName = null;

  constructor(props) {
    super(props);
    this.componentName = this.props.name == undefined ? "component" + Math.floor(Math.random() * 100000000) : this.props.name;
  }

  render() {
    return (
      <View style={
        // [
        this.props.style
        //  { backgroundColor: 'skyblue' }
        // ]
      }
        onStartShouldSetResponder={(e) => { return this.onStartShouldSetResponder(e) }}
        onResponderGrant={(e) => { return this.onResponderGrant(e) }}
        onResponderRelease={(e) => { return this.onResponderRelease(e) }}
        onResponderTerminate={(e) => { return this.onResponderTerminate(e) }}
      // onMoveShouldSetResponder={() => { return this.onMoveShouldSetResponder() }}
      // onResponderReject={() => { return this.onResponderReject() }}
      // onResponderMove={(e) => { return this.onResponderMove(e) }}
      >


        <LComponent
          style={{
            position: 'absolute', left: 0, top: 0
          }}
          visualProperties={{ alpha: 1 }}
          name={this.props.name}
        >
          {this.props.children}
        </LComponent>
      </View>
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
    // if (this.props.onPress != undefined) return; //because alpha value is already set in onPress
    TweenManager.tween().to(this.componentName, 0, { alpha: 1.0 });
  }

  onPress() {

    // console.log('onPress');
    TweenManager.tween().to(this.componentName, 0, { alpha: 1.0 });
    if (this.props.onPress == undefined) return;
    this.props.onPress();
  }
}

export default LTouchableOpacity;