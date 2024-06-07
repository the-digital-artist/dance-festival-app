import { Component, ReactNode } from "react";
import TweenManager from "./LTweenManager";
import { Animated, Dimensions, Image } from "react-native";

class LImage extends Component<any,any> {
    _firstRun = true;
    _viewRef = null;
    _processedStyle = null;

    propertyValues = {};
    propertyValuesInit = {};

    globalPerspectiveValue = 850;       

    constructor(props) {
        super(props);
    }

    render() {
        // console.log("render LImage **************************" + this.props.name)
        if (this._firstRun) {
            if (this.props.style == undefined) return;
            if (this.props.style['transform'] == undefined) this.props.style['transform'] = [];
            // if (this.props.visualProperties == undefined) this.props[visualProperties = {};

            for (let key in this.props.visualProperties) {
                // console.log("LImage " + this.props.name + " - visualProperties.................................." + key)
                let initialValue = this.props.visualProperties[key]
                if(initialValue=="windowWidth") initialValue = Dimensions.get('screen').width;
                if(initialValue=="windowHeight") initialValue = Dimensions.get('screen').height;

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
            this._firstRun = false;
            this._processedStyle = this.props.style;
        }
        
        if (this.props.name != undefined) {
            TweenManager.getInstance().register({ 'name': this.props.name, 'objRef': this })
        }

        return (
            <Animated.Image {...this.props} style={this._processedStyle} />
        );

    }

    componentDidMount() {
        // console.log("componentdidmount LComponent **************************" + this.props.name)

    }
    componentWillUnmount() {
       for (const key in this.propertyValues) {
            const e = this.propertyValues[key];
       }
    }

    updateState(newStateName) {
        // console.log("LComponent - updateState" + this.controller.context.state + "______" + JSON.stringify(this.state, null, 2))
    }
}

export default LImage