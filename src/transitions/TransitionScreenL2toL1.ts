import { Dimensions } from "react-native";
import TweenManager from "../core/LTweenManager";

const TransitionScreenL2toL1 = () => {
        console.log("TransitionScreenL2toL1");
        let targetX = Dimensions.get('screen').width;
        TweenManager.tween().to('sessionScreenContainer', 434, { x: 0 , alpha:  1, z:0 }); 
        TweenManager.tween().to('detailsScreenContainer', 434, { x: targetX, alpha: 0, z:-100  });
        
}

export default TransitionScreenL2toL1;

