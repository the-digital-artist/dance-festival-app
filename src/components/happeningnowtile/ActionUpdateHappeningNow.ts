import DataModel from "../../DataModel";
import LauncherController from "../../LauncherController";

const dateFormater = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' })
const timeFormater = new Intl.DateTimeFormat(['de-DE'], { hour: '2-digit', minute: '2-digit' })

//DEBUG BEGIN
let debugCurrentTime = new Date(Date.now());
debugCurrentTime.setDate(18);
debugCurrentTime.setMonth(6) //zero based
debugCurrentTime.setFullYear(2024)
debugCurrentTime.setHours(21, 0);
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
    return;

    //show a goodbye message if festival is done
    // LauncherController.getInstance().context.happeningNowItems = [];

    // if (currentTime > new Date(Date.parse(context.happeningNowEndFestival.startTime))) {
    //     context.happeningNowItemNoSession.room = context.happeningNowEndFestival.room
    //     context.happeningNowItemNoSession.shortMainTitle = context.happeningNowEndFestival.shortMainTitle
    //     if (context.happeningNowItemUpdateFunction != null) context.happeningNowItemUpdateFunction();
    //     return;
    // }

    // context.currentDateString = dateFormater.format(currentTime);

    // let activeSessions = [];
    // let sessionStartTime = new Date(currentTime);
    // let sessionEndTime = new Date(currentTime);

    // for (let i = 0; i < DataModel.dyn_dataModelProgram.length; i++) {
    //     const d = DataModel.dyn_dataModelProgram[i]
    //     console.log(d.startTime);
    //     if (d.startTime == '' || d.endTime == '') continue;

    //     sessionStartTime = new Date(Date.parse((d.startTime as string)))
    //     sessionEndTime = new Date(Date.parse((d.endTime as string)))

    //     if (currentTime >= sessionStartTime && currentTime < sessionEndTime) {
    //         console.log("push");
    //         activeSessions.push(d);
    //     }
    // }

    // LauncherController.getInstance().context.happeningNowItems = activeSessions;
    // console.log("now - session count: " + LauncherController.getInstance().context.happeningNowItems.length);

    // if (context.happeningNowItemUpdateFunction != null) context.happeningNowItemUpdateFunction();
    return;
}

export default ActionUpdateHappeningNow;