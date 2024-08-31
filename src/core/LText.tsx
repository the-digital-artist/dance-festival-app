import { PureComponent } from "react";
import { Text } from "react-native";

class LText extends PureComponent<any, any> {
    textRef = null;

    constructor(props) {
        super(props);
    }

    render() {
        const mergeProps = this.props as any;
        mergeProps['allowFontScaling'] = false;
        // mergeProps['selectable'] = true;
        // mergeProps['numberOfLines'] = 0

        return (
            <Text
                // ref={(e) => {
                    // this.textRef = e;
                    // if(e==null) return;
                    // e.measure((fx, fy, width, height, px , py) => console.log(this.props.children+' textRef offset height:' + height));
                // }}
                {...mergeProps}>
                {this.props.children}
            </Text>
        );
    }
}

export default LText