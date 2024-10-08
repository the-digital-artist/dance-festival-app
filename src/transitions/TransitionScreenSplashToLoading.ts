
import TweenManager from "../core/LTweenManager";
import TransitionLoadingToMain from "./TransitionScreenLoadingToMain";

const TransitionScreenSplashToLoading = () => {
        console.log("TransitionScreenSplashToLoading");
        // TweenManager.tween().to('loadingImage', 654, { alpha: 1, delay: 1000 });
        TweenManager.tween().to('loadingImage', 500, { alpha: 1 , onComplete: (ok) => { if(ok) TransitionLoadingToMain(); } });
}

export default TransitionScreenSplashToLoading;


