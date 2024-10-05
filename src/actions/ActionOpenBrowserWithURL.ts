import { Linking } from "react-native";


const ActionOpenBrowserWithTicketURL = () => {
        console.log("ActionOpenBrowserWithTicketURL");

        let url = 'https://www.eventbrite.com/e/2024-caldac-convention-formerly-denver-salsa-bachata-congress-tickets-716510380837?aff=oddtdtcreator'
        Linking.canOpenURL(url).then(supported => {
                console.log("supported" + supported);
                if (!supported) return;
                Linking.openURL(url);
        }).catch(err => {
                console.error(err);
        });

}

export default ActionOpenBrowserWithTicketURL;
