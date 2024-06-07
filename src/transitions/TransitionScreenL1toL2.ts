import { Dimensions } from "react-native";
import TweenManager from "../core/LTweenManager";

const TransitionScreenL1toL2 = () => {
        console.log("TransitionScreenL1toL2");
        let targetX = Dimensions.get('screen').width;
        TweenManager.tween().to('sessionScreenContainer', 434, { x:-targetX/2, alpha:0, z:-300 }); 
        TweenManager.tween().to('detailsScreenContainer', 434, { x: 0, alpha: 1, z:0  }); 
}

export default TransitionScreenL1toL2;

