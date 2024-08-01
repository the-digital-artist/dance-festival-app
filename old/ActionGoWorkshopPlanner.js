import { } from "react-native";

const ActionGoWorkshopPlanner = (screenNavigatorRef) => {
  console.log("ActionGoWorkshopPlanner ");
  
  if (screenNavigatorRef == undefined ||  screenNavigatorRef == null) return;
  screenNavigatorRef.navigate('Planner')
}

export default ActionGoWorkshopPlanner;