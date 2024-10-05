import LauncherController from "../LauncherController";
import TransitionArtistNavigateDown from "../transitions/TransitionArtistNavigateDown";


const ActionArtistListOnDetailsBtn = (item) => {
  console.log("ActionArtistListOnDetailsBtn ");
  LauncherController.getInstance().context.navigationHistory.push({out:'ArtistListScreen', transition:'TransitionArtistNavigateDown', data: {} })
  TransitionArtistNavigateDown(item, 1) 

}

export default ActionArtistListOnDetailsBtn;