import { Dimensions, StyleSheet, Text, View } from "react-native";
import LComponent from "../core/LComponent";

class Subheader extends LComponent {

    constructor(props) {
        super(props);  
        this.state = {};
    }


    render() {
        const textString = this.props.text;
        const x = this.props.y?this.props.x:0;
        const y = this.props.y?this.props.y:0;
        return (
            <>
               <Text id='Headline Small' style={[{
                position: 'absolute', 
                top: this.props.y, 
                left: x,
                letterSpacing: 2.0,
                fontFamily: 'Quicksand-Regular',
                textAlign: 'left',
                color: '#FFFFFF',
                fontSize: 16,
            },this.props.textStyle]}>
               {this.props.text}
            </Text>

            <View
                style={{
                    position: 'absolute', 
                    top: y+24, 
                    left: x,
                    width: Dimensions.get('window').width - 2 * x,
                    borderBottomColor: '#FFFFFFFF',
                    borderBottomWidth: 2*StyleSheet.hairlineWidth,
                }}
            />
            </>
        );
    }
}

export default Subheader;