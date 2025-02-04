import React, { lazy , useState , useRef , memo , useMemo} from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Image, TouchableOpacity , Share , Dimensions} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from 'expo-router';


import { ButtonUI } from '@/components/ui/Buttons';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { DropDownComp } from '@/components/DropDownComp'; 
import { MobileMap } from '@/components/MobileMap'; //ignore this error it finds it .web for  website .native for ios and android

import QRCode from 'react-native-qrcode-svg';
import { SFSymbol } from 'expo-symbols';

function DeviceDetails({ route } : { route: any }) {
    const navigation = useNavigation();
    const { deviceName , deviceid  , deviceModel , technicalDocs , warning , lastMaintenance , gpsLocation, imageUrl , installDate , DeviceNotes} = route.params;
    const [ShowQRCode, setShowQRCode] = useState(false);
    const [EditMode, setIsEditMode] = useState(false);


    const scrollViewRef = useRef<ScrollView>(null);
    const deviceInfoRef = useRef<View>(null);

    const handleScrollToPositionByNumber =  (position: number) => {
      scrollViewRef.current?.scrollTo({ y: position, animated: true });
    };

    {/* Scroll to a specific position by ref with a slight time out to allow ui to generate */}
    const handleScrollToPositionByRef = async (position: React.RefObject<View>) => {
      setTimeout(() => {
      position.current?.measure((x, y) => {
        scrollViewRef.current?.scrollTo({ y, animated: true });
      });
      }, .1);
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
      handleScrollToPositionByNumber(1000);

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
          onPress={() => handleScrollToPositionByNumber(1000)} 
        />
        <QuickAccessButton 
          icon="pencil" 
          text="Edit Info" 
          onPress={() => {handleScrollToPositionByRef(deviceInfoRef); setIsEditMode(!EditMode)}} 
        />
        <QuickAccessButton 
          icon="info" 
          text="Device Info" 
          onPress={() => handleScrollToPositionByRef(deviceInfoRef)} 
        />
      </View>
    ), [handleScrollToPositionByNumber , handleScrollToPositionByRef,deviceInfoRef, EditMode]); 

    
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



        {/* TECHNICAL DOCUMENTS */}
        <TechincalDocumentArea DocumentsJSON={technicalDocs} Editable={EditMode} />

        {/* DEVICE INFO */}
        <View ref={deviceInfoRef} style={styles.Containerdevice}>
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

function EditField({
  field = "Unknown Field",
  value = "",
  handleUpdate = () => {},
  handleUpdateFields = []
}: {
  field?: string;
  value?: string;
  handleUpdate?: (field: string, value: string) => void;
  handleUpdateFields?: string[];
}) {
  return (
    <View style={edit.editField}>
      <Text style={styles.deviceInfo}>{field}</Text>
      <TextInput
        style={edit.editInput}
        value={value}
        onChangeText={(text) => handleUpdate(handleUpdateFields[0], text)}
      />
    </View>
  );
}

function TechincalDocumentArea({DocumentsJSON = [] , Editable = false}) {

 

  if (DocumentsJSON == null) {
    return (
      <View style={styles.Containerdevice}>
        <Text style={styles.ContainerTitle}>Technical Documents</Text>
        <View style={styles.ContainerContent}>
          {!Editable ?
          <Text style={[styles.deviceInfo, {padding: 20, textAlign: 'center'}]}>NO Technical Documents Available for this device please add one.</Text>
            : 
            <View style={[styles.ContainerContent, {padding: 10 , paddingTop: 15}]}>
              <AddNewTechDocs />
            </View>
            }
        </View>
      </View>
    );
  }

  return (
    <View style={styles.Containerdevice}>
      <Text style={styles.ContainerTitle}>Technical Documents</Text>
      <View style={[styles.ContainerContent, {padding: 10 , paddingTop: 15}]}>
        {DocumentsJSON instanceof Object && !Array.isArray(DocumentsJSON) ? 
        <>
        <GenerateTechincalDocuments DocumentsJSON={DocumentsJSON} Editable={Editable} />
          </>
        : <TechincalDocument DocumentURL={DocumentsJSON} Editable={Editable}  />}

        {Editable && <AddNewTechDocs />}
      </View>
    </View>
  )
}

function AddNewTechDocs(){
  const [ShowDropCreateDown , setShowDropDown] = useState(false);

  return (
    <>
    <ButtonUI icon='plus' text='Add Technical documentation' onPress={() => setShowDropDown(!ShowDropCreateDown)} type='secondary'  />
    {ShowDropCreateDown &&
    <View style={[styles.ContainerContent , {padding:10 , marginBottom: 10}]}>
        <EditField field="Document Name:"   />
        <EditField field="Document URL:"   />
  
      <ButtonUI text='Create' onPress={() => setShowDropDown(false)}/>


    </View>
    }
    </>
  )
}

function GenerateTechincalDocuments({DocumentsJSON = [] , Editable = false}) {
  const ListOfDocuments: React.ReactElement[] = [];
  console.log(DocumentsJSON);
  Object.entries(DocumentsJSON).forEach(([_, document]) => {
    ListOfDocuments.push(
      <TechincalDocument key={document["Title"]} DocumentName={document["Title"]} DocumentURL={document["Source"]} Editable={Editable} />
    )
  });
  return ListOfDocuments;
}

