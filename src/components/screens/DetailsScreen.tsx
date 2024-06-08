import React, { PureComponent } from "react";
import { Dimensions, Pressable } from "react-native";
import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";
import LComponent from "../../core/LComponent";
import TransitionDetailsBack from "../../transitions/TransitionDetailsBack";


class DetailsScreen extends PureComponent<any,any> {

    constructor(props) {
        super(props);

        this.state = { dataItem: props.item };
        LauncherController.getInstance().context.detailScreenReference = this;
    }

    render() {
        let item = this.state.dataItem;
        if(item==null) return;
        const artistData = DataModel.dataArtists[item.artistOne];
        
        return (
            <>
                <LComponent
                    name='detailsScreenContainer'
                    style={{
                        position: 'absolute',
                        backgroundColor: '#aa6eaa',
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height,
                    }}
                    visualProperties={{
                        alpha: 0,
                        x: 0, y: 0, z: 0
                    }}
                >
                    {/* <Image
                        style={{
                            // backgroundColor: 'skyblue',
                            top: 0, left: 0, position: 'absolute',
                            width: Dimensions.get('screen').width, height: Dimensions.get('screen').height,
                            resizeMode: "cover",
                            opacity: 1
                        }}
                        source={require('.,/../../assets/screen-mockup-detailsscreen.png')}
                    /> */}


{/* 
                    <Text allowFontScaling={false} id='textLabelDateTime' style={{
                        position: 'absolute',
                        top: 50,
                        left: 45,
                        height: 15,
                        // backgroundColor: 'indigo'
                        fontFamily: 'Arcon-Regular',
                        textAlign: 'center',
                        letterSpacing: 1.7,
                        color: '#FBB03A',
                        fontSize: 7,
                    }}>
                        DATE / TIME
                    </Text> */}


          





                    <Pressable id='buttonBack'
                        style={{
                            position: 'absolute',
                            top: 500,
                            left: 0,
                            width: Dimensions.get('screen').width, height: 60,
                            backgroundColor: 'indigo',
                        }}
                        onPress={() => { TransitionDetailsBack() }}
                    />

                </LComponent>

            </>
        );
    }

    updateDataItem() {
        let item = LauncherController.getInstance().context.focusedItemData
        this.setState({ dataItem: item });
      }
    
}

export default DetailsScreen;