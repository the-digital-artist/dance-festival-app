import { useState, useEffect, useMemo, useCallback } from "react";
import { Alert, Animated, View, Text, StyleSheet, Dimensions } from "react-native";
import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";


const LoadingScreen = ({ children}) => {
    const animation = useMemo(() => new Animated.Value(1), []);
    const [isAppReady, setAppReady] = useState(false);
    const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        console.log("FiestaLoadingScreen useEffect with isAppReady: "+isAppReady+" children: "+children);
        if (isAppReady) {
            Animated.timing(animation, {
                delay:5000,
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => setAnimationComplete(true));
        }
    }, [isAppReady]);

    const onImageLoaded = useCallback(async () => {
        try {
            await Promise.all([]);
        } catch (e) {
            // handle errors
        } finally {
            setAppReady(true);
        }
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {   isAppReady?
                    children:null
            }
            {!isSplashAnimationComplete && (
                <Animated.View
                    pointerEvents="none"
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            backgroundColor: "#000000",
                            opacity: animation,
                        },
                    ]}
                >
                    <Animated.Image
                        style={{
                            // width: "100%",
                            // height: "100%",
                            width: Dimensions.get('window').width, height: Dimensions.get('window').height,
                            resizeMode: "contain",
                            opacity: animation
                        }}
                        source={require('../assets/welcome.png')}
                        onLoadEnd={onImageLoaded}
                        fadeDuration={0}
                    />
                </Animated.View>
            )}
        </View>
    );
}

export default LoadingScreen; 