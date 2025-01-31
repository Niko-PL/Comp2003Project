import React, { lazy , useState , useRef , memo , useMemo} from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity , Share , Dimensions} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';

import { DropDownComp } from '@/components/DropDownComp'; 
import { MobileMap } from '@/components/MobileMap'; //ignore this error it finds it .web for  website .native for ios and android

import QRCode from 'react-native-qrcode-svg';

function DeviceDetails({ route } : { route: any }) {
    const navigation = useNavigation();
    const { deviceName , deviceid  , deviceModel , warning , lastMaintenance , gpsLocation, imageUrl , installDate , DeviceNotes} = route.params;
    const [ShowQRCode, setShowQRCode] = useState(false);
    const [EditMode, setIsEditMode] = useState(false);

    const scrollViewRef = useRef<ScrollView>(null);

    const handleScrollToPosition = (position: number) => {
      scrollViewRef.current?.scrollTo({ y: position, animated: true });
    };

    const SaveAndAddToLogBook = ( 
      saveDeviceModel: string ,
      saveGpsLocation: string , 
      saveInstallDate: string , 
      saveLastMaintenance: string , 
      saveDeviceNotes: string ) => 
        {
      console.log("Saved :", deviceName , saveDeviceModel, saveGpsLocation, saveInstallDate, saveLastMaintenance, saveDeviceNotes , imageUrl);
      setIsEditMode(false);
      handleScrollToPosition(1000);
    }

    {/* QUICK ACCESS BUTTONS  Doesn't allow rerendering */}
    const QuickAccessButtons = useMemo(() => (
      <View style={styles.QuickAccess}>
        <QuickAccessButton 
          icon="qrcode" 
          text="QR Code" 
          onPress={() => setShowQRCode(true)} 
        />
        <QuickAccessButton 
          icon="book" 
          text="Log Book" 
          onPress={() => handleScrollToPosition(1000)} 
        />
        <QuickAccessButton 
          icon="pencil" 
          text="Edit Info" 
          onPress={() => {handleScrollToPosition(430); setIsEditMode(!EditMode)}} 
        />
        <QuickAccessButton 
          icon="info" 
          text="Device Info" 
          onPress={() => handleScrollToPosition(430)} 
        />
      </View>
    ), [handleScrollToPosition]); 


    return (
      <View style={styles.container}>    
                    
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <IconSymbol name="chevron.left" size={30} color="#FF5733" />
        </TouchableOpacity>
        

        <View style={styles.header}>
              <Image source={{ uri: imageUrl }} style={styles.deviceImage} />
              <View style={{flexDirection: 'column' }}> 
                <ThemedText style={styles.headerText}>{deviceName}</ThemedText> 
                <ThemedText style={styles.headerTextDeviceID}>{deviceid}</ThemedText>
                { warning && <ThemedText style={[styles.headerTextDeviceID , {color: '#FF5733'}]}>{warning}</ThemedText>}
              </View>
        </View>

        {ShowQRCode && <QRCodePopUp id={deviceid} setShowQRCode={setShowQRCode} />}

        <ScrollView ref={scrollViewRef}>
        <MobileMap gpsLocation={gpsLocation} DeviceName={deviceName} />

        {/* QUICK ACCESS */}
        {QuickAccessButtons}

        {/* DEVICE INFO */}
        <View style={styles.Containerdevice}>
          <Text style={styles.ContainerTitle}>Device Info</Text>
          <DeviceInfoImageArea imageUrl={imageUrl} deviceName={deviceName} status="Online" IsEditable={EditMode} />
 
        </View>
        {/* DEVICE INFO if on edit mode change the device info to the editable version */}
        <DeviceInfo deviceModel={deviceModel} gpsLocation={gpsLocation} installDate={installDate} lastMaintenance={lastMaintenance} DeviceNotes={DeviceNotes} Editable={EditMode} SaveAndAddToLogBook={SaveAndAddToLogBook} setIsEditMode={setIsEditMode} />
        

        {/* LOG BOOK */}
        <LogBook />
        
        <View style={{paddingBottom: '80%'}}></View> 
        </ScrollView>
      </View>
    )
  }

