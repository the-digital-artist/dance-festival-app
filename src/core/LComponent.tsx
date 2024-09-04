import { PureComponent } from "react";
import { Animated, Dimensions } from "react-native";
import TweenManager from "./LTweenManager";

class LComponent extends PureComponent<any, any> {
    _firstRun = true;
    _viewRef = null;
    _processedStyle = null;

    propertyValues = {};
    propertyValuesInit = {};

    globalPerspectiveValue = 850;

    componentName = null;

    constructor(props) {
        super(props);
    }

    render() {
        // console.log("render LComponent **************************" + this.props.name)
        if (this._firstRun) {
            if (this.props.style == undefined) return;
            if (this.props.style['transform'] == undefined) this.props.style['transform'] = [];
            // if (this.props.visualProperties == undefined) this.props[visualProperties = {};

            for (let key in this.props.visualProperties) {
                // console.log("LComponent " + this.props.name + " - visualProperties.................................." + key)
                let initialValue = this.props.visualProperties[key]
                if (initialValue == "windowWidth") initialValue = Dimensions.get('screen').width;
                if (initialValue == "windowHeight") initialValue = Dimensions.get('screen').height;

                this.propertyValuesInit[key] = initialValue;

                let dynamicValue = null;
                if (key == 'x' || key == 'y') {
                    dynamicValue = new Animated.Value((initialValue));
                    let equivalentStyleName = "translate" + key.toUpperCase();
                    this.props.style['transform'].push({ [equivalentStyleName]: dynamicValue });
                } else if (key == 'z') {
                    let perspective = new Animated.Value(this.globalPerspectiveValue);
                    dynamicValue = new Animated.Value(initialValue);
                    let dynamicValueCalculated = Animated.divide(perspective, Animated.subtract(perspective, dynamicValue));
                    this.props.style['transform'].push({ 'scale': dynamicValueCalculated });
                } else if (key == 'alpha') {
                    dynamicValue = new Animated.Value((initialValue));
                    this.props.style['opacity'] = dynamicValue;
                } else if (key == 'w') {
                    dynamicValue = new Animated.Value(initialValue);
                    let dynamicValueCalculated = Animated.divide(dynamicValue, initialValue);
                    this.props.style['width'] = initialValue;
                    this.props.style['transform'].push({ 'scaleX': dynamicValueCalculated });
                } else if (key == 'h') {
                    dynamicValue = new Animated.Value(initialValue);
                    let dynamicValueCalculated = Animated.divide(dynamicValue, initialValue);
                    this.props.style['height'] = initialValue;
                    this.props.style['transform'].push({ 'scaleY': dynamicValueCalculated });
                } else if (key == 'scaleX' || key == 'scaleY') {
                    dynamicValue = new Animated.Value((initialValue));
                    this.props.style['transform'].push({ [key]: dynamicValue });
                }

                this.propertyValuesInit[key] = initialValue;
                this.propertyValues[key] = dynamicValue;
            }

            this.componentName = this.props.name == undefined ? "component" + Math.floor(Math.random() * 100000000) : this.props.name;
            // console.log("LComponent first render ************************** " + this.componentName);
            TweenManager.getInstance().register({ 'name': this.componentName, 'objRef': this })
            this._firstRun = false;
            this._processedStyle = this.props.style;
        }



        return (
            <Animated.View
                pointerEvents={this.props.pointerEvents}
                style={[this._processedStyle, { position: 'absolute' }]}>
                {this.props.children}
            </Animated.View>
        );

    }

    componentDidMount() {
        // console.log("LComponent componentdidmount  **************************" + this.props.name)

    }
    componentWillUnmount() {
        // console.log("LComponent componentWillUnmount ************************** componentName: " + this.componentName)
        TweenManager.getInstance().deregister({ 'name': this.componentName, 'objRef': this })

        // let property: keyof typeof this.propertyValues;
        let dynamicValue: Animated.Value = null;
        for (const key in this.propertyValues) {
            if (this.propertyValues[key] instanceof Animated.Value) {
                dynamicValue = this.propertyValues[key];
                dynamicValue.stopAnimation();
                dynamicValue.removeAllListeners();
                // console.log("LComponent componentWillUnmount ************************** deleting key of dynamic value: " + key)
            }
            delete this.propertyValues[key]
        }

        this._firstRun = true;
        this._processedStyle = null;

        this.propertyValues = {};
        this.propertyValuesInit = {};
    }

    updateState(newStateName) {
        // console.log("LComponent - updateState" + this.controller.context.state + "______" + JSON.stringify(this.state, null, 2))
    }
}

export default LComponent