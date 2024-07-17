import React, { PureComponent } from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import ArtistListItemRenderer from "./ArtistListItemRenderer";
import ScreenHeader from "./ScreenHeader";
import ScreenHomeButton from "./ScreenHomeButton";


class ArtistListScreen extends PureComponent {
    artistListRef: any = null;
    state = {
        modelUpdateState: 0, //0-not-initialized, 1-for updating, 2-ready
        dataModelList: null
    }

    constructor(props) {
        super(props);

        LauncherController.getInstance().context.stackNavigator = props.navigation;
        LauncherController.getInstance().context.dataDependentComponentArtistScreen = this;

        this.state.modelUpdateState = 2;
        this.state.dataModelList = DataModel.dyn_dataArtistsList;
    }

    render() {
        // console.log("___________ArtistListScreen render ")
        // console.log("___________ArtistListScreen render - state dataModel: "+JSON.stringify(this.state.dataModelList, null, 2)); 
        //add one empty artist item into the list for presentation reasons
        if (this.state.dataModelList!=null && this.state.dataModelList!=undefined &&
            this.state.dataModelList[this.state.dataModelList.length - 1].key != "NONE") {
            this.state.dataModelList.push(
                {
                    "fullName": "", "insta": "", "bio": "", "facebook": "", "portrait": "", "imgSrc": -1, "shortBio": "",
                    "key": "NONE", "index": this.state.dataModelList.length, "sessionIds": []
                }
            );
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
                <View
                    style={{
                        position: 'absolute',
                        backgroundColor: '#64615f',
                        left: 0, top: 0,
                        width: Dimensions.get('screen').width,
                        height: 105,
                        opacity: 1
                    }}
                />

                <ScreenHeader
                    text={"ARTISTS"}
                    color='#FFFFFF'
                    imgSrc={require('../../../assets/header-artists-bg.png')} />

                {this.state.modelUpdateState == 2 &&
                    <FlatList
                        ref={(list) => { this.artistListRef = list }}
                        style={{
                            position: 'absolute',
                            backgroundColor: 'transparent',
                            left: 0, top: 135,
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').height - 100,
                            opacity: 1
                        }}
                        data={this.state.dataModelList}
                        renderItem={ArtistListItemRenderer}
                        keyExtractor={item => item.fullName}
                    />
                }

                <ScreenHeader text={"ARTISTS & DJs"} color='#f8f6d3' />
                <ScreenHomeButton />



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
        console.log("___________ArtistListScreen finishModelUpdate -  update (state 2)"); 
        this.setState({ modelUpdateState: 2, dataModelList: DataModel.dyn_dataArtistsList })
    }
}

export default ArtistListScreen;