import { DeviceCardElement } from '@/components/DeviceCard';


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
        "imageUrl": "https://dummyimage.com/50.png/09f/fff",
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
        "imageUrl": "https://dummyimage.com/50.png/09f/fff",
        "installDate": "11/11/2024",
        "DeviceNotes": "N/A",
        "technicalDocs": "https://www.google.com"
    }
}


export function CreateDeviceCardListFromJson(props){
    var ApiData = FetchAPIdata();
    var DeviceCardList = [];
    for (var device in ApiData){
        DeviceData = ApiData[device];
        DeviceCardList.push(
            <DeviceCardElement 
                key={device}
                id={device}
                deviceName={DeviceData.name}
                deviceModel={DeviceData.model}
                lastMaintenance={DeviceData.lastMaintenance}
                gpsLocation={DeviceData.gpsLocation["latitude"] + ", " + DeviceData.gpsLocation["longitude"]}
                warning={DeviceData.warning}
                imageUrl={DeviceData.imageUrl}
                navigation={props.navigation}
                installDate={DeviceData.installDate}
                DeviceNotes={DeviceData.DeviceNotes}
            />
        )
    }
    return DeviceCardList;
}

function FetchAPIdata(){
    // fetch data from API
    // return JSON data
    return SampleJson;
}