function TechincalDocument({DocumentName = "Unkown Document", DocumentURL = "Document URL" , Editable = false}) {
  return (
    <>
      {!Editable ?
      <ButtonUI icon='link' text={DocumentName} onPress={() => {}} type='primary'  />
      :
      <EditTechDocField DocumentName={DocumentName} DocumentURL={DocumentURL} />
      }
   </>
  )
}

function EditTechDocField({DocumentName = "Unkown Document", DocumentURL = "Document URL" }) {
  const [ShowDropDown , setShowDropDown] = useState(false);
  const [EditDocumentName, setEditDocumentName] = useState(DocumentName);
  const [EditDocumentURL, setEditDocumentURL] = useState(DocumentURL);

  function handleUpdate(field: string, value: string) {
    switch (field) {
      case 'DocumentName': setEditDocumentName(value); break;
      case 'DocumentURL': setEditDocumentURL(value); break;
    }
  }
  
  return (
    <View style={{width: '100%', flexDirection : 'column'}}>
    <ButtonUI icon="pencil" text={"Edit " + DocumentName} onPress={() => setShowDropDown(!ShowDropDown)} />
    {ShowDropDown &&
    <View style={[styles.ContainerContent , {padding:10 , marginBottom: 10}]}>
        <EditField field="Document Name:" value={EditDocumentName} handleUpdate={handleUpdate} handleUpdateFields={['DocumentName']} />
        <EditField field="Document URL:" value={EditDocumentURL} handleUpdate={handleUpdate} handleUpdateFields={['DocumentURL']} />
        
        <View style={styles.RowButtonContainer}>
        <ButtonUI icon='trash' text='Delete Document' onPress={() => {setShowDropDown(false)}} type='destructive' extrastyles={{padding : 5}}  />
        <ButtonUI icon='checkmark.circle' text='Save' onPress={() => {setShowDropDown(false)}} type='Thin'  />
        </View>

      </View>
    }
    </View>
  )
}



function DeviceInfoImageArea(
  {imageUrl = '/images/adaptive-icon.png' , deviceName = "Unkown Device", status = "Offline", IsEditable = false}){
  return (
    <View style={styles.ContainerContent}>
      <View style={styles.ContainerContentImage}>
        <Image source={{ uri: imageUrl }} style={styles.ContainerdeviceImage} />
        <View style={styles.ContainerdeviceImageTextContainer}>
          {IsEditable && 
          <ButtonUI icon= 'pencil' text='Edit Image' onPress={() => {}} type='Thin' />    
          }
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

      <ButtonUI icon='trash' text='Delete' onPress={() => {setIsEditMode(false)}} type='destructive' extrastyles={{width : '90%' , alignSelf: 'center', padding: 5, margin: 5}} />
      <ButtonUI icon='xmark' text='Cancel' onPress={() => {setIsEditMode(false)}} type='Thin' extrastyles={{width : '90%' , alignSelf: 'center', margin: 5}} />
      <ButtonUI icon='pencil' text='Save and Add to Log Book' onPress={() => SaveAndAddToLogBook(EditdeviceModel, EditgpsLocation, EditinstallDate, EditlastMaintenance, EditDeviceNotes)} type='Thin' extrastyles={{width : '90%' , alignSelf: 'center', margin: 5}} />
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
        <EditField field="Device Model:" value={deviceModel} handleUpdate={handleUpdate} handleUpdateFields={['deviceModel']} />
        {/* GPS LOCATION  Need to add option button just to use the deivce GPS location */}
        <EditField field="GPS Location:" value={gpsLocation} handleUpdate={handleUpdate} handleUpdateFields={['gpsLocation']} />
        {/* INSTALL DATE */}
        <EditField field="Install Date:" value={installDate} handleUpdate={handleUpdate} handleUpdateFields={['installDate']} />

        {/* LAST MAINTENANCE */}
        <EditField field="Last Maintenance:" value={lastMaintenance} handleUpdate={handleUpdate} handleUpdateFields={['lastMaintenance']} />

        {/* NOTES */}
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
  icon: SFSymbol;
  text: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.QuickAccessButton} onPress={onPress}>
    <IconSymbol name={icon} size={40} color="#FF5733" />
    <ThemedText style={styles.QuickAccessText}>{text}</ThemedText>
  </TouchableOpacity>
));

function QRCodePopUp(props: any){

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
    <View style={styles.ContainerContent}>
    <View style={styles.logContainer}>
      <DropDownComp />
      <ButtonUI icon='plus' text='Add Log' type='secondary' extrastyles={{height: 50}} />
      

    </View>
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

  EditButtonSmall: {

  }
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
      
     flexDirection: 'row',
     alignItems: 'center',
     padding: 2,
     marginTop: 5,
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

    ContainerButtons: {
      display: 'flex',
      width: '100%',
      alignSelf: 'center',
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0D2A38',
      gap: 10,
      padding: 10,
      marginBottom: 10,
    },

    RowButtonContainer: {
      flexDirection: 'row',      
      gap: 10,
      
    }



});
