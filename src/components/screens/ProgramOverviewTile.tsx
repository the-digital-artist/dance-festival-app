import { BlurView } from 'expo-blur';
import { Dimensions, Platform, Text, View } from 'react-native';
import DataModel from '../../DataModel';
import HomeScreen from './HomeScreen';
import HomeScreenProgramItem from './HomeScreenProgramItem';


const ProgramOverviewTile = (props) => {
    // console.log("Rendering EarlyPassesTile")

    return (
        <>
            <View
                style={{
                    top: Dimensions.get("screen").height > 800 ? 240 + HomeScreen.homeProgramItemSpacingY : 40,
                    // backgroundColor:'red',
                    width: Dimensions.get("screen").width,
                    height: (HomeScreen.homeProgramItemHeight + HomeScreen.homeProgramItemSpacingY) * DataModel.getInstance().static.dataModelProgram.length,
                }}>
                {Platform.OS == "ios" && <BlurView
                    intensity={17}
                    style={{
                        // backgroundColor:'skyblue',
                        position: 'absolute',
                        opacity: 1.0,
                        left: 0,
                        top: 0,
                        width: Dimensions.get("screen").width,
                        height: (HomeScreen.homeProgramItemHeight + HomeScreen.homeProgramItemSpacingY) * DataModel.getInstance().static.dataModelProgram.length - 5,

                    }} />
                }
                <Text allowFontScaling={false} id='textHeader'
                    style={{
                        top: -25,
                        left: 0,
                        width: Dimensions.get('screen').width, height: 32,
                        color: '#f8f6d3',
                        fontFamily: 'Cabin-Regular',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        letterSpacing: 2.0,
                        fontSize: 12
                    }}>
                    {'PROGRAM OVERVIEW'}
                </Text>


                {DataModel.getInstance().dyn_dataModelProgram.map(
                    (itemData, i) => HomeScreenProgramItem({ itemData, i })
                )}
            </View>
        </>
    );
}

export default ProgramOverviewTile;