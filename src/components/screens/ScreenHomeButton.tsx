import ButtonSmall from "../ButtonSmall";
import TransitionNavbarSelect from "../navbar/TransitionNavbarSelect";

const ScreenHomeButton = (props) => {

  return (
    <>
      <ButtonSmall
        source={require('../../../assets/logo-small.png')}
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
      />
    </>
  );
}

export default ScreenHomeButton;