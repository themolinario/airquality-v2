
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios/index";


export interface IData {
    value: string;
    type: string;
    source: string;
    date: string;
}

const initialState: any = {
    data: [],
    loading: false,
    errors: null,
};

const getData = createAsyncThunk('sensor/get-data', async (data,thunkAPI) => {
    const url = 'https://6cac-2001-b07-5d30-3eca-183e-fd4-9726-15b5.ngrok-free.app/data';
    let response: any;

    try {
        response = await axios.get(url);
    } catch (e) {
        return thunkAPI.rejectWithValue({
            status: 'error message'
        })
    }

    return response.data;
})

const slice = createSlice({
    name: 'sensor',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getData.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.errors = null;
        });
        builder.addCase(getData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(getData.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        });
    }
});

const sensor = {
    getData,
    reducer: slice.reducer
}

export default sensor;