import React, { PureComponent } from "react";
import { Dimensions, Image, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import ScreenHeader from "../screens/ScreenHeader";
import ScreenHomeButton from "../screens/ScreenHomeButton";
import ArtistListComponent from "./ArtistListComponent";


class ArtistListScreen extends PureComponent {
    listDataPreProcessed = []

    state = {
        modelUpdateState: 0, //0-not-initialized, 1-for updating, 2-ready
        searchTextInput: ""
    }


    constructor(props) {
        super(props);

        LauncherController.getInstance().context.stackNavigator = props.navigation;
        LauncherController.getInstance().context.dataDependentComponentArtistScreen = this;

        this.preProcessListData(DataModel.getInstance().dyn_dataArtistsList)
        this.state.modelUpdateState = 2;
        this.state.searchTextInput = "";
    }

    startModelUpdate() {
        this.preProcessListData(null)
        this.setState({ modelUpdateState: 1 })
    }

    finishModelUpdate() {
        this.preProcessListData(DataModel.getInstance().dyn_dataArtistsList)
        this.setState({ modelUpdateState: 2 })
    }

    preProcessListData(rawData = null) {
        this.listDataPreProcessed = [];
        if (rawData == null || rawData == undefined) return;

        //first filter by editions (current vs rest)
        let dataCurrentEdition = rawData.filter((a) => {
            if (a.editionData == undefined) return false;
            for (let k = 0; k < a.editionData.length; k++) if (a.editionData[k] == '03-2024') return true;
            return false;
        });

        let dataOtherEditions = rawData.filter((a) => {
            if (a.editionData == undefined) return true;
            let found = false;
            for (let k = 0; k < a.editionData.length; k++) if (a.editionData[k] == '03-2024') found = true;
            return !found;
        });

        //now sort
        dataCurrentEdition.sort((a, b) => { return a.fullName.localeCompare(b.fullName, 'en-US'); });
        dataOtherEditions.sort((a, b) => { return a.fullName.localeCompare(b.fullName, 'en-US'); });

        dataCurrentEdition = dataCurrentEdition.filter((item) => { return ((item.fullName as string).search(this.state.searchTextInput) >= 0 ? true : false) });
        dataOtherEditions = dataOtherEditions.filter((item) => { return ((item.fullName as string).search(this.state.searchTextInput) >= 0 ? true : false) });

        this.listDataPreProcessed.push({ title: 'Current Edition "Autumn Abundance"', data: dataCurrentEdition })
        this.listDataPreProcessed.push({ title: "Previous Editions", data: dataOtherEditions })

        console.log("this.state.searchTextInput" + this.state.searchTextInput)

    }

    render() {
        return (
            <>
                <Image
                    style={{
                        // backgroundColor: 'skyblue',
                        top: 0, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height,
                        resizeMode: "cover",
                        opacity: 1.0
                    }}
                    source={require('../../../assets/screen-artists-bg.png')}
                />

                <ScreenHeader
                    text={"ARTISTS & PRACTITIONERS"}
                    color='#f8f6d3'
                    imgSrc={require('../../../assets/header-artists-bg.png')} />

                <ScreenHomeButton />

                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: '#3f5168',
                        top: 125,
                        left: 0,
                        height: 55,
                        width: Dimensions.get('screen').width,
                        // borderTopColor: '#edc36a',
                        borderTopWidth: 0,
                        // borderBottomColor: 'black',
                        // borderBottomWidth: StyleSheet.hairlineWidth,
                        opacity: 0.1
                    }} />

                {this.state.modelUpdateState == 2 &&
                    <ArtistListComponent
                        style={{
                            position: 'absolute',
                            backgroundColor: 'transparent',
                            left: 0, top: 180,
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').height - 100,
                            opacity: 1
                        }}
                        data={this.listDataPreProcessed} />
                }


                <TextInput
                    style={{
                        top: 135,
                        left: 25,
                        height: 35,
                        width: Dimensions.get('screen').width - 50,
                        padding: 10,
                        backgroundColor: '#1c1919',
                        borderWidth: 1,
                        borderColor: "#3f3b4a",
                        color: '#FFFFFF',
                        fontFamily: 'Cabin-Regular',
                        textAlignVertical: 'center',
                        letterSpacing: 2.0,
                        fontSize: 12,
                        opacity: 0.7

                    }}
                    clearButtonMode={'while-editing'}
                    placeholder="SEARCH BY ARTIST NAME"
                    onChangeText={(searchText) => {
                        console.log("TextInput Change" + searchText)
                        this.state.searchTextInput = searchText;
                        this.preProcessListData(DataModel.getInstance().dyn_dataArtistsList)
                        this.forceUpdate();
                    }}
                    defaultValue={""}
                />

                {this.state.modelUpdateState == 0 &&

                    <View style={{
                        backgroundColor: '#1c1919',
                        top: 0, left: 0, position: 'absolute',
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height,
                        opacity: 0.9
                    }} />
                }
            </>
        );
    }
}

export default ArtistListScreen;