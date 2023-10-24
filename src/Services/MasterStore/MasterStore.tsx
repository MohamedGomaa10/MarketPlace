// Redux Toolkit
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// Application Reducers
import UserSlice from "./Reducers/UserSlice";
import StateSlice from "./Reducers/StateSlice";
import LanguageSlice from "./Reducers/LanguageSlice";
import CategorySlice from "./Reducers/CategorySlice";
import ProductSlice from './Reducers/ProductSlice';
import UserProductSlice from './Reducers/UserProductSlice';
import PaymentSlice from './Reducers/PaymentSlice';
import PaymentRecordSlice from './Reducers/PaymentRecordSlice';
import OrderSlice from './Reducers/OrderSlice';
import MarketProgramSlice from './Reducers/MarketProgramSlice';


export const MasterStore = configureStore({
    reducer: {
        User: UserSlice,
        State: StateSlice,
        Category: CategorySlice,
        Product: ProductSlice,
        Payment: PaymentSlice,
        UserProduct: UserProductSlice,
        Language: LanguageSlice,
        PaymentRecord:PaymentRecordSlice,
        MarketProgram: MarketProgramSlice,
        Order:OrderSlice
    },
});

// Export RootState and AppDispatch
export type AppDispatch = typeof MasterStore.dispatch;
export type RootState = ReturnType<typeof MasterStore.getState>;
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, Action<string>>;