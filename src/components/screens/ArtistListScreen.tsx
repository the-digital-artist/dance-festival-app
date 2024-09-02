import React, { PureComponent } from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import ArtistListItemRenderer from "./ArtistListItemRenderer";
import ScreenHeader from "./ScreenHeader";
import ScreenHomeButton from "./ScreenHomeButton";
import { TextInput } from "react-native-gesture-handler";
import NavBar from "../navbar/NavBar";


class ArtistListScreen extends PureComponent {
    artistListRef: any = null;
    state = {
        modelUpdateState: 0, //0-not-initialized, 1-for updating, 2-ready
        dataModelList: null,
        searchTextInput: ""
    }

    constructor(props) {
        super(props);

        LauncherController.getInstance().context.stackNavigator = props.navigation;
        LauncherController.getInstance().context.dataDependentComponentArtistScreen = this;

        this.state.modelUpdateState = 2;
        this.state.dataModelList = DataModel.getInstance().dyn_dataArtistsList;
        this.state.searchTextInput = "";


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
        if (this.state.dataModelList!=null && this.state.modelUpdateState == 2) {
            this.state.dataModelList.sort((a, b) => {
                // console.log("___________compare: "+a.fullName+" "+b.fullName+" "+(a.fullName>b.fullName?1:(a.fullName<b.fullName?-1:0)))
                // console.log("___________compare: imgSrc b: "+b.imgSrc);
                let returnValue = 0;
                if (a.imgSrc == undefined && b.imgSrc != undefined) returnValue = 1;
                if (a.imgSrc != undefined && b.imgSrc == undefined) returnValue = -1;
                if (a.imgSrc == undefined && b.imgSrc == undefined || a.imgSrc != undefined && b.imgSrc != undefined) returnValue = (a.fullName > b.fullName) ? 1 : -1

                return returnValue;
            });
        }


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
                    <FlatList
                        ref={(list) => { this.artistListRef = list }}
                        style={{
                            position: 'absolute',
                            backgroundColor: 'transparent',
                            left: 0, top: 180,
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').height - 100,
                            opacity: 1
                        }}
                        data={this.state.dataModelList}
                        renderItem={ArtistListItemRenderer}
                        keyExtractor={item => item.fullName}
                        ListFooterComponent={() => (
                            <View style={{ 
                                marginTop:20,
                                height:NavBar.navBarHeight+50}}/>
                        )}
                    />
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
                        this.setState({
                            searchTextInput: searchText,
                            modelUpdateState: 2,
                            dataModelList: DataModel.getInstance().dyn_dataArtistsList.filter((item) => { return ((item.fullName as string).search(searchText) >= 0 ? true : false) })
                        })
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
    componentDidMount(): void {
        LauncherController.getInstance().context.artistListReference = this.artistListRef;
    }


    startModelUpdate() {
        console.log("___________ArtistListScreen setting state 1");
        this.setState({ modelUpdateState: 1, dataModelList: null })
    }
    finishModelUpdate() {
        // console.log("___________ArtistListScreen finishModelUpdate -  update (state 2)"); 
        this.setState({ modelUpdateState: 2, dataModelList: DataModel.getInstance().dyn_dataArtistsList })
    }
}

export default ArtistListScreen;