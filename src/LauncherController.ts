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
        'DINCondensed-Regular': require('../assets/fonts/DINNeuzeitGroteskStdBdCond.otf'),
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

            AsyncStorage.setItem('dataModel', JSON.stringify({ dataModel }));

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

        const imgList = [];
        //load images
        try {
            imgList.push({ fileName: 'adolfo_-_tania.png', imgSrc: require('../assets/portraits/adolfo_-_tania.png') });
            imgList.push({ fileName: 'adolfo_indacochea.png', imgSrc: require('../assets/portraits/adolfo_indacochea.png') });
            imgList.push({ fileName: 'adrian_tenorio.png', imgSrc: require('../assets/portraits/adrian_tenorio.png') });
            imgList.push({ fileName: 'alex_-_desiree.png', imgSrc: require('../assets/portraits/alex_-_desiree.png') });
            imgList.push({ fileName: 'ataca_-_alemana.png', imgSrc: require('../assets/portraits/ataca_-_alemana.png') });
            imgList.push({ fileName: 'benny_-_ashley.png', imgSrc: require('../assets/portraits/benny_-_ashley.png') });
            imgList.push({ fileName: 'bianca_chapman.png', imgSrc: require('../assets/portraits/bianca_chapman.png') });
            imgList.push({ fileName: 'brandon_-_michelle.png', imgSrc: require('../assets/portraits/brandon_-_michelle.png') });
            imgList.push({ fileName: 'carine_-_rafael.png', imgSrc: require('../assets/portraits/carine_-_rafael.png') });
            imgList.push({ fileName: 'carlos_-_susan.png', imgSrc: require('../assets/portraits/carlos_-_susan.png') });
            imgList.push({ fileName: 'casino_stars.png', imgSrc: require('../assets/portraits/casino_stars.png') });
            imgList.push({ fileName: 'celeste_williamson.png', imgSrc: require('../assets/portraits/celeste_williamson.png') });
            imgList.push({ fileName: 'chelsey_owen.png', imgSrc: require('../assets/portraits/chelsey_owen.png') });
            imgList.push({ fileName: 'chris_-_alexus.png', imgSrc: require('../assets/portraits/chris_-_alexus.png') });
            imgList.push({ fileName: 'clifton_stennet.png', imgSrc: require('../assets/portraits/clifton_stennet.png') });
            imgList.push({ fileName: 'daniel_agosto.png', imgSrc: require('../assets/portraits/daniel_agosto.png') });
            imgList.push({ fileName: 'danny_salsita.png', imgSrc: require('../assets/portraits/danny_salsita.png') });
            imgList.push({ fileName: 'dejon_-_clo.png', imgSrc: require('../assets/portraits/dejon_-_clo.png') });
            imgList.push({ fileName: 'diane_page.png', imgSrc: require('../assets/portraits/diane_page.png') });
            imgList.push({ fileName: 'eder_-_milton.png', imgSrc: require('../assets/portraits/eder_-_milton.png') });
            imgList.push({ fileName: 'edwin_-_ahtoy.png', imgSrc: require('../assets/portraits/edwin_-_ahtoy.png') });
            imgList.push({ fileName: 'el_tiguere_-_bianca.png', imgSrc: require('../assets/portraits/el_tiguere_-_bianca.png') });
            imgList.push({ fileName: 'fuego_-_hielo.png', imgSrc: require('../assets/portraits/fuego_-_hielo.png') });
            imgList.push({ fileName: 'gio_-_gaby.png', imgSrc: require('../assets/portraits/gio_-_gaby.png') });
            imgList.push({ fileName: 'gustavo_-_ayane.png', imgSrc: require('../assets/portraits/gustavo_-_ayane.png') });
            imgList.push({ fileName: 'iroko.png', imgSrc: require('../assets/portraits/iroko.png') });
            imgList.push({ fileName: 'j_square.png', imgSrc: require('../assets/portraits/j_square.png') });
            imgList.push({ fileName: 'jahaira_-_angelica.png', imgSrc: require('../assets/portraits/jahaira_-_angelica.png') });
            imgList.push({ fileName: 'javier_rebollar.png', imgSrc: require('../assets/portraits/javier_rebollar.png') });
            imgList.push({ fileName: 'jessica_quiles.png', imgSrc: require('../assets/portraits/jessica_quiles.png') });
            imgList.push({ fileName: 'johan_-_alyssa.png', imgSrc: require('../assets/portraits/johan_-_alyssa.png') });
            imgList.push({ fileName: 'jorge_-_indira.png', imgSrc: require('../assets/portraits/jorge_-_indira.png') });
            imgList.push({ fileName: 'joseal.png', imgSrc: require('../assets/portraits/joseal.png') });
            imgList.push({ fileName: 'karen_-_ricardo.png', imgSrc: require('../assets/portraits/karen_-_ricardo.png') });
            imgList.push({ fileName: 'kate_rodriguez.png', imgSrc: require('../assets/portraits/kate_rodriguez.png') });
            imgList.push({ fileName: 'kiki_elsilencio.png', imgSrc: require('../assets/portraits/kiki_elsilencio.png') });
            imgList.push({ fileName: 'kingsmen.png', imgSrc: require('../assets/portraits/kingsmen.png') });
            imgList.push({ fileName: 'latisha_hardy.png', imgSrc: require('../assets/portraits/latisha_hardy.png') });
            imgList.push({ fileName: 'lawrence_-_jewel.png', imgSrc: require('../assets/portraits/lawrence_-_jewel.png') });
            imgList.push({ fileName: 'luan_-_adriana.png', imgSrc: require('../assets/portraits/luan_-_adriana.png') });
            imgList.push({ fileName: 'marc_-_rose-.png', imgSrc: require('../assets/portraits/marc_-_rose-.png') });
            imgList.push({ fileName: 'marisol_blanco.png', imgSrc: require('../assets/portraits/marisol_blanco.png') });
            imgList.push({ fileName: 'natasha_tia.png', imgSrc: require('../assets/portraits/natasha_tia.png') });
            imgList.push({ fileName: 'rafa.png', imgSrc: require('../assets/portraits/rafa.png') });
            imgList.push({ fileName: 'raul_-_delia.png', imgSrc: require('../assets/portraits/raul_-_delia.png') });
            imgList.push({ fileName: 'rna.png', imgSrc: require('../assets/portraits/rna.png') });
            imgList.push({ fileName: 'saulo_-_jasmin.png', imgSrc: require('../assets/portraits/saulo_-_jasmin.png') });
            imgList.push({ fileName: 'sebastian_-_jocelyn.png', imgSrc: require('../assets/portraits/sebastian_-_jocelyn.png') });
            imgList.push({ fileName: 'serena_spears.png', imgSrc: require('../assets/portraits/serena_spears.png') });
            imgList.push({ fileName: 'watson_saintsulne.png', imgSrc: require('../assets/portraits/watson_saintsulne.png') });
        } catch (error) {
            console.log('Could not assign an image for a particular artist' + error)
        }

        for (const k in dataModel.dataArtists) {
            const artistItem = dataModel.dataArtists[k];
            console.log('Artist: ' +  k.toLowerCase().replace(' y ', ' & '))
            for (let j = 0; j < imgList.length; j++) {
                const namefile = imgList[j].fileName.replaceAll('_', ' ').replace('-', '&').replace('.png', '');
                // console.log('          namefile ' + namerrfile)
                const nameartist = k.toLowerCase().replace(' y ', ' & ');
                
                if (nameartist == namefile) {
                    artistItem['imgSrc'] = imgList[j].imgSrc;
                    console.log('          ' + ' -> ' + namefile)
                    break;
                }
            }
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
