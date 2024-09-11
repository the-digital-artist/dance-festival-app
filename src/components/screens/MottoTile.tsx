import { Dimensions, Text } from 'react-native';


const MottoTile = (props) => {
    console.log("Rendering MottoTile")

    return (
        <>
        
            <Text allowFontScaling={false} id='textHeader'
                style={{
                    top: props.offsetY,
                    left: 0,
                    width: Dimensions.get('screen').width, height: 32,
                    color: '#232323',
                    fontFamily: 'Cabin-Regular',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    letterSpacing: 2.0,
                    fontSize: 12
                }}>
                {'Less wellness marketplace, more experiential tools to support your well-being.'.toLocaleUpperCase()}
            </Text>

        </>
    );
}

export default MottoTile;