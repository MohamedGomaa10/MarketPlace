// Axios Middleware
import Request from '../../../Middleware/Requests/RequestMaster';

// Get All Products for user
export const GetAllProductsUserId = async (userId:number) => {
    const response = await Request.get( `Market/UserProductByUserrId/${userId}` );
    return response.data;
}

export interface ProductIdUserId {
    UserId: any;
    ProductId: any;
}

// Get Product Using User Id and Product Id
export const GetAllProductsUsingUserIdAndProductId = async (payload: ProductIdUserId) => {
    const response = await Request.get( `Market/UserProductByUserIdProductId/${payload.UserId}/${payload.ProductId}` );
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
    USER_NAME: string;
    PASSWORD: string;
    paymenT_ID:number;
}

// Create UserProduct
export const CreateUserProductAction = async ( Payload: CreateUserProductInterface) => {
    const response = await Request.post( `Market/UserProduct`, Payload );
    //Navigate('/dashboard/categories', { replace: true });
    return response.data;
}

//select one user
export const SelectUserProductAction = async ( USER_PRODUCT_ID: any) => {
    const response = await Request.get( `Market/UserProductOne`, USER_PRODUCT_ID );
    //Navigate('/dashboard/categories', { replace: true });
    return response.data;
}

//select one user
export const SelectUserSubscriptionsAction = async ( USER_PRODUCT_ID: any) => {
    const response = await Request.get( `Market/UserSubscriptions/${USER_PRODUCT_ID}` );
    //Navigate('/dashboard/categories', { replace: true });
    return response.data;
}

//select one user Data
export const SelectUserDataAction = async ( USER_ACCOUNT_ID: any) => {
    const response = await Request.get( `Market/GetUserData/${USER_ACCOUNT_ID}` );
    //Navigate('/dashboard/categories', { replace: true });
    return response.data;
}