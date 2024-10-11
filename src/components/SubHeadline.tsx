import LText from "../core/LText";

const SubHeadline = (props) => {
    return (
        <LText id='headerSessionDetails' style={[{
            position: 'absolute',
            fontFamily: 'Cabin-Regular',
            // backgroundColor: 'skyblue',
            textAlign: 'left',
            letterSpacing: 1.0,
            opacity: 0.7,
            color: '#FFFFFF',
            fontSize: 10,
        },props.style]}>
            {props.text}
        </LText>

    );
}

export default SubHeadline;