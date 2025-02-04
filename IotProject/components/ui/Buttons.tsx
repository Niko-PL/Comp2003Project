import { TouchableOpacity , Text , StyleSheet } from "react-native"
import { IconSymbol } from "./IconSymbol"
import { SFSymbol } from "expo-symbols";
import { color } from "react-native-elements/dist/helpers";





function Inner({ icon, iconcolor = '#FFF', text, textcolor = '#FFF', size, Textstyles }: {
    icon: SFSymbol | null;
    iconcolor?: string;
    text: string;
    textcolor?: string;
    size: number;
    Textstyles: {};
}) {
    return (
    <>
        {icon  ? <IconSymbol name={icon} size={size} color={iconcolor} /> : null}
        <Text style={[edit.EditButtonText,{color: textcolor},Textstyles]}>{text}</Text>
    </>
    )
}

// ButtonUI component
// This component is a button that can be customized with different styles and icons.
// example usage: <ButtonUI />
export function ButtonUI({
    icon = null,
    text = 'Unknown',
    onPress,
    size = 30,
    type,
    extrastyles = {},
    Textstyles = {}
}: {
    icon?: SFSymbol | null;
    text?: string;
    onPress?: () => void;
    size?: number;
    type?: 'primary' | 'secondary' | 'destructive' | 'Thin' | 'alternate';
    extrastyles?: {};
    Textstyles?: {};
}){
    
    switch (type) {
        case 'primary':
            return (
                <TouchableOpacity style={[MainButtonStlyes.ButtonPri, extrastyles]} onPress={onPress}>
                    <Inner icon={icon} iconcolor="FF5733" text={text} size={size} Textstyles={Textstyles} />
                </TouchableOpacity>
            );
        case 'Thin':
            return (
                <TouchableOpacity style={[MainButtonStlyes.ButtonThin, extrastyles]} onPress={onPress}>
                    <Inner icon={icon} iconcolor="#FF5733" text={text} size={size} Textstyles={Textstyles} />
                </TouchableOpacity>
            );
        case 'secondary':
            return (
                <TouchableOpacity style={[MainButtonStlyes.ButtonSec, extrastyles]} onPress={onPress}>
                    <Inner icon={icon} iconcolor="#000" textcolor="#000" text={text} size={size} Textstyles={Textstyles} />
                </TouchableOpacity>
            );
        case 'destructive':
            return (
                <TouchableOpacity style={[MainButtonStlyes.ButtonDesc, extrastyles]} onPress={onPress}>
                    <Inner icon={icon} text={text} size={size} Textstyles={Textstyles} />
                </TouchableOpacity>
            );
        case 'alternate':
            return (
                <TouchableOpacity style={[MainButtonStlyes.ButtonAlt, extrastyles]} onPress={onPress}>
                    <Inner icon={icon} text={text} size={size} Textstyles={Textstyles} />
                </TouchableOpacity>
            );
        default:
            return (
                <TouchableOpacity style={MainButtonStlyes.ButtonPri} onPress={onPress} >
                    <Inner icon={icon} text={text} size={size} Textstyles={Textstyles} />
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
        backgroundColor: '#c80101',
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