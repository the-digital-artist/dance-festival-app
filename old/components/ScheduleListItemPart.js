
import { StyleSheet, TouchableOpacity, Button, Text, Image, View, ScrollView, Dimensions, SectionList, SafeAreaView, useWindowDimensions, Platform, Alert, Linking, Animated, Easing } from 'react-native';
import ActionPopulateAndGoDetailsScreen from '../ActionPopulateAndGoDetailsScreen';
import { Component, useRef } from 'react';
import LauncherController from '../LauncherController';

class ScheduleListItemPart extends Component {

    fadeAnim = null;
    scaleTweenValue = null;
    scaleBackgroundH = null;


    constructor(props) {
        super(props)

        let favIsSet = false;
        this.state = { isChecked: favIsSet };
        this.fadeAnim = new Animated.Value(favIsSet ? 1 : 0);
        this.scaleTweenValue = new Animated.Value(favIsSet ? 1.0 : 0.9);
        this.scaleBackgroundH = new Animated.Value(favIsSet ? Dimensions.get('window').width : Dimensions.get('window').width / 2);

    }

    render() {
        // this.props = props;
        // { item, navigation, alignment, sessionId }

        let padding = 5;
        let paddingRight = this.props.alignment == 'right' ? padding : undefined;
        let paddingLeft = this.props.alignment == 'left' ? padding : undefined;
        let sessionItem = this.props.item[this.props.sessionId];
        let itemHeight = this.props.isLargeItem ? 150 : 100

        let highlightIncrease = 40;


        return (
            <View style={{
                position: 'absolute',
                backgroundColor: 'transparent',
                top: 0,
                left: (paddingLeft== undefined?undefined:0), right:(paddingRight== undefined?undefined:0),
                height: itemHeight,
                width: Dimensions.get('window').width / 2
            }}>


                <Animated.View id='highlightOrange'
                    style={{
                        left: (paddingLeft== undefined?undefined:0), right:(paddingRight== undefined?undefined:0),
                        backgroundColor: '#ffbf11',
                        position: 'absolute', top: 0,
                        opacity: this.fadeAnim,
                        width: this.state.isChecked ? Dimensions.get('window').width / 2 + highlightIncrease : Dimensions.get('window').width / 2,
                        height: itemHeight,
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }} />


                <Animated.Text id='sessionRoom'
                    onPress={() => {
                        ActionPopulateAndGoDetailsScreen(sessionItem, LauncherController.getInstance().navigator);
                    }}
                    style={{
                        // backgroundColor: 'darkslateblue',
                        left: paddingLeft, right: paddingRight,
                        position: 'absolute', top: 10,
                        height: 12,
                        color: this.state.isChecked == true ? '#000000' : '#FFFFFF',
                        fontFamily: 'AktivGrotesk-Regular',
                        textAlign: this.props.alignment,
                        fontSize: 10,
                        letterSpacing: -0.1,

                    }}>
                    {sessionItem.artistName == '' ? '' : sessionItem.room}
                </Animated.Text>

                <Animated.Text id='sessionTime'
                    onPress={() => {
                        ActionPopulateAndGoDetailsScreen(sessionItem, LauncherController.getInstance().navigator);
                    }}
                    style={{
                        // backgroundColor: 'dodgerblue',
                        opacity: this.fadeAnim,
                        left: paddingRight==undefined?undefined:-35, right: paddingLeft==undefined?undefined:-35,
                        position: 'absolute', top: 10,
                        height: 12,
                        color: this.state.isChecked == true ? '#000000' : '#FFFFFF',
                        fontFamily: 'AktivGrotesk-Regular',
                        textAlign: this.props.alignment,
                        fontSize: 12,
                        letterSpacing: -0.1,

                    }}>
                    {sessionItem.artistName == '' ? '' : sessionItem.time}
                </Animated.Text>


                <Animated.Text id='sessionArtistName'
                    onPress={() => {
                        ActionPopulateAndGoDetailsScreen(sessionItem, this.props.navigation);
                    }}
                    style={{
                        // backgroundColor: 'skyblue',
                        transform: [{ scale: this.scaleTweenValue }],
                        left: paddingLeft, right: paddingRight,
                        position: 'absolute', top: 50,
                        height: 30,
                        color: this.state.isChecked == true ? '#000000' : '#FFFFFF',
                        fontFamily: 'RamaGothicEW01-Regular',
                        textAlign: this.props.alignment,
                        fontSize: 24,
                        letterSpacing: -0.1,

                    }}>
                    {sessionItem.artistName}
                </Animated.Text>

                <Animated.Text id='sessionSubtitle'
                    onPress={() => {
                        ActionPopulateAndGoDetailsScreen(sessionItem, this.props.navigation);
                    }}
                    style={{
                        // backgroundColor: 'cornflowerblue',
                        transform: [{ scale: this.scaleTweenValue }],
                        position: 'absolute', top: 32,
                        left: paddingLeft, right: paddingRight,
                        fontFamily: 'AktivGrotesk-Regular',
                        color: this.state.isChecked == true ? '#000000' : '#FFFFFF',
                        fontSize: 15,
                        textAlign: this.props.alignment,
                        fontWeight: 'normal',
                        height: 18,
                    }}>
                    {sessionItem.sessionSubtitle}
                </Animated.Text>

                <Animated.Text id='sessionDescription'
                    onPress={() => {
                        ActionPopulateAndGoDetailsScreen(sessionItem, this.props.navigation);
                    }}
                    style={{
                        // backgroundColor: 'lightsteelblue',
                        transform: [{ scale: this.scaleTweenValue }],
                        position: 'absolute', top: 85,
                        left: paddingLeft, right: paddingRight,
                        fontFamily: 'AktivGrotesk-Regular',
                        color: this.state.isChecked == true ? '#000000' : '#FFFFFF',
                        fontSize: 15,
                        width:150,
                        textAlign: this.props.alignment,
                        fontWeight: 'normal',
                        height: 33,
                    }}>
                    {sessionItem.sessionDescription}
                </Animated.Text>
            </View>

        );
    }

    updateHighlightState(value) {
        // console.log('updateHighlightState');
        this.setState({ isChecked: value })

        Animated.timing(this.fadeAnim, {
            delay: 0,
            toValue: value == true ? 1 : 0,
            easing: Easing.quad,
            duration: 240,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.scaleTweenValue, {
            delay: 0,
            toValue: value == true ? 1.0 : 0.9,
            easing: Easing.quad,
            duration: 240,
            useNativeDriver: true,
        }).start();

        Animated.timing(this.scaleBackgroundH, {
            delay: 0,
            toValue: value == true ? Dimensions.get('window').width : Dimensions.get('window').width / 2,
            easing: Easing.quad,
            duration: 240,
            useNativeDriver: true,
        }).start();
    }

}

export default ScheduleListItemPart;