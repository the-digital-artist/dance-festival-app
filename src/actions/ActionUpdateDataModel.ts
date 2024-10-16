import AsyncStorage from "@react-native-async-storage/async-storage";
import DataModel from "../DataModel";
import LauncherController from "../LauncherController";
import * as Application from 'expo-application';


const ActionUpdateDataModelWithRemote = async (params = {noProcessing: false,  timeOut:1500}) => {
    console.log("ActionUpdateDataModel ");
    //set the list into update mode
    const c = LauncherController.getInstance().context;
    const dataModel = DataModel.getInstance().static

    //first perform a request to the predefined URL
    try {
        const fetchController1 = new AbortController()
        setTimeout(() => { fetchController1.abort() }, params.timeOut)

        const buildParam = `${Application.nativeBuildVersion}`;
        const modelParam = `${ DataModel.getInstance().static.modelVersion}`;
        const updateParam = `${ LauncherController.getInstance().updateInfo}`;

        const urlVersion = `${dataModel.apiUrlBase}${dataModel.apiModelUpdateVersion}`;
        const urlContent = `${dataModel.apiUrlBase}${dataModel.apiModelUpdateContent}`;


        console.log("ActionUpdateDataModel -- fetch(dataModel.modelRemoteVersionCheckUrl: " + urlVersion);

        const response1 = await fetch(urlVersion, { signal: fetchController1.signal });
        if (!response1.ok) return;

        //first we check with a small version check API (only returns the version, not the content)
        const version = await response1.json();
        console.log("ActionUpdateDataModel -- API - got version: " + version);
        if (version <= dataModel.modelVersion) { return };


          //now we query the full model
        console.log(":::::ActionUpdateDataModel -- querying full model from: "+urlContent);
        const fetchController2 = new AbortController()
        setTimeout(() => { fetchController2.abort() }, params.timeOut)
        const response2 = await fetch(urlContent, { signal: fetchController2.signal });
        if (!response2.ok) return;
        console.log(":::::ActionUpdateDataModel -- got ok response");
        const remoteModel = await response2.json();
        console.log(":::::ActionUpdateDataModel -- object created");
        console.log(":::::ActionUpdateDataModel -- remote model version: " + remoteModel.modelVersion);
        if (remoteModel.modelVersion <= dataModel.modelVersion) return;

        if(params.noProcessing) { 
            DataModel.getInstance().static = remoteModel; 
            await AsyncStorage.setItem('dataModel', JSON.stringify(remoteModel));
            return;
        };


        //now star the actual update (first set all components into update state, then update model)
        console.log(":::::ActionUpdateDataModel -- modelVersion is greater than Local");
        for (let i = 0; i < c.dataDependentComponents.length; i++) c.dataDependentComponents[i].startModelUpdate();

        console.log(":::::ActionUpdateDataModel -- updating in-memory model with remote model: " + remoteModel.modelVersion);
        DataModel.getInstance().static = remoteModel;
        console.log(":::::ActionUpdateDataModel -- storing new datamodel locally "+remoteModel.modelVersion);
        AsyncStorage.setItem('dataModel', JSON.stringify(remoteModel));
        console.log(":::::ActionUpdateDataModel -- process data model");
        await LauncherController.getInstance().prepareDataModel();

        for (let i = 0; i < c.dataDependentComponents.length; i++) c.dataDependentComponents[i].finishModelUpdate();

        // finally store the new model into local storage so it can be retrieved on next app startup


        globalThis.gc(); //this feels strange but apparently necessary with fetch
        //https://github.com/facebook/hermes/issues/1147
        //https://github.com/facebook/react-native/issues/39441
    } catch (error) {
        if (error.message == "Aborted") {
            console.log(":::::ActionUpdateDataModel -- Internet too slow - aborting request")
            return;
        }
        if (error.message == "Network request failed") {
            console.log(":::::ActionUpdateDataModel -- Network request failed")
            return;
        }
        console.log(":::::ActionUpdateDataModel -- Unkown Error: "+error.message)
    }
}

export default ActionUpdateDataModelWithRemote;