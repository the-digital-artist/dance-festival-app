import { Linking } from "react-native";

const ActionWebLink = (url) => {
    console.log('ActionMoreNewsletterSignup');

        Linking.canOpenURL(url).then(supported => {
                console.log("supported" + supported);
                if (!supported) return;
                Linking.openURL(url);
        }).catch(err => {
                console.error(err);
        });
}

export default ActionWebLink;