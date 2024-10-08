import React from "react";
import { Image, Platform, Text } from "react-native";
import LTouchableOpacity from "../core/LTouchableOpacity";
import Animated from "react-native-reanimated";

const ButtonSmall = (props) => {
    if (!(props as Object).hasOwnProperty('visualProperties')) props['visualProperties'] = { alpha: 1 };
    if (!(props.visualProperties as Object).hasOwnProperty('alpha')) props.visualProperties['alpha'] = 1;

    let fontSize = (props.fontStyle!= undefined)  && (props.fontStyle.fontSize != undefined) ? props.fontStyle.fontSize : 8;
    let textCenterPosY = (props.style.height - (fontSize + (Platform.OS == "ios"?2:4))) / 2

    return (
        <>

            <LTouchableOpacity
                name={props.name}
                style={[
                    props.style
                    
                ]}
                visualProperties={props.visualProperties}
                onPress={props.onSelect}
            >



                {(props.bgBoxVisible ==true) && 

                    <Animated.View
                        style={[
                            props.dynamicVisualPropertiesHightlight, props.bgBoxStyle
                        ]}
                    />
                }

                {props.source && (
                    <Image
                        style={[{
                            top: 0, left: 0, position: 'absolute',
                            width: props.style.width, height: props.style.height,
                            resizeMode: "contain",
                            opacity: 1
                        }, props.imageStyle]}
                        source={props.source}
                    />)
                }
                {props.text && (
                    <Animated.Text allowFontScaling={false} id={'textButton'+props.name}
                        style={[{
                            // backgroundColor: 'skyblue',
                            top: textCenterPosY, left: 0, position: 'absolute',
                            width: props.style.width,
                            fontFamily: 'AktivGrotesk-Regular',
                            textDecorationLine: props.textDecorationLine,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            letterSpacing: 2.0,
                            color: '#000000',
                            fontSize: fontSize,
                        }, props.fontStyle]}>
                        {props.text}
                    </Animated.Text>)
                }
            </LTouchableOpacity>
        </>
    );
}

export default ButtonSmall;
