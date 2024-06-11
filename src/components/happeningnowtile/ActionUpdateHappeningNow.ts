import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";

const dateFormater = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' })
const timeFormater = new Intl.DateTimeFormat(['de-DE'], { hour: '2-digit', minute: '2-digit' })

//DEBUG BEGIN
let debugCurrentTime = new Date(Date.now());
debugCurrentTime.setDate(14);
debugCurrentTime.setMonth(5) //zero based
debugCurrentTime.setFullYear(2024)
debugCurrentTime.setHours(6, 0);
//DEBUG END

const ActionUpdateHappeningNow = () => {
    console.log("ActionUpdateHappeningNow ");
    const context = LauncherController.getInstance().context;
    let currentTime = new Date(Date.now());


    //DEBUG BEGIN
    debugCurrentTime.setUTCMilliseconds(debugCurrentTime.getUTCMilliseconds() + (60 * 30000)) //31min
    console.log("DEBUG TIME: " + debugCurrentTime.toLocaleString())
    currentTime = debugCurrentTime;
    //DEBUG END

    context.currentTimeString = timeFormater.format(currentTime);
    if (context.happeningNowTimeUpdateFunction != null) context.happeningNowTimeUpdateFunction(context.currentTimeString);

    //show a goodbye message if festival is done
    LauncherController.getInstance().context.happeningNowItems = [];

    if (currentTime > new Date(Date.parse(context.happeningNowEndFestival.startTime))) {
        context.happeningNowItemNoSession.room = context.happeningNowEndFestival.room
        context.happeningNowItemNoSession.shortMainTitle = context.happeningNowEndFestival.shortMainTitle
        if (context.happeningNowItemUpdateFunction != null) context.happeningNowItemUpdateFunction();
        return;
    }

    context.currentDateString = dateFormater.format(currentTime);
    context.currentDayIndex = -1;
    if (context.currentDateString == "14.06.24") context.currentDayIndex = 0;
    if (context.currentDateString == "15.06.24") context.currentDayIndex = 1;
    if (context.currentDateString == "16.06.24") context.currentDayIndex = 2;
    if (context.currentDateString == "17.06.24") context.currentDayIndex = 3;
    //treat 0-6am as previous day because they are in the data model for the previous day
    if (currentTime.getHours() >= 0 && currentTime.getHours() <= 6 && context.currentDayIndex > 0) context.currentDayIndex--;

    if (context.currentDayIndex == -1 || context.currentDayIndex >= DataModel.dataScheduleListsByDay.length) return;


    let dataModelForToday = DataModel.dataScheduleListsByDay[context.currentDayIndex].data //array 
    let activeSessions = [];
    let sessionStartTime = new Date(currentTime);
    let sessionEndTime = new Date(currentTime);

    for (let i = 0; i < dataModelForToday.length; i++) {
        const d = dataModelForToday[i]
        if (d.group.length > 0 && d.groupTitle == '') continue;
        if (d.startTime == '' || d.endTime == '') continue;

        sessionStartTime = new Date(Date.parse((d.startTime as string)))
        sessionEndTime = new Date(Date.parse((d.endTime as string)))

        if (currentTime >= sessionStartTime && currentTime < sessionEndTime) {
            if (d.shortMainTitle == undefined) continue;
            activeSessions.push(d);
        }
    }

    LauncherController.getInstance().context.happeningNowItems = activeSessions;
    console.log("now - session count: " + LauncherController.getInstance().context.happeningNowItems.length);

    if (context.happeningNowItemUpdateFunction != null) context.happeningNowItemUpdateFunction();
    return;


}

export default ActionUpdateHappeningNow;