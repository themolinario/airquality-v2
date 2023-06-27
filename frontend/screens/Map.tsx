import MapView, {MapPressEvent, Marker} from "react-native-maps";
import {Alert, StyleSheet} from "react-native";
import {useCallback, useLayoutEffect, useState} from "react";

import IconButton from "../components/UI/IconButton";


function Map ({navigation, route}: {navigation: any, route: any}) {
    const initialLocation = route.params && {lat: route.params.initialLat, lng: route.params.initialLng};
    const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number}>(initialLocation);



    const region = {
        latitude: initialLocation ? initialLocation.lat : 41.13,
        longitude: initialLocation ? initialLocation.lng : 16.86,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    function selectLocationHandler(event: MapPressEvent) {
        if (initialLocation){
            return;
        }
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;

        setSelectedLocation({lat: lat, lng: lng})
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation){
            Alert.alert('No location picked!', 'You have to pick a location!');
            return;
        }

        navigation.navigate(
            'Home',
            {
                pickedLat: selectedLocation.lat,
                pickedLng: selectedLocation.lng
            }
        );
    }, [selectedLocation, navigation]);

    useLayoutEffect(() => {
        if (initialLocation) {
            return;
        }
        navigation.setOptions({
            headerRight: ({tintColor}: {tintColor: string}) => <IconButton color={tintColor} size={24} onPress={savePickedLocationHandler} icon="content-save" />
        })
    }, [navigation, savePickedLocationHandler, initialLocation])

    return (
        <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
            {selectedLocation && <Marker title="Picked Location" coordinate={{latitude: selectedLocation.lat, longitude: selectedLocation.lng}} />}

        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})