import { Dimensions, FlatList } from "react-native";
import TweenManager from "../core/LTweenManager";
import LauncherController from "../LauncherController";
import ScheduleListItemType1 from "../components/schedulelist/ScheduleListItemType1";
import DetailsScreen from "../components/screens/DetailsScreen";
import FocusFragment from "../components/screens/FocusFragment";

const TransitionScheduleItemSelect = (item) => {
  console.log("TransitionScheduleItemSelect");
  let controller = LauncherController.getInstance()
  let context = LauncherController.getInstance().context;

  //first we scroll to the item that was currently selected
  (context.sessionListReference[controller.tabBarIndex] as FlatList).scrollToIndex(
    { animated: true, index: item.assignedListIndex, viewOffset: 0, viewPosition: 0 });


  //we store the item data in context as focus item
  context.focusedItemData = Object.assign({}, item);
  context.focusedItemData.id = "focus";

  //then we call Detailsscreen to update itself, ie read from context and put data into its component
  (LauncherController.getInstance().context.detailScreenReference as DetailsScreen).updateDataItem();

  //the focusItemComponent is located at the top of the session screen (outside the container)
  (context.focusedItemComponent as FocusFragment).setDataItem(context.focusedItemData)

  //now we animate/trick the eye into a switch. first position focusItem and details screen immeidately, then fade out session screen
  TweenManager.tween().to('detailsScreenContainer', 0, { x: 0, alpha: 1, z: 0, delay: 0 });

  TweenManager.tween().to("focusItemContainer", 0, { x: 0, y: 0, alpha: 0, delay: 0, onComplete:
      (ok) => { TweenManager.tween().to("focusItemContainer", 200, {  x: 0, y: 0, alpha: 1, delay: 400 }); }
  });

  
  TweenManager.tween().to('sessionScreenContainer', 200, {
    alpha: 0, delay: 400, onComplete:
      (ok) => {
        TweenManager.tween().to('sessionScreenContainer', 0, { x: 500, delay: 0 })
      }
  });


  ///expand the item
  let deltaExpandHeight = 400;
  let currentHeight = (item.rowHeight - 30);
  let currentPosY = 20
  let targetPosY = currentPosY + (deltaExpandHeight) / 2 //anchorpoint top

  let targetWidth = Dimensions.get("window").width;
  let currentWidth = Dimensions.get('window').width - (5 + 45 + 35 + 35 + 5)
  let currentPosX = 80
  let targetPosX = currentPosY + (deltaExpandHeight) / 2 //anchorpoint top

  TweenManager.tween().to("ScheduleItemFrame1_focus", 560, { y: targetPosY, h: currentHeight + deltaExpandHeight, delay: 400 });

  TweenManager.tween().to("focusItemContent", 200, { alpha: 1, delay: 900 });

  
}

export default TransitionScheduleItemSelect;

