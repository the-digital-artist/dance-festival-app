import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import DataModel from './DataModel';
import ActionUpdateHappeningNow from './components/happeningnowtile/ActionUpdateHappeningNow';
import OperatorStates from './core/LOperatorStates';
import TransitionScreenL1toL2 from './transitions/TransitionScreenL1toL2';
import TransitionScreenL2toL3 from './transitions/TransitionScreenL2toL3';
import TransitionScreenSplashToLoading from './transitions/TransitionScreenSplashToLoading';
import ActionUpdateDataModelWithRemote from './actions/ActionUpdateDataModel';
import { BackHandler } from 'react-native';
import ActionHistoryBackButton from './actions/ActionHistoryBackButton';


class LauncherController extends OperatorStates {

    context =
        {
            state: "splash",
            sessionListCount: 0,

            navigationHistory: [{ out: "HomeScreen", transition: "initial" }],

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
                fullName: 'Susana Arenas',
                portrait: "_0023_SUSANA-ARENAS.png",
                imgSrc: null,
                shortBio: ``,
                bio: `Susana Arenas Pedroso is `,
                facebook: ``,
                insta: ''
            },

            //happeningNow
            happeningNowItems: [],
            happeningNowItemNoSession: {
                sessionMainTitle: 'Currently No Session',
                shortMainTitle: 'Currently No Session',
                itemType: 'type0',
                groupTitle: '',
                groupSubtitle: '',
                room: 'Relax and Plan Ahead \nwith The Festival Planner',
                startTime: '2024-01-01T0:00',
                endTime: '2024-06-17T05:00',
                time: '00:00'
            },

            happeningNowEndFestival: {
                sessionMainTitle: 'See You in 2025!',
                shortMainTitle: 'See You in 2025!',
                itemType: 'type0',
                groupTitle: '',
                groupSubtitle: '',
                room: `This Pa'Ti Festival has concluded.`,
                startTime: '2024-07-22T02:00',
                endTime: '2030-12-31T23:59',
                time: '00:00'
            },

            happeningNowTimeUpdateFunction: null,
            happeningNowItemUpdateFunction: null,
            currentTimeString: "00:00",
            currentDateString: "06.06.24",
            currentDayIndex: -1,

