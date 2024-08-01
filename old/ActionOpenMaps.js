import { Linking, Platform } from "react-native";


const addressMap = {
    'TAK Theater Aufbau' : {lat: 52.503310, lon: 13.410010, q: "TAK+Theater+Aufbau+Kreuzberg"},
    'Kesselhaus Kulturbrauerei' : {lat: 52.5395147, lon: 13.4135744, q: "Kesselhaus+in+der+Kulturbrauerei"},
    'Tangotanzen Macht Schön' : {lat: 52.5006427, lon: 13.4185129, q: "Tangotanzen+Macht+Schön"},
}

const ActionOpenMaps = ( addressId ) => {
    console.log("ActionOpenMaps "+(addressId));

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


    const obj = addressMap[addressId];
    if (obj == null) return;

    const l = Platform.OS === 'ios' ? 
    `http://maps.apple.com/?q=${obj.q}&sll=${obj.lat},${obj.lon}&z=10` : 
    `geo:${obj.lat},${obj.lon}?q=${addressId}`;


    Linking.openURL(l);

}

export default ActionOpenMaps;