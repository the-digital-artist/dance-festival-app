import LauncherController from "../LauncherController";
import TransitionNavbarSelect from "../components/navbar/TransitionNavbarSelect";
import TransitionTabbarSelect from "../components/tabbar/TransitionTabbarSelect";
import TransitionArtistNavigateDown from "../transitions/TransitionArtistNavigateDown";
import TransitionSchedulerNavigateDown from "../transitions/TransitionSchedulerNavigateDown";


const ActionHistoryBackButton = () => {
  console.log("ActionHistoryBackButton");
  const context = LauncherController.getInstance().context

  if (context.navigationHistory.length == 0) return;

  const historyItem = context.navigationHistory.pop()
  console.log("historyItem.out: "+historyItem.out+"| historyItem.transition: "+historyItem.transition);

  
  // if (historyItem.transition == 'TransitionLinkToArtistPage') {
  //   context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "TransitionNavbarSelect", data: {prevIndex: 2, newIndex:1} });
  //   TransitionSchedulerNavigateDown(LauncherController.getInstance().context.schedulerFocusItem, 0);
  //   TransitionTabbarSelect(1)
  //   // TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 0)
  //   // TransitionNavbarSelect(1, false);
  //   return;

  // } else 
  if (historyItem.out == 'SchedulerScreen') {
    context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "TransitionNavbarSelect", data: {} });
    TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 0)
    TransitionNavbarSelect(1, false);
    return;

  } else if (historyItem.out == 'ArtistListScreen') {
    context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "TransitionArtistNavigateDown", data: {} });
    TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 0)
    return;
  } else if (historyItem.out == 'ArtistConnectPage') {
    context.navigationHistory.push({ out: "ArtistOfferScreen", transition: "TransitionArtistNavigateDown", data: {} });
    TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 1)
    return;
  } else if (historyItem.out == 'SchedulerListScreen') {
    context.navigationHistory.push({ out: "SchedulerDetailsScreen", transition: "TransitionSchedulerNavigateDown", data: {} });
    TransitionSchedulerNavigateDown(LauncherController.getInstance().context.schedulerFocusItem, 0)
    return;
  } else if (historyItem.out == 'SchedulerSessionDetailsScreen') {
    // context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "TransitionSchedulerNavigateDown" });
    TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 0)
    TransitionSchedulerNavigateDown(LauncherController.getInstance().context.schedulerFocusItem, 1)
    TransitionNavbarSelect(1, false);
    return;
  } else 
  // if (historyItem.transition == 'TransitionTabbarSelect') {
  //   let previousTabBarIndex = historyItem.data['prevIndex']!=undefined?historyItem.data['prevIndex']:LauncherController.getInstance().tabBarIndex
  //   TransitionTabbarSelect(previousTabBarIndex)
  //   return;
  // } else 
  if (historyItem.transition == 'TransitionNavbarSelect') {
    let previousNavBarIndex = historyItem.data['prevIndex']!=undefined?historyItem.data['prevIndex']:LauncherController.getInstance().navBarIndex
    TransitionNavbarSelect(previousNavBarIndex, false)
    return;
  }
}

export default ActionHistoryBackButton;