import { Dimensions } from "react-native";
import TweenManager from "../core/LTweenManager";

const TransitionDataModelUpdate = () => {

  console.log("TransitionDataModelUpdate");
  console.log("TransitionDataModelUpdate");

  TweenManager.tween().to("waitForUpdateCoverSchedule", 100, {
    x: 0, alpha: 0.6,
    onComplete: () => {
      TweenManager.i().to("waitForUpdateCoverSchedule", 500, {
        alpha: 0.9,
        onComplete: () => {
          TweenManager.i().to("waitForUpdateCoverSchedule", 1400, {
            alpha: 0, delay: 800,
            onComplete: () => {
              TweenManager.i().to("waitForUpdateCoverSchedule", 0, {
                x: (Dimensions.get('screen').width + 100)
              })
            }
          })
        }
      })
    }
  });

  console.log("TransitionDataModelUpdate");
  
}

export default TransitionDataModelUpdate;

