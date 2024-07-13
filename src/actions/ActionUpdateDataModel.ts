import AsyncStorage from "@react-native-async-storage/async-storage";
import DataModel from "../DataModel";
import LauncherController from "../LauncherController";
import ArtistListScreen from "../components/screens/ArtistListScreen";
import SchedulerScreen from "../components/screens/SchedulerScreen";


const ActionUpdateDataModelWithRemote = async () => {
    console.log("ActionUpdateDataModelWithRemote ");
    //set the list into update mode
    const c = LauncherController.getInstance().context;
    if (c.dataDependentComponentSchedulerScreen == null || c.dataDependentComponentArtistScreen == null) return;

    //first perform a request to the predefined URL
    try {
        const fetchController = new AbortController()
        // setTimeout(() => { fetchController.abort() }, 1500)


        const response1 = await fetch(DataModel.modelRemoteVersionCheckUrl, { signal: fetchController.signal });
        if (!response1.ok) return;

        const version = await response1.json();
        console.log("ActionUpdateDataModel -- API - got version: " + version);


        if (version <= DataModel.modelVersion) { return };
        // console.log(":::::ActionUpdateDataModel -- querying full model");

        const response2 = await fetch(DataModel.modelRemoteGetModelUrl, { signal: fetchController.signal });
        if (!response2.ok) return;

        // console.log(":::::ActionUpdateDataModel -- got ok response");

        const remoteModel = await response2.json();

        // console.log(":::::ActionUpdateDataModel -- object created");
        // console.log(":::::ActionUpdateDataModel -- remote model version: " + remoteModel.modelVersion);

        if (remoteModel.modelVersion <= DataModel.modelVersion) return;
        // console.log(":::::ActionUpdateDataModel -- modelVersion is greater than Local");


        (c.dataDependentComponentArtistScreen as ArtistListScreen).startModelUpdate();
        (c.dataDependentComponentSchedulerScreen as SchedulerScreen).startModelUpdate();

        // console.log(":::::ActionUpdateDataModel -- after SchedulerScreen).startModelUpdate");
        console.log(":::::ActionUpdateDataModel -- updating in-memory model with remote model: " + remoteModel.modelVersion);

        //now update in memory model
        // now sync all the keys in the remote model to the local model
        for (const key in remoteModel) {
            if (Object.prototype.hasOwnProperty.call(DataModel, key)) {
                console.log(":::::ActionUpdateDataModel - syncing local key with remote key: " + key);
                DataModel[key] = remoteModel[key];
            }
        }

        console.log(":::::ActionUpdateDataModel -- process data model");
        await LauncherController.getInstance().prepareDataModel();

        //inform components
        (c.dataDependentComponentArtistScreen as ArtistListScreen).finishModelUpdate();
        (c.dataDependentComponentSchedulerScreen as SchedulerScreen).finishModelUpdate();

        //store the list into phone storage
        console.log(":::::ActionUpdateDataModel -- latest model asynchroneously stored local: " + remoteModel.modelVersion);

        const localModelCopy = {};
        for (const key in DataModel) {
            if (key == '_instance' || key == 'instance' || key.indexOf('dyn_') == 0)
                continue;
            localModelCopy[key] = DataModel[key];
        }
        const modelAsString = JSON.stringify(localModelCopy);
        AsyncStorage.setItem('dataModel', modelAsString);

        globalThis.gc(); //this feels strange but apparently necessary with fetch
        //https://github.com/facebook/hermes/issues/1147
        //https://github.com/facebook/react-native/issues/39441



    } catch (error) {
        if (error.message == "Aborted") {
            console.log(":::::ActionUpdateDataModel -- Internet too slow - aborting request")
            return;
        }
        // console.error(error);
    }
}

export default ActionUpdateDataModelWithRemote;