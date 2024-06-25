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
                facebook: 	``, 
                insta: 	''
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
            { id: 0, itemText: "Friday", associatedScreenName: "scheduleList0", imgSrc: null },
            { id: 1, itemText: "Saturday", associatedScreenName: "scheduleList1", imgSrc: null },
            { id: 2, itemText: "Sunday", associatedScreenName: "scheduleList2", imgSrc: null }
        ]



    navBarIndex = 0
    navBarData =
        [
        //     { id: 0, itemText: "Home", associatedScreenName: "homeScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_home.png') },
        //     { id: 1, itemText: "Schedule", associatedScreenName: "sessionScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_planner.png') },
        //     { id: 3, itemText: "Artists", associatedScreenName: "artistsListScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_artists.png') },
        //     { id: 4, itemText: "More", associatedScreenName: "settingsScreenContainer", imgSrc: require('../assets/navbar/navbar_icon_settings.png') }
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
            await this.getLocallyStoredDataModel();
            await this.getRemoteDataModel();
            console.log('LauncherController - Model local/remote checks w/ potential update completed.');
            await this.prepareDataModel();
            console.log('LauncherController initialization done. Tutorial completed: ' + this.appTutorialCompleted);

            const checkForModelUpdate = setInterval(() => { ActionUpdateDataModelWithRemote(); }, DataModel.modelRemoteUpdateInterval);

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
            if(DataModel.dataArtists['Ace Fusion'] != undefined) DataModel.dataArtists['Ace Fusion'].imgSrc = require('../assets/portraits/_0013_ACE-FUSION.png');
            if(DataModel.dataArtists['Adrián Nitti'] != undefined) DataModel.dataArtists['Adrián Nitti'].imgSrc = require('../assets/portraits/_0014_ADRIÁN.png');
            if(DataModel.dataArtists['Alex & Desiree'] != undefined) DataModel.dataArtists['Alex & Desiree'].imgSrc = require('../assets/portraits/_0022_ALEX__DESIREE.png');
            if(DataModel.dataArtists['Alicia Langlais'] != undefined) DataModel.dataArtists['Alicia Langlais'].imgSrc = require('../assets/portraits/_0020_ALICIA-LANGLAIS.png');
            if(DataModel.dataArtists['Amoura Teese'] != undefined) DataModel.dataArtists['Amoura Teese'].imgSrc = require('../assets/portraits/_0021_AMOURA-TEESE.png');
            if(DataModel.dataArtists['Andrew Noel'] != undefined) DataModel.dataArtists['Andrew Noel'].imgSrc = require('../assets/portraits/_0018_ANDREW-NOEL.png');
            if(DataModel.dataArtists['Angelica Medina'] != undefined) DataModel.dataArtists['Angelica Medina'].imgSrc = require('../assets/portraits/_0006_ANGELICA-MEDINA.png');
            if(DataModel.dataArtists['Angie & Audrey'] != undefined) DataModel.dataArtists['Angie & Audrey'].imgSrc = require('../assets/portraits/_0010_ANGIE__AUDREY.png');
            if(DataModel.dataArtists['Bex'] != undefined) DataModel.dataArtists['Bex'].imgSrc = require('../assets/portraits/_0014_ADRIÁN.png');
            if(DataModel.dataArtists['Bryon & Sammantha'] != undefined) DataModel.dataArtists['Bryon & Sammantha'].imgSrc = require('../assets/portraits/_0001_BRYON__SAMMANTHA.png');
            if(DataModel.dataArtists['Eleanee & Baudillo'] != undefined) DataModel.dataArtists['Eleanee & Baudillo'].imgSrc = require('../assets/portraits/_0016_ELEANEE__BAUDILLO.png');
            if(DataModel.dataArtists['Elena Rovito'] != undefined) DataModel.dataArtists['Elena Rovito'].imgSrc = require('../assets/portraits/_0012_ELENA-ROVITO.png');
            if(DataModel.dataArtists['Franklin Liranzo'] != undefined) DataModel.dataArtists['Franklin Liranzo'].imgSrc = require('../assets/portraits/_0009_FRANKLIN-LIRANZO.png');
            if(DataModel.dataArtists['Gabriele Di Marzo'] != undefined) DataModel.dataArtists['Gabriele Di Marzo'].imgSrc = require('../assets/portraits/_0008_GABRIELE-DI-MARZO.png');
            if(DataModel.dataArtists['Jahaira Fajardo'] != undefined) DataModel.dataArtists['Jahaira Fajardo'].imgSrc = require('../assets/portraits/_0011_JAHAIRA.png');
            if(DataModel.dataArtists['Jason Rodriguez'] != undefined) DataModel.dataArtists['Jason Rodriguez'].imgSrc = require('../assets/portraits/_0026_JASON-RODRIGUEZ.png');
            if(DataModel.dataArtists['Jayven Colon'] != undefined) DataModel.dataArtists['Jayven Colon'].imgSrc = require('../assets/portraits/_0007_JAYVEN-COLON.png');
            if(DataModel.dataArtists['Jeremy Meza'] != undefined) DataModel.dataArtists['Jeremy Meza'].imgSrc = require('../assets/portraits/_0033_JEREMY-MEZA.png');
            if(DataModel.dataArtists['Jessica Marie'] != undefined) DataModel.dataArtists['Jessica Marie'].imgSrc = require('../assets/portraits/_0035_JESSICA-MARIE.png');
            if(DataModel.dataArtists['Jhesus Aponte'] != undefined) DataModel.dataArtists['Jhesus Aponte'].imgSrc = require('../assets/portraits/_0019_JHESUS-APONTE.png');
            if(DataModel.dataArtists['Joel Gomez'] != undefined) DataModel.dataArtists['Joel Gomez'].imgSrc = require('../assets/portraits/_0017_JOEL-GOMEZ.png');
            if(DataModel.dataArtists['John & Liz'] != undefined) DataModel.dataArtists['John & Liz'].imgSrc = require('../assets/portraits/_0036_JOHN-AND-LIZ.png');
            if(DataModel.dataArtists['Karel & Bruno'] != undefined) DataModel.dataArtists['Karel & Bruno'].imgSrc = require('../assets/portraits/_0034_KAREL__BRUNO.png');
            if(DataModel.dataArtists['Karel Flores'] != undefined) DataModel.dataArtists['Karel Flores'].imgSrc = require('../assets/portraits/_0034_KAREL__BRUNO.png');
            if(DataModel.dataArtists['Kathy Reyes'] != undefined) DataModel.dataArtists['Kathy Reyes'].imgSrc = require('../assets/portraits/_0037_KATHY-REYES.png');
            if(DataModel.dataArtists['Katlyn Rodriguez'] != undefined) DataModel.dataArtists['Katlyn Rodriguez'].imgSrc = require('../assets/portraits/_0032_KATLYN-RODRIGUEZ.png');
            if(DataModel.dataArtists['Kyla Hallumus'] != undefined) DataModel.dataArtists['Kyla Hallumus'].imgSrc = require('../assets/portraits/_0005_KYLA-HALLUMUS.png');
            if(DataModel.dataArtists['Latisha Hardy'] != undefined) DataModel.dataArtists['Latisha Hardy'].imgSrc = require('../assets/portraits/_0004_LATISHA-HARDY.png');
            if(DataModel.dataArtists['Lilly Rose'] != undefined) DataModel.dataArtists['Lilly Rose'].imgSrc = require('../assets/portraits/_0003_LILLY-ROSE.png');
            if(DataModel.dataArtists['Luis Aguilar'] != undefined) DataModel.dataArtists['Luis Aguilar'].imgSrc = require('../assets/portraits/_0039_LUIS-AGUILAR.png');
            if(DataModel.dataArtists['Lyrik Cruz'] != undefined) DataModel.dataArtists['Lyrik Cruz'].imgSrc = require('../assets/portraits/_0002_LYRIK-CRUZ.png');
            if(DataModel.dataArtists['Mariah & Andrea'] != undefined) DataModel.dataArtists['Mariah & Andrea'].imgSrc = require('../assets/portraits/_0038_MARIAH__ANDREA.png');
            if(DataModel.dataArtists['Mireille Ruiz'] != undefined) DataModel.dataArtists['Mireille Ruiz'].imgSrc = require('../assets/portraits/_0031_MIREILLE-RUIZ.png');
            if(DataModel.dataArtists['Monique Manzo'] != undefined) DataModel.dataArtists['Monique Manzo'].imgSrc = require('../assets/portraits/_0000_MONIQUE-MANZO.png');
            if(DataModel.dataArtists['Ngoc Huynh'] != undefined) DataModel.dataArtists['Ngoc Huynh'].imgSrc = require('../assets/portraits/_0030_NGOC.png');
            if(DataModel.dataArtists['Oscar & Tiffany'] != undefined) DataModel.dataArtists['Oscar & Tiffany'].imgSrc = require('../assets/portraits/_0029_OSCAR__TIFFANY.png');
            if(DataModel.dataArtists['Rafa Gonzalez'] != undefined) DataModel.dataArtists['Rafa Gonzalez'].imgSrc = require('../assets/portraits/_0028_RAFA-GONZALEZ.png');
            if(DataModel.dataArtists['Sabrih Joy'] != undefined) DataModel.dataArtists['Sabrih Joy'].imgSrc = require('../assets/portraits/_0027_SABRIH-JOY.png');
            if(DataModel.dataArtists['Serena Spears'] != undefined) DataModel.dataArtists['Serena Spears'].imgSrc = require('../assets/portraits/_0015_SERENA-SPEARS.png');
            if(DataModel.dataArtists['Sir Joq'] != undefined) DataModel.dataArtists['Sir Joq'].imgSrc = require('../assets/portraits/_0025_SIR-JOQ.png');
            if(DataModel.dataArtists['Susana Arenas'] != undefined) DataModel.dataArtists['Susana Arenas'].imgSrc = require('../assets/portraits/_0023_SUSANA-ARENAS.png');
            if(DataModel.dataArtists['Tom Ogunribido'] != undefined) DataModel.dataArtists['Tom Ogunribido'].imgSrc = require('../assets/portraits/_0024_TOM-OGUNRIBIDO.png');
     
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
