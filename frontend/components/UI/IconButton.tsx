import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Pressable, StyleSheet} from "react-native";
import React from "react";

interface ButtonProps {
    icon?: keyof typeof MaterialCommunityIcons.glyphMap,
    color: string | undefined,
    size: number,
    onPress: () => void
}

function IconButton ({icon, onPress, size, color}: ButtonProps) {
    return (
        <Pressable onPress={onPress} style={({pressed}) =>[styles.button, pressed && styles.pressed]}>
            <MaterialCommunityIcons name={icon} size={size} color={color} />
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    pressed: {
        opacity: 0.7,
    }
});