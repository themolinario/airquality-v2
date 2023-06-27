import {configureStore} from "@reduxjs/toolkit";
import sensor from "./redux/sensor";

export const dataStore = configureStore({
    reducer:{
        sensor: sensor.reducer
    }
})