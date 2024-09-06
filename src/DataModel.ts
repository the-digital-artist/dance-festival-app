import { modelInitStaticOverwrite } from "./DataModelOverwrite";

class DataModel {
	static _instance = null;
	static getInstance(): DataModel { return (DataModel._instance == null ? (DataModel._instance = new DataModel()) : DataModel._instance) }
	static modelOverWriteOnFirstLoad = true;

	constructor() { 
		console.log('DataModel Creation - model version: ' + this.static); 
		if(!DataModel.modelOverWriteOnFirstLoad) return;
		
		this.static = modelInitStaticOverwrite; 
		console.log('DataModel Creation - model overwrite: ' + this.static); 
	}


	//dynamic properties (get generated)
	dyn_dataArtistsList = null;
	dyn_dataScheduleListsByDay = null;
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
	static: any = {
		modelRemoteGetModelUrl: '',
		modelRemoteVersionCheckUrl: '',
		modelRemoteUpdateInterval: 55000,

		happeningNowUpdateInterval: 30000,

		modelVersion: 1000,

		dataArtists: {
			"Ki Charles": { "fullName": "Ki Charles", editionData: ["01-2024", "02-2024", "03-2024", "04-2024" ], imgSrc: "", "insta": "", "bio": "was born.. ", "shortBio": "", "facebook": "", "portrait": "_0000_DEFAULT.png" },
			"Alex Castro": { "fullName": "Alex Castro", editionData: ["01-2024", "02-2024" ], imgSrc: "", "insta": "", "bio": "was born.. ", "shortBio": "", "facebook": "", "portrait": "_0000_DEFAULT.png" },
			"David Khalili": { "fullName": "David Khalili", editionData: ["01-2024", "03-2024" ], imgSrc: "", "insta": "", "bio": "was born.. ", "shortBio": "", "facebook": "", "portrait": "_0000_DEFAULT.png" },
			"Alexandria": { "fullName": "Alexandria",  editionData: ["01-2024" ], imgSrc: "", "insta": "", "bio": "was born.. ", "shortBio": "", "facebook": "", "portrait": "_0000_DEFAULT.png" },
			"Kramer & Dhiraj": { "fullName": "Kramer & Dhiraj", editionData: ["01-2024", "02-2024", "03-2024" ],imgSrc: "", "insta": "", "bio": "was born.. ", "shortBio": "", "facebook": "", "portrait": "_0000_DEFAULT.png" },
		},

		dataScheduleRaw: [
			{ "id": 201, "itemType": "type1", "artistName": "Carlos & Suzan", "sessionMainTitle": "Bachata", "time": "18:00 - 19:00", "room": "AURORA 1", "level": "0", "group": [201], "groupTitle": "Workshops", "groupSubtitle": "", "shortMainTitle": "", "dateString": "Thu, October 17, 2024", "startTime": "10/17/24, 06:00 PM", "endTime": "10/17/24, 07:00 PM", "place": "", "sessionSubtitle": "", "sessionDescription": "", "artistOne": "Carlos & Suzan", "artistTwo": "", "artistLocation": "!", "flag": false, "flagIncludeInNow": false },
			{ "id": 301, "itemType": "type1", "artistName": "Brandon & Michelle", "sessionMainTitle": "Salsa On2 Partnerwork", "time": "19:00 - 20:00", "room": "AURORA 1", "level": "0", "group": [301], "groupTitle": "Workshops", "groupSubtitle": "", "shortMainTitle": "", "dateString": "Thu, October 17, 2024", "startTime": "2024-10-17T19:00:00.000Z", "endTime": "2024-10-17T20:00:00.000Z", "place": "", "sessionSubtitle": "", "sessionDescription": "", "artistOne": "Brandon & Michelle", "artistTwo": "", "artistLocation": "!", "flag": false, "flagIncludeInNow": false },
			{ "id": 401, "itemType": "type1", "artistName": "El Tiguere Y Bianca", "sessionMainTitle": "Bachata: Culture, History & Music", "time": "20:00 - 21:00", "room": "AURORA 1", "level": "0", "group": [401], "groupTitle": "Workshops", "groupSubtitle": "", "shortMainTitle": "", "dateString": "Thu, October 17, 2024", "startTime": "2024-10-17T20:00:00.000Z", "endTime": "2024-10-17T21:00:00.000Z", "place": "", "sessionSubtitle": "", "sessionDescription": "", "artistOne": "El Tiguere Y Bianca", "artistTwo": "", "artistLocation": "DR", "flag": false, "flagIncludeInNow": false },
		],

		dataSpecialSessions: {
			"Track Name": { company: '', description: '', title: '', price: '', signup: '', artistNames: [] }
		},

		dataStyles: {
			// 'type1': { note: 'workshops', color1: '#312816', color2: '#312816', color3: '#f8f6d3', bgColor: '#bfa269' },
			// 'type2': { note: 'city', color1: '#f8f6d3', color2: '#312816', color3: '#FFFFFF', bgColor: '#d7c8ac' },
			// 'type3': { note: 'bootcamp', color1: '#312816', color2: '#f8f6d3', color3: '#010101', bgColor: '#fefac9' },
			// 'type4': { note: 'party', color1: '#f8f6d3', color2: '#f2aa3e', color3: '#FFFFFF', bgColor: '#3e3b3a' },
		},

		dataLocation: {
			// 'altemuenze': { locationName: `Alte Münze`, mapObj: { lat: '52.5161353', lon: '13.4065007', q: `Alte+Münze` } },
		},

		dataModelProgram: [
			// { id: 10, type: 'type4', title: 'Goodbye Party', dateText: "Sun, 21.07.24", timeText: "20:15 - 01:00", location: 'soda', locationAdress: 'Schönhauser Allee 36, 10435 Berlin', tickets: ['Berlin Experience Ticket', "All-Inclusive Pass,"], startTime: '2024-07-21T20:15:00.000', endTime: '2024-07-22T01:00:00.000', description: "Special:  23:00: Show" },
			// { id: 11, type: 'type5', title: 'EMPTY', dateText: "", timeText: "", location: '', locationAdress: '', tickets: [], startTime: '', endTime: '', description: "" },
		],


		dataTicketSales: {
			earlyBirdStartTimeString: '2024-07-21T05:00:00.000'
		}
	}
}

export default DataModel;







