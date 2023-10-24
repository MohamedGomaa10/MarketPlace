// Axios Middleware
import Request from '../../../Middleware/Requests/RequestMaster';

// Get All Products
export const GetAllProductsAction = async () => {
    const response = await Request.get( 'Market/Product' );
    return response.data;
}

// Get All LatestProducts
export const GetLatestProductsAction = async () => {
    const response = await Request.get( 'Market/LatestProducts' );
    return response.data;
}

// Get All FeaturedProducts
export const GetFeaturedProductsAction = async () => {
    const response = await Request.get( 'Market/FeaturedProducts' );
    return response.data;
}

// Select Category
export const SelectGlobalProductAction = async ( Payload: number ) => {
    const response = await Request.get( `Market/Product/${Payload}` );
    return response.data;
}

// Select Product
export const SelectOneProductAction = async ( Payload: number ) => {
    const response = await Request.get( `Market/Product/${Payload}` );
    return response.data;
}

export interface ProductInfo{
    id: any;
    lang: any;
    user_id: any;
}

// Select Info Product
export const SelectProductInfoAction = async ( payload: ProductInfo ) => {
    const response = await Request.get( `Market/ProductInfoSelect/${payload.user_id}/${payload.id}/${payload.lang}` );
    return response.data;
}

export interface CreateProductPriceInterface {
    PRODUCT_ID: any;
    PRODUCT_PRICING_ID: any;
}

// Select ProductPricing
export const SelectOneProductPricingAction = async ( Payload: CreateProductPriceInterface) => {
    const response = await Request.get(`Market/ProductPricing/${Payload.PRODUCT_PRICING_ID}/${Payload.PRODUCT_ID}`);
    return response.data;
}

// Select ProductPlan
export const SelectProductPlanAction = async ( id: any) => {
    const response = await Request.get(`Market/ProductPlanSelect/${id}`);
    return response.data;
}

// Create UserProduct Interface
export interface CreateUserProductInterface {
    PRODUCT_ID: string;
    IS_ACTIVE_Y_N: any;
    USER: number;
    VALID_FROM: any;
    VALID_TO: any;
    PAID_AMOUNT: number;
    USER_ACCOUNT_ID: number;
}

// Create UserProduct
export const CreateUserProductAction = async ( Payload: CreateUserProductInterface) => {
    const response = await Request.post( `Market/UserProduct`, Payload );
    //Navigate('/dashboard/categories', { replace: true });
    return response.data;
}