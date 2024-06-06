import * as Updates from "expo-updates";
import { Alert } from "react-native";


const ActionUpdatesCheckAndPerform = () => {
  console.log("ActionUpdatesCheckAndPerform ");

  async function onFetchUpdateAsync() {
    try {
      // Alert.alert("start checking for update");
      const update = await Updates.checkForUpdateAsync();
      // Alert.alert("start checking for update done");
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // Alert.alert("update error "+error);
      console.log(`Error fetching latest Expo update: ${error}`);
    }
  }
  onFetchUpdateAsync();
}

export default ActionUpdatesCheckAndPerform;