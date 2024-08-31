import LauncherController from "../LauncherController";
import TransitionNavbarSelect from "../components/navbar/TransitionNavbarSelect";
import TransitionArtistNavigateDown from "../transitions/TransitionArtistNavigateDown";
import TransitionSchedulerNavigateDown from "../transitions/TransitionSchedulerNavigateDown";


const ActionHistoryBackButton = () => {
  console.log("ActionHistoryBackButton ");
  const context = LauncherController.getInstance().context

  if (context.navigationHistory.length == 0) return;

  const historyItem = context.navigationHistory.pop()
  console.log("historyItem.out: "+historyItem.out);

  if (historyItem.out == 'SchedulerScreen') {
    context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "TransitionNavbarSelect" });
    TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 0)
    TransitionNavbarSelect(1, false);
    return;

  } else if (historyItem.out == 'ArtistListScreen') {
    context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "TransitionArtistNavigateDown" });
    TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 0)
    return;
  } else if (historyItem.out == 'SchedulerListScreen') {
    context.navigationHistory.push({ out: "SchedulerDetailsScreen", transition: "TransitionSchedulerNavigateDown" });
    TransitionSchedulerNavigateDown(LauncherController.getInstance().context.schedulerFocusItem, 0)
    return;
  } else if (historyItem.out == 'SchedulerSessionDetailsScreen') {
    context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "TransitionSchedulerNavigateDown" });
    TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 0)
    TransitionSchedulerNavigateDown(LauncherController.getInstance().context.schedulerFocusItem, 1)
    TransitionNavbarSelect(1, false);
    return;
  }

  

}

export default ActionHistoryBackButton;