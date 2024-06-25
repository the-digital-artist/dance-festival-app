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
                    height: 4,
                    bottom:props.bottomOffsetY
                }}
                visualProperties={{
                    alpha: 0.0, x: props.startX
                }}
            />
        </>
    );
}

export default NavBarHighlight;