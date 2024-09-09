import { modelInitStaticOverwrite } from "./DataModelOverwrite";

class DataModel {

	private static _instance: DataModel;
	public static getInstance() { if (!this._instance) { this._instance = new DataModel(); } return this._instance; }

	static modelOverWriteOnFirstLoad = true;

	constructor() {
		// console.log('DataModel Creation - model version: ' + this.static);
		if (!DataModel.modelOverWriteOnFirstLoad) return;

		(this.static as any) = modelInitStaticOverwrite;
		console.log('DataModel Creation - model overwrite: ' + this.static);
	}


	//dynamic properties (get generated)
	dyn_dataArtistsList = null;

	//schedule can be structured by day or section, pre-generated lists (arrays of array)
	dyn_dataScheduleListsByDay = null;
	dyn_dataScheduleListsBySection = null;

	dyn_dataModelProgram = null;
	dyn_userManagement = {
		userDataIndexLoggedIn: -1,
		userData: [
			{
				id: 0,
				name: "1-Tom",
				firstName: 'Tom',
				role: "Organizer",
				email: "fischer.philipp@gmail.com",
				passwort: "caldacforever",
				imgSrc: -1
			},
			{
				id: "6-Philipp",
				name: "Philipp",
				firstName: 'Philipp',
				appleAuthData: {},
				email: "fischer.philipp@gmail.com",
				passwort: "caldacforever",
				imgSrc: -1
			}
		]
	}


