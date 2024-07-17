import { Linking, Platform } from "react-native";



const ActionOpenMaps = ( adressObj ) => {
    // console.log("ActionOpenMaps "+(addressId));

    // if (addressId == null) return;

    // const address = "Prinzenstraße 85 F"
    // const zipCode = "10969"
    // const city = "Berlin"
    // const label = 'TAK Theater Aufbau Kreuzberg';
    // const lat = 52.503310;
    // const lon = 13.410010;
    // const destination = encodeURIComponent(`${address} ${zipCode}, ${city}`);
    // const provider = Platform.OS === 'ios' ? 'apple' : 'google'
    // const link = Platform.OS === 'ios' ? 
    //     "http://maps.apple.com/?q=TAK+Theater+Aufbau+Kreuzberg&sll=52.503310,13.410010&z=10" : 
    //     `geo:${lat},${lon}?q=${label}`;


    const obj = adressObj;
    if (obj == null) return;

    const l = Platform.OS === 'ios' ? 
    `http://maps.apple.com/?q=${obj.q}&sll=${obj.lat},${obj.lon}&z=10` : 
    `geo:${obj.lat},${obj.lon}?q=${obj.q}`;


    Linking.openURL(l);

}

export default ActionOpenMaps;