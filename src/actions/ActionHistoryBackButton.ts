import LauncherController from "../LauncherController";
import TransitionNavbarSelect from "../components/navbar/TransitionNavbarSelect";
import TransitionArtistNavigateDown from "../transitions/TransitionArtistNavigateDown";


const ActionHistoryBackButton = () => {
  console.log("ActionHistoryBackButton ");
  const context = LauncherController.getInstance().context

  if (context.navigationHistory.length == 0) return;

  const historyItem = context.navigationHistory.pop()

  if (historyItem.out == 'SchedulerScreen') {
    context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "TransitionNavbarSelect" });
    TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 0)
    TransitionNavbarSelect(1, false);
    return;

  } else if (historyItem.out == 'ArtistListScreen') {
    context.navigationHistory.push({ out: "ArtistDetailsScreen", transition: "TransitionArtistNavigateDown" });
    TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 0)
    return;
  }

}

export default ActionHistoryBackButton;