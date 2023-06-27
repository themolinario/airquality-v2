import HomeScreen from "./screens/HomeScreen";
import ChartScreen from "./screens/ChartScreen";
import TableScreen from "./screens/TableScreen";
import {Colors} from "./style/style";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {StatusBar, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import Map from "./screens/Map";
import {Provider, useDispatch, useSelector} from "react-redux";
import {dataStore} from "./store";
import {useEffect, useState} from "react";
import LoadingOverlay from "./components/UI/LoadingOverlay";
import sensor from "./redux/sensor";
import IconButton from "./components/UI/IconButton";
import WelcomeScreen from "./screens/WelcomeScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AnyAction} from "@reduxjs/toolkit";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const NativeStack = createNativeStackNavigator();

function StackNavigator() {
    return(
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: Colors.primary400},
                headerTintColor: Colors.primary100,
                headerLeft: () => null
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
    )
}

function LoadingData (){
    return <LoadingOverlay message="Data is Loading.."/>
}

function TabNavigator() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: any) => state.sensor.loading);

    useEffect(() => {
        dispatch(sensor.getData() as unknown as AnyAction);
    }, []);

    const handleReload = () => {
        dispatch(sensor.getData() as unknown as AnyAction);
    }

    return(
        <Tab.Navigator
            initialRouteName="Stack"
            screenOptions={{
                tabBarStyle: {backgroundColor: Colors.primary400},
                headerStyle: {backgroundColor: Colors.primary400},
                headerTintColor: Colors.primary100,
                tabBarActiveTintColor: Colors.primary500,
                tabBarInactiveTintColor: Colors.primary100,
            }}
        >
            <Tab.Screen
                name="Stack"
                component={isLoading ? LoadingData : StackNavigator}
                options={{
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name='home' color={color} size={24} />,
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Chart"
                component={isLoading ? LoadingData : ChartScreen}
                options={{
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name='chart-pie' color={color} size={24} />,
                    headerRight: ({tintColor}: {tintColor?: string}) => <IconButton color={tintColor} size={24} onPress={handleReload} icon="reload" />
                }}
            />
            <Tab.Screen
                name="Table"
                component={isLoading ? LoadingData : TableScreen}
                options={{
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name='table' color={color} size={24} />,
                    headerRight: ({tintColor}: {tintColor?: string}) => <IconButton color={tintColor} size={24} onPress={handleReload} icon="reload" />
                }}
            />
        </Tab.Navigator>
    )
}

function WelcomeStackNavigator() {
    return(
        <NativeStack.Navigator screenOptions={{headerShown: false}}>
            <NativeStack.Screen name="Welcome" component={WelcomeScreen} />
            <NativeStack.Screen name="Tabs" component={TabNavigator} />
        </NativeStack.Navigator>
    )
}


function NavigatorComponent() {
    return(
        <>
            <StatusBar barStyle='light-content'/>
            <NavigationContainer>
                <WelcomeStackNavigator />
            </NavigationContainer>
        </>
    )
}



export default function App() {
     return (
         <>
          <Provider store={dataStore}>
              <NavigatorComponent />
          </Provider>
         </>
  );
}
