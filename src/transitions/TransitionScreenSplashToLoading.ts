
import TweenManager from "../core/LTweenManager";
import TransitionLoadingToMain from "./TransitionScreenLoadingToMain";

const TransitionScreenSplashToLoading = () => {
        console.log("TransitionScreenSplashToLoading");
        TweenManager.tween().to('loadingImage', 1300, { alpha: 1 , onComplete: (ok) => { if(ok) TransitionLoadingToMain(); } });
}

export default TransitionScreenSplashToLoading;


