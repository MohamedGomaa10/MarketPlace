import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateOrderAction, CreateOrderInterface, SelectComapnySettingsAction, SendFreeMailAction, TestMailAction, SelectOrderProductAction, SelectOrderAction, UpdateStatuesInterface, UpdateStatuesAction, CreateDiscountAction, CreateApplyDiscountInterface } from "../Actions/OrderAction";
import { RootState } from "../MasterStore";

interface TPayment {
    loading?: boolean;
    order?: any;
    orderInfo?: any;
    discountOrder?: any;
    orderStatues?: any;
    orderProduct?: any;
    orderMail?: any;
    orderFreeMail?: any;
    companySettings?: any;
    error?: any;
}

// Initial State
const initialState: TPayment = {
    loading: false,
    order: {},
    discountOrder: {},
    orderInfo: {},
    orderStatues: {},
    orderProduct: {},
    orderMail: {},
    orderFreeMail: {},
    companySettings: {},
    error: ''
}

// Create Payment Record
export const CreateOrder = createAsyncThunk(
    'Market/PaymentRecord',
    async (payload: CreateOrderInterface) => {        
        return  await CreateOrderAction(payload);
    }
)

// Send email 
export const SendEmail = createAsyncThunk(
    'Market/SendEmail',
    async (id: any) => {        
        return  await TestMailAction(id);
    }
)

// Send Free Email 
export const SendFreeEmail = createAsyncThunk(
    'Market/SendFreeEmail',
    async (id: any) => {        
        return  await SendFreeMailAction(id);
    }
)

// Create UpdateOrder
export const UpdateOrderStatues = createAsyncThunk(
    'Market/UpdateOrder',
    async (payload: UpdateStatuesInterface) => {
        return  await UpdateStatuesAction(payload);
    }
)

// Create DiscountOrder
export const CreateDiscountOrder = createAsyncThunk(
    'Market/DiscountOrder',
    async (payload: CreateApplyDiscountInterface) => {        
        return  await CreateDiscountAction(payload);
    }
)

// Select OrderInfo
export const SelectOrderInfo = createAsyncThunk(
    'order/Select',
    async (id: any ) => {
        return await SelectOrderAction(id);
    }
)

// Select ProductPricing
export const SelectOrderProduct = createAsyncThunk(
    'orderproduct/Select',
    async (id: any ) => {
        return await SelectOrderProductAction(id);
    }
)

// Select ComapnySettings
export const SelectComapnySettings = createAsyncThunk(
    'companySettings/Select',
    async () => {
        return await SelectComapnySettingsAction();
    }
)

const OrderSlice = createSlice({
    name: 'Payment',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {
    
        // Create Payment Record
        Builder.addCase( CreateOrder.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( CreateOrder.fulfilled, ( State, Action) => {
            State.loading = false;
            State.order = Action.payload;
            State.error = '';
        })
        Builder.addCase( CreateOrder.rejected ,( State, Action) => {
            State.loading = false;
            State.order = {};
            State.error = Action.error?.message;
        })


        // Send Email
        Builder.addCase( SendEmail.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SendEmail.fulfilled, ( State, Action) => {
            State.loading = false;
            State.orderMail = Action.payload;
            State.error = '';
        })
        Builder.addCase( SendEmail.rejected ,( State, Action) => {
            State.loading = false;
            State.orderMail = {};
            State.error = Action.error?.message;
        })

                // Send Email
                Builder.addCase( SendFreeEmail.pending, ( State) => {
                    State.loading = true;
                })
                Builder.addCase( SendFreeEmail.fulfilled, ( State, Action) => {
                    State.loading = false;
                    State.orderFreeMail = Action.payload;
                    State.error = '';
                })
                Builder.addCase( SendFreeEmail.rejected ,( State, Action) => {
                    State.loading = false;
                    State.orderFreeMail = {};
                    State.error = Action.error?.message;
                })

        // Create CreateDiscountOrder 
        Builder.addCase( CreateDiscountOrder.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( CreateDiscountOrder.fulfilled, ( State, Action) => {
            State.loading = false;
            State.discountOrder = Action.payload;
            State.error = '';
        })
        Builder.addCase( CreateDiscountOrder.rejected ,( State, Action) => {
            State.loading = false;
            State.discountOrder = {};
            State.error = Action.error?.message;
        })

        // Select Order
        Builder.addCase( SelectOrderInfo.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectOrderInfo.fulfilled, ( State, Action) => {
            if (Action.payload.MESSAGE.MESSAGE === '') {
                State.loading = false;
                State.orderInfo = Action.payload.DATA;
                State.error = '';
            }else{
                State.loading = false;
                State.orderInfo = {};
                State.error = Action.payload.MESSAGE.MESSAGE;
            }
        });

        // Select Order
        Builder.addCase( SelectComapnySettings.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectComapnySettings.fulfilled, ( State, Action) => {
            if (Action) {
                State.loading = false;
                State.companySettings = Action.payload;
                State.error = '';
            }else{
                State.loading = false;
                State.companySettings = {};
                State.error = Action;
            }
        });

        // update Order statues
        Builder.addCase( UpdateOrderStatues.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( UpdateOrderStatues.fulfilled, ( State, Action) => {
            if (Action.payload.MESSAGE.MESSAGE === '') {
                State.loading = false;
                State.orderStatues = Action.payload;
                State.error = '';
            }else{
                State.loading = false;
                State.orderStatues = {};
                State.error = Action.payload.MESSAGE.MESSAGE;
            }
        });
        // update Order statues
        Builder.addCase( SelectOrderProduct.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectOrderProduct.fulfilled, ( State, Action) => {
            if (Action.payload.MESSAGE.MESSAGE === '') {
                State.loading = false;
                State.orderProduct = Action.payload.DATA;
                State.error = '';
            }else{
                State.loading = false;
                State.orderProduct = {};
                State.error = Action.payload.MESSAGE.MESSAGE;
            }
        });
    },
});

export const Selectorder = ( State: RootState ) => State.Order;
export default OrderSlice.reducer;