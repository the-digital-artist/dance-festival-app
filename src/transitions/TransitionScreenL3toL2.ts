import { Dimensions } from "react-native";
import TweenManager from "../core/LTweenManager";

const TransitionScreenL3toL2 = () => {
        console.log("TransitionScreenL3toL2");
        let targetX = Dimensions.get('window').width;
        TweenManager.tween().to('detailsScreenContainer', 434, { x: 0 ,z:0, alpha: 1 }); 
        TweenManager.tween().to('artistScreenContainer', 434, { x: targetX, alpha: 0, z:-100  }); 
}

export default TransitionScreenL3toL2;

