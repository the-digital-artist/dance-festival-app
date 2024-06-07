import React, { Component } from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import DataModel from "../../DataModel";
import LComponent from "../../core/LComponent";
import ArtistListItemRenderer from "./ArtistListItemRenderer";
import ScreenHeader from "./ScreenHeader";
import LauncherController from "../../LauncherController";


class ArtistListScreen extends Component {
    artistListRef: any = null;

    constructor(props) {
        super(props);

        LauncherController.getInstance().context.stackNavigator = props.navigation;
    }

    render() {

        return (
            <>


                   <View
                    style={{
                        position: 'absolute',
                        backgroundColor: '#EF4260',
                        left: 0, top: 0,
                        width: Dimensions.get('screen').width,
                        height: 90,
                        opacity: 1
                    }}
                   />
                     
                    <FlatList
                        ref={(list) => this.artistListRef = list}
                        style={{
                            position: 'absolute',
                            backgroundColor: '#1c1919',
                            left: 0, top: 90,
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').height - 100,
                            opacity: 1
                        }}
                        data={DataModel.dataArtistsList}
                        renderItem={ArtistListItemRenderer}
                    />

            </>
        );
    }
    componentDidMount(): void {
        LauncherController.getInstance().context.artistListReference = this.artistListRef;
    }
}

export default ArtistListScreen;