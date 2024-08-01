import React, { Component, useMemo, useRef } from "react";
import ScheduleListItem from "./ScheduleListItem";
import DataModel from "../DataModel";
import { Animated, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScheduleListItemPart from "./ScheduleListItemPart";
import ScheduleListItemToggle from "./ScheduleListItemToggle";


class TutorialScreen extends Component {
    animation = new Animated.Value(1);

    refToggle1 = React.createRef();
    refToggle2 = React.createRef();
    refItemPart1 = React.createRef();
    refItemPart2 = React.createRef();

    dataTutorialItem =
        {
            "session1": {
                "id": 100,
                "flag": false,
                "room": "Main Hall",
                "sectionTitle": "Sunday",
                "date": "Sun, 11 Feb 2024",
                "time": "16:40 - 17:40",
                "place": "Main Hall",
                "artistOne": "Yoyo Flow",
                "artistTwo": "",
                "artistName": "Yoyo Flow",
                "sessionSubtitle": "Reparto"
            },
            "session2": {
                "id": 101,
                "flag": false,
                "room": "Room 2",
                "sectionTitle": "Sunday",
                "date": "Sun, 11 Feb 2024",
                "time": "16:40 - 17:40",
                "place": "Room 2",
                "artistOne": "Roger Palombella",
                "artistTwo": "Edyta Kwasna",
                "artistName": "Roger & Edyta",
                "sessionSubtitle": "Solo Styling"
            }
        };

    constructor(props) {
        super(props);
    }

    startAnimations() {
        console.log("TutorialScreen startAnimations");

        Animated.timing(this.animation, {
            delay: 1000,
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => {
            console.log("TutorialScreen Step1");

            let state = true;
            this.refToggle1.current.updateToggleState(state)
            this.refToggle1.current.updateVisibilityState(state);
            this.refItemPart1.current.updateHighlightState(state);

            if (state == true) {
                this.refToggle2.current.updateToggleState(false);
                this.refToggle2.current.updateVisibilityState(false);
                this.refItemPart2.current.updateHighlightState(false);
            }


            Animated.timing(this.animation, {
                delay: 2000,
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => {
                console.log("TutorialScreen Step2");

                let state = true;
                this.refToggle2.current.updateToggleState(state)
                this.refToggle2.current.updateVisibilityState(state);
                this.refItemPart2.current.updateHighlightState(state);
    
                if (state == true) {
                    this.refToggle1.current.updateToggleState(false);
                    this.refToggle1.current.updateVisibilityState(false);
                    this.refItemPart1.current.updateHighlightState(false);
                }

                Animated.timing(this.animation, {
                    delay: 2000,
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }).start(() => {
                    console.log("TutorialScreen Step3");
    
                    let state = false;
                    this.refToggle2.current.updateToggleState(state)
                    this.refToggle2.current.updateVisibilityState(state);
                    this.refItemPart2.current.updateHighlightState(state);
        
    
                });
            });
        });

    }

    render() {

        let paddingLeftAndRight = 5;
        let isLargeItem = (this.dataTutorialItem.session2.sessionDescription != undefined && this.dataTutorialItem.session2.sessionDescription != '') ||
            (this.dataTutorialItem.session1.sessionDescription != undefined && this.dataTutorialItem.session1.sessionDescription != '')
        let selectedSessionId = null;
        let itemHeight = isLargeItem ? 150 : 100


        let firstRun = true;
        this.startAnimations();
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

                <Animated.Text id='welcome' style={{
                    position: 'absolute', top: 100, left: 5,
                    width: 200, height: 200,
                    fontFamily: 'AktivGrotesk-Regular',
                    // backgroundColor: 'skyblue',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    fontSize: 16
                }}>
                    Welcome to the Fiesta Elegante App.

                    During our Workshop Program,
                    sessions will take place in parallel
                    in 2 different rooms.

                    Browse the Workshop Program
                    and select the sessions you
                    plan to attend for each time slot.

                </Animated.Text>

                <View
                    style={{
                        position: 'absolute',
                        top: 400,
                        opacity: 0.2
                    }}>

                    <ScheduleListItem
                        item={this.dataTutorialItem}
                        style={{
                            top: 500
                        }} />
                </View >



                <View
                    style={{
                        backgroundColor: '#020202',
                        left: 0,
                        height: itemHeight, width: Dimensions.get('window').width,
                        borderTopColor: 'white',
                        borderTopWidth: StyleSheet.hairlineWidth,
                        borderBottomColor: 'white',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}>


                    {/* time line  centered (small)*/}
                    <Text id='textTime' style={{
                        position: 'absolute', top: 10, left: 5,
                        width: (Dimensions.get('window').width - 10), height: 15,
                        fontFamily: 'AktivGrotesk-Regular',
                        // backgroundColor: 'skyblue',
                        textAlign: 'center',
                        color: '#FFFFFF',
                        fontSize: 12,
                    }}>
                        {this.dataTutorialItem.session1.time}
                    </Text>


                    {/* session 1 (left) - class name and artistname  */}
                    <ScheduleListItemPart
                        ref={this.refItemPart1}
                        item={this.dataTutorialItem}
                        referenceId={this.dataTutorialItem.session1.id}
                        sessionId={'session1'}
                        alignment={'left'}
                        isLargeItem={isLargeItem}
                    />

                    {/* session 2 (right) - class name and artistname  */}
                    <ScheduleListItemPart
                        ref={this.refItemPart2}
                        item={this.dataTutorialItem}
                        referenceId={this.dataTutorialItem.session2.id}
                        sessionId={'session2'}
                        alignment={'right'}
                        isLargeItem={isLargeItem}
                    />


                    {/* toggle image to mark as favorite */}

                    <ScheduleListItemToggle
                        ref={this.refToggle1}
                        itemRef={this.refItemPart1}
                        otherRef={this.refToggle2}
                        referenceId={this.dataTutorialItem.session1.id}
                        isRightAligned={false}
                        selectedAsFavorite={false}
                        style={{
                            opacity: this.dataTutorialItem.session1.artistName == '' ? 0 : 1,
                            position: 'absolute', left: 152, top: 45,
                            width: 25, height: 25, resizeMode: 'cover'
                        }}
                    />

                    <ScheduleListItemToggle
                        ref={this.refToggle2}
                        itemRef={this.refItemPart2}
                        otherRef={this.refToggle1}
                        referenceId={this.dataTutorialItem.session2.id}
                        isRightAligned={true}
                        selectedAsFavorite={false}
                        style={{
                            opacity: this.dataTutorialItem.session2.artistName == '' ? 0 : 1,
                            position: 'absolute', right: 152, top: 45,
                            width: 25, height: 25, resizeMode: 'cover'
                        }} />

                </View >

            </SafeAreaView>
        );

    }

}

export default TutorialScreen;