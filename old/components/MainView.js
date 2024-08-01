import { View, Image, Dimensions, SafeAreaView, TouchableOpacity, Animated, Easing, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogoHeaderBar from './LogoHeaderBar';
import SchedulePlannerScreen from './SchedulePlannerScreen';
import DetailsScreen from './DetailsScreen';
import HeaderTitleComponent from './HeaderTitleComponent';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import ProgramScreen from './ProgramScreen';

const MainView = () => {
    const Stack = createNativeStackNavigator();
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial 
    const posX = useRef(new Animated.Value(-Dimensions.get('window').width / 3)).current; // Initial 
    const fadePanel = useRef(new Animated.Value(0)).current; // Initial 


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>

            <LogoHeaderBar />

            <View style={{
                position: 'absolute', top: 120,
                width: Dimensions.get('window').width, height: Dimensions.get('window').height - 120
            }}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Program"
                        screenOptions={{
                            headerTintColor: '#ffbf11',
                            headerBackTitleVisible: false, //ios only
                            headerStyle: {
                                backgroundColor: 'black',
                            },
                            headerTitleStyle: {
                                fontFamily: 'RamaGothicEW01-Regular',
                                fontSize: 20,
                                color: 'white',
                            },
                            animation: "slide_from_right"
                            // headerBackImageSource: require('../assets/icon_back.png'),
                            // Platform.OS === 'android'
                            //     ? require('../../Resources/Images/Icons/back.png')
                            //     : { uri: 'back', width: 24, height: 24 }, // pull from assets, to avoid icon changing from default to custom
                        }}
                    >
                        <Stack.Group
                            screenOptions={{
                            }}>
                            <Stack.Screen name="Program"
                                options={{
                                    title: 'Program',
                                    headerTitle: (props) => <HeaderTitleComponent title='Festival Program' {...props} />
                                }} component={ProgramScreen} />

                            <Stack.Screen name="Planner"
                                options={{
                                    title: 'Workshop Planner',
                                    headerTitle: (props) => <HeaderTitleComponent title='Workshop Planner' {...props} />
                                }} component={SchedulePlannerScreen} />
                                
                            <Stack.Screen name="Details" options={{
                                title: 'Session Details',
                                headerTitle: (props) => <HeaderTitleComponent title='Session Details' {...props} />
                            }} component={DetailsScreen} />
                        </Stack.Group>
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </SafeAreaView>


    );
}

export default MainView; 