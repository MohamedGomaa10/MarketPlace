// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Master Store
import { RootState } from "../MasterStore";

// Actions
import { GetAllProductsAction, ProductInfo, SelectProductPlanAction, SelectProductInfoAction, GetFeaturedProductsAction, GetLatestProductsAction, SelectGlobalProductAction, SelectOneProductAction, SelectOneProductPricingAction } from '../Actions/ProductAction';

// Interface
interface IProducts {
    loading?: boolean;
    products?: any;
    product?: any;
    productPricing?: any;
    latestProducts?: any;
    productInfo?: any;
    productPlan? : any;
    featuredProducts?: any;
    error?: any;
}

// Initial State
const initialState: IProducts = {
    loading: false,
    products: [],
    product: {},
    productInfo: {},
    productPlan: {},
    productPricing: {},
    latestProducts: [],
    featuredProducts: [],
    error: ''
}

// Get All Products
export const GetAllProducts = createAsyncThunk(
    'products',
    async () => {
        return await GetAllProductsAction();
    }
)

// Select Product
export const SelectGlobalProduct = createAsyncThunk(
    'products/Select',
    async (Payload: number) => {
        return await SelectGlobalProductAction(Payload);
    }
)

// Select Product
export const SelectOneProduct = createAsyncThunk(
    'products/Select',
    async (Payload: number) => {
        return await SelectOneProductAction(Payload);
    }
)

// Select Product
export const SelectProductInfo = createAsyncThunk(
    'productInfo/Select',
    async ( payload: ProductInfo) => {
        return await SelectProductInfoAction(payload);
    }
)

// Select ProductPricing
export const SelectOneProductPricing = createAsyncThunk(
    'productPricing/Select',
    async (Payload: any ) => {
        return await SelectOneProductPricingAction(Payload);
    }
)

// Select ProductPricing
export const SelectProductPlan = createAsyncThunk(
    'productPlan/Select',
    async (id: any ) => {
        return await SelectProductPlanAction(id);
    }
)

// Select LatestProducts
export const SelectLatestProducts = createAsyncThunk(
    'latestProducts/Select',
    async () => {
        return await GetLatestProductsAction();
    }
)

// Select FeaturedProducts
export const SelectFeaturedProducts = createAsyncThunk(
    'featuredProducts/Select',
    async () => {
        return await GetFeaturedProductsAction();
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: ( Builder) => {

        // Get All Products
        Builder.addCase( GetAllProducts.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( GetAllProducts.fulfilled, ( State, Action) => {
            State.loading = false;
            State.products = Action.payload.DATA.PRODUCT;
            State.error = '';
        })
        Builder.addCase( GetAllProducts.rejected ,( State, Action) => {
            State.loading = false;
            State.products = [];
            State.error = Action.error?.message;
        })

        // Select Product
        Builder.addCase( SelectGlobalProduct.pending, ( State) => {
            State.loading = true;
        })
        Builder.addCase( SelectGlobalProduct.fulfilled, ( State, Action) => {
            if (Action.payload.MESSAGE.MESSAGE === '') {
                State.loading = false;
                State.product = Action.payload.DATA;
                State.error = '';
            }else{
                State.loading = false;
                State.product = {};
                State.error = Action.payload.MESSAGE.MESSAGE;
           }
        });
                // Select Product
                Builder.addCase( SelectOneProductPricing.pending, ( State) => {
                    State.loading = true;
                })
                Builder.addCase( SelectOneProductPricing.fulfilled, ( State, Action) => {
                    if (Action.payload.MESSAGE.MESSAGE === '') {
                        State.loading = false;
                        State.productPricing = Action.payload.DATA;
                        State.error = '';
                    }else{
                        State.loading = false;
                        State.productPricing = {};
                        State.error = Action.payload.MESSAGE.MESSAGE;
                   }
                });

                // Select Product
                Builder.addCase( SelectLatestProducts.pending, ( State) => {
                    State.loading = true;
                })
                Builder.addCase( SelectLatestProducts.fulfilled, ( State, Action) => {
                    if (Action.payload.MESSAGE.MESSAGE === '') {
                        State.loading = false;
                        State.latestProducts = Action.payload.DATA;
                        State.error = '';
                    }else{
                        State.loading = false;
                        State.latestProducts = {};
                        State.error = Action.payload.MESSAGE.MESSAGE;
                    }
                });

                // Select Product
                Builder.addCase( SelectFeaturedProducts.pending, ( State) => {
                    State.loading = true;
                })
                Builder.addCase( SelectFeaturedProducts.fulfilled, ( State, Action) => {
                    if (Action.payload.MESSAGE.MESSAGE === '') {
                        State.loading = false;
                        State.featuredProducts = Action.payload.DATA;
                        State.error = '';
                    }else{
                        State.loading = false;
                        State.featuredProducts = {};
                        State.error = Action.payload.MESSAGE.MESSAGE;
                    }
                });
                // Select Product
                Builder.addCase( SelectProductInfo.pending, ( State) => {
                    State.loading = true;
                })
                Builder.addCase( SelectProductInfo.fulfilled, ( State, Action) => {
                    if (Action.payload.MESSAGE.MESSAGE === '') {
                        State.loading = false;
                        State.productInfo = Action.payload.DATA;
                        State.error = '';
                    }else{
                        State.loading = false;
                        State.productInfo = {};
                        State.error = Action.payload.MESSAGE.MESSAGE;
                    }
                });
                // Select Product
                Builder.addCase( SelectProductPlan.pending, ( State) => {
                    State.loading = true;
                })
                Builder.addCase( SelectProductPlan.fulfilled, ( State, Action) => {
                    if (Action.payload.MESSAGE.MESSAGE === '') {
                        State.loading = false;
                        State.productPlan = Action.payload.DATA;
                        State.error = '';
                    }else{
                        State.loading = false;
                        State.productPlan = {};
                        State.error = Action.payload.MESSAGE.MESSAGE;
                    }
                });
    },
});

export const Selectproducts = ( State: RootState ) => State.Product;
export default productSlice.reducer;