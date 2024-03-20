import React, { useState } from "react";
import { View, TextInput, Text, TextInputProps } from "react-native";

import colors from "../../assets/colors/colors";

// type Props = {
//     // leftComponet?: React.ReactNode,
//     containerStyle?: object,
//     theme?: 'dark' | 'light'
// } & TextInputProps;


// export default function InputField({ theme = 'dark', containerStyle, ...rest }: Props) {
//     const [isFocused, setIsFocused] = useState(false);
//     return (
//         <View style={[{
//             borderColor: colors[theme].primary,
//             borderRadius: 50,
//             borderWidth: 1,
//             paddingHorizontal: 10,
//             height: 50,
//         }, containerStyle]}>
//             <TextInput
//                 style={{
//                     fontSize: 16,
//                     fontFamily: 'Inter-Medium',
//                     color: colors[theme].textDark,
//                 }}
//                 cursorColor={colors[theme].primary}
//                 onFocus={() => setIsFocused(true)}
//                 onBlur={() => setIsFocused(false)}
//                 {...rest}
//             />

//         </View>

//     );
// }





type Props = {
    rightComponet?: React.ReactNode,
    leftComponet?: React.ReactNode,
    containerStyle?: object,
    label: string,
    theme?: 'dark' | 'light',
    onPress?: () => void,
    value: string,
} & TextInputProps;

export default function InputField({ theme = 'dark', value = '', rightComponet, leftComponet, containerStyle, label, onPress, ...rest }: Props) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={[{
            borderColor: value.length > 0 ? colors[theme].primary : colors[theme].subText,
            borderRadius: 50,
            borderWidth: 1,
            paddingHorizontal: 18,
            height: 50,
            flexDirection: 'row',
            width: '100%',
            alignItems:"center",
            justifyContent:'center'

        }, containerStyle]}>

            {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                paddingHorizontal:10
            }}> */}
            {leftComponet && leftComponet}
            <TextInput
                style={{
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    color: colors[theme].textDark,
                    width: '100%',
                  
                }}
                placeholderTextColor={colors[theme].textGray}
                cursorColor={colors[theme].primary}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
            />
            {rightComponet && rightComponet}
            {/* </View> */}

        </View>

    );
}