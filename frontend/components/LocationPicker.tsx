import {Alert, Image, StyleSheet, Text, View} from "react-native";
import {Colors} from "../style/style"
import {getCurrentPositionAsync, useForegroundPermissions} from "expo-location";
import {PermissionStatus} from "expo-image-picker";
import {useEffect, useState} from "react";
import {getAddress, getMapPreview} from "../util/location";
import LoadingOverlay from "./UI/LoadingOverlay";
import { RouteProp, useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import IconButton from "./UI/IconButton";

function LocationPicker ({onPickLocation}: {onPickLocation: ({lat, lng, address}: {lat: number, lng: number, address: string}) => void}) {
    const [isLoading, setIsLoading] = useState(false);
    const [pickedLocation, setPickedLocation] = useState<{lat: number, lng: number, address?: string}>();
    const isFocused = useIsFocused();

    const navigation = useNavigation<any>();
    const route: RouteProp<any> = useRoute();

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();


    useEffect(() => {
        if (isFocused && route.params){
            const mapPickedLocation = {lat: route.params.pickedLat, lng: route.params.pickedLng};
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            if (pickedLocation) {
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickLocation({...pickedLocation, address: address});
            }
        }

        handleLocation();

    }, [pickedLocation, onPickLocation])

    async function verifyPermissions() {
        if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!', 'You need to grant location permissions to use this app.');
            return false;
        }

        return true;
    }
    async function getLocationHandler() {
        setIsLoading(true);
        const hasPermission = await verifyPermissions();

        if (!hasPermission){
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
        setIsLoading(false);
    }

    function pickOnMapHandler() {
        navigation.navigate('Map')
    }

    const locationURI = pickedLocation && getMapPreview(pickedLocation.lat, pickedLocation.lng);

    if (isLoading){
        return (
            <View>
                <View style={styles.mapPreview}>
                    <LoadingOverlay message="Loading your map.." />
                </View>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {pickedLocation ? <Image style={styles.image} source={{uri: locationURI}} /> :  <Text>No location picked yet.</Text>}
            </View>
            <View style={styles.actions}>
                <IconButton onPress={getLocationHandler} icon="google-maps" color={Colors.primary500} size={24} />
                <IconButton onPress={pickOnMapHandler} icon="map-legend" color={Colors.primary500} size={24} />
            </View>
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 300,
        marginVertical: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
})