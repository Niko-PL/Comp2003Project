import { DeviceCardElement } from '@/components/DeviceCard';
import { FetchAllAPIdata } from '@/components/APIHandler';


export function CreateDeviceCardListFromJson(props){
    var ApiData = FetchAllAPIdata();
    var DeviceCardList = [];

    const filteredDevices = Object.entries(ApiData).filter(([id, device]) => {
        if (!props.searchQuery) return true; // Show all if no search query
        
        const searchLower = props.searchQuery.toLowerCase();
        return (
            device.name.toLowerCase().includes(searchLower) ||
            device.model.toLowerCase().includes(searchLower) ||
            device.gpsLocation.latitude.toString().includes(searchLower) ||
            device.gpsLocation.longitude.toString().includes(searchLower)
        );
    });


    for (const [device, DeviceData] of filteredDevices){
        
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
                technicalDocs={DeviceData.technicalDocs}
            />
        )
    }
    return DeviceCardList;
}

