import { } from "react-native";
import LauncherController from "./LauncherController";


const ActionPopulateAndGoDetailsScreen = (item, screenNavigatorRef) => {
  console.log("ActionPopulateAndGoDetailsScreen");
  
  if (item.artistName == '' || item.artistOne == '')
    return;


  LauncherController.getInstance().detailsItem = item;
  console.log("calling screenNavigatorRef");
  screenNavigatorRef.navigate('Details')
}

export default ActionPopulateAndGoDetailsScreen;