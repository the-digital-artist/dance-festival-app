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
            // { id: 0, itemText: "Thursday", associatedScreenName: "scheduleList0", imgSrc: null },
            // { id: 1, itemText: "Friday", associatedScreenName: "scheduleList1", imgSrc: null },
            { id: 2, itemText: "Saturday", associatedScreenName: "scheduleList0", imgSrc: null },
            { id: 3, itemText: "Sunday", associatedScreenName: "scheduleList1", imgSrc: null }
        ]



    navBarIndex = 0
    navBarData =
        [
            { id: 0, itemText: "Program", associatedScreenName: "homeScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_home.png') },
            { id: 1, itemText: "Workshops", associatedScreenName: "sessionScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_planner.png') },
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
        // 'Antonio-Regular': require('../assets/fonts/Antonio-Regular.ttf'),
        // 'Arcon-Regular': require('../assets/fonts/Arcon-Regular.otf'),
        // 'Arcon-Rounded-Regular': require('../assets/fonts/Arcon-Regular.otf'),
        // 'LuckiestGuy-Regular': require('../assets/fonts/LuckiestGuy-Regular.ttf'),
        'RamaGothicEW01-Regular': require('../assets/fonts/RamaGothicEW01-Regular.ttf'),
        'RamaGothicEW01-Semibold': require('../assets/fonts/RamaGothicEW01-Semibold.ttf'),
        'AktivGrotesk-Regular': require('../assets/fonts/AktivGrotesk-Regular.ttf'),
        'Cabin-Regular': require('../assets/fonts/Cabin-Regular.ttf'),
        // 'RobotoCondensed-Regular': require('../assets/fonts/RobotoCondensed-Regular.ttf'),
        // 'RobotoCondensed-Medium': require('../assets/fonts/RobotoCondensed-Medium.ttf'),

    };

    constructor() {
        super();
    }

    async initialize() {
        try {
            await Font.loadAsync(this.customFonts);
            console.log("LauncherController - Fonts loaded.");
            await this.getLocallyStoredDataModel();
            await this.getRemoteDataModel();
            console.log('LauncherController - Model local/remote checks w/ potential update completed.');
            await this.prepareDataModel();
            console.log('LauncherController initialization done. Tutorial completed: ' + this.appTutorialCompleted);

            const checkForModelUpdate = setInterval(() => { ActionUpdateDataModelWithRemote(); }, DataModel.modelRemoteUpdateInterval);

            BackHandler.addEventListener('hardwareBackPress', () => { ActionHistoryBackButton(); return true; })
            // ActionUpdateHappeningNow();
            // const checkHappeningNowFunction = setInterval(() => { ActionUpdateHappeningNow(); }, DataModel.happeningNowUpdateInterval);

        } catch (e) {
            console.warn(e);
        } finally { }

    }


    async getLocallyStoredDataModel() {
        try {
            console.log('LauncherController - checking local models...');

            const value = await AsyncStorage.getItem('dataModel');
            const localModelCopy = {};
            if (value == null) { //never used local storage - first time load
                for (const key in DataModel) {
                    if (key=='_instance' || key=='instance' || key.indexOf('dyn_')==0) {
                        console.log("LauncherController - fresh - skipping "+key)
                        continue;
                    }
                    console.log("LauncherController - fresh - building "+key)
                    localModelCopy[key] = DataModel[key];
                }
                const modelAsString = JSON.stringify(localModelCopy);
                console.log('LauncherController  - using initial model: ' + DataModel.modelVersion);
                AsyncStorage.setItem('dataModel', modelAsString);
                return;
            }
            if (value !== null) {
                const locallyStoredModel = JSON.parse(value);
                if (locallyStoredModel.modelVersion <= DataModel.modelVersion) return;
                for (const key in locallyStoredModel) {
                    console.log("LauncherController - retrieving local storage "+key)
                    DataModel[key] = locallyStoredModel[key];
                }

                console.log('LauncherController - using locally stored model: ' + DataModel.modelVersion);
                return;
            }
        } catch (e) {
            console.error(e)
        }
    };

    async getRemoteDataModel() {

        try {
            console.log('LauncherController - checking remote models...');
            const fetchController = new AbortController()
            setTimeout(() => { fetchController.abort() }, 1500)

            const response = await fetch(DataModel.modelRemoteGetModelUrl, { signal: fetchController.signal });
            if (!response.ok) return;

            const remoteModel = await response.json();
            console.log('LauncherController - remote model with version: ' + remoteModel.modelVersion,);

            if (remoteModel.modelVersion <= DataModel.modelVersion) return;

          // now sync all the keys in the remote model to the local model
            for (const key in remoteModel) {
                if (Object.prototype.hasOwnProperty.call(DataModel, key)) {
                    console.log("LauncherController - syncing local key with remote key: " + key);
                    DataModel[key] = remoteModel[key];
                }
            }
            console.log('LauncherController - using remote model and storing locally.' + remoteModel.modelVersion,);
            
            AsyncStorage.setItem('dataModel', JSON.stringify({DataModel}));
          
        } catch (error) {
            if (error.message == "Aborted") {
                console.log('LauncherController - Internet too slow to get remote model.');
                return;
            }
            // console.error(error);
        }
    }

    async prepareDataModel() {
        console.log("LauncherController - processing data model...");
        //artist data reformatting
        //1) add static references to the imgSrc field of the artist data item

        //load images
        try {
            DataModel.dataArtists['Andy Varona'].imgSrc = require('../assets/portraits/andy_varona.png');
            DataModel.dataArtists['Eloy J Rojas'].imgSrc = require('../assets/portraits/eloy_j_rojas.png');
            DataModel.dataArtists['Laura Del Vecchio'].imgSrc = require('../assets/portraits/laura_del_vecchio.png');
            DataModel.dataArtists['Roger Palombella'].imgSrc = require('../assets/portraits/roger_palombella.png');
            DataModel.dataArtists['Yenifer Lavin'].imgSrc = require('../assets/portraits/yenifer_lavin.png');
            DataModel.dataArtists['Yuliet Estrada'].imgSrc = require('../assets/portraits/yuliet_estrada.png');
            DataModel.dataArtists['Edyta Kwasna'].imgSrc = require('../assets/portraits/edyta_kwasna.png');
            DataModel.dataArtists['Kimberly Wirt'].imgSrc = require('../assets/portraits/kimberly_wirt.png');
            DataModel.dataArtists['Lucas Flemming'].imgSrc = require('../assets/portraits/lucas_flemming.png');
            DataModel.dataArtists['Timo Lingnau'].imgSrc = require('../assets/portraits/timo_lingnau.png');
            DataModel.dataArtists['Yoyo Flow'].imgSrc = require('../assets/portraits/yoyo_flow.png');
        } catch (error) {
            console.log('Could not assign an image for a particular artist')
        }

        try {
            if (DataModel.dataStyles['type1'] != undefined) DataModel.dataStyles['type1'].imgSrc = require('../assets/tile-fullprogram-itembg1.png');
            if (DataModel.dataStyles['type2'] != undefined) DataModel.dataStyles['type2'].imgSrc = require('../assets/tile-fullprogram-itembg2.png');
            if (DataModel.dataStyles['type3'] != undefined) DataModel.dataStyles['type3'].imgSrc = require('../assets/tile-fullprogram-itembg3.png');
            if (DataModel.dataStyles['type4'] != undefined) DataModel.dataStyles['type4'].imgSrc = require('../assets/tile-fullprogram-itembg4.png');

        } catch (error) {
            console.log('Could not assign an image for a particularhomepage bg')
        }


        try {
            if (DataModel.dataLocation['altemuenze'] != undefined) DataModel.dataLocation['altemuenze'].imgSrc = require('../assets/location-icons/location-alte-muenze.png')
            if (DataModel.dataLocation['bebop'] != undefined) DataModel.dataLocation['bebop'].imgSrc = require('../assets/location-icons/location-bebop.png')
            if (DataModel.dataLocation['belushis'] != undefined) DataModel.dataLocation['belushis'].imgSrc = require('../assets/location-icons/location-belushis.png')
            if (DataModel.dataLocation['berlindanceinstitute'] != undefined) DataModel.dataLocation['berlindanceinstitute'].imgSrc = require('../assets/location-icons/location-berlin-dance-institute.png')
            if (DataModel.dataLocation['soda'] != undefined) DataModel.dataLocation['soda'].imgSrc = require('../assets/location-icons/location-soda.png')
            if (DataModel.dataLocation['unknown'] != undefined) DataModel.dataLocation['unknown'].imgSrc = require('../assets/location-icons/location-unknown.png')
            if (DataModel.dataLocation['citytour'] != undefined) DataModel.dataLocation['citytour'].imgSrc = require('../assets/location-icons/location-citytour.png')
        } catch (error) {
            console.log('Could not assign an image for a particularhomepage bg')
        }

        // console.log("::::::::Preparing Data Model - End Assigning Images");

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
            DataModel.dataArtists[key]['key'] = key;
            DataModel.dataArtists[key]['sessionIds'] = [];

            for (let i = 0; i < DataModel.dataScheduleRaw.length; i++) {
                if (DataModel.dataScheduleRaw[i].artistName == key)
                    DataModel.dataArtists[key]['sessionIds'].push(DataModel.dataScheduleRaw[i].id)
            }
        }

        //store in array and add name field
        DataModel.dyn_dataArtistsList = [];
        for (let key in DataModel.dataArtists) {
            DataModel.dyn_dataArtistsList.push(DataModel.dataArtists[key]);
        }

        // console.log("::::::::Preparing Data Model - ArtistList Length: " + DataModel.dataArtistsList.length);

        //schedule data reformating 
        //1) structure by day 
        //(using date field in the data model, string-wise comparision)
        //2) reformat group element
        //add item references that show up in the same group
        //groups are sessions that happen in different rooms but at the same time
        //3) store fav value

        DataModel.dyn_dataScheduleListsByDay = [];

        let dataItem = null;
        let dataItemOldGroup = null;
        let dataItemNewGroup = null;
        let sectionListData = null;
        for (let i = 0; i < DataModel.dataScheduleRaw.length; i++) {
            dataItem = DataModel.dataScheduleRaw[i];

            //1) structure by date

            let found = false;
            for (let j = 0; j < DataModel.dyn_dataScheduleListsByDay.length; j++) {
                if (DataModel.dyn_dataScheduleListsByDay[j].title == dataItem.dateString) {
                    sectionListData = DataModel.dyn_dataScheduleListsByDay[j]
                    found = true;
                    break;
                }
            }

            if (!found) {

                sectionListData = { title: dataItem.dateString, data: [] }

                DataModel.dyn_dataScheduleListsByDay.push(sectionListData)
                console.log("LauncherController - processing raw schedule - new date found:" + sectionListData.title);
            }

            //2) reformat group element
            dataItemOldGroup = dataItem['group']
            dataItemNewGroup = [];
            for (let j = 0; j < dataItemOldGroup.length; j++) {
                for (let k = 0; k < DataModel.dataScheduleRaw.length; k++) {
                    if (dataItemOldGroup[j] == DataModel.dataScheduleRaw[k].id) {
                        dataItemNewGroup.push({ id: dataItemOldGroup[j], obj: DataModel.dataScheduleRaw[k] });
                        DataModel.dataScheduleRaw[k].flag = (j == 0) ? false : true;
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

        DataModel.dyn_dataModelProgram = [];
        for (let i = 0; i < DataModel.dataModelProgram.length; i++) {
            // console.log(DataModel.dataModelProgram[i].startTime);
            if(DataModel.dataModelProgram[i].endTime =='' || Date.parse(DataModel.dataModelProgram[i].endTime)>Date.now()) {
                DataModel.dyn_dataModelProgram.push(DataModel.dataModelProgram[i])
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
