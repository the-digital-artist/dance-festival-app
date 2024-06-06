import { Dimensions } from "react-native";
import TweenManager from "../core/LTweenManager";

const TransitionScreenL2toL3 = () => {
        console.log("TransitionScreenL2toL3");
        let targetX = Dimensions.get('window').width;
        TweenManager.tween().to('detailsScreenContainer', 434, { x:-targetX/2, alpha:0, z:-300 }); 
        TweenManager.tween().to('artistScreenContainer', 434, { x: 0, alpha: 1, z:0  }); 
}

export default TransitionScreenL2toL3;

