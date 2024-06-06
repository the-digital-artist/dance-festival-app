import { Linking } from "react-native";
import LauncherController from "../LauncherController";


const ActionOpenInstagram = (item) => {
  console.log("ActionOpenInstagram");

  console.log(JSON.stringify(item, null, 2));

  if (item.instagramAccount == undefined)
    return;



  let appUrl = 'instagram://user?username=' + item.instagramAccount
  console.log(JSON.stringify(appUrl, null, 2));
  Linking.openURL(appUrl);
  Linking.canOpenURL(appUrl).then(supported => {
    console.log("supported"+supported);
    if (!supported) return;
    Linking.openURL(appUrl);
  }).catch(err => {
    console.error(err);
  });

  //           if (!supported) {
  //             Alert.alert("",
  //               "",
  //               [
  //                 {text: "go to store", onPress: this.openStorePress},
  //                 {text: "cancel", onPress: () => { }, style: 'cancel'},
  //               ],
  //               { cancelable: false }
  //             );
  //           } else {
  //             return Linking.openURL(appUrl);
  //           }
  //       }).catch(err => {
  //           console.error(err);
  //       });
}

export default ActionOpenInstagram;