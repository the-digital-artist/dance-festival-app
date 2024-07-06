import LauncherController from "../LauncherController";
import TransitionNavbarSelect from "../components/navbar/TransitionNavbarSelect";
import TransitionArtistNavigateDown from "../transitions/TransitionArtistNavigateDown";


const ActionArtistDetailsOnBack = () => {
  console.log("ActionArtistDetailsOnBack ");

  const context =  LauncherController.getInstance().context

  if(context.navigationHistory.length>0 && context.navigationHistory[context.navigationHistory.length-1].out=='SchedulerScreen') {
    context.navigationHistory.push({out:"ArtistDetailsScreen", transition: "TransitionNavbarSelect"});
    TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem,0)
    TransitionNavbarSelect(1);   
  
} else {
    context.navigationHistory.push({out:"ArtistDetailsScreen", transition: "TransitionArtistNavigateDown"});
    TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem,0)
}

}

export default ActionArtistDetailsOnBack;