import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import * as Updates from "expo-updates";
import { BackHandler } from 'react-native';
import AssetLoader from './AssetLoader';
import DataModel from './DataModel';
import ActionHistoryBackButton from './actions/ActionHistoryBackButton';
import ActionUpdateDataModelWithRemote from './actions/ActionUpdateDataModel';
import OperatorStates from './core/LOperatorStates';
import TransitionScreenL1toL2 from './transitions/TransitionScreenL1toL2';
import TransitionScreenL2toL3 from './transitions/TransitionScreenL2toL3';
import TransitionScreenSplashToLoading from './transitions/TransitionScreenSplashToLoading';
import Eventl from './core/LEventl';
import ActionTimeBasedUpdates from './actions/ActionTimeBasedUpdates';


class LauncherController extends OperatorStates {
    staging = 'prod';

    context =
        {
            state: "splash",
            sessionListCount: 0,

            navigationHistory: [{ out: "HomeScreen", transition: "initial", data: {} }],

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

            //focus item on artist screen
            artistFocusItem: {
                fullName: '',
                portrait: "_0023_SUSANA-ARENAS.png",
                imgSrc: null,
                shortBio: ``,
                bio: ``,
                facebook: ``,
                insta: '',
                artistconnect: ''
            },
            artistFocusItemUpdateListeners: [],

            schedulerFocusItem: {
                "id": 10205,
                "itemType": "type4",
                "artistName": "Sisy Ayala",
                "sessionMainTitle": "Absolute Beginner Track - Salsa",
                "time": "13:00 - 14:00",
                "room": "ROOM  4",
                "level": "-1",
                "group": [
                    10201,
                    10202,
                    10203,
                    10204,
                    10205,
                    10206,
                    10207,
                    10208
                ],
                "groupTitle": "Workshops",
                "groupSubtitle": "",
                "shortMainTitle": "",
                "dateString": "Fri, October 18, 2024",
                "startTime": "2024-10-18T13:00:00.000Z",
                "endTime": "2024-10-18T14:00:00.000Z",
                "place": "",
                "sessionSubtitle": "",
                "sessionDescription": "",
                "artistOne": "Sisy Ayala",
                "artistTwo": "",
                "artistLocation": "Aurora",
                "flag": false,
                "flagIncludeInNow": false,
                "artistCompany": "Somos Dance Studio",
                "sessionSpecialTrackCount": "(1 of 2)"
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
            dataDependentComponents: [],
            dataDependentComponentSchedulerScreen: null,
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

    updateInfo = 'none';

    tabBarInitialIndex = 0;
    tabBarIndex = 0;
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
            { id: 1, itemText: "Schedule", associatedScreenName: "schedulerMainScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_planner.png') },
            { id: 2, itemText: "Artists", associatedScreenName: "artistsMainScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_artists.png') },
            { id: 3, itemText: "More", associatedScreenName: "settingsScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_settings.png') }
        ]

    artistStackIndex = 0
    artistStackData =
        [
            { id: 0, itemText: "Artists & DJs", associatedScreenName: "artistsSelectionScreenContainer", imgSrc: null, screenComponentRef: null },
            { id: 1, itemText: "Artist Details", associatedScreenName: "artistsDetailsScreenContainer", imgSrc: null, screenComponentRef: null },
            { id: 2, itemText: "Offer Screen", associatedScreenName: "artistsOfferScreenContainer", imgSrc: null, screenComponentRef: null },
        ]

    schedulerStackIndex = 0
    schedulerStackData =
        [
            { id: 0, itemText: "Festival Program", associatedScreenName: "schedulerSelectionScreenContainer", imgSrc: null, screenComponentRef: null },
            { id: 1, itemText: "Session Details", associatedScreenName: "schedulerDetailsScreenContainer", imgSrc: null, screenComponentRef: null },
        ]


    customFonts = {
        'DINNeuzeitGroteskStd-Light': require('../assets/fonts/DINNeuzeitGroteskStdLight.otf'),
        'DINCondensed-Regular': require('../assets/fonts/DINNeuzeitGroteskStdBdCond.otf'),
        'DINCondensed-Bold': require('../assets/fonts/DINNeuzeitGroteskStdBdCond.otf'),
        'Arcon-Regular': require('../assets/fonts/Arcon-Regular.otf'),
        'Arcon-Rounded-Regular': require('../assets/fonts/Arcon-Regular.otf'),
        'Cabin-Regular': require('../assets/fonts/Cabin-Regular.ttf'),
        // 'RobotoCondensed-Regular': require('../assets/fonts/RobotoCondensed-Regular.ttf'),
        // 'RobotoCondensed-Medium': require('../assets/fonts/RobotoCondensed-Medium.ttf'),
    };

    staticImageList = {};

    constructor() {
        super();
    }

    async initialize() {
        const dataModel = DataModel.getInstance().static;
        const uiManager = global?.nativeFabricUIManager ? 'Fabric' : 'Paper';
        console.log(`LauncherController - using ${uiManager}`);

        //if we are on beta stage, fix the api URL
        this.staging = process.env.EXPO_PUBLIC_STAGING!=undefined?process.env.EXPO_PUBLIC_STAGING:'prod';
        dataModel.apiUrlBase =  this.staging !='prod'?(dataModel.apiUrlBase+"/"+this.staging) : dataModel.apiUrlBase;

        try {
            await this.checkForUpdate();
            await Font.loadAsync(this.customFonts);
            console.log("LauncherController - Fonts loaded.");
            await this.getLocallyStoredDataModel();

            await ActionUpdateDataModelWithRemote({noProcessing: true,  timeOut:800} )
            console.log('LauncherController - Model local/remote checks w/ potential update completed.');
            await this.prepareDataModel();
            console.log('LauncherController initialization done. Tutorial completed: ' + this.appTutorialCompleted);

            ActionTimeBasedUpdates();
            const checkForModelUpdate = setInterval(() => { ActionUpdateDataModelWithRemote({noProcessing: false,  timeOut:dataModel.modelRemoteUpdateInterval-1000}); }, dataModel.modelRemoteUpdateInterval);

            BackHandler.addEventListener('hardwareBackPress', () => { ActionHistoryBackButton(); return true; })
        } catch (e) {
            console.warn(e);
        } finally { }

    }

    async checkForUpdate() {
        try {
            console.log("LoadingScreen - checking updates")
            const update: Updates.UpdateCheckResult = await Updates.checkForUpdateAsync();
            this.updateInfo = Updates.updateId;
            if (update.isAvailable) {
                console.log("LoadingScreen - new Update available")
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
            }
        } catch (error) {
            // You can also add an alert() to see the error message in case of an error when fetching updates.
        }
    }

    async getLocallyStoredDataModel() {
        const dataModel = DataModel.getInstance().static;

        try {
            console.log('LauncherController - checking local models...');

            const value = await AsyncStorage.getItem('dataModel');
            // console.log('LauncherController - value ' + value.substring(0,100));
            const localModelCopy = {};
            if (value == null) { //never used local storage - first time load
                const modelAsString = JSON.stringify(DataModel.getInstance().static);
                console.log('LauncherController  - using initial model (and storing locally): ' + dataModel.modelVersion);
                AsyncStorage.setItem('dataModel', modelAsString);
                return;
            }
            if (value != null) {
                console.log("LauncherController - retrieving local storage ")
                const locallyStoredModel = JSON.parse(value);
                console.log("LauncherController -  local storage version "+locallyStoredModel.modelVersion)
                if (locallyStoredModel.modelVersion <= dataModel.modelVersion) return;
                console.log('LauncherController - initial model version: ' + DataModel.getInstance().static.modelVersion);
                DataModel.getInstance().static = locallyStoredModel;
                console.log('LauncherController - after overwriting with locally stored model: ' + DataModel.getInstance().static.modelVersion);
                return;
            }
        } catch (e) {
            console.error(e)
        }
    };

    // async getRemoteDataModel() {
    //     const dataModel = DataModel.getInstance().static;

    //     try {
    //         console.log('LauncherController - checking remote models...');
    //         const fetchController = new AbortController()
    //         setTimeout(() => { fetchController.abort() }, 1500)

    //         const response = await fetch(dataModel.apiUrlBase + dataModel.apiModelUpdateVersion, { signal: fetchController.signal });
    //         if (!response.ok) return;

    //         const remoteModel = await response.json();
    //         console.log('LauncherController - remote model with version: ' + remoteModel.modelVersion,);

    //         if (remoteModel.modelVersion <= dataModel.modelVersion) return;

    //         // now sync all the keys in the remote model to the local model
    //         for (const key in remoteModel) {
    //             if (Object.prototype.hasOwnProperty.call(dataModel, key)) {
    //                 console.log("LauncherController - syncing local key with remote key: " + key);
    //                 dataModel[key] = remoteModel[key];
    //             }
    //         }
    //         console.log('LauncherController - using remote model and storing locally.' + remoteModel.modelVersion,);

    //         AsyncStorage.setItem('dataModel', JSON.stringify({ dataModel }));

    //     } catch (error) {
    //         if (error.message == "Aborted") {
    //             console.log('LauncherController - Internet too slow to get remote model.');
    //             return;
    //         }
    //         // console.error(error);
    //     }
    // }

    async prepareDataModel() {
        const dataModel = DataModel.getInstance().static;

        console.log("LauncherController - processing data model...");
        //artist data reformatting
        //1) add static references to the imgSrc field of the artist data item

        //load artist images
        AssetLoader.instance.loadAssets(this.staticImageList)
     
        for (const k in dataModel.dataArtists) {
            // console.log('Assigning Images' +k)
            const artistItem = dataModel.dataArtists[k];
            const artistNameNorm = k.toLowerCase().replace(" y ", " & ");
            // console.log('Artist: ' + artistNameNorm)
            const expectedFilename = artistNameNorm.toLowerCase().replace(/[.’]/g, "").replace(/[ ]/g, "_").replace(/[&]/g, "-").replace('é','e') + ".png"
            // ('&','-').replaceAll(' ','_').replaceAll('.','').replace(`’`,'');

            for (let i in this.staticImageList) {
                // const namefile = this.staticImageList[j].fileName.replaceAll('_', ' ').replace('-', '&').replace(`’`,'').replace('.png', '');
                // console.log(`   expectedFilename: ${expectedFilename} - checking asset name: ${this.staticImageList[j].fileName}` )
                if (this.staticImageList[i].fileName == expectedFilename) {
                    artistItem['imgSrc'] = this.staticImageList[i].imgSrc;
                    console.log('          ' + ' -> ' + this.staticImageList[i].fileName)
                    break;
                }
            }
        }

        // try {
        //     if (dataModel.dataStyles['type1'] != undefined) dataModel.dataStyles['type1'].imgSrc = require('../assets/tile-fullprogram-itembg1.png');
        //     if (dataModel.dataStyles['type2'] != undefined) dataModel.dataStyles['type2'].imgSrc = require('../assets/tile-fullprogram-itembg2.png');
        //     if (dataModel.dataStyles['type3'] != undefined) dataModel.dataStyles['type3'].imgSrc = require('../assets/tile-fullprogram-itembg3.png');
        //     if (dataModel.dataStyles['type4'] != undefined) dataModel.dataStyles['type4'].imgSrc = require('../assets/tile-fullprogram-itembg4.png');

        // } catch (error) {
        //     console.log('Could not assign an image for a particularhomepage bg')
        // }


        // try {
        //     if (dataModel.dataLocation['altemuenze'] != undefined) dataModel.dataLocation['altemuenze'].imgSrc = require('../assets/location-icons/location-alte-muenze.png')
        //     if (dataModel.dataLocation['bebop'] != undefined) dataModel.dataLocation['bebop'].imgSrc = require('../assets/location-icons/location-bebop.png')
        //     if (dataModel.dataLocation['belushis'] != undefined) dataModel.dataLocation['belushis'].imgSrc = require('../assets/location-icons/location-belushis.png')
        //     if (dataModel.dataLocation['berlindanceinstitute'] != undefined) dataModel.dataLocation['berlindanceinstitute'].imgSrc = require('../assets/location-icons/location-berlin-dance-institute.png')
        //     if (dataModel.dataLocation['soda'] != undefined) dataModel.dataLocation['soda'].imgSrc = require('../assets/location-icons/location-soda.png')
        //     if (dataModel.dataLocation['unknown'] != undefined) dataModel.dataLocation['unknown'].imgSrc = require('../assets/location-icons/location-unknown.png')
        //     if (dataModel.dataLocation['citytour'] != undefined) dataModel.dataLocation['citytour'].imgSrc = require('../assets/location-icons/location-citytour.png')
        // } catch (error) {
        //     console.log('Could not assign an image for a particularhomepage bg')
        // }

        // console.log("::::::::Preparing Data Model - End Assigning Images");

        //2) shorten the biography

        const upperLimit = 200;
        const lowerLimit = 80;
        let index = 0;
        for (const k in dataModel.dataArtists) {
            // console.log('Shortening Biographies ' +k)
            const item = dataModel.dataArtists[k];
            if (item.bio == undefined) continue;
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
            DataModel.getInstance().dyn_dataScheduleListsByDay[j].data.push({ "id": j * 10000, "itemType": "type5", group: [] })
        }



        DataModel.getInstance().dyn_dataModelProgram = [];
        for (let i = 0; i < dataModel.dataModelProgram.length; i++) {
            // console.log(dataModel.dataModelProgram[i].startTime);
            if (dataModel.dataModelProgram[i].endTime == '' || Date.parse(dataModel.dataModelProgram[i].endTime) > Date.now()) {
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
