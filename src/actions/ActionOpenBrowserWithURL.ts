import { Linking } from "react-native";


const ActionOpenBrowserWithURL = () => {
        console.log("ActionOpenBrowserWithURL");

        let url = 'https://events.humanitix.com/7th-annual-queer-afro-latin-dance-festival'
        Linking.canOpenURL(url).then(supported => {
                console.log("supported" + supported);
                if (!supported) return;
                Linking.openURL(url);
        }).catch(err => {
                console.error(err);
        });

}

export default ActionOpenBrowserWithURL;
