import { Dimensions } from "react-native";
import LauncherController from "../../LauncherController";
import TweenManager from "../../core/LTweenManager";

const TransitionNavbarSelect = (index) => {
        console.log("TransitionNavbarSelect" + index);
        // if(index != 0 && index != 2) return;


        let oldIdx = LauncherController.getInstance().navBarIndex;
        if (index == oldIdx) return;


        //animate navbar
        let iconSize = 60;
        let itemDistance = 85
        let startX = (Dimensions.get('screen').width / 2 - ((4 - 1) * itemDistance) / 2) - iconSize / 2
    
        TweenManager.tween().to("navBarHighlight", 134, { alpha: 1.0, x: (index * itemDistance + startX) });

        //animate incoming screen
        let targetX = index > oldIdx ? Dimensions.get('screen').width : -Dimensions.get('screen').width;


        let screenNameIn = LauncherController.getInstance().navBarData[index].associatedScreenName
        TweenManager.tween().to(screenNameIn, 200, { x: 0 });
        TweenManager.tween().to(screenNameIn, 284, { alpha: 1, z: 0, delay: 137 });

        let screenNameOut = LauncherController.getInstance().navBarData[oldIdx].associatedScreenName
        TweenManager.tween().to(screenNameOut, 134, { alpha: 0.5, z: 0 });
        TweenManager.tween().to(screenNameOut, 200, { x: -targetX, initValue: 100 });

        LauncherController.getInstance().navBarIndex = index;
}

export default TransitionNavbarSelect;

