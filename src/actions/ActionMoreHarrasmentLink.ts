import { Linking } from "react-native";

const ActionMoreHarassmentLink = () => {
    console.log('ActionMoreNewsletterSignup');

        let account = 'https://www.denvercongress.com/harrasment-policy'
        Linking.canOpenURL(account).then(supported => {
                console.log("supported" + supported);
                if (!supported) return;
                Linking.openURL(account);
        }).catch(err => {
                console.error(err);
        });
}

export default ActionMoreHarassmentLink;