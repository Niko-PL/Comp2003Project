import { DeviceCardElement } from '@/components/DeviceCard';


// Joe JSON Data will come in here on request from API 
// will have to change some of this code but this is the base function
// change core function of the API call in FetchAPIdata()
var SampleJson = {
    "Test Device 1" : {
        "lastMaintenance": "N/A",
        "gpsLocation": "50.38103 , -4.13800",
        "warning": null,
        "imageUrl": "https://via.placeholder.com/50",
        "installDate": "11/11/2024",
        "DeviceNotes": "N/A"
    },
    "Test Device 2" : {
        "lastMaintenance": "N/A",
        "gpsLocation": "50.58103 , -4.13800",
        "warning": "Needs Maintenance",
        "imageUrl": "https://via.placeholder.com/50",
        "installDate": "11/11/2024",
        "DeviceNotes": "N/A"
    }
}


export function CreateDeviceCardListFromJson(props){
    var ApiData = FetchAPIdata();
    var DeviceCardList = [];
    for (var device in ApiData){
        DeviceCardList.push(
            <DeviceCardElement 
                key={device}
                deviceName={device}
                lastMaintenance={ApiData[device].lastMaintenance}
                gpsLocation={ApiData[device].gpsLocation}
                warning={ApiData[device].warning}
                imageUrl={ApiData[device].imageUrl}
                navigation={props.navigation}
                installDate={ApiData[device].installDate}
                DeviceNotes={ApiData[device].DeviceNotes}
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