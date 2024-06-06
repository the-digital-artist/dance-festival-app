import DataModel from "../DataModel";
import LauncherController from "../LauncherController";

const dateFormater = new Intl.DateTimeFormat('de-DE', {  day: '2-digit', month: '2-digit', year: '2-digit'} )
const timeFormater = new Intl.DateTimeFormat(['de-DE'], { hour: '2-digit', minute: '2-digit'} )
let debugHour = 0;

const ActionUpdateHappeningNow = () => {
  console.log("ActionUpdateHappeningNow ");
  const context = LauncherController.getInstance().context;

  let currentTime = new Date(Date.now());

      //DEBUG BEGIN
    //   currentTime.setDate(14)
    //   currentTime.setMonth(5) //zero based
    //   currentTime.setFullYear(2024)
    //   currentTime.setHours(debugHour++,20);
      //DEBUG END


  context.currentTimeString = timeFormater.format(currentTime);
  if( context.happeningNowTimeUpdateFunction != null) context.happeningNowTimeUpdateFunction(context.currentTimeString);

  context.currentDateString = dateFormater.format(currentTime);
  context.currentDayIndex = -1;
  if(context.currentDateString == "14.06.24")   context.currentDayIndex = 0;
  if(context.currentDateString == "15.06.24")   context.currentDayIndex = 1;
  if(context.currentDateString == "16.06.24")   context.currentDayIndex = 2;


  if(context.currentDayIndex == -1) return;

    

    let dataModelForToday = DataModel.dataScheduleListsByDay[context.currentDayIndex].data //array 
    let activeSessions = [];
    let sessionStartTime = new Date(currentTime);
    let sessionEndTime = new Date(currentTime);

    for (let i = 0; i < dataModelForToday.length; i++) {
        const d = dataModelForToday[i]
        if (d.group.length > 0 && d.groupTitle == '') continue;
        if (d.startTime == '' || d.endTime == '') continue;

        const startTimeParts = (d.startTime as string).split(':');
        sessionStartTime.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]));
        const endTimeParts = (d.endTime as string).split(':');
        sessionEndTime.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]));

        // console.log("d id: " + d.id + " startTime: " + dataModelForToday[i].startTime + " endTime: " + dataModelForToday[i].endTime);
        // console.log("currentTime: " + currentTime + " sessionTime: " + sessionStartTime);
        if (currentTime> sessionStartTime && 
            (currentTime < sessionEndTime || d.groupTitle == 'Night Parties')
        ) {
            console.log("adding active Session ---- currentTime: " + currentTime + " sessionTime: " + sessionStartTime);
            activeSessions.push(d);
        }
    }

    if (activeSessions.length >0) {
        LauncherController.getInstance().context.happeningNowItem = activeSessions;
        console.log("HAPPENING NOW: " +  LauncherController.getInstance().context.happeningNowItem[0].sessionMainTitle);
    } else {
        LauncherController.getInstance().context.happeningNowItem =
        [{
            sessionMainTitle: 'Currently No Session',
            itemType: 'type0',
            groupTitle: '',
            groupSubtitle: '',
            room: 'Relax and Plan Ahead with The Festival Planner',
            time:  context.currentTimeString
        }];
    }
    if( context.happeningNowItemUpdateFunction != null) context.happeningNowItemUpdateFunction();


    return;
  

}

export default ActionUpdateHappeningNow;