export default DeviceDetails;


function GetStatusIndicator(status: string) {
  if (status === 'Online') {
    return <View style={[styles.statusIndicator, { backgroundColor: '#2ECC71' }]} />;
  } else if (status === 'Offline') {
    return <View style={[styles.statusIndicator, { backgroundColor: '#FF5733' }]} />;
  } else if (status === 'Maintenance') {
    return <View style={[styles.statusIndicator, { backgroundColor: '#FF5450' }]} />;
  } else {
    return <View style={[styles.statusIndicator, { backgroundColor: 'gray' }]} />;
  }
}

function GenerateQRCode({value = "default", getRef}: {value: string, getRef?: (ref: any) => void}){

  return (
    <QRCode
    value={value}
    size={300}
    backgroundColor="white"
    color="black"
    getRef={getRef}
    />
  );
}


function DeviceInfoImageArea(
  {imageUrl = '/images/adaptive-icon.png' , deviceName = "Unkown Device", status = "Offline", IsEditable = false}){
  return (
    <View style={styles.ContainerContent}>
      <View style={styles.ContainerContentImage}>
        <Image source={{ uri: imageUrl }} style={styles.ContainerdeviceImage} />
        <View style={styles.ContainerdeviceImageTextContainer}>
          {IsEditable ? 
          <>
          <TouchableOpacity style={edit.EditButton} onPress={() => {}}>
            <IconSymbol name="pencil" size={30} color="#FF5733" />
            <Text style={edit.EditButtonText}>Edit Image</Text>
          </TouchableOpacity>
          
          </> : <>
          </>}
        <Text style={styles.ContainerdeviceImageText}>{deviceName}</Text>
        <View style={styles.statusContainer}>
          {GetStatusIndicator(status)}
          <Text style={styles.ContainerdeviceImageText}>{status}</Text>
        </View>
        </View>
      </View>
    </View>
  )
}


function DeviceInfo(
  {deviceModel, gpsLocation, installDate, lastMaintenance, DeviceNotes, Editable, SaveAndAddToLogBook , setIsEditMode}: {deviceModel: string, gpsLocation: string, installDate: string, lastMaintenance: string, DeviceNotes: string, Editable: boolean, 
    SaveAndAddToLogBook: (saveDeviceModel: string, saveGpsLocation: string, saveInstallDate: string, saveLastMaintenance: string, saveDeviceNotes: string) => void,
    setIsEditMode: (value: boolean) => void}){

  const [EditdeviceModel, setEditDeviceModel] = useState(deviceModel);
  const [EditgpsLocation, setEditGpsLocation] = useState(gpsLocation);
  const [EditinstallDate, setEditInstallDate] = useState(installDate);
  const [EditlastMaintenance, setEditLastMaintenance] = useState(lastMaintenance);
  const [EditDeviceNotes, setEditDeviceNotes] = useState(DeviceNotes);


  function handleUpdate(field: string, value: string) {
    switch (field) {
      case 'deviceModel': setEditDeviceModel(value); break;
      case 'gpsLocation': setEditGpsLocation(value); break;
      case 'installDate': setEditInstallDate(value); break;
      case 'lastMaintenance': setEditLastMaintenance(value); break;
      case 'deviceNotes': setEditDeviceNotes(value); break;
    }
  }

  return (
    !Editable ? 
    <View style={styles.Containerdevice}>
    <View style={[styles.ContainerContent  , {padding: 10}]}>
      <Text style={styles.deviceInfo}>Device Model: <Text style={styles.deviceInfoText}>{EditdeviceModel}</Text></Text>
      <Text style={styles.deviceInfo}>GPS LOCATION: <Text style={styles.deviceInfoText}>{EditgpsLocation}</Text></Text>
      <Text style={styles.deviceInfo}>Install Date: <Text style={styles.deviceInfoText}>{EditinstallDate}</Text></Text>
      <Text style={styles.deviceInfo}>Last Maintenance: <Text style={styles.deviceInfoText}>{EditlastMaintenance} days ago </Text></Text>
      <Text style={styles.deviceInfo}>Notes: 
        <Text style={styles.deviceInfoText}>{"\n"} {EditDeviceNotes}</Text>
        </Text>
    </View>
    </View>
      :    <>     
      <DeviceInfoEditable deviceModel={EditdeviceModel} gpsLocation={EditgpsLocation} installDate={EditinstallDate} lastMaintenance={EditlastMaintenance} DeviceNotes={EditDeviceNotes} handleUpdate={handleUpdate} /> 
      <TouchableOpacity style={edit.EditSaveButton} onPress={() => SaveAndAddToLogBook(EditdeviceModel, EditgpsLocation, EditinstallDate, EditlastMaintenance, EditDeviceNotes)} >
        <IconSymbol name="pencil" size={30} color="#FF5733" /> 
        <Text style={edit.EditButtonText}>Save and Add to Log Book</Text>
      </TouchableOpacity>
      <TouchableOpacity style={edit.EditSaveButton} onPress={() => {setIsEditMode(false)}} >
        <IconSymbol name="xmark" size={30} color="#FF5733" /> 
        <Text style={edit.EditButtonText}>Cancel</Text>
      </TouchableOpacity>
      </> 
    
  )
}

