import LauncherController from "../LauncherController";
import ScheduleListItemType1 from "../components/schedulelist/ScheduleListItemType1";


const ActionItemFavToggleStateUpdate = (renderer: any, newState: boolean) => {
  console.log("ActionItemFavToggleStateUpdate ");

  let item = renderer.state.dataItem;
  renderer.setFavoriteState(newState)
  if(newState==true) {
    for (let i = 0; i < item.group.length; i++) {
      const e = item.group[i];
      if(e.id == item.id) continue;
      console.log("index: "+i);
      LauncherController.getInstance().storeData(e.id, false);
      (e.obj.renderer).toggleButtonReference.updateToggleState(false);
      (e.obj.renderer).setFavoriteState(false);
    }
  }

  LauncherController.getInstance().storeData(item.id, newState);
}

export default ActionItemFavToggleStateUpdate;