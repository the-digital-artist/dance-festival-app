import { PureComponent } from "react";
import { View } from "react-native";
import ScheduleListItemType1 from "../components/schedulelist/ScheduleListItemType1";

class LList extends PureComponent<any, any> {

    listData: [] = null;
    renderItem = null;
    keyExtractor = null;

    state = {
        modelUpdateState: 0, //0-not-initialized, 1-for updating, 2-ready
        dataModelList: null
    }

    constructor(props) {
        super(props);
        this.listData = this.props.data
    }

    render() {
        if(this.listData == null || this.listData.length==0 || this.state.modelUpdateState==1) return null;

        return (
            <>
            <View style={this.props.style}>
                {/* {this.listData.map((dataItem) => {
                    return(
                        return ScheduleListItemType1(dataItem, 0)
                    )

                }

                )} */}

            </View>
           
            </>
        );
    }
    componentDidMount(): void {
    }


    startModelUpdate() {
        console.log("___________ArtistListScreen setting state 1");
        // this.setState({ modelUpdateState: 1, dataModelList: null })
    }
    finishModelUpdate() {
        console.log("___________ArtistListScreen finishModelUpdate -  update (state 2)");
        // this.setState({ modelUpdateState: 2, dataModelList: null })
    }
}

export default LList;