// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Master Store
import { RootState } from "../MasterStore";

// Actions
import { GetAllProductsUserId, CreateUserProductInterface, SelectUserDataAction, SelectUserSubscriptionsAction, SelectUserProductAction, CreateUserProductAction, GetAllProductsUsingUserIdAndProductId, ProductIdUserId } from '../Actions/UserProductAction';

// Interface
interface IProducts {
    loading?: boolean;
    UserProducts?: any;
    UserProduct?: any;
    userProductOne?: any;
    userSubscriptions?: any;
    userDATA?: any;
    error?: any;
}

// Initial State
const initialState: IProducts = {
    loading: false,
    UserProducts: [],
    userSubscriptions: [],
    UserProduct: {},
    userProductOne: {},
    userDATA: {},
    error: ''
}

// Select Products using user id
export const SelectUserProduct = createAsyncThunk(
    'Market/UserProductByUserrId',
    async (Payload: number) => {
        return await GetAllProductsUserId(Payload);
    }
)

// Select Product using UserId and ProductId
export const SelectProductUsingUserIdAndPRoductId = createAsyncThunk(
    'Market/UserProductByUserrIdAndProductId',
    async (Payloed: ProductIdUserId) => {
        return await GetAllProductsUsingUserIdAndProductId(Payloed);
    }
)

// Create UserProduct
export const CreateUserProduct = createAsyncThunk(
    'products/Create',
    async (Payload: CreateUserProductInterface) => {
        return await CreateUserProductAction(Payload);
    }
)

// Select one UserProduct
export const SelectOneUserProduct = createAsyncThunk(
    'userProduct/Select',
    async (USER_PRODUCT_ID: any) => {
        return await SelectUserProductAction(USER_PRODUCT_ID);
    }
)

// Select UserSubscription
export const SelectUserSubscription = createAsyncThunk(
    'userSubscription/Select',
    async (USER_PRODUCT_ID: any) => {
        return await SelectUserSubscriptionsAction(USER_PRODUCT_ID);
    }
)

// Select UserData
export const SelectUserData = createAsyncThunk(
    'userData/Select',
    async (USER_ACCOUNT_ID: any) => {
        return await SelectUserDataAction(USER_ACCOUNT_ID);
    }
)

const UserProductSlice = createSlice({
    name: 'UserProduct',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {
        // Select Product
        Builder.addCase( SelectUserProduct.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectUserProduct.fulfilled, ( State, Action) => {
            if (Action.payload.MESSAGE.MESSAGE === '') {
                State.loading = false;
                State.UserProducts = Action.payload.DATA.USER_PRODUCT;
                State.error = '';
            }else{
                State.loading = false;
                State.UserProducts = [];
                State.error = Action.payload.MESSAGE.MESSAGE;
           }
        });   

        // Select Product By User Id and Product id
        Builder.addCase( SelectProductUsingUserIdAndPRoductId.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectProductUsingUserIdAndPRoductId.fulfilled, ( State, Action) => {
            if (Action.payload.MESSAGE.MESSAGE === '') {
                State.loading = false;
                State.UserProducts = Action.payload.DATA.USER_PRODUCT;
                State.error = '';
            }else{
                State.loading = false;
                State.UserProducts = [];
                State.error = Action.payload.MESSAGE.MESSAGE;
           }
        });

        
        // Select Product By User Id and Product id
        Builder.addCase( SelectUserData.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectUserData.fulfilled, ( State, Action) => {            
            if (Action.payload.MESSAGE.MESSAGE === '') {
                State.loading = false;
                State.userDATA = Action.payload.DATA.USER_DATA;
                State.error = '';
            }else{
                State.loading = false;
                State.userDATA = [];
                State.error = Action.payload.MESSAGE.MESSAGE;
           }
        });


        // Create Product
        Builder.addCase( CreateUserProduct.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( CreateUserProduct.fulfilled, ( State, Action) => {
            if (Action.payload.MESSAGE.MESSAGE === ''){
                State.loading = false;
                State.UserProduct = Action.payload.DATA;
                State.error = '';
            }else{
                State.loading = false;
                State.UserProduct = [];
                State.error = Action.payload.MESSAGE.MESSAGE;
            }
        });

        // select one UserProduct
        Builder.addCase( SelectOneUserProduct.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectOneUserProduct.fulfilled, ( State, Action) => {
            if (Action.payload.MESSAGE.MESSAGE === '') {
                State.loading = false;
                State.userProductOne = Action.payload.DATA.USER_PRODUCT;
                State.error = '';
            }else{
                State.loading = false;
                State.userProductOne = {};
                State.error = Action.payload.MESSAGE.MESSAGE;
            }
        });

        
        // select UserSubscription
        Builder.addCase( SelectUserSubscription.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectUserSubscription.fulfilled, ( State, Action) => {
            if (Action.payload.MESSAGE.MESSAGE === '') {
                State.loading = false;
                State.userSubscriptions = Action.payload.DATA.USER_PRODUCT;
                State.error = '';
            }else{
                State.loading = false;
                State.userSubscriptions = {};
                State.error = Action.payload.MESSAGE.MESSAGE;
            }
        });
    },
});

export const SelectUserProducts = ( State: RootState ) => State.UserProduct;
export default UserProductSlice.reducer;