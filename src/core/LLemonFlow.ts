import { createRef, useRef } from 'react';
import { SharedValue, makeMutable } from "react-native-reanimated";
// import { cancelAnimation } from '../animation';
// import { makeMutable } from '../core';

class LLemonFlow {
    static _instance = null;

    static getInstance() { return (LLemonFlow._instance == null ? LLemonFlow._instance = new LLemonFlow() : LLemonFlow._instance) }
    static i() { return LLemonFlow.getInstance() };


    static useSharedValue(initialValue: any) {
        const ref = createRef();



        // useEffect(() => {
        //     return () => {
        //         cancelAnimation(ref.current);
        //     };
        // }, []);
        return ref.current;
    }
}

export default LLemonFlow