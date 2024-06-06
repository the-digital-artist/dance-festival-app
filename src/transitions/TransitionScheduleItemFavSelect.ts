import TweenManager from "../core/LTweenManager";

const TransitionScheduleItemFavSelect = (item) => {
  // console.log("TransitionScheduleItemFavSelect");
  TweenManager.tween().to('ScheduleItemHighlight' + item.id, 500, {alpha: (item.favoriteState?0.3:0), delay: 0});
}

export default TransitionScheduleItemFavSelect;

