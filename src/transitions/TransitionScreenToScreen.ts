import { Dimensions } from "react-native";
import TweenManager from "../core/LTweenManager";

const TransitionScreenToScreen = (screenNameIn, screenNameOut) => {
        console.log("TransitionScreenToScreen");
        let targetX =  Dimensions.get('screen').width

        
        TweenManager.tween().to(screenNameIn, 0, { y: 0 });
        TweenManager.tween().to(screenNameIn, 200, { x: 0  });
        TweenManager.tween().to(screenNameIn, 284, { alpha: 1, z: 0, delay: 137 });

        // TweenManager.tween().to(screenNameOut, 134, { alpha: 1, z: 0 });
        // TweenManager.tween().to(screenNameOut, 200, { x: -targetX, initValue: 100, onComplete:
        //         (ok) => {

        //                 TweenManager.tween().to(screenNameOut, 0, { alpha: 1, y: 1000, delay: 0})
        //         } });

   
}

export default TransitionScreenToScreen;

