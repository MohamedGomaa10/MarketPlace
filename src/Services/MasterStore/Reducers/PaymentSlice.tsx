// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Master Store
import { RootState } from "../MasterStore";

// Actions
import { CreatePaymentAction, CreatePaymentInterface, CreatePaymentMarketOperationInsAction, GetPaymentAction } from '../Actions/PaymentAction';

// Interface
interface TPayment {
    loading?: boolean;
    payment?: any;
    paymentOperation?: any;
    error?: any;
}

// Initial State
const initialState: TPayment = {
    loading: false,
    payment: {},
    paymentOperation: {},
    error: ''
}

export const CreatePayment = createAsyncThunk(
    'Market/Payment',
    async (Payload:CreatePaymentInterface, { rejectWithValue }) => {
        try {
            return await CreatePaymentAction(Payload);
        } catch (Error: any) {
            if (!Error.response) throw Error;
            return rejectWithValue(Error.response.data);
        }
    }
)

//Create Payment
export const CreatePaymentMarketOperationInsSlice = createAsyncThunk(
    'Market/PaymentOperationIns',
    async ( PAYMENT_ID: number ) => {
  return await CreatePaymentMarketOperationInsAction(PAYMENT_ID); 
    }
  )

// get Payment
export const GetPayment = createAsyncThunk(
    'Market/PaymentDetails',
    async (Id: any) => {        
        return  await GetPaymentAction(Id);
    }
)





const PaymentSlice = createSlice({
    name: 'Payment',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {
        // Create Payment
        Builder.addCase( CreatePayment.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( CreatePayment.fulfilled, ( State, Action) => {
            State.loading = false;
            State.payment = Action.payload;
            State.error = '';
        });
        Builder.addCase( CreatePayment.rejected ,( State, Action) => {
            State.loading = false;
            State.payment = {};
            State.error = Action.payload;
        });

        // get Payment
        Builder.addCase( GetPayment.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetPayment.fulfilled, ( State, Action) => {
            State.loading = false;
            State.payment = Action.payload;
            State.error = '';
        })
        Builder.addCase( GetPayment.rejected ,( State, Action) => {
            State.loading = false;
            State.payment = {};
            State.error = Action.error?.message;
        })
        
        // Create PaymentMarketOperationIns
        Builder.addCase( CreatePaymentMarketOperationInsSlice.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( CreatePaymentMarketOperationInsSlice.fulfilled, ( State, Action) => {
            State.loading = false;
            State.paymentOperation = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( CreatePaymentMarketOperationInsSlice.rejected ,( State, Action) => {
            State.loading = false;
            State.paymentOperation = {};
            State.error = Action.error?.message;
        })
    },
});

export const SelectPayment = ( State: RootState ) => State.Payment;
export default PaymentSlice.reducer;