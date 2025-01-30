// Joe JSON Data will come in here on request from API 
// will have to change some of this code but this is the base function
// change core function of the API call in FetchAPIdata()
var SampleJson = {
    "D0" : {
        "name" : "Test Device 1",
        "model": "TS-5000",
        "lastMaintenance": "N/A",
        "gpsLocation": {
            "latitude" : "50.38103", 
            "longitude" : "-4.13800"
        },
        "warning": null,
        "imageUrl": "https://dummyimage.com/500.png/09f/fff",
        "installDate": "11/11/2024",
        "DeviceNotes": "N/A",
        "technicalDocs": "https://www.google.com"
    },
    "D1" : {
        "name" : "Test Device 2",
        "model": "TS-5000",
        "lastMaintenance": "N/A",
        "gpsLocation": {
            "latitude" : "50.58103", 
            "longitude" : "-4.13800"
        },
        "warning": "Needs Maintenance",
        "imageUrl": "https://dummyimage.com/500.png/09f/fff",
        "installDate": "11/11/2024",
        "DeviceNotes": "N/A",
        "technicalDocs": "https://www.google.com"
    },
    "D2" : {
        "name" : "GPS Tracker",
        "model": "TS-5000",
        "lastMaintenance": "N/A",
        "gpsLocation": {
            "latitude" : "50.58103", 
            "longitude" : "-4.13800"
        },
        "warning": "Needs Maintenance",
        "imageUrl": "https://dummyimage.com/500.png/09f/fff",
        "installDate": "11/11/2024",
        "DeviceNotes": "N/A",
        "technicalDocs": "https://www.google.com"
    },
    "D3" : {
        "name" : "HP computer 23",
        "model": "HP2005",
        "lastMaintenance": "N/A",
        "gpsLocation": {
            "latitude" : "51.4492", 
            "longitude" : "-2.58031"
        },
        "imageUrl": "https://dummyimage.com/500.png/09f/fff",
        "installDate": "11/11/2024",
        "DeviceNotes": "N/A",
        "technicalDocs": "https://www.google.com"
    },
    "D4" : {
        "name" : "HP Main Server rack",
        "model": "HPServer2003",
        "lastMaintenance": "N/A",
        "gpsLocation": {
            "latitude" : "50.58103", 
            "longitude" : "-4.13800"
        },
        "imageUrl": "https://dummyimage.com/500.png/09f/fff",
        "installDate": "11/11/2024",
        "DeviceNotes": "N/A",
        "technicalDocs": "https://www.google.com"
    },
}

export function FetchAllAPIdata(){
    // fetch data from API
    // return JSON data
    return SampleJson;
}

export function FetchoneAPIdata(deviceid){
    // fetch data from API
    // return JSON data
    if (deviceid in SampleJson){
        return SampleJson[deviceid];
    }
    return null;
}