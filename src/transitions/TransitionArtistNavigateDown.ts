import LauncherController from "../LauncherController";

const TransitionArtistNavigateDown = (item) => {
        console.log("TransitionArtistNavigateDown");
        // console.log(JSON.stringify(item,null,2))
        LauncherController.getInstance().context.artistFocusItem = item;
        LauncherController.getInstance().context.stackNavigator.navigate("ARTIST DETAILS")
}

export default TransitionArtistNavigateDown;