function DeviceInfoEditable({
  deviceModel,
  gpsLocation,
  installDate,
  lastMaintenance,
  DeviceNotes,
  handleUpdate
}: {
  deviceModel: string,
  gpsLocation: string,
  installDate: string,
  lastMaintenance: string,
  DeviceNotes: string,
  handleUpdate: (field: string, value: string) => void
}) {


  return (
    <View style={styles.Containerdevice}>
      <View style={[styles.ContainerContent, { padding: 10 }]}>
        <View style={edit.editField}>
          <Text style={styles.deviceInfo}>Device Model:</Text>
          <TextInput
            style={edit.editInput}
            value={deviceModel}
            onChangeText={(text) => handleUpdate('deviceModel', text)}
          />
        </View>
        
        <View style={edit.editField}>
          <Text style={styles.deviceInfo}>GPS LOCATION:</Text>
          <TextInput
            style={edit.editInput}
            value={gpsLocation}
            onChangeText={(text) => handleUpdate('gpsLocation', text)}
          />
        </View>

        <View style={edit.editField}>
          <Text style={styles.deviceInfo}>Install Date:</Text>
          <TextInput
            style={edit.editInput}
            value={installDate}
            onChangeText={(text) => handleUpdate('installDate', text)}
          />
        </View>

        <View style={edit.editField}>
          <Text style={styles.deviceInfo}>Last Maintenance:</Text>
          <TextInput
            style={edit.editInput}
            value={lastMaintenance}
            onChangeText={(text) => handleUpdate('lastMaintenance', text)}
          />
        </View>

        <View style={edit.editField}>
          <Text style={styles.deviceInfo}>Notes:</Text>
          <TextInput
            style={[edit.editInput, edit.editTextArea]}
            value={DeviceNotes}
            multiline
            numberOfLines={4}
            onChangeText={(text) => handleUpdate('deviceNotes', text)}
          />
        </View>
      </View>
    </View>
  )
}

const QuickAccessButton = memo(({ icon, text, onPress }: {
  icon: string;
  text: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.QuickAccessButton} onPress={onPress}>
    <IconSymbol name={icon} size={40} color="#FF5733" />
    <ThemedText style={styles.QuickAccessText}>{text}</ThemedText>
  </TouchableOpacity>
));

