import { TouchableOpacity , Text , StyleSheet } from "react-native"
import { IconSymbol } from "./IconSymbol"
import { SFSymbol } from "expo-symbols";




export function ButtonUI({icon = 'questionmark.circle', text = 'Unknown', onPress, size = 30, type, extrastyles = {}, Textstyles = {}}: {
    icon?: SFSymbol;
    text?: string;
    onPress?: () => void;
    size?: number;
    type?: 'primary' | 'secondary' | 'destructive' | 'Thin' | 'alternate' | 'exit';
    extrastyles?: {};
    Textstyles?: {};
}){
    
    switch (type) {
        case 'primary':
            return (
                <TouchableOpacity style={[MainButtonStlyes.ButtonPri, extrastyles]} onPress={onPress}>
                    <IconSymbol name={icon} size={size} color="#FF5733" />
                    <Text style={[edit.EditButtonText, Textstyles]}>{text}</Text>
                </TouchableOpacity>
            );
        case 'Thin':
            return (
                <TouchableOpacity style={[MainButtonStlyes.ButtonThin, extrastyles]} onPress={onPress}>
                    <IconSymbol name={icon} size={size} color="#FF5733" />
                    <Text style={[edit.EditButtonText, Textstyles]}>{text}</Text>
                </TouchableOpacity>
            );
        case 'secondary':
            return (
                <TouchableOpacity style={[MainButtonStlyes.ButtonSec, extrastyles]} onPress={onPress}>
                    <IconSymbol name={icon} size={size} color="#000" />
                    <Text style={[edit.EditButtonText, Textstyles, { color: '#000' }]}>{text}</Text>
                </TouchableOpacity>
            );
        case 'destructive':
            return (
                <TouchableOpacity style={[MainButtonStlyes.ButtonDesc, extrastyles]} onPress={onPress}>
                    <IconSymbol name={icon} size={size} color="#FFF" />
                    <Text style={[edit.EditButtonText, Textstyles]}>{text}</Text>
                </TouchableOpacity>
            );
        case 'alternate':
            return (
                <TouchableOpacity style={[MainButtonStlyes.ButtonAlt, extrastyles]} onPress={onPress}>
                    <IconSymbol name={icon} size={size} color="#FFF" />
                    <Text style={[edit.EditButtonText, Textstyles]}>{text}</Text>
                </TouchableOpacity>
            );
            case 'exit':
                return (
                    <TouchableOpacity style={[MainButtonStlyes.ButtonAlt, extrastyles]} onPress={onPress}>
                        <IconSymbol name={icon} size={size} color="#c80101" />
                        <Text style={[edit.EditButtonText, Textstyles]}>{text}</Text>
                    </TouchableOpacity>
                );
        default:
            return (
                <TouchableOpacity style={MainButtonStlyes.ButtonPri} onPress={onPress} >
                    <IconSymbol name={icon} size={size} color="#FF5733" /> 
                    <Text style={edit.EditButtonText}>{text}</Text>
                </TouchableOpacity>
            );
    }


}

const MainButtonStlyes = StyleSheet.create({

    ButtonPri: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingRight: 10,
        justifyContent: 'center',
        backgroundColor: '#0D2A38',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
      },
    ButtonAlt: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingRight: 10,
        justifyContent: 'center',
        backgroundColor: '#FF5733',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
      },
    ButtonDesc: {
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EF5350',
        gap: 10,
        padding: 10,
        marginBottom: 10,
      },      
    ButtonThin: {
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

    ButtonSec: {
        display: 'flex',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderWidth: 2,
        gap: 10,
        padding: 10,
        marginBottom: 10,
    }

});

const edit = StyleSheet.create({
  
    EditButtonText: {
      fontSize: 16,
      
      color: '#FFFFFF',
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