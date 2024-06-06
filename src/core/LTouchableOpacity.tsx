import { Component } from "react";
import { Pressable } from "react-native";
import LComponent from "./LComponent";
import TweenManager from "./LTweenManager";

class LTouchableOpacity extends Component<any, any> {
  componentName = null;

  constructor(props) {
    super(props);
    this.componentName = this.props.name == undefined?"component"+Math.floor(Math.random()*100000000):this.props.name;
  }

  render() {
    return (
      <Pressable
        style={this.props.style}
        onPressIn={() => { this.onPressIn() }}
        onPressOut={() => { this.onPressOut() }}
        onPress={() => { this.onPress() }}
      >
        <LComponent
          style={{
            position: 'absolute', left: 0, top: 0
          }}
          visualProperties={{alpha: 1}}
          name={this.props.name}
        >
          {this.props.children}
        </LComponent>
      </Pressable>
    );
  }

  onPressIn() {
    // console.log('onPressIn');
    TweenManager.tween().to(this.componentName, 30, { alpha: 0.34 });
  }

  onPressOut() {
    if (this.props.onPress != undefined) return; //because alpha value is already set in onPress
    // console.log('onPressOut');


    TweenManager.tween().to(this.componentName, 0, { alpha: 1.0 });
  }

  onPress() {
    if (this.props.onPress == undefined) return;
    // console.log('onPress');

    TweenManager.tween().to(this.componentName, 0, { alpha: 1.0 });
    this.props.onPress();
  }
}

export default LTouchableOpacity;