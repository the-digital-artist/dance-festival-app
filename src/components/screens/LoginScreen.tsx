import React from "react";
import { Dimensions, Image, TextInput } from "react-native";
import DataModel from "../../DataModel";
import ActionLoginCompleted from "../../actions/ActionLoginCompleted";
import LComponent from "../../core/LComponent";
import LText from "../../core/LText";
import ButtonSmall from "../ButtonSmall";

class LoginScreen extends LComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedUser: DataModel.getInstance().dyn_userManagement.userDataIndexLoggedIn,
            textInputName: "",
            textInputPassword: "",
            secure: ""
        };
    }

    render() {
        let groupData = DataModel.getInstance().dyn_userManagement.userData;

        return (
            <LComponent
                name='loginScreenContainer'
                style={{
                    position: 'absolute',
                    backgroundColor: '#585d96',
                }}
                visualProperties={{
                    alpha: 1.0, x:  "windowWidth", y: 0, z: 0, w: "windowWidth", h: "windowHeight"
                }}>


                <LText id='Headline Small' style={[{
                    position: 'absolute',
                    top: 170,
                    left: 30,
                    letterSpacing: 2.0,
                    fontFamily: 'Quicksand-Regular',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    fontSize: 18,
                }, this.props.textStyle]}>
                    WELCOME TO CALDAC
                </LText>

                <LText id='Headline Small' style={[{
                    position: 'absolute',
                    top: 200,
                    left: 30,
                    letterSpacing: 2.0,
                    fontFamily: 'Quicksand-Regular',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    fontSize: 12,
                }, this.props.textStyle]}>
                    Colorado Afro-Latin Dance & Art Collective
                </LText>


                <LText id='Headline Small' style={[{
                    position: 'absolute',
                    top: 300,
                    left: 150,
                    letterSpacing: 1.5,
                    fontFamily: 'Quicksand-Regular',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    fontSize: 12,
                    width: Dimensions.get('screen').width - 150 - 60
                }, this.props.textStyle]}>
                    Please sign into your account. During the closed beta phase, just select yourself below (no password).
                </LText>
{/* 
                <Subheader
                    text="SIGN IN"
                    x={30} y={263}
                /> */}

                <Image
                    style={{
                        top: 302, left: 40, position: 'absolute',
                        width: 60, height: 60,
                        resizeMode: "contain",
                        opacity: 1
                    }}
                    source={require('../../../assets/logo-small.png')}
                />



                {/* <AppleAuthentificationButton
                    name='loginAppleButton'
                    style={{
                        position: 'absolute',
                        top: 600, left: (Dimensions.get('window').width - 40) / 2,
                        width: 40, height: 40,
                    }}
                    visualProperties={{ alpha: 0.3, x: 0, y: 0, z: 0 }}
                /> */}


                <ButtonSmall
                    name='noAccountButton'
                    style={{
                        position: 'absolute',
                        top: 500, left: 30,
                        width: 250, height: 14,
                        opacity: 1.0
                    }}
                    visualProperties={{ alpha: 1, x: 0, y: 0, z: 0 }}
                    textFontSize={14}
                    textDecorationLine='underline'
                    text="NO ACCOUNT YET? CREATE HERE >"

                />

                <TextInput
                    style={{
                        top: 400, left: 30, position: 'absolute',
                        height: 40, width: Dimensions.get('window').width - 60,
                        margin: 0, padding: 10,
                        borderWidth: 1,
                        borderColor: '#292c2e',
                        fontFamily: 'Montserrat-Regular',
                        textAlign: 'left',
                        textAlignVertical: 'top',
                        letterSpacing: 2.0,
                        color: '#ffffff', backgroundColor: '#1c1e21',
                        fontSize: 10,
                        opacity: 0.5
                    }}
                    placeholder="e-mail"
                    keyboardType="email-address"
                    keyboardAppearance="dark"
                    // autoFocus={true}
                    onChangeText={(e) => {
                        // DataModel.getInstance().dyn_userManagement.userDataEmailQuery = e.
                    }}
                    value={this.state.textInputName}
                />

                <TextInput
                    style={{
                        top: 445, left: 30, position: 'absolute',
                        height: 40, width: Dimensions.get('window').width - 60,
                        margin: 0, padding: 10,
                        borderWidth: 1,
                        borderColor: '#292c2e',
                        fontFamily: 'Montserrat-Regular',
                        textAlign: 'left',
                        textAlignVertical: 'top',
                        letterSpacing: 2.0,
                        // color: '#fdfaf6',  
                        color: '#ffffff',
                        backgroundColor: '#1c1e21',
                        fontSize: 10,
                        opacity: 0.5
                    }}
                    placeholder="password"
                    secureTextEntry={this.state.secure}
                    keyboardType="visible-password"
                    keyboardAppearance="dark"
                    // onChangeText={onChangeText}
                    value={this.state.textInputPassword}
                />

                <ButtonSmall
                    name={("loginButton")}
                    // source={require('../../../assets/button-info.png')}
                    style={{
                        position: 'absolute',
                        top: 520,
                        left: (Dimensions.get('window').width - 130) / 2,
                        height: 30,
                        width: 130,
                    }}
                    text={"LOGIN"}
                    bgBoxVisible={true}
                    bgBoxStyle={{
                        backgroundColor: '#12110e',
                        borderColor: '#fff9f3',
                        borderWidth: 1,
                        height: 30,
                        width: 130,
                    }}
                    fontStyle={{
                        fontFamily: 'Cabin-Regular',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        letterSpacing: 2.0,
                        color: '#FFFFFF',
                        fontSize: 10,
                        width: 130,
                    }}
                    visualProperties={{ alpha: 1 }}
                    onSelect={() => { ActionLoginCompleted() }}
                />

            </LComponent>
        );
    }
}

export default LoginScreen;