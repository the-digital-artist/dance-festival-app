import { Dimensions } from "react-native";
import LComponent from "../../core/LComponent";

const NavBarHighlight = (props) => {
      return (
        <>
            <LComponent
                name="navBarHighlight"
                style={{
                    backgroundColor: '#EFEFEF',
                    width: props.style.width,
                    height: 4
                }}
                visualProperties={{
                    alpha: 1.0, x: props.startX, y: (Dimensions.get("window").height-props.bottomOffsetY)
                }}
            />
        </>
    );
}

export default NavBarHighlight;