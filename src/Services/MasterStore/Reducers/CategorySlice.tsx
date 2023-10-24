// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Master Store
import { RootState } from "../MasterStore";
// Actions
import { GetAllCategoriesAction } from '../Actions/CategoryAction';

// Interface
interface ICategories {
    loading?: boolean;
    categories?: any;
    category?: any;
    error?: any;
}

// Initial State
const initialState: ICategories = {
    loading: false,
    categories: [],
    category: {},
    error: ''
}

// Get All Categories
export const GetAllCategories = createAsyncThunk(
    'categories',
    async () => {
        return await GetAllCategoriesAction();
    }
)

const CategorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {

        // Get All Categories
        Builder.addCase( GetAllCategories.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetAllCategories.fulfilled, ( State, Action) => {
            State.loading = false;
            State.categories = Action.payload.DATA.CATEGORY;
            State.error = '';
        })
        Builder.addCase( GetAllCategories.rejected ,( State, Action) => {
            State.loading = false;
            State.categories = [];
            State.error = Action.error?.message;
        })
    },
});

export const SelectCategories = ( State: RootState ) => State.Category;
export default CategorySlice.reducer;