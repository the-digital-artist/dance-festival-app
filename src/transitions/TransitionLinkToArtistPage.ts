import { FlatList } from "react-native-gesture-handler";
import LauncherController from "../LauncherController";
import TransitionNavbarSelect from "../components/navbar/TransitionNavbarSelect";
import TweenManager from "../core/LTweenManager";
import TransitionArtistNavigateDown from "./TransitionArtistNavigateDown";
import ArtistListComponent from "../components/artists/ArtistListComponent";

const TransitionLinkToArtistPage = (artistData) => {
        console.log("TransitionLinkToArtistPage");
        // console.log(JSON.stringify(artistData, null, 2));
        if(artistData==undefined) return;

        let controller = LauncherController.getInstance()
        let context = LauncherController.getInstance().context;

        LauncherController.getInstance().context.artistFocusItem = artistData;

        TransitionNavbarSelect(2, false);

        (context.artistListReference as ArtistListComponent).scroll(artistData)

        TransitionArtistNavigateDown(artistData, 0); 
        TweenManager.tween().to("settingsScreenContainer", 0, {
                alpha: 1, delay: 600, onComplete:
                        (ok) => {

                                TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 1);
                        }
        });
}

export default TransitionLinkToArtistPage;

