import { FlatList } from "react-native-gesture-handler";
import LauncherController from "../LauncherController";
import TransitionNavbarSelect from "../components/navbar/TransitionNavbarSelect";
import TweenManager from "../core/LTweenManager";
import TransitionArtistNavigateDown from "./TransitionArtistNavigateDown";
import ArtistListComponent from "../components/artists/ArtistListComponent";
import { PureComponent } from "react";
import { Dimensions } from "react-native";

const TransitionLinkToArtistPage = (artistData) => {
        console.log("TransitionLinkToArtistPage");
        // console.log(JSON.stringify(artistData, null, 2));
        if(artistData==undefined) return;

        let controller = LauncherController.getInstance()
        let context = LauncherController.getInstance().context;

        LauncherController.getInstance().context.artistFocusItem = artistData;

        //scroll list to position
        (context.artistListReference as ArtistListComponent).scroll(artistData)
        


        let listeners = LauncherController.getInstance().context.artistFocusItemUpdateListeners
        for (let i = 0; i < listeners.length; i++) listeners[i]();

        const stackData = LauncherController.getInstance().artistStackData;
        const oldIndex = 0; const newIndex = 1;
        (stackData[1].screenComponentRef as PureComponent).forceUpdate();

        let targetX = Dimensions.get('screen').width;


        let screenNameIn = stackData[newIndex].associatedScreenName
        TweenManager.tween().to(screenNameIn, 0, { x: 0, y: 0, alpha: 1, z: 0});

        let screenNameOut = stackData[oldIndex].associatedScreenName
        TweenManager.tween().to(screenNameOut, 0, { alpha: 1, y: 1000, x: -targetX });

        LauncherController.getInstance().artistStackIndex = newIndex

        TransitionNavbarSelect(2, false);


        // TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 1);

        // TransitionArtistNavigateDown(artistData, 0); 
        // TweenManager.tween().to("settingsScreenContainer", 0, {
        //         alpha: 1, delay: 600, onComplete:
        //                 (ok) => {

        //                         TransitionArtistNavigateDown(LauncherController.getInstance().context.artistFocusItem, 1);
        //                 }
        // });
}

export default TransitionLinkToArtistPage;

