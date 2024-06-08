import * as Linking from 'expo-linking';

const ActionOpenSocialMediaApp = (provider, account) => {
        console.log("ActionOpenSocialMediaApp");


        if (provider == 'Instagram') {
                // let account = 'queer_afro_latin_dance_fest';
                let appUrl = 'instagram://user?username=' + account

                // Linking.openURL(appUrl);
                Linking.canOpenURL(appUrl).then(supported => {
                        console.log("instagram opening supported: " + supported);
                        if (!supported) {
                                Linking.openURL("https://www.instagram.com/"+account);
                                return false;
                        };
                        Linking.openURL(appUrl);
                }).catch(err => {
                        console.error(err);
                });

        }

        if (provider == 'Facebook') {
                // let account = '761248704084273';
                let appUrl = 'fb://profile/' + account

                // console.log(JSON.stringify(appUrl, null, 2));
                // Linking.openURL(appUrl);
                Linking.canOpenURL(appUrl).then(supported => {
                        console.log("facebook opening supported: " + supported);
                        if (!supported) {
                                Linking.openURL("https://www.facebook.com/"+account);
                                return false;
                        };
                        Linking.openURL(appUrl);
                }).catch(err => {
                        console.error(err);
                });

        }

        if (provider == 'Youtube') {
                // let account = 'UCUOPjCArvYfJ7bEvNkJYsRQ';
                let appUrl = 'vnd.youtube://channel/' + account

                // console.log(JSON.stringify(appUrl, null, 2));
                // Linking.openURL(appUrl);
                Linking.canOpenURL(appUrl).then(supported => {
                        console.log("youtube opening supported: " + supported);
                        if (!supported) {
                                Linking.openURL("https://www.youtube.com/channel/"+account);
                                return false;
                        };
                        Linking.openURL(appUrl);
                }).catch(err => {
                        console.error(err);
                });

        }


        if (provider == 'Web') {
                // let account = 'https://queerafrolatindancefestival.com/'
                Linking.canOpenURL(account).then(supported => {
                        console.log("supported" + supported);
                        if (!supported) return;
                        Linking.openURL(account);
                }).catch(err => {
                        console.error(err);
                });
        }
}

export default ActionOpenSocialMediaApp;
