import LauncherController from "../LauncherController";
import Eventl from "../core/LEventl";
import TweenManager from "../core/LTweenManager";

const TransitionLoadingToMain = () => {
        console.log("TransitionLoadingToMain"+1000);
        
        TweenManager.tween().to('loadingImage', 300, { alpha: 0, delay: 500, onComplete: (ok) => { if(ok) LauncherController.getInstance().processEvent(new Eventl('loadingComplete')); }});
        TweenManager.tween().to('loadingScreenContainer', 600, { alpha: 0, delay: 500 });
        // TweenManager.tween().to('homeScreenVideoBgContainer', 3000, { alpha: 0, delay: 28000 });

};

export default TransitionLoadingToMain;

