import { Dimensions } from "react-native";
import TweenManager from "../core/LTweenManager";


const ActionOnButtonRotateRowItems = (itemData, direction) => {
    console.log('ActionOnButtonRotateRowItems');

    const inc = Dimensions.get('screen').width;

    TweenManager.tween().to('sessionItem'+itemData.id, 434, { x: (direction*inc) , alpha:  0, z:0 }); 
    for (let i = 1; i < itemData.group.length; i++) {
        TweenManager.tween().to('sessionItem'+itemData.group[i].id, 434, { x: (i-1)*(-1*direction)*inc , alpha:  1, z:0 }); 
    }

}

export default ActionOnButtonRotateRowItems;