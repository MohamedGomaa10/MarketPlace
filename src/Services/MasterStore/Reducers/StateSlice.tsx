// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Master Store
import { RootState } from "../MasterStore";

// Actions
import { GetAllStatesAction, SelectStateAction } from '../Actions/StateAction';

// Interface
interface IStates {
    loading?: boolean;
    states?: any;
    state?: any;
    error?: any;
}

// Initial State
const initialState: IStates = {
    loading: false,
    states: [],
    state: {},
    error: ''
}

// Get All States
export const GetAllStates = createAsyncThunk(
    'States',
    async () => {
        return await GetAllStatesAction();
    }
)

// Select State
export const SelectState = createAsyncThunk(
    'States/Select',
    async (Payload: number) => {
        return await SelectStateAction(Payload);
    }
)

const StateSlice = createSlice({
    name: 'States',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {

        // Get All States
        Builder.addCase( GetAllStates.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetAllStates.fulfilled, ( State, Action) => {
            State.loading = false;
            State.states = Action.payload?.data;
            State.error = '';
        })
        Builder.addCase( GetAllStates.rejected ,( State, Action) => {
            State.loading = false;
            State.states = [];
            State.error = Action.error?.message;
        })

        // Select State
        Builder.addCase( SelectState.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectState.fulfilled, ( State, Action) => {
            State.loading = false;
            State.state = Action.payload?.data;
            State.error = '';
        })
        Builder.addCase( SelectState.rejected ,( State, Action) => {
            State.loading = false;
            State.state = {};
            State.error = Action.error?.message;
        })

    },
});

export const SelectStates = ( State: RootState ) => State.State;
export default StateSlice.reducer;