import { FlashList } from "@shopify/flash-list";
import React, { PureComponent } from "react";
import { View } from "react-native";
import NavBar from "../navbar/NavBar";
import ScheduleListItem from "./ScheduleListItem";
import ScheduleListSectionRenderer from "./ScheduleListSectionRenderer";



class SchedulerListComponent extends PureComponent<any, any> {
    data = null

    constructor(props) {
        super(props);
        this.data = props.data
    }

    render() {
        //flashlist expects different format
        //scheduleList.data has the form  { title: "Section 1", data: [{ id: ..., sessionMainTitle: ...}] },
        // flashlists expects a dlat list in form [{title: "Section 1"}, { id: ..., sessionMainTitle: ...}...]

        let flashListData = []
        let itemTypeMap = { "section": 0, "sessionItem": 1 }

        for (let k = 0; k < this.data.length; k++) {
            flashListData.push({ type: itemTypeMap['section'], title: this.data[k].title });
            for (let l = 0; l < this.data[k].data.length; l++) {
                this.data[k].data[l]['type'] = itemTypeMap['sessionItem']
                flashListData.push(this.data[k].data[l]);
            }
        }
        const stickyHeaderIdxs = flashListData
            .map((item, index) => { return (item.type == itemTypeMap['section'])? index: null;})
            .filter((item) => item !== null) as number[];


        return (
            <>
                <View style={this.props.style}>
                    <FlashList
                        data={flashListData}
                        renderItem={({ item, index }) => {
                            return (item.type == itemTypeMap["section"]) ?
                                <ScheduleListSectionRenderer section={item} /> :
                                <ScheduleListItem item={item} index={index} />;
                        }}
                        stickyHeaderIndices={stickyHeaderIdxs}
                        getItemType={(item) => { return item.type }}
                        estimatedItemSize={100}
                        ListFooterComponent={() => (<View style={{ height: NavBar.navBarHeight + 170 }} />)}
                    />
                </View>

                {/* <GestureDetector gesture={scheduleList.nativeGestureObj}> */}
                {/* <SectionList
                                        ref={(list) => { scheduleList.flatListRef = list; }}
                                        style={{
                                            // backgroundColor: '#25649a',
                                            // borderTopWidth: 2,
                                            // borderColor:'#c75e2c',
                                            left: 0, top: 0,
                                            width: Dimensions.get('screen').width - offsetX,
                                            height: Dimensions.get('screen').height - offsetY - 10,
                                            opacity: 1
                                        }}
                                        sections={scheduleList.data}
                                        keyExtractor={item => item.id}
                                        renderItem={ScheduleListItem}
                                        renderSectionHeader={ScheduleListSectionRenderer}
                                        renderSectionFooter={({section: {title}}) => (
                                            <View style={{
                                                height: 10
                                            }} />
                                        )}
                                        ListFooterComponent={() => (
                                            <View style={{
                                                height: NavBar.navBarHeight + 170
                                            }} />
                                        )}

                                    /> */}

                {/* <FlatList
                                            ref={(list) => { scheduleList.flatListRef = list; }}
                                            style={{
                                                // backgroundColor: '#25649a',
                                                // borderTopWidth: 2,
                                                // borderColor:'#c75e2c',
                                                left: 0, top: 20,
                                                width: Dimensions.get('screen').width - offsetX,
                                                height: Dimensions.get('screen').height - offsetY - 10,
                                                opacity: 1
                                            }}
                                            data={scheduleList.data}
                                            renderItem={ScheduleListItem}
                                            keyExtractor={item => item.id}
                                            ListFooterComponent={() => (
                                                <View style={{ 
                                                    height:NavBar.navBarHeight+50}}/>
                                            )}
                                        /> */}
                {/* </GestureDetector> */}
            </>
        );
    }
}

export default SchedulerListComponent;