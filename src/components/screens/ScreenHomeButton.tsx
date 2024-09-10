import ButtonSmall from "../ButtonSmall";
import TransitionNavbarSelect from "../navbar/TransitionNavbarSelect";

const ScreenHomeButton = (props) => {
  const size = 45;

  return (
    <>
      <ButtonSmall
        source={require('../../../assets/logo-small.png')}
        style={{
          position: 'absolute',
          top: 40, right: 15,
          width: size,
          height: size,
        }}
        imageStyle={[{
          position: 'absolute',
          right: undefined, left: undefined,
          width: size,
          height: size,
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