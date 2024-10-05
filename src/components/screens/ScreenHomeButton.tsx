import Constants from 'expo-constants';
import { Dimensions, Image, View } from "react-native";

const ScreenHomeButton = (props) => {
  const statusBarHeight = Constants.statusBarHeight;
  return (
    <>

      <Image
        style={{
          top: (statusBarHeight + 20), right: 10, position: 'absolute',
          width: 100, height: 32
        }}
        source={require('../../../assets/header_logo_small.png')}
      />
      {/* <ButtonSmall
        source={require('../../../assets/header_logo_small.png')}
        style={{
          position: 'absolute',
          top: 50, right: 15,
          width: 45,
          height: 45,
        }}
        imageStyle={[{
          position: 'absolute',
          right: undefined, left: undefined,
          width: 45,
          height: 45,
          resizeMode: "contain",
          opacity: 0.9,
        }]}
        bgBoxVisible={false}
        visualProperties={{ alpha: 1 }}
        onSelect={() => { TransitionNavbarSelect(0) }}
      /> */}
    </>
  );
}

export default ScreenHomeButton;