import * as Font from 'expo-font';
import OperatorStates from './core/LOperatorStates';
import TransitionScreenL1toL2 from './transitions/TransitionScreenL1toL2';
import TransitionScreenL2toL3 from './transitions/TransitionScreenL2toL3';
import TransitionScreenSplashToLoading from './transitions/TransitionScreenSplashToLoading';
import DataModel from './DataModel';
import { createRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionUpdateHappeningNow from './actions/ActionUpdateHappeningNow';


class LauncherController extends OperatorStates {

    context =
        {
            state: "splash",
            sessionListCount: 0,
            sessionListReference: null,

            artistListReference: null,

            focusedItemData: {
                id: "focus",
                group: [13, 40, 41, 42, 43, 44, 45],
                itemType: "type1",
                artistName: "Joel Gomez",
                sessionMainTitle: "Salsa Caleña",
                dateString: "Fri, June 14th 2024",
                time: "12:00-12:50 PM",
                place: "",
                room: "Room 1 | Floor 1",
                sessionSubtitle: "",
                sessionDescription: "",
                artistOne: "Joel Gomez",
                artistTwo: "",
                flag: false,
                lineCount: 0,
                //layoutbased properties added in session screen/list item ScheduleListItemType1
                orientation: "left",
                rowHeight: 120,
                groupIndex: 1,
                groupIndexUpdateFunction: null,
                renderer: null
            },
            focusedItemComponent: null,
            detailScreenReference: null,

            stackNavigator: null,
            artistFocusItem: {
                name: 'Susana Arenas',
                portrait: "_0023_SUSANA-ARENAS.png",
                imgSrc: null,
                shortBio: ``,
                bio: `Susana Arenas Pedroso is `
            },

            //happeningNow
            happeningNowItem: [{
                sessionMainTitle: 'Currently No Session',
                itemType: 'type0',
                groupTitle: '',
                groupSubtitle: '',
                room: 'Relax and Plan Ahead with The Festival Planner',
                time:  '00:00'
            }],
            happeningNowTimeUpdateFunction: null,
            happeningNowItemUpdateFunction: null,
            currentTimeString: "00:00",
            currentDateString: "06.06.24",
            currentDayIndex: -1,

        };

    flow =
        [
            {
                state: "splash",
                changes:
                    [
                        {
                            type: "initComplete",
                            transition: [TransitionScreenSplashToLoading],
                            newState: "loading"
                        }
                    ]
            },
            {
                state: "loading",
                changes:
                    [
                        {
                            type: "loadingComplete",
                            actions: [],
                            newState: "main"
                        }
                    ]
            },
            {
                state: "main",
                changes:
                    [
                        {
                            type: "navigateL1toL2",
                            actions: [],
                            transition: [TransitionScreenL1toL2],
                            newState: "details"
                        }
                    ]
            },
            {
                state: "details",
                changes:
                    [
                        {
                            type: "navigateL2toL3",
                            actions: [],
                            transition: [TransitionScreenL2toL3],
                            newState: "video"
                        }
                    ]
            },
            {
                state: "video",
                changes:
                    [
                        {
                            type: "backButton",
                            actions: [],
                            transition: [],
                            newState: "main"
                        }
                    ]
            },
        ];

    static _instance = null;
    static getInstance(): LauncherController { return (LauncherController._instance == null ? (LauncherController._instance = new LauncherController()) : LauncherController._instance) }

    //context items, that all the components may reference
    detailsItem = null;
    persistedList = new Object();
    appTutorialCompleted = false;
    navigator = null;

    tabBarIndex = 0
    tabBarData =
        [
            { id: 0, itemText: "Friday", associatedScreenName: "scheduleList0", imgSrc: null },
            { id: 1, itemText: "Saturday", associatedScreenName: "scheduleList1", imgSrc: null },
            { id: 2, itemText: "Sunday", associatedScreenName: "scheduleList2", imgSrc: null }
        ]



    navBarIndex = 0
    navBarData =
        [
            { id: 0, itemText: "Home", associatedScreenName: "homeScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_home.png') },
            { id: 1, itemText: "Schedule", associatedScreenName: "sessionScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_planner.png') },
            { id: 3, itemText: "Artists", associatedScreenName: "artistsListScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_artists.png') },
            { id: 4, itemText: "More", associatedScreenName: "settingsScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_settings.png') }
        ]

    customFonts = {
        'Ambassador_Update-Regular': require('../assets/fonts/Ambassador_Update-Regular.ttf'),
        'Antonio-Regular': require('../assets/fonts/Antonio-Regular.ttf'),
        'Arcon-Regular': require('../assets/fonts/Arcon-Regular.otf'),
        'Arcon-Rounded-Regular': require('../assets/fonts/Arcon-Regular.otf'),
        'ArtBrush': require('../assets/fonts/Artbrush.ttf'),
        'Cabin-Regular': require('../assets/fonts/Cabin-Regular.ttf'),
    };

    constructor() {
        super();
    }

    async initialize() {
        try {
            await Font.loadAsync(this.customFonts);
            console.log("LauncherController - Fonts loaded.");
            await this.prepareDataModel();
            console.log('Launcher initialization done. Tutorial completed: ' + this.appTutorialCompleted);

        } catch (e) {
            console.warn(e);
        } finally { }

    }

    async prepareDataModel() {

        //artist data reformatting
        //1) add static references to the imgSrc field of the artist data item

        //load images


        DataModel.dataArtists['Ace Fusion'].imgSrc = require('../assets/portraits/_0013_ACE-FUSION.png');
        DataModel.dataArtists['Adrián Nitti'].imgSrc = require('../assets/portraits/_0014_ADRIÁN.png');
        DataModel.dataArtists['Alex & Desiree'].imgSrc = require('../assets/portraits/_0022_ALEX__DESIREE.png');
        DataModel.dataArtists['Alicia Langlais'].imgSrc = require('../assets/portraits/_0020_ALICIA-LANGLAIS.png');
        DataModel.dataArtists['Amoura Teese'].imgSrc = require('../assets/portraits/_0021_AMOURA-TEESE.png');
        DataModel.dataArtists['Andrew Noel'].imgSrc = require('../assets/portraits/_0018_ANDREW-NOEL.png');
        DataModel.dataArtists['Angelica Medina'].imgSrc = require('../assets/portraits/_0006_ANGELICA-MEDINA.png');
        DataModel.dataArtists['Angie & Audrey'].imgSrc = require('../assets/portraits/_0010_ANGIE__AUDREY.png');
        DataModel.dataArtists['Bex'].imgSrc = require('../assets/portraits/_0014_ADRIÁN.png');
        DataModel.dataArtists['Bryon & Sammantha'].imgSrc = require('../assets/portraits/_0001_BRYON__SAMMANTHA.png');
        DataModel.dataArtists['Eleanee & Baudillo'].imgSrc = require('../assets/portraits/_0016_ELEANEE__BAUDILLO.png');
        DataModel.dataArtists['Elena Rovito'].imgSrc = require('../assets/portraits/_0012_ELENA-ROVITO.png');
        DataModel.dataArtists['Franklin Liranzo'].imgSrc = require('../assets/portraits/_0009_FRANKLIN-LIRANZO.png');
        DataModel.dataArtists['Gabriele Di Marzo'].imgSrc = require('../assets/portraits/_0008_GABRIELE-DI-MARZO.png');
        DataModel.dataArtists['Jahaira Fajardo'].imgSrc = require('../assets/portraits/_0011_JAHAIRA.png');
        DataModel.dataArtists['Jason Rodriguez'].imgSrc = require('../assets/portraits/_0026_JASON-RODRIGUEZ.png');
        DataModel.dataArtists['Jayven Colon'].imgSrc = require('../assets/portraits/_0007_JAYVEN-COLON.png');
        DataModel.dataArtists['Jeremy Meza'].imgSrc = require('../assets/portraits/_0033_JEREMY-MEZA.png');
        DataModel.dataArtists['Jessica Marie'].imgSrc = require('../assets/portraits/_0035_JESSICA-MARIE.png');
        DataModel.dataArtists['Jhesus Aponte'].imgSrc = require('../assets/portraits/_0019_JHESUS-APONTE.png');
        DataModel.dataArtists['Joel Gomez'].imgSrc = require('../assets/portraits/_0017_JOEL-GOMEZ.png');
        DataModel.dataArtists['John & Liz'].imgSrc = require('../assets/portraits/_0036_JOHN-AND-LIZ.png');
        DataModel.dataArtists['Karel & Bruno'].imgSrc = require('../assets/portraits/_0034_KAREL__BRUNO.png');
        DataModel.dataArtists['Karel Flores'].imgSrc = require('../assets/portraits/_0034_KAREL__BRUNO.png');
        DataModel.dataArtists['Kathy Reyes'].imgSrc = require('../assets/portraits/_0037_KATHY-REYES.png');
        DataModel.dataArtists['Katlyn Rodriguez'].imgSrc = require('../assets/portraits/_0032_KATLYN-RODRIGUEZ.png');
        DataModel.dataArtists['Kyla Hallumus'].imgSrc = require('../assets/portraits/_0005_KYLA-HALLUMUS.png');
        DataModel.dataArtists['Latisha Hardy'].imgSrc = require('../assets/portraits/_0004_LATISHA-HARDY.png');
        DataModel.dataArtists['Lilly Rose'].imgSrc = require('../assets/portraits/_0003_LILLY-ROSE.png');
        DataModel.dataArtists['Luis Aguilar'].imgSrc = require('../assets/portraits/_0039_LUIS-AGUILAR.png');
        DataModel.dataArtists['Lyrik Cruz'].imgSrc = require('../assets/portraits/_0002_LYRIK-CRUZ.png');
        DataModel.dataArtists['Mariah & Andrea'].imgSrc = require('../assets/portraits/_0038_MARIAH__ANDREA.png');
        DataModel.dataArtists['Mireille Ruiz'].imgSrc = require('../assets/portraits/_0031_MIREILLE-RUIZ.png');
        DataModel.dataArtists['Monique Manzo'].imgSrc = require('../assets/portraits/_0000_MONIQUE-MANZO.png');
        DataModel.dataArtists['Ngoc Huynh'].imgSrc = require('../assets/portraits/_0030_NGOC.png');
        DataModel.dataArtists['Oscar & Tiffany'].imgSrc = require('../assets/portraits/_0029_OSCAR__TIFFANY.png');
        DataModel.dataArtists['Rafa Gonzalez'].imgSrc = require('../assets/portraits/_0028_RAFA-GONZALEZ.png');
        DataModel.dataArtists['Sabrih Joy'].imgSrc = require('../assets/portraits/_0027_SABRIH-JOY.png');
        DataModel.dataArtists['Serena Spears'].imgSrc = require('../assets/portraits/_0015_SERENA-SPEARS.png');
        DataModel.dataArtists['Sir Joq'].imgSrc = require('../assets/portraits/_0025_SIR-JOQ.png');
        DataModel.dataArtists['Susana Arenas'].imgSrc = require('../assets/portraits/_0023_SUSANA-ARENAS.png');
        DataModel.dataArtists['Tom Ogunribido'].imgSrc = require('../assets/portraits/_0024_TOM-OGUNRIBIDO.png');



        //2) shorten the biography
        const upperLimit = 200;
        const lowerLimit = 80;
        let index = 0;
        for (const k in DataModel.dataArtists) {
            const item = DataModel.dataArtists[k];
            const lastFullStop = (item.bio as string).lastIndexOf(".", upperLimit)

            item.shortBio = lastFullStop > lowerLimit ? (item.bio as string).substring(0, lastFullStop) + " ..." : (item.bio as string).substring(0, upperLimit) + " ..."

            item.index = index++;
            // console.log("shortBio " + k + ": " + item.shortBio);
        }

        //3)

        //add sessions to each artist
        for (let key in DataModel.dataArtists) {
            DataModel.dataArtists[key]['name'] = key;
            DataModel.dataArtists[key]['sessionIds'] = [];

            for (let i = 0; i < DataModel.dataRaw.length; i++) {
                if (DataModel.dataRaw[i].artistName == key)
                    DataModel.dataArtists[key]['sessionIds'].push(DataModel.dataRaw[i].id)
            }
        }

        //store in array and add name field
        for (let key in DataModel.dataArtists) {
            DataModel.dataArtistsList.push(DataModel.dataArtists[key]);
        }



        //schedule data reformating 
        //1) structure by day 
        //(using date field in the data model, string-wise comparision)
        //2) reformat group element
        //add item references that show up in the same group
        //groups are sessions that happen in different rooms but at the same time
        //3) store fav value

        DataModel.dataScheduleListsByDay = [];

        let dataItem = null;
        let dataItemOldGroup = null;
        let dataItemNewGroup = null;
        let sectionListData = null;
        for (let i = 0; i < DataModel.dataRaw.length; i++) {
            dataItem = DataModel.dataRaw[i];

            //1) structure by date

            let found = false;
            for (let j = 0; j < DataModel.dataScheduleListsByDay.length; j++) {
                if (DataModel.dataScheduleListsByDay[j].title == dataItem.dateString) {
                    sectionListData = DataModel.dataScheduleListsByDay[j]
                    found = true;
                    break;
                }
            }

            if (!found) {

                sectionListData = { title: dataItem.dateString, data: [] }

                DataModel.dataScheduleListsByDay.push(sectionListData)
                console.log("New Date Found - creating a new data list to hold the schedule for the following day: " + sectionListData.title);
            }

            //2) reformat group element
            dataItemOldGroup = dataItem['group']
            dataItemNewGroup = [];
            for (let j = 0; j < dataItemOldGroup.length; j++) {
                for (let k = 0; k < DataModel.dataRaw.length; k++) {
                    if (dataItemOldGroup[j] == DataModel.dataRaw[k].id) {
                        dataItemNewGroup.push({ id: dataItemOldGroup[j], obj: DataModel.dataRaw[k] });
                        break;
                    }
                }
            }
            dataItem['group'] = dataItemNewGroup;

            //measure title width
            dataItem['lineCount'] = Math.ceil((dataItem.sessionMainTitle as string).length / 25);
            // console.log("sessionMainTitle: "+dataItem.sessionMainTitle +" count: "+dataItem['lineCount']+" id "+dataItem.id + "");

            //floor into place field
            dataItem['place'] = ((dataItem['room'] == 'Room 01') || (dataItem['room'] == 'Room 02') || (dataItem['room'] == 'Room 03')) ?
                'Floor 01' : 'Floor 02'

            //3) store initial favorite value for the pesisted list

            let storedValue = await LauncherController.getInstance().getData(dataItem.id);
            this.persistedList[dataItem.id] = storedValue;
            dataItem['favoriteState'] = storedValue == '1' ? true : false;
            // console.log("PersistedList - itemId: " + dataItem.id + " has stored value: " + this.persistedList[dataItem.id])


            //add the data item to the specific section list (usually ordered by day)
            sectionListData.data.push(dataItem);
        }

        //WHATS HAPPENING NOW
        ActionUpdateHappeningNow();
        const checkHappeningNowFunction = setInterval(() => { ActionUpdateHappeningNow(); }, 10000);
        
    }

    stateChange(oldState, newState): void {
        console.log('LauncherController ' + newState);
        this.view.updateState(newState);
    }



    async storeData(itemId, isFavorite) {
        if (itemId == undefined || isFavorite == undefined) return;

        try {
            this.persistedList[itemId] = isFavorite ? '1' : '0';
            await AsyncStorage.setItem('' + itemId, isFavorite ? '1' : '0');
            console.log('storing ' + (isFavorite ? '1' : '0') + " for id: " + itemId)
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