            //components dependent on data model
            dataModelUpdateState: 0,
            dataDependentComponentSchedulerScreen: null,
            dataDependentComponentArtistScreen: null,
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
            { id: 0, itemText: "Thursday", associatedScreenName: "scheduleList0", imgSrc: null },
            { id: 1, itemText: "Friday", associatedScreenName: "scheduleList1", imgSrc: null },
            { id: 2, itemText: "Saturday", associatedScreenName: "scheduleList2", imgSrc: null },
            { id: 3, itemText: "Sunday", associatedScreenName: "scheduleList3", imgSrc: null }
        ]



    navBarIndex = 0
    navBarData =
        [
            { id: 0, itemText: "Home", associatedScreenName: "homeScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_home.png') },
            { id: 1, itemText: "Schedule", associatedScreenName: "sessionScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_planner.png') },
            { id: 3, itemText: "Artists", associatedScreenName: "artistsMainScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_artists.png') },
            { id: 4, itemText: "More", associatedScreenName: "settingsScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_settings.png') }
        ]

    artistStackIndex = 0
    artistStackData =
        [
            { id: 0, itemText: "Artists & DJs", associatedScreenName: "artistsSelectionScreenContainer", imgSrc: null, screenComponentRef: null },
            { id: 1, itemText: "Artist Details", associatedScreenName: "artistsDetailsScreenContainer", imgSrc: null, screenComponentRef: null },
        ]

    customFonts = {
        'DINNeuzeitGroteskStd-Light': require('../assets/fonts/DINNeuzeitGroteskStdLight.otf'),
        'DINCondensed-Bold': require('../assets/fonts/DINNeuzeitGroteskStdBdCond.otf'),
        'Arcon-Regular': require('../assets/fonts/Arcon-Regular.otf'),
        'Arcon-Rounded-Regular': require('../assets/fonts/Arcon-Regular.otf'),
        'Cabin-Regular': require('../assets/fonts/Cabin-Regular.ttf'),

    };

    constructor() {
        super();
    }

    async initialize() {
        const dataModel = DataModel.getInstance().static;
        try {
            await Font.loadAsync(this.customFonts);
            console.log("LauncherController - Fonts loaded.");
            await this.getLocallyStoredDataModel();
            // await this.getRemoteDataModel();
            console.log('LauncherController - Model local/remote checks w/ potential update completed.');
            await this.prepareDataModel();
            console.log('LauncherController initialization done. Tutorial completed: ' + this.appTutorialCompleted);

            const checkForModelUpdate = setInterval(() => { ActionUpdateDataModelWithRemote(); }, dataModel.modelRemoteUpdateInterval);

            BackHandler.addEventListener('hardwareBackPress', () => { ActionHistoryBackButton(); return true; })
            // ActionUpdateHappeningNow();
            // const checkHappeningNowFunction = setInterval(() => { ActionUpdateHappeningNow(); }, dataModel.happeningNowUpdateInterval);

        } catch (e) {
            console.warn(e);
        } finally { }

    }


    async getLocallyStoredDataModel() {
        const dataModel = DataModel.getInstance().static;

        try {
            console.log('LauncherController - checking local models...');

            const value = await AsyncStorage.getItem('dataModel');
            const localModelCopy = {};
            if (value == null) { //never used local storage - first time load
                const modelAsString = JSON.stringify(DataModel.getInstance().static);
                console.log('LauncherController  - using initial model (and storing locally): ' + dataModel.modelVersion);
                AsyncStorage.setItem('dataModel', modelAsString);
                // for (const key in dataModel) {
                //     if (key=='_instance' || key=='instance' || key.indexOf('dyn_')==0) {
                //         console.log("LauncherController - fresh - skipping "+key)
                //         continue;
                //     }
                //     console.log("LauncherController - fresh - building "+key)
                //     localModelCopy[key] = dataModel[key];
                // }
                // const modelAsString = JSON.stringify(localModelCopy);
               return;
            }
            if (value !== null) {
                const locallyStoredModel = JSON.parse(value);
                if (locallyStoredModel.modelVersion <= dataModel.modelVersion) return;

                DataModel.getInstance().static = locallyStoredModel;
                // for (const key in locallyStoredModel) {
                //     console.log("LauncherController - retrieving local storage "+key)
                //     dataModel[key] = locallyStoredModel[key];
                // }

                console.log('LauncherController - using locally stored model: ' + dataModel.modelVersion);
                return;
            }
        } catch (e) {
            console.error(e)
        }
    };

    async getRemoteDataModel() {
        const dataModel = DataModel.getInstance().static;

        try {
            console.log('LauncherController - checking remote models...');
            const fetchController = new AbortController()
            setTimeout(() => { fetchController.abort() }, 1500)

            const response = await fetch(dataModel.modelRemoteGetModelUrl, { signal: fetchController.signal });
            if (!response.ok) return;

            const remoteModel = await response.json();
            console.log('LauncherController - remote model with version: ' + remoteModel.modelVersion,);

            if (remoteModel.modelVersion <= dataModel.modelVersion) return;

          // now sync all the keys in the remote model to the local model
            for (const key in remoteModel) {
                if (Object.prototype.hasOwnProperty.call(dataModel, key)) {
                    console.log("LauncherController - syncing local key with remote key: " + key);
                    dataModel[key] = remoteModel[key];
                }
            }
            console.log('LauncherController - using remote model and storing locally.' + remoteModel.modelVersion,);
            
            AsyncStorage.setItem('dataModel', JSON.stringify({dataModel}));
          
        } catch (error) {
            if (error.message == "Aborted") {
                console.log('LauncherController - Internet too slow to get remote model.');
                return;
            }
            // console.error(error);
        }
    }

    async prepareDataModel() {
        const dataModel = DataModel.getInstance().static;

        console.log("LauncherController - processing data model...");
        //artist data reformatting
        //1) add static references to the imgSrc field of the artist data item

        //load images
        try {
            if(dataModel.dataArtists['Adolfo & Tania'] != undefined) dataModel.dataArtists['Adolfo & Tania'].imgSrc = require('../assets/portraits/0017_adolfo_-_tania.png');
            if(dataModel.dataArtists['Adrian Tenorio'] != undefined) dataModel.dataArtists['Adrian Tenorio'].imgSrc = require('../assets/portraits/0016_adrian_tenorio.png');
            if(dataModel.dataArtists['Alex & Desiree'] != undefined) dataModel.dataArtists['Alex & Desiree'].imgSrc = require('../assets/portraits/0015_alex_-_desiree.png');
            if(dataModel.dataArtists['Benny & Ashley'] != undefined) dataModel.dataArtists['Benny & Ashley'].imgSrc = require('../assets/portraits/0014_benny_-_ashley.png');
            if(dataModel.dataArtists['Bianca Chapman'] != undefined) dataModel.dataArtists['Bianca Chapman'].imgSrc = require('../assets/portraits/0013_bianca_chapman.png');
            if(dataModel.dataArtists['Rafael & Carine'] != undefined) dataModel.dataArtists['Rafael & Carine'].imgSrc = require('../assets/portraits/0018_carine_-_rafael.png');
            if(dataModel.dataArtists['Carlos & Susan'] != undefined) dataModel.dataArtists['Carlos & Susan'].imgSrc = require('../assets/portraits/0002_carlos_-_susan.png');
            if(dataModel.dataArtists['Casino Stars'] != undefined) dataModel.dataArtists['Casino Stars'].imgSrc = require('../assets/portraits/0012_casino_stars.png');
            if(dataModel.dataArtists['Chelsey Owen'] != undefined) dataModel.dataArtists['Chelsey Owen'].imgSrc = require('../assets/portraits/0011_chelsey_owen.png');
            if(dataModel.dataArtists['Chris & Alexus'] != undefined) dataModel.dataArtists['Chris & Alexus'].imgSrc = require('../assets/portraits/0010_chris_-_alexus.png');
            if(dataModel.dataArtists['Clifton Stennet'] != undefined) dataModel.dataArtists['Clifton Stennet'].imgSrc = require('../assets/portraits/0009_clifton_stennet.png');
            if(dataModel.dataArtists['Danny Saksita'] != undefined) dataModel.dataArtists['Danny Saksita'].imgSrc = require('../assets/portraits/0006_danny_saksita.png');
            if(dataModel.dataArtists['Diane Page'] != undefined) dataModel.dataArtists['Diane Page'].imgSrc = require('../assets/portraits/0004_diane_page.png');
            if(dataModel.dataArtists['Eder & Milton'] != undefined) dataModel.dataArtists['Eder & Milton'].imgSrc = require('../assets/portraits/0003_eder_-_milton.png');
            if(dataModel.dataArtists['J Square'] != undefined) dataModel.dataArtists['J Square'].imgSrc = require('../assets/portraits/0000_j_square.png');
            if(dataModel.dataArtists['Jorge & Indira'] != undefined) dataModel.dataArtists['Jorge & Indira'].imgSrc = require('../assets/portraits/0008_jorge_-_indira.png');
            if(dataModel.dataArtists['Karen Y Ricardo'] != undefined) dataModel.dataArtists['Karen Y Ricardo'].imgSrc = require('../assets/portraits/0005_karen_-_ricardo.png');
            if(dataModel.dataArtists['Raul & Delia'] != undefined) dataModel.dataArtists['Raul & Delia'].imgSrc = require('../assets/portraits/0001_raul_-_delia.png');   
            if(dataModel.dataArtists['Latisha Hardy'] != undefined) dataModel.dataArtists['Latisha Hardy'].imgSrc = require('../assets/portraits/0021_latisha_hardy.png');
            if(dataModel.dataArtists['Carlos & Suzan'] != undefined) dataModel.dataArtists['Carlos & Suzan'].imgSrc = require('../assets/portraits/0022_carlos_-_suzan.png');   
            if(dataModel.dataArtists['Brandon & Michelle'] != undefined) dataModel.dataArtists['Brandon & Michelle'].imgSrc = require('../assets/portraits/0023_brandon_-_michelle.png');   
            if(dataModel.dataArtists['El Tiguere Y Bianca'] != undefined) dataModel.dataArtists['El Tiguere Y Bianca'].imgSrc = require('../assets/portraits/0024_el_tiguere_-_bianca.png');   
            if(dataModel.dataArtists['Ataca Y Alemana'] != undefined) dataModel.dataArtists['Ataca Y Alemana'].imgSrc = require('../assets/portraits/0025_ataca_-_alemana.png');   
            if(dataModel.dataArtists['Rafa Gonzalez'] != undefined) dataModel.dataArtists['Rafa Gonzalez'].imgSrc = require('../assets/portraits/0026_rafa.png');   
            if(dataModel.dataArtists['Marisol Blanco'] != undefined) dataModel.dataArtists['Marisol Blanco'].imgSrc = require('../assets/portraits/0027_marisol_blanco.png');   
            if(dataModel.dataArtists['Kingsmen'] != undefined) dataModel.dataArtists['Kingsmen'].imgSrc = require('../assets/portraits/0028_kingsmen.png');   
            if(dataModel.dataArtists['Celeste Williamson'] != undefined) dataModel.dataArtists['Celeste Williamson'].imgSrc = require('../assets/portraits/0029_celeste_williamson.png');   
            if(dataModel.dataArtists['Iroko'] != undefined) dataModel.dataArtists['Iroko'].imgSrc = require('../assets/portraits/0030_iroko.png');   
       
        } catch (error) {
            console.log('Could not assign an image for a particular artist')
        }

        try {
            if (dataModel.dataStyles['type1'] != undefined) dataModel.dataStyles['type1'].imgSrc = require('../assets/tile-fullprogram-itembg1.png');
            if (dataModel.dataStyles['type2'] != undefined) dataModel.dataStyles['type2'].imgSrc = require('../assets/tile-fullprogram-itembg2.png');
            if (dataModel.dataStyles['type3'] != undefined) dataModel.dataStyles['type3'].imgSrc = require('../assets/tile-fullprogram-itembg3.png');
            if (dataModel.dataStyles['type4'] != undefined) dataModel.dataStyles['type4'].imgSrc = require('../assets/tile-fullprogram-itembg4.png');

        } catch (error) {
            console.log('Could not assign an image for a particularhomepage bg')
        }


        try {
            if (dataModel.dataLocation['altemuenze'] != undefined) dataModel.dataLocation['altemuenze'].imgSrc = require('../assets/location-icons/location-alte-muenze.png')
            if (dataModel.dataLocation['bebop'] != undefined) dataModel.dataLocation['bebop'].imgSrc = require('../assets/location-icons/location-bebop.png')
            if (dataModel.dataLocation['belushis'] != undefined) dataModel.dataLocation['belushis'].imgSrc = require('../assets/location-icons/location-belushis.png')
            if (dataModel.dataLocation['berlindanceinstitute'] != undefined) dataModel.dataLocation['berlindanceinstitute'].imgSrc = require('../assets/location-icons/location-berlin-dance-institute.png')
            if (dataModel.dataLocation['soda'] != undefined) dataModel.dataLocation['soda'].imgSrc = require('../assets/location-icons/location-soda.png')
            if (dataModel.dataLocation['unknown'] != undefined) dataModel.dataLocation['unknown'].imgSrc = require('../assets/location-icons/location-unknown.png')
            if (dataModel.dataLocation['citytour'] != undefined) dataModel.dataLocation['citytour'].imgSrc = require('../assets/location-icons/location-citytour.png')
        } catch (error) {
            console.log('Could not assign an image for a particularhomepage bg')
        }

        // console.log("::::::::Preparing Data Model - End Assigning Images");

        //2) shorten the biography
        const upperLimit = 200;
        const lowerLimit = 80;
        let index = 0;
        for (const k in dataModel.dataArtists) {
            const item = dataModel.dataArtists[k];
            const lastFullStop = (item.bio as string).lastIndexOf(".", upperLimit)

            item.shortBio = lastFullStop > lowerLimit ? (item.bio as string).substring(0, lastFullStop) + " ..." : (item.bio as string).substring(0, upperLimit) + " ..."

            item.index = index++;
            // console.log("shortBio " + k + ": " + item.shortBio);
        }

        //3)

        //add sessions to each artist
        for (let key in dataModel.dataArtists) {
            dataModel.dataArtists[key]['key'] = key;
            dataModel.dataArtists[key]['sessionIds'] = [];

            for (let i = 0; i < dataModel.dataScheduleRaw.length; i++) {
                if (dataModel.dataScheduleRaw[i].artistName == key)
                    dataModel.dataArtists[key]['sessionIds'].push(dataModel.dataScheduleRaw[i].id)
            }
        }

        //store in array and add name field
        DataModel.getInstance().dyn_dataArtistsList = [];
        for (let key in dataModel.dataArtists) {
            DataModel.getInstance().dyn_dataArtistsList.push(dataModel.dataArtists[key]);
        }

        // console.log("::::::::Preparing Data Model - ArtistList Length: " + dataModel.dataArtistsList.length);

        //schedule data reformating 
        //1) structure by day 
        //(using date field in the data model, string-wise comparision)
        //2) reformat group element
        //add item references that show up in the same group
        //groups are sessions that happen in different rooms but at the same time
        //3) store fav value

        DataModel.getInstance().dyn_dataScheduleListsByDay = [];

        let dataItem = null;
        let dataItemOldGroup = null;
        let dataItemNewGroup = null;
        let sectionListData = null;
        for (let i = 0; i < dataModel.dataScheduleRaw.length; i++) {
            dataItem = dataModel.dataScheduleRaw[i];

            //1) structure by date

            let found = false;
            for (let j = 0; j < DataModel.getInstance().dyn_dataScheduleListsByDay.length; j++) {
                if (DataModel.getInstance().dyn_dataScheduleListsByDay[j].title == dataItem.dateString) {
                    sectionListData = DataModel.getInstance().dyn_dataScheduleListsByDay[j]
                    found = true;
                    break;
                }
            }

            if (!found) {

                sectionListData = { title: dataItem.dateString, data: [] }

                DataModel.getInstance().dyn_dataScheduleListsByDay.push(sectionListData)
                console.log("LauncherController - processing raw schedule - new date found:" + sectionListData.title);
            }

            //2) reformat group element
            dataItemOldGroup = dataItem['group']
            dataItemNewGroup = [];
            for (let j = 0; j < dataItemOldGroup.length; j++) {
                for (let k = 0; k < dataModel.dataScheduleRaw.length; k++) {
                    if (dataItemOldGroup[j] == dataModel.dataScheduleRaw[k].id) {
                        dataItemNewGroup.push({ id: dataItemOldGroup[j], obj: dataModel.dataScheduleRaw[k] });
                        dataModel.dataScheduleRaw[k].flag = (j == 0) ? false : true;
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
            // console.log('adding ' + dataItem.id)

        }
        //add empty item at the end of each day schedule
        for (let j = 0; j < DataModel.getInstance().dyn_dataScheduleListsByDay.length; j++) {
            DataModel.getInstance().dyn_dataScheduleListsByDay[j].data.push({ "id": j*10000, "itemType": "type5", group: [] })
        }



        DataModel.getInstance().dyn_dataModelProgram = [];
        for (let i = 0; i < dataModel.dataModelProgram.length; i++) {
            // console.log(dataModel.dataModelProgram[i].startTime);
            if(dataModel.dataModelProgram[i].endTime =='' || Date.parse(dataModel.dataModelProgram[i].endTime)>Date.now()) {
                DataModel.getInstance().dyn_dataModelProgram.push(dataModel.dataModelProgram[i])
            }
        }



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
