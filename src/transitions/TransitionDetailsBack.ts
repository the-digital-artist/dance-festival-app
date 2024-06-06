import { Dimensions } from "react-native";
import TweenManager from "../core/LTweenManager";
import LauncherController from "../LauncherController";

const TransitionDetailsBack = () => {
        console.log("TransitionDetailsBack");
        let targetX = Dimensions.get('window').width;

        let context = LauncherController.getInstance().context;

        TweenManager.tween().to('sessionScreenContainer', 0, {
                x: 0, z: 0, delay: 0, onComplete:
                        (ok) => { TweenManager.tween().to('sessionScreenContainer', 432, { alpha: 1, delay: 0 }) }
        });

        TweenManager.tween().to('detailsScreenContainer', 236, {
                alpha: 0, delay: 0, onComplete:
                        (ok) => { TweenManager.tween().to('detailsScreenContainer', 0, { x: targetX, delay: 0 }) }
        });

        TweenManager.tween().to("focusItemContainer", 100, {
                x: 5, y: 0, alpha: 0, delay: 500, onComplete:
                        (ok) => { TweenManager.tween().to('focusItemContainer', 0, { x: targetX, delay: 0 }) }
        });

        let targetHeight =  (context.focusedItemData.rowHeight-30);
        let targetPosY = 20
      
        let targetWidth = Dimensions.get("window").width;
        let currentWidth =Dimensions.get('window').width - (5 + 45 + 35 + 35 + 5)
       
        TweenManager.tween().to("ScheduleItemFrame1_focus", 236, { y: targetPosY,  h: targetHeight,  delay: 0  }); 
      
}

export default TransitionDetailsBack;

