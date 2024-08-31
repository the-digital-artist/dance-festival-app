import LauncherController from "../LauncherController";
import TransitionSchedulerNavigateDown from "../transitions/TransitionSchedulerNavigateDown";


const ActionSessionListOnDetailsBtn = (item) => {
  console.log("ActionSessionListOnDetailsBtn ");
  LauncherController.getInstance().context.navigationHistory.push({out:'SchedulerListScreen', transition:'TransitionScheduleNavigateDown' })
  TransitionSchedulerNavigateDown(item, 1) 

}

export default ActionSessionListOnDetailsBtn;