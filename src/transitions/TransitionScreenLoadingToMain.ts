import LauncherController from "../LauncherController";
import Eventl from "../core/LEventl";
import TweenManager from "../core/LTweenManager";

const TransitionLoadingToMain = () => {
        console.log("TransitionLoadingToMain"+1000);
        
        TweenManager.tween().to('loadingImage', 800, { alpha: 0, delay: 1500, onComplete: (ok) => { if(ok) LauncherController.getInstance().processEvent(new Eventl('loadingComplete')); }});
        TweenManager.tween().to('loadingScreenContainer', 1100, { alpha: 0, delay: 1500 });
        // TweenManager.tween().to('homeScreenVideoBgContainer', 3000, { alpha: 0, delay: 28000 });

};

export default TransitionLoadingToMain;