function QRCodePopUp(props){

  let qrRef: any = null;

  const handleShare = async () => {
    try {
      // Get base64 image data from QR code
      qrRef?.toDataURL(async (dataURL: string) => {
        try {
          await Share.share({
            title: 'Device QR Code',
            url: `data:image/png;base64,${dataURL}`
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      });
    } catch (error) {
      console.error('Error generating QR:', error);
    }
  };

  return (
    <View style={PopUp.GreyBackground}>
    <View style={PopUp.container}>
      <Text style={PopUp.title}>QR Code</Text>
      <View style={PopUp.QRCodeContainer}>
        <GenerateQRCode value={props.id} getRef={(ref) => (qrRef = ref)} />
      </View>
      <View style={PopUp.BottomBar}>
        <TouchableOpacity style={PopUp.ExportButton} onPress={handleShare}>
          <IconSymbol name="arrow.up.doc" size={30} color="#FF5733" />
          <Text style={PopUp.ExportButtonText}>Export</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PopUp.ExportButton} onPress={() => props.setShowQRCode(false)}>
          <IconSymbol name="xmark" size={30} color="#FF5733" />
          <Text style={PopUp.ExportButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

function LogBook(){
  return (
    <View style={styles.Containerdevice}>
    <Text style={styles.ContainerTitle}>Log Book</Text>
    <View style={styles.logContainer}>
      <DropDownComp />
      <TouchableOpacity style={styles.CreateLogButton}>
        <IconSymbol name="plus" size={30} color="#FF5733" />
      </TouchableOpacity>
    </View>
    </View>
  )
}

const edit = StyleSheet.create({
  
  EditButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingRight: 10,
    justifyContent: 'center',
    backgroundColor: '#0D2A38',
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
  },
  EditButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  editField: {
    marginBottom: 10,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#0D2A38',
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  editTextArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  EditSaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D2A38',
    borderRadius: 10,
    padding: 5,
    width:'90%',
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 10,
    gap: 5,
  },
});

const PopUp = StyleSheet.create({
  GreyBackground: {
    backgroundColor: '#00000050',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    width: Dimensions.get('window').width * 0.9,
    
    top: Dimensions.get('window').height * 0.25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0D2A38',
    alignSelf: 'center',
    
    zIndex: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000000',
  },
  QRCodeImage: {
    marginTop: 10,
    width: 300,
    height: 300,
  },
  BottomBar: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    gap: 10,
  },
  ExportButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0D2A38',
    borderRadius: 10,
    padding: 10,
  },
  ExportButtonText: {
    fontSize: 20,
    color: '#000000',
  },
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
        
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
      
        alignItems: 'center',
        gap: 10,
        marginTop: 50,
      },

    headerText: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#000000',
    },

    headerTextDeviceID: {
      fontSize: 15,
      fontWeight: 'bold',
      

      color: '#00000050',
    },
    

    QuickAccess: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: 10,
    },

    QuickAccessButton: {
      borderWidth: 1,
      borderColor: '#0D2A38',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      width: '22%',
      height: 80,
      padding: 3,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    QuickAccessText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#000000',
    },

    Containerdevice: {
      padding: 20,
      paddingBottom: 5,
      
    },

    ContainerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000000',
    },

    ContainerContentImage: {
      borderRadius: 10,
      overflow: 'hidden',
      
    },

    ContainerdeviceImageText: {
      fontSize: 16,
      
      alignSelf: 'flex-start',
      color: '#000000',
    },

    ContainerdeviceImageTextContainer: {
      alignSelf: 'flex-start',
      padding: 10,
    },

    ContainerdeviceImage: {
      
      width: '100%',
      height: 300,
    },

    deviceInfo: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      alignSelf: 'flex-start',
      marginLeft: 10,
    },

    deviceInfoText: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#00000090',
    },

    deviceImage: {
      borderRadius: 33,
      width: 60,
      height: 60,
      
    },

    ContainerContent: {
      borderWidth: 1,
      borderColor: '#0D2A38',
      borderRadius: 10,
      
      backgroundColor: '#FFFFFF',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },

    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 5,
    },
    
    statusIndicator: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },

    DeviceInfomation: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 20,
      alignItems: 'center',
    },

    logContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },

    CreateLogButton: {
      borderWidth: 5,
      borderColor: '#0D2A38',
      borderRadius: 90,
      padding: 3,
    },

    

    backButton: {
      position: 'absolute',
      bottom: 100,
      left: 15,
      backgroundColor: '#0D2A38',
      borderRadius: 90,
      padding: 10,
      zIndex: 1000,
    },

    qrButton: {
      position: 'absolute',
      bottom: 100,
      right: 20,
      backgroundColor: '#0D2A38',
      borderRadius: 90,
      padding: 10,
      zIndex: 1000,
    },


});
