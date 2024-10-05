import React, { memo, PureComponent } from "react";
import { Dimensions, SectionList, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import NavBar from "../navbar/NavBar";
import ArtistListItemRenderer from "./ArtistListItemRenderer";
import { FlashList } from "@shopify/flash-list";
import ScheduleListSectionRenderer from "../schedulelist/ScheduleListSectionRenderer";
import ArtistListSectionRenderer from "./ArtistListSectionRenderer";
import LauncherController from "../../LauncherController";



class ArtistListComponent extends PureComponent<any, any> {
    data = null

    implementation = "SectionList"

    structuredDataItemTypes = { "section": 0, "item": 1 }
    structuredData = []
    structuredDataSectionItemIndices;

    listRef = null


    constructor(props) {
        super(props);

        LauncherController.getInstance().context.artistListReference = this;
    }

    preProcessData() {
        if (this.implementation == "FlashList") {
            for (let k = 0; k < this.data.length; k++) {
                this.structuredData.push({ type: this.structuredDataItemTypes['section'], title: this.data[k].title });
                for (let l = 0; l < this.data[k].data.length; l++) {
                    this.data[k].data[l]['type'] = this.structuredDataItemTypes['item']
                    this.structuredData.push(this.data[k].data[l]);
                }
            }
            this.structuredDataSectionItemIndices = this.structuredData
                .map((item, index) => { return (item.type == this.structuredDataItemTypes['section']) ? index : null; })
                .filter((item) => item !== null) as number[];
        } else if (this.implementation == "SectionList") {
            this.structuredData = this.data
        }
    }

    scroll(artistItem) {
        let sectionIndex = -1
        let itemIndex = -1;

        for (let i = 0; i < this.structuredData.length && sectionIndex == -1; i++) {
            for (let j = 0; j < this.structuredData[i].data.length && itemIndex == -1; j++) {
                if (this.structuredData[i].data[j].fullName == artistItem.fullName) {
                    sectionIndex = i; itemIndex = j
                    break;
                }
            }
        }


        if (this.implementation == "FlatList") {
            this.listRef.scrollToIndex({ animated: true, index: itemIndex, viewOffset: 0, viewPosition: 0 })
        }

        if (this.implementation == "SectionList" && sectionIndex!=-1 && itemIndex!=-1) {
            console.log("sectionIndex: "+sectionIndex+ " | itemIndex: "+itemIndex);
            
            this.listRef.scrollToLocation({ animated: true, sectionIndex: sectionIndex, itemIndex: itemIndex+1, viewOffset: 0, viewPosition: 0 })
        }
    }

    render() {
        // console.log('ArtistListComponent---ReRender inner component');

        this.data = this.props.data
        this.preProcessData();

        return (
            <>
                {this.implementation == "SectionList" &&
                    <SectionList
                        style={this.props.style}
                        ref={(list) => { this.listRef = list; }}
                        sections={this.structuredData}
                        keyExtractor={item => item.fullName}
                        renderItem={({ item, index }) => { return <ArtistListItemRenderer item={item} index={index} />}}
                        renderSectionHeader={ArtistListSectionRenderer}
                        stickySectionHeadersEnabled
                        onScrollToIndexFailed={e => { console.log('onScrollToIndexFailed');
                            setTimeout(() => {this.listRef.current?.scrollToIndex({ index: e.index, animated: true }); }, 500); }}
                        // getItemLayout={(data,index) => ({length:130, offset:index*130, index: index})}
                        ListFooterComponent={() => (
                            <View style={{
                                height: NavBar.navBarHeight
                            }} />
                        )} 
                        />
                }

                {this.implementation == "FlashList" &&
                    <View style={[this.props.style]}>
                        <FlashList
                            ref={(list) => { this.listRef = list; }}
                            data={this.structuredData}
                            renderItem={({ item, index }) => {
                                return (item.type == this.structuredDataItemTypes["section"]) ?
                                    <ArtistListSectionRenderer section={item} /> :
                                    <ArtistListItemRenderer item={item} index={index} />;
                            }}
                            stickyHeaderIndices={this.structuredDataSectionItemIndices}
                            getItemType={(item) => { return item.type }}
                            estimatedItemSize={130}
                            ListFooterComponent={() => (
                                <View style={{
                                    marginTop: 20,
                                    height: NavBar.navBarHeight + 130
                                }} />
                            )}
                        />
                    </View>
                }


                {this.implementation == "FlatList" &&
                    <FlatList
                        ref={(list) => { this.listRef = list; }}
                        style={this.props.style}
                        data={this.data}
                        renderItem={({ item, index }) => {return <ArtistListItemRenderer />}}
                        keyExtractor={item => item.fullName}
                        ListFooterComponent={() => (
                            <View style={{
                                marginTop: 20,
                                height: NavBar.navBarHeight + 50
                            }} />
                        )}
                    />
                }
            </>
        );
    }
}

export default ArtistListComponent;