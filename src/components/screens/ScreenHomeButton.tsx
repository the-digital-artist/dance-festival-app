import ButtonSmall from "../ButtonSmall";
import TransitionNavbarSelect from "../navbar/TransitionNavbarSelect";

const ScreenHomeButton = (props) => {

  return (
    <>
      <ButtonSmall
        source={require('../../../assets/logo-small.png')}
        style={{
          position: 'absolute',
          top: 45, right: 15,
          width: 40,
          height: 40,
        }}
        imageStyle={[{
          position: 'absolute',
          right: undefined, left: undefined,
          width: 40,
          height: 40,
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