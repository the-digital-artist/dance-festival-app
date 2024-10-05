import { } from "react-native";
import DataModel from "../DataModel";


const ActionLoginCompleted = () => {
  console.log("ActionLoginCompleted ");
  const userData = DataModel.getInstance().dyn_userManagement.userData;

  let userSelectedDataIndex = -1;
  for(let i = 0; i < userData.length; i++) {
    if (userData[i].email == "fischer.philipp@gmail.com") {
      userSelectedDataIndex = i;
      break;
    }
  }

  if (userSelectedDataIndex<0 || userSelectedDataIndex >= userData.length) return;

  //get user id
  DataModel.getInstance().dyn_userManagement.userDataIndexLoggedIn = userSelectedDataIndex;
  const userId = userData[userSelectedDataIndex].id
  // LauncherController.getInstance().navBarIndex = 0;
  // LauncherController.getInstance().storeLoginStatus(userId);
  // LauncherController.getInstance().processEvent(new Eventl('logInComplete'));
  // TransitionScreenToScreen('loginScreenContainer', 'homeScreenContainer')
}

export default ActionLoginCompleted;