import { Linking } from "react-native";


const ActionOpenBrowserWithTicketURL = () => {
        console.log("ActionOpenBrowserWithTicketURL");

        let url = 'https://www.tickettailor.com/events/fiestaelegante/1156944'
        Linking.canOpenURL(url).then(supported => {
                console.log("supported" + supported);
                if (!supported) return;
                Linking.openURL(url);
        }).catch(err => {
                console.error(err);
        });

}

export default ActionOpenBrowserWithTicketURL;
