import { Dimensions } from "react-native";
import LComponent from "../../core/LComponent";

const NavBarHighlight = (props) => {
      return (
        <>
            <LComponent
                name="navBarHighlight"
                style={{
                    backgroundColor: '#010101',
                    width: props.style.width,
                    height: 4,
                    bottom:props.bottomOffsetY
                }}
                visualProperties={{
                    alpha: 1.0, x: props.startX
                }}
            />
        </>
    );
}

export default NavBarHighlight;