	//static properties (may be updated by remote model version)
	static = {
		modelRemoteGetModelUrl: '',
		modelRemoteVersionCheckUrl: '',
		modelRemoteUpdateInterval: 55000,

		happeningNowUpdateInterval: 30000,

		modelVersion: 1000,

		dataArtists: {
			"Ki Charles": { "fullName": "Ki Charles", editionData: ["01-2024", "02-2024", "03-2024", "04-2024"], imgSrc: "", "insta": "", "bio": "was born.. ", "shortBio": "", "facebook": "", "portrait": "_0000_DEFAULT.png" },
			"Alex Castro": { "fullName": "Alex Castro", editionData: ["01-2024", "02-2024"], imgSrc: "", "insta": "", "bio": "was born.. ", "shortBio": "", "facebook": "", "portrait": "_0000_DEFAULT.png" },
			"David Khalili": { "fullName": "David Khalili", editionData: ["01-2024", "03-2024"], imgSrc: "", "insta": "", "bio": "was born.. ", "shortBio": "", "facebook": "", "portrait": "_0000_DEFAULT.png" },
			"Alexandria": { "fullName": "Alexandria", editionData: ["01-2024"], imgSrc: "", "insta": "", "bio": "was born.. ", "shortBio": "", "facebook": "", "portrait": "_0000_DEFAULT.png" },
			"Kramer & Dhiraj": { "fullName": "Kramer & Dhiraj", editionData: ["01-2024", "02-2024", "03-2024"], imgSrc: "", "insta": "", "bio": "was born.. ", "shortBio": "", "facebook": "", "portrait": "_0000_DEFAULT.png" },
		},

		dataScheduleRaw: [
			{ "id": 201, "itemType": "type1", "artistName": "Carlos & Suzan", "sessionMainTitle": "Bachata", "time": "18:00 - 19:00", "room": "AURORA 1", "level": "0", "group": [201], "groupTitle": "Workshops", "groupSubtitle": "", "shortMainTitle": "", "dateString": "Thu, October 17, 2024", "startTime": "10/17/24, 06:00 PM", "endTime": "10/17/24, 07:00 PM", "place": "", "sessionSubtitle": "", "sessionDescription": "", "artistOne": "Carlos & Suzan", "artistTwo": "", "artistLocation": "!", "flag": false, "flagIncludeInNow": false },
			{ "id": 301, "itemType": "type1", "artistName": "Brandon & Michelle", "sessionMainTitle": "Salsa On2 Partnerwork", "time": "19:00 - 20:00", "room": "AURORA 1", "level": "0", "group": [301], "groupTitle": "Workshops", "groupSubtitle": "", "shortMainTitle": "", "dateString": "Thu, October 17, 2024", "startTime": "2024-10-17T19:00:00.000Z", "endTime": "2024-10-17T20:00:00.000Z", "place": "", "sessionSubtitle": "", "sessionDescription": "", "artistOne": "Brandon & Michelle", "artistTwo": "", "artistLocation": "!", "flag": false, "flagIncludeInNow": false },
			{ "id": 401, "itemType": "type1", "artistName": "El Tiguere Y Bianca", "sessionMainTitle": "Bachata: Culture, History & Music", "time": "20:00 - 21:00", "room": "AURORA 1", "level": "0", "group": [401], "groupTitle": "Workshops", "groupSubtitle": "", "shortMainTitle": "", "dateString": "Thu, October 17, 2024", "startTime": "2024-10-17T20:00:00.000Z", "endTime": "2024-10-17T21:00:00.000Z", "place": "", "sessionSubtitle": "", "sessionDescription": "", "artistOne": "El Tiguere Y Bianca", "artistTwo": "", "artistLocation": "DR", "flag": false, "flagIncludeInNow": false },
		],

		dataSpecialSessions: {
			"Track Name": { company: '', description: '', title: '', price: '', signup: '', artistNames: [] }
		},

		dataTicketSales: {
			earlyBirdStartTimeString: '2024-07-21T05:00:00.000'
		},

		//data backing component labels / information architecture
		dataComponents: {
			schedulerTabBar:
			[
				{ id: 0, itemText: "Main Fair Progam", associatedScreenName: "scheduleList0", imgSrc: null },
				{ id: 1, itemText: "Sessions", associatedScreenName: "scheduleList1", imgSrc: null },
				// { id: 1, itemText: "Classes, Conversation Circles & Outside", associatedScreenName: "scheduleList1", imgSrc: null },
				// { id: 2, itemText: "Outside", associatedScreenName: "scheduleList2", imgSrc: null },
				{ id: 2, itemText: "Massage", associatedScreenName: "scheduleList2", imgSrc: null },
				{ id: 3, itemText: "Crafty Corners", associatedScreenName: "scheduleList3", imgSrc: null }
			],
			schedulerTabDescriptions: [
				"Welcome to the SF Wellbeing Fair. Below you can find the main program of the fair. The Opening starts 12:00 in the Main Fair Space. Closing will take place 4:45-5pm",
				"Our breakout sessions start at 1:00pm and come in different flavors. 1) Group Classes 2) Conversation Circles 3) Outside. Feel free to browse the parallel sessions and mark the ones you would like to go to.",
				"Massage Spaces - Open from 12:15-4:30pm",
				"Crafty Corner - Open from 12:15-4:30pm"
			],
			navBar:
			[
				{ id: 0, itemText: "Calm Space", associatedScreenName: "homeScreenContainer", imgSrc: null, imgPath: '../assets/navbar/navbar_icon_home.png' },
				{ id: 1, itemText: "Schedule", associatedScreenName: "schedulerMainScreenContainer", imgSrc: null, imgPath: '../assets/navbar/navbar_icon_planner.png' },
				{ id: 3, itemText: "Artists", associatedScreenName: "artistsMainScreenContainer", imgSrc: null, imgPath: '../assets/navbar/navbar_icon_artists.png' },
			],
	
			artistStack:
			[
				{ id: 0, itemText: "Artists & Practitioners", associatedScreenName: "artistsSelectionScreenContainer", imgSrc: null},
				{ id: 1, itemText: "Artist Details", associatedScreenName: "artistsDetailsScreenContainer", imgSrc: null },
			],
	
			schedulerStack:
			[
				{ id: 0, itemText: "Schedule", associatedScreenName: "schedulerSelectionScreenContainer", imgSrc: null },
				{ id: 1, itemText: "Session Details", associatedScreenName: "schedulerDetailsScreenContainer", imgSrc: null },
			]
		}
	}
}

export default DataModel;







