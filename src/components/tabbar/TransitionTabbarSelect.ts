import { Dimensions } from "react-native";
import LauncherController from "../../LauncherController";
import TweenManager from "../../core/LTweenManager";
import { Easing, withTiming } from "react-native-reanimated";

const TransitionTabbarSelect = (itemData, index, animCurrentIndex) => {
        console.log("TransitionTabbarSelect" + index);
        // if(index != 0 && index != 2) return;


        let oldIdx = LauncherController.getInstance().tabBarIndex;
        if (index == oldIdx) return;

        let targetX = index > oldIdx ? Dimensions.get('window').width : -Dimensions.get('window').width;

        let screenNameIn = LauncherController.getInstance().tabBarData[index].associatedScreenName
        TweenManager.tween().to(screenNameIn, 200, { x: 0 });
        TweenManager.tween().to(screenNameIn, 284, { alpha: 1, z: 0, delay: 137 });

        let screenNameOut = LauncherController.getInstance().tabBarData[oldIdx].associatedScreenName
        TweenManager.tween().to(screenNameOut, 134, { alpha: 0.5, z: 0 });
        TweenManager.tween().to(screenNameOut, 200, { x: -targetX, initValue: 100 });

        LauncherController.getInstance().tabBarIndex = index;

        //animate tab bar tabs(highlight)
        animCurrentIndex.value = withTiming(index, {
                duration: 330,
                easing: Easing.inOut(Easing.quad),
        })
}

export default TransitionTabbarSelect;

