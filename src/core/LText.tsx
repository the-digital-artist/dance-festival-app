import { PureComponent } from "react";
import { Text } from "react-native";

class LText extends PureComponent<any,any> {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('TEXT RENDER '+JSON.stringify(this.props))
        // let newProps:Object = structuredClone(this.props);
     

        // const newProps = this.props;
        
        return (
            <Text {...this.props} />
        );

    }
}

export default LText