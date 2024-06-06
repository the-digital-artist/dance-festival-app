import React, { useMemo } from "react";
// import { Animated } from "react-native";
import { Animated, Easing } from 'react-native';
import Tween from "./LTween";
import LComponent from "./LComponent";

class TweenManager {
    static _instance = null;
    valueMap = {};
    objectReferences = {};
    tweenQueuePendingClassRegistration = [];

    static getInstance() { return (TweenManager._instance == null ? TweenManager._instance = new TweenManager() : TweenManager._instance) }
    static i() { return TweenManager.getInstance() };
    static tween() { return TweenManager.getInstance() }


    register(objMap) {
        if (this.objectReferences[objMap.name] != undefined) return;

        // console.log("TweenManager - registering new Object: " + objMap.name);
        this.objectReferences[objMap.name] = objMap.objRef


        // console.log("TweenManager - now going through tween queue with length: " + this.tweenQueuePendingClassRegistration.length);
        for (let i = 0; i < this.tweenQueuePendingClassRegistration.length; i++) {
            const tween = this.tweenQueuePendingClassRegistration[i];
            if (tween.componentName == objMap.name) {
                // console.log("TweenManager - going through queued Tweens. Found: " + tween.componentName);
                this.to(tween.componentName, tween.duration, tween.properties, objMap.objRef);
                this.tweenQueuePendingClassRegistration.splice(i, 1);
                i--;
            }
        }
    }

    deRegisterComponent() {
        // useEffect(() => {
        //   return () => {
        //     cancelAnimation(ref.current);
        //   };
        // }, []);
    }


    to(name, durValue = 0, properties = {}, componentReference = null) {

        // console.log("TweenManager.to() - called with: " + name);
        const tween = new Tween(name, durValue, properties)
        tween.componentReference = componentReference != null ? componentReference : this.objectReferences[tween.componentName];
        if (tween.componentReference == undefined) {
            console.log("TweenManager.to() - no component: " + tween.componentName + " queueing the tween");
            this.tweenQueuePendingClassRegistration.push(tween)
            return tween;
        }

        // console.log("TweenManager - starting Tween for object ");
        return this.triggerTween(tween, properties['onComplete']);
    }

    triggerTween(tween, onComplete = undefined) {
        tween.delay = (tween.properties['delay'] != undefined ? tween.properties['delay'] : 0);
        tween.easing = (tween.properties['easing'] != undefined ? tween.properties['easing'] : Easing.inOut(Easing.quad));
        tween.initValue = (tween.properties['initValue'] != undefined ? tween.properties['initValue'] : null);
       
        



        for (let key in tween.properties) {
            // console.log("TweenManager -key in tween.properties " + key);
            if (key == 'easing' || key == 'delay' || key == 'onComplete' || key == 'initValue') continue;

            let targetValue = tween.properties[key]

            if(key == 'opacity') key = 'alpha';
            if(key == 'translateX') key = 'x';
            if(key == 'translateY') key = 'y';
            if(key == 'translateZ') key = 'z';
            if(key == 'width') key = 'w';
            if(key == 'height') key = 'h';


            let dynamicValue = (tween.componentReference as LComponent).propertyValues[key]
            if (dynamicValue == null) continue;

            // if(tween.initValue != null) {
            //     console.log("setting initial Vlaue")
            //     // dynamicValue.current = tween.initValue;
            //     Animated.timing(dynamicValue, {
            //         toValue:  tween.initValue,
            //         duration: 0,
            //         delay: 0,
            //         useNativeDriver: true,
            //     }).start();
            // }
            
            // if (key == 'z') { key = 'scale'; }
            // if (key == 'w') { targetValue = targetValue/initValue; key = 'scaleX'; }
            // if (key == 'h') { targetValue = targetValue/initValue; key = 'scaleY'; }

            // console.log("TweenManager - animating: " + tween.componentName + " for property: " + key + "->" + targetValue + " - delay: " + tween.delay + " - duration: " + tween.duration);
            
            Animated.timing(dynamicValue, {
                toValue: targetValue,
                duration: tween.duration,
                delay: tween.delay,
                easing: tween.easing,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (onComplete == undefined) return;
                onComplete(finished);
            });
        }
        return tween;
    }
}

export default TweenManager;