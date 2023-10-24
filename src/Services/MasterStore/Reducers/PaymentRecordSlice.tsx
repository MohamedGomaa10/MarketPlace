import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePaymentRecordAction, CreatePaymentRecordInterface, GetPaymentSearchAction } from "../Actions/PaymentAction";
import { RootState } from "../MasterStore";

interface TPayment {
    loading?: boolean;
    paymentRecord?: any;
    error?: any;
}

// Initial State
const initialState: TPayment = {
    loading: false,
    paymentRecord: {},
    error: ''
}

// Create Payment Record
export const CreatePaymentRecord = createAsyncThunk(
    'Market/PaymentRecord',
    async (payload: CreatePaymentRecordInterface) => {        
        return  await CreatePaymentRecordAction(payload);
    }
)

// Get Payment Record
export const GetPaymentRecord = createAsyncThunk(
    'Market/PaymentRecordDetails',
    async (id: any) => {        
        return  await GetPaymentSearchAction(id);
    }
)

const PaymentRecordSlice = createSlice({
    name: 'Payment',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {
    
        // Create Payment Record
        Builder.addCase( CreatePaymentRecord.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( CreatePaymentRecord.fulfilled, ( State, Action) => {
            State.loading = false;
            State.paymentRecord = Action.payload;
            State.error = '';
        })
        Builder.addCase( CreatePaymentRecord.rejected ,( State, Action) => {
            State.loading = false;
            State.paymentRecord = {};
            State.error = Action.error?.message;
        })

        // Get Payment Record
        Builder.addCase( GetPaymentRecord.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetPaymentRecord.fulfilled, ( State, Action) => {
            State.loading = false;
            State.paymentRecord = Action.payload;
            State.error = '';
        })
        Builder.addCase( GetPaymentRecord.rejected ,( State, Action) => {
            State.loading = false;
            State.paymentRecord = {};
            State.error = Action.error?.message;
        })
    },
});

export const SelectPaymentRecord = ( State: RootState ) => State.PaymentRecord;
export default PaymentRecordSlice.reducer;