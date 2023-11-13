// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Master Store
import { RootState } from "../MasterStore";

// Actions
import { GetAllProductProgramAction, CheckMarkterJoinAction, GetAllMarketCouponAction, GetAllMarketerOperationAction, GetOneProductProgramAction, CreateJoinMarketAction, JoinMarketInterface, CreateGenerateCouponInterface, CreateGenerateCouponAction } from '../Actions/MarketProgramAction';

// Interface
interface IPrdouctsProgram {
    loading?: boolean;
    PrdouctsProgram?: any;
    PrdouctProgram?: any;
    GenerateCoupon?: any;
    MarketCoupon?: any;
    CheckMarkterJoin?: any;
    MarkterJoin?: any;
    MarkterOperation?: any;
    error?: any;
}

// Initial State
const initialState: IPrdouctsProgram = {
    loading: false,
    PrdouctsProgram: [],
    MarketCoupon: {},
    PrdouctProgram: {},
    GenerateCoupon: {},
    MarkterJoin: {},
    MarkterOperation: {},
    CheckMarkterJoin: "",
    error: ''
}

// Get All PrdouctsProgram
export const GetAllPrdouctsOffer = createAsyncThunk(
    'ProductOffer',
    async () => {
        return await GetAllProductProgramAction();
    }
)

// GetMarketerOperation
export const GetMarketerOperationSlice = createAsyncThunk(
    'MarketerOperation',
    async () => {
        return await GetAllMarketerOperationAction();
    }
)

// GetOneProductProgram
export const GetOneProductProgram = createAsyncThunk(
    'OneProductProgram',
    async (GUID: any) => {
        return await GetOneProductProgramAction(GUID);
    }
)

// Get All MarketCoupon
export const GetAllMarketCouponSlice = createAsyncThunk(
    'MarketCoupon',
    async () => {
        return await GetAllMarketCouponAction();
    }
)

//CheckMarkterJoin
export const CheckMarkterJoinSlice = createAsyncThunk(
    'CheckMarkterJoin',
    async () => {
        return await CheckMarkterJoinAction();
    }
)

//CheckGenerateCoupon
export const CreateGenerateCouponSlice = createAsyncThunk(
    'CreateGenerateCoupon',
    async (payload: CreateGenerateCouponInterface) => {
        return await CreateGenerateCouponAction(payload);
    }
)

//JoinMarket
export const CreateJoinMarketSlice = createAsyncThunk(
    'CreateJoinMarket',
    async (payload: JoinMarketInterface) => {
        return await CreateJoinMarketAction(payload);
    }
)

const MarketProgramSlice = createSlice({
    name: 'PrdouctsProgram',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {

        // Get All PrdouctsProgram
        Builder.addCase( GetAllPrdouctsOffer.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetAllPrdouctsOffer.fulfilled, ( State, Action) => {
            State.loading = false;
            State.PrdouctsProgram = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( GetAllPrdouctsOffer.rejected ,( State, Action) => {
            State.loading = false;
            State.PrdouctsProgram = [];
            State.error = Action.error?.message;
        })

        // Get OneProductProgram
        Builder.addCase( GetOneProductProgram.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetOneProductProgram.fulfilled, ( State, Action) => {
            State.loading = false;
            State.PrdouctProgram = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( GetOneProductProgram.rejected ,( State, Action) => {
            State.loading = false;
            State.PrdouctProgram = [];
            State.error = Action.error?.message;
        })

        // Get All PrdouctsProgram
        Builder.addCase( CheckMarkterJoinSlice.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( CheckMarkterJoinSlice.fulfilled, ( State, Action) => {
            State.loading = false;
            State.CheckMarkterJoin = Action.payload;
            State.error = '';
        })
        Builder.addCase( CheckMarkterJoinSlice.rejected ,( State, Action) => {
            State.loading = false;
            State.CheckMarkterJoin = [];
            State.error = Action.error?.message;
        })

        // CreateGenerateCoupon
        Builder.addCase( CreateGenerateCouponSlice.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( CreateGenerateCouponSlice.fulfilled, ( State, Action) => {
            State.loading = false;
            State.GenerateCoupon = Action.payload;
            State.error = '';
        })
        Builder.addCase( CreateGenerateCouponSlice.rejected ,( State, Action) => {
            State.loading = false;
            State.GenerateCoupon = [];
            State.error = Action.error?.message;
        })
        
        // CreateJoinMarket
        Builder.addCase( CreateJoinMarketSlice.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( CreateJoinMarketSlice.fulfilled, ( State, Action) => {
            State.loading = false;
            State.MarkterJoin = Action.payload;
            State.error = '';
        })
        Builder.addCase( CreateJoinMarketSlice.rejected ,( State, Action) => {
            State.loading = false;
            State.MarkterJoin = [];
            State.error = Action.error?.message;
        })

        // CreateJoinMarket
        Builder.addCase( GetAllMarketCouponSlice.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetAllMarketCouponSlice.fulfilled, ( State, Action) => {
            State.loading = false;
            State.MarketCoupon = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( GetAllMarketCouponSlice.rejected ,( State, Action) => {
            State.loading = false;
            State.MarketCoupon = [];
            State.error = Action.error?.message;
        })

        // CreateJoinMarket
        Builder.addCase( GetMarketerOperationSlice.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetMarketerOperationSlice.fulfilled, ( State, Action) => {
            State.loading = false;
            State.MarkterOperation = Action.payload.DATA;
            State.error = '';
        })
        Builder.addCase( GetMarketerOperationSlice.rejected ,( State, Action) => {
            State.loading = false;
            State.MarkterOperation = [];
            State.error = Action.error?.message;
        })
    },
});

export const SelectMarketProgram = ( State: RootState ) => State.MarketProgram;
export default MarketProgramSlice.reducer;