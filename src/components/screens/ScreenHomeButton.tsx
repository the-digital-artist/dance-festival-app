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
          width: 100, height: 32
        }}
        imageStyle={[{
          position: 'absolute',
          right: 0, left: undefined,
          width: 100, height: 32,
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