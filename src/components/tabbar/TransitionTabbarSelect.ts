import { Dimensions } from "react-native";
import LauncherController from "../../LauncherController";
import TweenManager from "../../core/LTweenManager";
import { Easing, withTiming } from "react-native-reanimated";

const TransitionTabbarSelect = (index, animCurrentIndex = null, itemData = null, createHistory = true) => {
        console.log("TransitionTabbarSelect" + index);

        let maxAlpha: 1;
        let minAlpha: 1;

        let oldIdx = LauncherController.getInstance().tabBarIndex;
        if (index == oldIdx) return;

        let targetX = index > oldIdx ? Dimensions.get('screen').width : -Dimensions.get('screen').width;

        let screenNameIn = LauncherController.getInstance().tabBarData[index].associatedScreenName
        TweenManager.tween().to(screenNameIn, 200, { x: 0 });
        TweenManager.tween().to(screenNameIn, 284, { alpha: 1, z: 0, delay: 137 });


        let screenNameOut = LauncherController.getInstance().tabBarData[oldIdx].associatedScreenName
        TweenManager.tween().to(screenNameOut, 134, { alpha: 0, z: 0 });
        TweenManager.tween().to(screenNameOut, 200, { x: -targetX, initValue: 100 });

        LauncherController.getInstance().tabBarIndex = index;
        //animate tab bar tabs(highlight)
        if (animCurrentIndex) {
                animCurrentIndex.value = withTiming(index, {
                        duration: 330,
                        easing: Easing.inOut(Easing.quad),
                })
        }

        if(!createHistory) return;
       
        LauncherController.getInstance().context.navigationHistory.push({ out: screenNameOut, transition: 'TransitionTabbarSelect', data:{prevIndex: oldIdx, newIndex: index} })
}

export default TransitionTabbarSelect;

