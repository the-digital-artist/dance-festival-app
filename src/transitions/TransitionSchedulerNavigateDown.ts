import { Dimensions } from "react-native";
import LauncherController from "../LauncherController";
import TweenManager from "../core/LTweenManager";
import { PureComponent } from "react";

const TransitionSchedulerNavigateDown = (item, levelIndex) => {
        console.log("TransitionSchedulerNavigateDown");

        LauncherController.getInstance().context.schedulerFocusItem = item;


     //now animate screens
        const stackData = LauncherController.getInstance().schedulerStackData;
        const oldIndex =  LauncherController.getInstance().schedulerStackIndex;
        const newIndex = levelIndex;
        if(newIndex == oldIndex) return;

        (stackData[1].screenComponentRef as PureComponent).forceUpdate();

        //animate incoming screen
        let targetX = newIndex > oldIndex ? Dimensions.get('screen').width : -Dimensions.get('screen').width;


        let screenNameIn = stackData[newIndex].associatedScreenName
        TweenManager.tween().to(screenNameIn, 0, { y: 0 });
        TweenManager.tween().to(screenNameIn, 200, { x: 0  });
        TweenManager.tween().to(screenNameIn, 284, { alpha: 1, z: 0, delay: 137 });

        let screenNameOut = stackData[oldIndex].associatedScreenName
        TweenManager.tween().to(screenNameOut, 134, { alpha: 1, z: 0 });
        TweenManager.tween().to(screenNameOut, 200, { x: -targetX, initValue: 100, onComplete:
                (ok) => {

                        TweenManager.tween().to(screenNameOut, 0, { alpha: 1, y: 1000, delay: 0})
                } });

   
        LauncherController.getInstance().schedulerStackIndex = newIndex
}

export default TransitionSchedulerNavigateDown;

