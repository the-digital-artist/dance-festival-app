import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import DataModel from './DataModel';
import ActionUpdateDataModelWithRemote from './actions/ActionUpdateDataModel';
import ActionUpdateHappeningNow from './components/happeningnowtile/ActionUpdateHappeningNow';
import OperatorStates from './core/LOperatorStates';
import TransitionScreenL1toL2 from './transitions/TransitionScreenL1toL2';
import TransitionScreenL2toL3 from './transitions/TransitionScreenL2toL3';
import TransitionScreenSplashToLoading from './transitions/TransitionScreenSplashToLoading';


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
                sessionMainTitle: 'See You in 2025! 🌈',
                shortMainTitle: 'See You in 2025! 🌈',
                itemType: 'type0',
                groupTitle: '',
                groupSubtitle: '',
                room: 'The 6th Queer Afro-Latin Dance \nFestival has concluded.',
                startTime: '2024-06-17T05:00', 
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
            { id: 3, itemText: "Artists", associatedScreenName: "artistsListScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_artists.png') },
            { id: 4, itemText: "More", associatedScreenName: "settingsScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_settings.png') }
        ]

    customFonts = {
        'Antonio-Regular': require('../assets/fonts/Antonio-Regular.ttf'),
        'Arcon-Regular': require('../assets/fonts/Arcon-Regular.otf'),
        'Arcon-Rounded-Regular': require('../assets/fonts/Arcon-Regular.otf'),
        'LuckiestGuy-Regular': require('../assets/fonts/LuckiestGuy-Regular.ttf'),
        'Cabin-Regular': require('../assets/fonts/Cabin-Regular.ttf'),
        'RobotoCondensed-Regular': require('../assets/fonts/RobotoCondensed-Regular.ttf'),
        'RobotoCondensed-Medium': require('../assets/fonts/RobotoCondensed-Medium.ttf'),
       
    };

    constructor() {
        super();
    }

    async initialize() {
        try {
            await Font.loadAsync(this.customFonts);
            console.log("LauncherController - Fonts loaded.");
            await this.getLocallyStoredDataModel();
            // await this.getRemoteDataModel();
            console.log('LauncherController - Model local/remote checks w/ potential update completed.');
            await this.prepareDataModel();
            console.log('LauncherController initialization done. Tutorial completed: ' + this.appTutorialCompleted);

            // const checkForModelUpdate = setInterval(() => { ActionUpdateDataModelWithRemote(); }, DataModel.modelRemoteUpdateInterval);

            // ActionUpdateHappeningNow();
            const checkHappeningNowFunction = setInterval(() => { ActionUpdateHappeningNow(); }, DataModel.happeningNowUpdateInterval);
         
        } catch (e) {
            console.warn(e);
        } finally { }

    }


    async getLocallyStoredDataModel() {
        try {
            console.log('LauncherController - checking local models...');

            const value = await AsyncStorage.getItem('qaldfDataModel');
            if (value == null) { //never used local storage - first time load
                const modelAsString = JSON.stringify({
                    modelVersion: DataModel.modelVersion,
                    dataArtists: DataModel.dataArtists,
                    dataScheduleRaw: DataModel.dataScheduleRaw
                });
                console.log('LauncherController  - using initial model: '+ DataModel.modelVersion);
                AsyncStorage.setItem('qaldfDataModel', modelAsString);
                return;
            }
            if (value !== null) {
                const locallyStoredModel = JSON.parse(value);
                if (locallyStoredModel.modelVersion <= DataModel.modelVersion) return;

                DataModel.dataArtists = locallyStoredModel.dataArtists
                DataModel.dataScheduleRaw = locallyStoredModel.dataScheduleRaw
                DataModel.modelVersion = locallyStoredModel.modelVersion
                console.log('LauncherController - using locally stored model: '+ DataModel.modelVersion);
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
            console.log('LauncherController - remote model with version: '+ remoteModel.modelVersion,);

            if (remoteModel.modelVersion > DataModel.modelVersion) {
                DataModel.modelVersion = remoteModel.modelVersion
                DataModel.dataArtists = remoteModel.dataArtists;
                DataModel.dataScheduleRaw = remoteModel.dataScheduleRaw;

                console.log('LauncherController - using remote model and storing locally.'+ remoteModel.modelVersion,);

                AsyncStorage.setItem('qaldfDataModel', JSON.stringify({
                    modelVersion: DataModel.modelVersion,
                    dataArtists: DataModel.dataArtists,
                    dataScheduleRaw: DataModel.dataScheduleRaw
                }));
            }

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
            if(DataModel.dataArtists['Alafia Ire'] != undefined) DataModel.dataArtists['Alafia Ire'].imgSrc = require('../assets/portraits/05_Alafia_Con_Ire.png');
            if(DataModel.dataArtists['Alexander Carbo'] != undefined) DataModel.dataArtists['Alexander Carbo'].imgSrc = require('../assets/portraits/08_Alexander_Carbo.png');
            if(DataModel.dataArtists['Alexandra Toledo'] != undefined) DataModel.dataArtists['Alexandra Toledo'].imgSrc = require('../assets/portraits/13_Alexandra_Toledo.png');
            if(DataModel.dataArtists['Angela Jauregui'] != undefined) DataModel.dataArtists['Angela Jauregui'].imgSrc = require('../assets/portraits/10_Angela_de_la_Caridad_Jauregui.png');
            if(DataModel.dataArtists['DJ Goodfoot'] != undefined) DataModel.dataArtists['DJ Goodfoot'].imgSrc = require('../assets/portraits/03_DJ_Goodfoot.png');
            if(DataModel.dataArtists['DJ Paulazo'] != undefined) DataModel.dataArtists['DJ Paulazo'].imgSrc = require('../assets/portraits/02_DJ_Paulazo.png');
            if(DataModel.dataArtists['DJ Puma'] != undefined) DataModel.dataArtists['DJ Puma'].imgSrc = require('../assets/portraits/04_El_Puma_DJ.png');
            if(DataModel.dataArtists['DJ Yala'] != undefined) DataModel.dataArtists['DJ Yala'].imgSrc = require('../assets/portraits/01_DJ_Yala.png');
            if(DataModel.dataArtists['Helen'] != undefined) DataModel.dataArtists['Helen'].imgSrc = require('../assets/portraits/06_Helen.png');
            if(DataModel.dataArtists['Ido Flaishon'] != undefined) DataModel.dataArtists['Ido Flaishon'].imgSrc = require('../assets/portraits/18_Ido_Flaishon.png');
            if(DataModel.dataArtists['Jonas Reichert'] != undefined) DataModel.dataArtists['Jonas Reichert'].imgSrc = require('../assets/portraits/21_Jonas_Reichert.png');
            if(DataModel.dataArtists['Kimberly Wirt'] != undefined) DataModel.dataArtists['Kimberly Wirt'].imgSrc = require('../assets/portraits/14_Kimberly_Wirt.png');
            if(DataModel.dataArtists['Leonardo Moya'] != undefined) DataModel.dataArtists['Leonardo Moya'].imgSrc = require('../assets/portraits/20_Leonardo_Martinez_Moya.png');
            if(DataModel.dataArtists['Lucas Flemming'] != undefined) DataModel.dataArtists['Lucas Flemming'].imgSrc = require('../assets/portraits/17_Lucas_Flemming.png');
            if(DataModel.dataArtists['Lynet Rubio'] != undefined) DataModel.dataArtists['Lynet Rubio'].imgSrc = require('../assets/portraits/09_Lynet_Rivero_Rubio.png');
            if(DataModel.dataArtists['Ruggiero Palombella'] != undefined) DataModel.dataArtists['Ruggiero Palombella'].imgSrc = require('../assets/portraits/12_Ruggiero_Palombella.png');
            if(DataModel.dataArtists['Sassan Alivaliollahi'] != undefined) DataModel.dataArtists['Sassan Alivaliollahi'].imgSrc = require('../assets/portraits/19_Sassan_Alivaliollahi.png');
            if(DataModel.dataArtists['Silvio Perez'] != undefined) DataModel.dataArtists['Silvio Perez'].imgSrc = require('../assets/portraits/11_Silvio_Leroy_Perez.png');
            if(DataModel.dataArtists['Tanja'] != undefined) DataModel.dataArtists['Tanja'].imgSrc = require('../assets/portraits/07_Tanja.png');
            if(DataModel.dataArtists['Timo Lingnau'] != undefined) DataModel.dataArtists['Timo Lingnau'].imgSrc = require('../assets/portraits/16_Timo_Lingnau.png');
            if(DataModel.dataArtists['Wendy Solanch'] != undefined) DataModel.dataArtists['Wendy Solanch'].imgSrc = require('../assets/portraits/15_Wendy_Solanch.png');
        
        } catch (error) {
            console.log('Could not assign an image for a particular artist')
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
        DataModel.dataArtistsList = [];
        for (let key in DataModel.dataArtists) {
            DataModel.dataArtistsList.push(DataModel.dataArtists[key]);
        }

        // console.log("::::::::Preparing Data Model - ArtistList Length: " + DataModel.dataArtistsList.length);

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
        for (let i = 0; i < DataModel.dataScheduleRaw.length; i++) {
            dataItem = DataModel.dataScheduleRaw[i];

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
                for (let k = 0; k < DataModel.dataScheduleRaw.length; k++) {
                    if (dataItemOldGroup[j] == DataModel.dataScheduleRaw[k].id) {
                        dataItemNewGroup.push({ id: dataItemOldGroup[j], obj: DataModel.dataScheduleRaw[k] });
                        DataModel.dataScheduleRaw[k].flag = (j==0)?false:true;
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
            console.log('adding '+dataItem.id)

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
