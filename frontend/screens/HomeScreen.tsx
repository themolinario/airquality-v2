import {StyleSheet, Text, View} from "react-native";
import {Colors} from "../style/style";
import LocationPicker from "../components/LocationPicker";
import {useCallback, useState} from "react";



function HomeScreen () {
    const [pickedLocation, setPickedLocation] = useState<{lat: number, lng: number, address: string}>({lat: 0, lng: 0, address: ''});



    const pickLocationHandler= useCallback((location: {lat: number, lng: number, address: string}) => {
        setPickedLocation(location);
    }, [])

    return (
        <View style={styles.container}>
            <LocationPicker onPickLocation={pickLocationHandler}/>
            <Text>{pickedLocation.address}</Text>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary50,
        flex: 1
    }
})