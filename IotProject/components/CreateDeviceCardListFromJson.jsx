import { DeviceCardElement } from '@/components/DeviceCard';
import { FetchAllAPIdata } from '@/components/APIHandler';


export function CreateDeviceCardListFromJson(props){
    var ApiData = FetchAllAPIdata();
    var DeviceCardList = [];
    for (var device in ApiData){
        DeviceData = ApiData[device];
        DeviceCardList.push(
            <DeviceCardElement 
                key={device}
                styletype={props.styletype}
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

