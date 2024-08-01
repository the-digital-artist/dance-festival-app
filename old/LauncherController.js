import DataModel from './DataModel';
import AsyncStorage from '@react-native-async-storage/async-storage';


class LauncherController {

    static _instance = null;
    static getInstance() { if (LauncherController._instance == null) console.log("LauncherController  - new Instance"); return (LauncherController._instance == null ? LauncherController._instance = new LauncherController() : LauncherController._instance) }

    //context items, that all the components may reference
    detailsItem = null;
    persistedList = new Object();
    appTutorialCompleted = false;
    navigator = null;

    async initialize() {

        //load images
        DataModel.dataArtists['Andy Varona'].imgSrc = require('./assets/portraits/andy_varona.png');
        DataModel.dataArtists['Eloy J Rojas'].imgSrc = require('./assets/portraits/eloy_j_rojas.png');
        DataModel.dataArtists['Laura Del Vecchio'].imgSrc = require('./assets/portraits/laura_del_vecchio.png');
        DataModel.dataArtists['Roger Palombella'].imgSrc = require('./assets/portraits/roger_palombella.png');
        DataModel.dataArtists['Yenifer Lavin'].imgSrc = require('./assets/portraits/yenifer_lavin.png');
        DataModel.dataArtists['Yuliet Estrada'].imgSrc = require('./assets/portraits/yuliet_estrada.png');
        DataModel.dataArtists['Edyta Kwasna'].imgSrc = require('./assets/portraits/edyta_kwasna.png');
        DataModel.dataArtists['Kimberly Wirt'].imgSrc = require('./assets/portraits/kimberly_wirt.png');
        DataModel.dataArtists['Lucas Flemming'].imgSrc = require('./assets/portraits/lucas_flemming.png');
        DataModel.dataArtists['Timo Lingnau'].imgSrc = require('./assets/portraits/timo_lingnau.png');
        DataModel.dataArtists['Yoyo Flow'].imgSrc = require('./assets/portraits/yoyo_flow.png');


        //format data to be used by section List
        // [
        //     {
        //         title: 'Saturday',
        //         data: [
        //             {
        //                'session1': { id: 10, flag: false, room: 'Main Hall', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '10:00 - 11:00', place: 'Main Hall', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: 'No Session - Join  Bootcamp  In Room 2' },
        //                'session2': { id: 30, flag: false, room: 'Room 2', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '10:00 - 11:00', place: 'Room 2', artistOne: 'Laura Del Vecchio', artistTwo: '', artistName: 'Laura Del Vecchio', sessionSubtitle: 'Ladies movement & Styling' },
        //             },
        //             {
        //                'session1': { id: 11, flag: false, room: 'Main Hall', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '11:00 - 12:00', place: 'Main Hall', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
        //                'session2': { id: 31, flag: false, room: 'Room 2', sectionTitle: 'Saturday', date: 'Sat, 10 Feb 2024', time: '11:00 - 12:00', place: 'Room 2', artistOne: '', artistTwo: '', artistName: '', sessionSubtitle: '' },
        //             }

        let sectionListDataSection1, sectionListDataSection2;
        DataModel.dataScheduleWithSections = [];
        DataModel.dataScheduleWithSections.push(sectionListDataSection1 = { title: 'Saturday', data: [] });
        DataModel.dataScheduleWithSections.push(sectionListDataSection2 = { title: 'Sunday', data: [] });

        for (let i = 0; i < DataModel.dataRaw.length; i++) {
            this.persistedList[DataModel.dataRaw[i].id] = '-1';

            if (DataModel.dataRaw[i].room != 'Main Hall') continue;

            for (let j = 0; j < DataModel.dataRaw.length; j++) {

                if (DataModel.dataRaw[j].room == 'Room 2' &&
                    DataModel.dataRaw[j].date == DataModel.dataRaw[i].date &&
                    DataModel.dataRaw[j].time == DataModel.dataRaw[i].time) {

                    let sessionObj = { 'session1': null, 'session2': null }
                    sessionObj.session1 = DataModel.dataRaw[i];
                    sessionObj.session2 = DataModel.dataRaw[j]

                    if (sessionObj.session1.sectionTitle == 'Saturday')
                        sectionListDataSection1.data.push(sessionObj);
                    else
                        sectionListDataSection2.data.push(sessionObj);
                }
            }
        }

        //now check the favorite state in the persistant storage for each id
        for (const id in this.persistedList) {
            let storedValue = await LauncherController.getInstance().getData(id);
            this.persistedList[id] = storedValue;
            console.log("PersistedList - itemId: " + id + " has stored value: " + this.persistedList[id])
        }


        //check, if tutorial item (100) is present, i.e. if the app already went through tutorial
        let storedValue = await LauncherController.getInstance().getData(100);
        if(storedValue==0) this.appTutorialCompleted = true;
        this.appTutorialCompleted = true; //for debugging


        // console.log(JSON.stringify( DataModel.dataScheduleWithSections, null, 2))
        console.log('Launcher initialization done. '+this.appTutorialCompleted);
    }


    async storeData(itemId, isFavorite) {
        if (itemId == undefined || isFavorite == undefined) return;

        try {
            this.persistedList[itemId] = isFavorite ? '1' : '0';
            await AsyncStorage.setItem('' + itemId, isFavorite ? '1' : '0');
            // console.log('storing ' + (isFavorite ? '1' : '0') + " for id: " + itemId)
        } catch (e) {
            console.log(e);
        }
    }

    async getData(itemId) {
        try {
            const value = await AsyncStorage.getItem('' + itemId);

            if (value !== null) {
                // console.log("retrieving " + value + " for id:" + itemId);
                return value; // (value == 0 ? false : true);
            } else {
                return '-1';
            }
        } catch (e) {
            console.log(e);
            return '-1';
        }
    };
}

export default LauncherController;
