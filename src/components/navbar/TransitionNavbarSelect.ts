import { Dimensions } from "react-native";
import LauncherController from "../../LauncherController";
import TweenManager from "../../core/LTweenManager";
import NavBar from "./NavBar";
import DataModel from "../../DataModel";

const TransitionNavbarSelect = (index, storeHistory=true) => {
        console.log("TransitionNavbarSelect" + index);

        let oldIdx = LauncherController.getInstance().navBarIndex;
        if (index == oldIdx) return;


        //animate navbar
        TweenManager.tween().to("navBarHighlight", 134, { alpha: 1.0, x: (index * NavBar.navBarItemDistance + NavBar.navBarStartX) });

        //animate incoming screen
        let targetX = index > oldIdx ? Dimensions.get('screen').width : -Dimensions.get('screen').width;


        let screenNameIn = DataModel.getInstance().static.dataComponents.navBar[index].associatedScreenName
        TweenManager.tween().to(screenNameIn, 0, { y: 0, 
                onComplete: (ok) => { TweenManager.tween().to(screenNameIn, 200, { x: 0 })} 
               
        });
        TweenManager.tween().to(screenNameIn, 284, { alpha: 1, z: 0, delay: 137 });

        let screenNameOut = DataModel.getInstance().static.dataComponents.navBar[oldIdx].associatedScreenName
        TweenManager.tween().to(screenNameOut, 134, { alpha: 0.5, z: 0 });
        TweenManager.tween().to(screenNameOut, 200, { x: -targetX, initValue: 100, 
                onComplete: (ok) => { TweenManager.tween().to(screenNameOut, 0, { y: Dimensions.get('screen').height });} 
        });

        LauncherController.getInstance().navBarIndex = index;

        if(storeHistory) LauncherController.getInstance().context.navigationHistory.push({out:screenNameOut, transition:'TransitionNavbarSelect' })


}

export default TransitionNavbarSelect;

