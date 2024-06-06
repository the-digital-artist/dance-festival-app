import { FlatList } from "react-native-gesture-handler";
import LauncherController from "../LauncherController";
import TransitionNavbarSelect from "../components/navbar/TransitionNavbarSelect";
import TweenManager from "../core/LTweenManager";
import TransitionArtistNavigateDown from "./TransitionArtistNavigateDown";

const TransitionLinkToArtistPage = (artistData) => {
        console.log("TransitionLinkToArtistPage");
        console.log(JSON.stringify(artistData, null, 2));
        if(artistData==undefined) return;

        let controller = LauncherController.getInstance()
        let context = LauncherController.getInstance().context;

        LauncherController.getInstance().context.artistFocusItem = artistData;
        LauncherController.getInstance().context.stackNavigator.navigate("ARTIST PAGES")

        TransitionNavbarSelect(2);

        (context.artistListReference as FlatList).scrollToIndex(
                { animated: true, index: artistData.index, viewOffset: 0, viewPosition: 0 }
        );

        TweenManager.tween().to("settingsScreenContainer", 0, {
                alpha: 1, delay: 500, onComplete:
                        (ok) => {

                                LauncherController.getInstance().context.stackNavigator.navigate("ARTIST DETAILS")
                        }
        });

        // TweenManager.tween().to("detailsScreenContainer", 0, {
        //         alpha: 1, delay: 500, onComplete:
        //                 (ok) => {
        //                         (context.artistListReference as FlatList).scrollToIndex(
        //                                 { animated: true, index: artistData.index, viewOffset: 0, viewPosition: 0 });

        //                         TweenManager.tween().to("detailsScreenContainer", 0, {
        //                                 alpha: 1, delay: 500
        //                         });
        //                 }
        // });







}

export default TransitionLinkToArtistPage;

