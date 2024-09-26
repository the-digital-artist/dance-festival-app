import React, { PureComponent } from "react";
import { Dimensions, Image, Platform, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import ScreenHeader from "../screens/ScreenHeader";
import ScreenHomeButton from "../screens/ScreenHomeButton";
import ArtistListComponent from "./ArtistListComponent";
import NavBar from "../navbar/NavBar";
import IDataDependentComponent from "../../IDataDependentComponent";


class ArtistListScreen extends PureComponent implements IDataDependentComponent {
    listDataPreProcessed = []

    state = {
        modelUpdateState: 0, //0-not-initialized, 1-for updating, 2-ready
        searchTextInput: ""
    }


    constructor(props) {
        super(props);

        LauncherController.getInstance().context.stackNavigator = props.navigation;
        LauncherController.getInstance().context.dataDependentComponents.push(this);


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

        //first get the first letter
        rawData.sort((a, b) => { return a.fullName.localeCompare(b.fullName, 'en-US'); });
        let firstLetters = {}
        for (let i = 0; i < rawData.length; i++)
            firstLetters[rawData[i].fullName.slice(0, 1)] = 1

        //sort alphabetically, filter by search string, sectionize by letter
        for (let letter in firstLetters) {
            let dataCurrentSection = rawData.filter((a) => { return (a.fullName as string).startsWith(letter) });
            dataCurrentSection = dataCurrentSection.filter((item) => { return ((item.fullName as string).search(this.state.searchTextInput) >= 0 ? true : false) });
            dataCurrentSection.sort((a, b) => { return a.fullName.localeCompare(b.fullName, 'en-US'); });
            this.listDataPreProcessed.push({ title: letter, data: dataCurrentSection })
        }
        console.log("this.state.searchTextInput" + this.state.searchTextInput)
    }

    render() {
        // console.log("___________ArtistListScreen render ")
        // console.log("___________ArtistListScreen render - state dataModel: "+JSON.stringify(this.state.dataModelList, null, 2)); 
        //add one empty artist item into the list for presentation reasons
        // if (this.state.dataModelList != null && this.state.dataModelList != undefined &&
        //     this.state.dataModelList[this.state.dataModelList.length - 1].key != "NONE") {
        //     this.state.dataModelList.push(
        //         {
        //             "fullName": "", "insta": "", "bio": "", "facebook": "", "portrait": "", "imgSrc": -1, "shortBio": "",
        //             "key": "NONE", "index": this.state.dataModelList.length, "sessionIds": []
        //         }
        //     );
        // }
        //sort list
        // if (this.state.dataModelList!=null && this.state.modelUpdateState == 2) {
        //     this.state.dataModelList.sort((a, b) => {
        //         // console.log("___________compare: "+a.fullName+" "+b.fullName+" "+(a.fullName>b.fullName?1:(a.fullName<b.fullName?-1:0)))
        //         // console.log("___________compare: imgSrc b: "+b.imgSrc);
        //         let returnValue = 0;
        //         if (a.imgSrc == undefined && b.imgSrc != undefined) returnValue = 1;
        //         if (a.imgSrc != undefined && b.imgSrc == undefined) returnValue = -1;
        //         if (a.imgSrc == undefined && b.imgSrc == undefined || a.imgSrc != undefined && b.imgSrc != undefined) returnValue = (a.fullName > b.fullName) ? 1 : -1

        //         return returnValue;
        //     });
        // }


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
                    text={"ARTISTS & DJs"}
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
                            // backgroundColor: 'skyblue',
                            left: 0, top: Platform.OS == 'ios' ? 180 : 125,
                            width: Dimensions.get('screen').width,
                            height: Platform.OS == 'ios' ? (Dimensions.get('screen').height - 100) : (Dimensions.get('screen').height - 145),
                            opacity: 1
                        }}
                        data={this.listDataPreProcessed} />
                }


                {Platform.OS != 'android' &&
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
                }

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