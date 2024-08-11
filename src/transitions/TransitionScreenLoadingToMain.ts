import LauncherController from "../LauncherController";
import Eventl from "../core/LEventl";
import TweenManager from "../core/LTweenManager";

const TransitionLoadingToMain = () => {
        console.log("TransitionLoadingToMain");
        
        TweenManager.tween().to('loadingImage', 1000, { alpha: 0, delay: 3000, onComplete: (ok) => { if(ok) LauncherController.getInstance().processEvent(new Eventl('loadingComplete')); }});
        TweenManager.tween().to('loadingScreenContainer', 1500, { alpha: 0, delay: 3000 });
        // TweenManager.tween().to('homeScreenVideoBgContainer', 3000, { alpha: 0, delay: 28000 });

};

export default TransitionLoadingToMain;

