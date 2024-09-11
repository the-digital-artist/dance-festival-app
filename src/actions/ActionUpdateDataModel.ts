import AsyncStorage from "@react-native-async-storage/async-storage";
import DataModel from "../DataModel";
import LauncherController from "../LauncherController";
import ArtistListScreen from "../components/artists/ArtistListScreen";
import SchedulerMainScreen from "../components/schedulelist/SchedulerMainScreen";
import ArtistMainScreen from "../components/artists/ArtistMainScreen";
import SchedulerListScreen from "../components/schedulelist/SchedulerListScreen";


const ActionUpdateDataModelWithRemote = async () => {
    console.log("ActionUpdateDataModelWithRemote ");
    //set the list into update mode
    const c = LauncherController.getInstance().context;
    const dataModel = DataModel.getInstance().static

    if (c.dataDependentComponentSchedulerScreen == null || c.dataDependentComponentArtistScreen == null) return;

    //first perform a request to the predefined URL
    try {
        const fetchController = new AbortController()
        // setTimeout(() => { fetchController.abort() }, 1500)
        console.log("ActionUpdateDataModel -- fetch(dataModel.modelRemoteVersionCheckUrl: " + dataModel.modelRemoteVersionCheckUrl);

        const response1 = await fetch(dataModel.modelRemoteVersionCheckUrl, { signal: fetchController.signal });
        if (!response1.ok) return;

        //first we check with a small version check API (only returns the version, not the content)
        const version = await response1.json();
        console.log("ActionUpdateDataModel -- API - got version: " + version);
        if (version <= dataModel.modelVersion) { return };


          //now we query the full model
        console.log(":::::ActionUpdateDataModel -- querying full model");
        const response2 = await fetch(dataModel.modelRemoteGetModelUrl, { signal: fetchController.signal });
        if (!response2.ok) return;
        console.log(":::::ActionUpdateDataModel -- got ok response");
        const remoteModel = await response2.json();
        console.log(":::::ActionUpdateDataModel -- object created");
        console.log(":::::ActionUpdateDataModel -- remote model version: " + remoteModel.modelVersion);
        if (remoteModel.modelVersion <= dataModel.modelVersion) return;


        //now star the actual update (first set all components into update state, then update model)
        console.log(":::::ActionUpdateDataModel -- modelVersion is greater than Local");
        
        (c.dataDependentComponentArtistScreen as ArtistListScreen).startModelUpdate();
        (c.dataDependentComponentSchedulerScreen as SchedulerListScreen).startModelUpdate();

        console.log(":::::ActionUpdateDataModel -- updating in-memory model with remote model: " + remoteModel.modelVersion);
        DataModel.getInstance().static = remoteModel;
        console.log(":::::ActionUpdateDataModel -- process data model");
        await LauncherController.getInstance().prepareDataModel();

        (c.dataDependentComponentArtistScreen as ArtistListScreen).finishModelUpdate();
        (c.dataDependentComponentSchedulerScreen as SchedulerListScreen).finishModelUpdate();

        //finally store the new model into local storage so it can be retrieved on next app startup
        // const modelAsString = JSON.stringify(DataModel.getInstance().static);
        // await AsyncStorage.setItem('dataModel', modelAsString);

        globalThis.gc(); //this feels strange but apparently necessary with fetch
        //https://github.com/facebook/hermes/issues/1147
        //https://github.com/facebook/react-native/issues/39441
    } catch (error) {
        if (error.message == "Aborted") {
            console.log(":::::ActionUpdateDataModel -- Internet too slow - aborting request")
            return;
        }
        console.error(error);
    }
}

export default ActionUpdateDataModelWithRemote;