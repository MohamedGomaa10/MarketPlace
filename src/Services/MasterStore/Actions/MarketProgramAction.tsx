// Axios Middleware
import Request from '../../../Middleware/Requests/RequestMaster';

// Get All ProductProgram
export const GetAllProductProgramAction = async (USER_ID: number) => {
    const response = await Request.get( `Market/ProductProgram/${USER_ID}` );
    return response.data;
}

// GetOneProductProgram
export const GetOneProductProgramAction = async (GUID: any) => {
    const response = await Request.get( `Market/SelectOneMarketOffer/${GUID}` );
    return response.data;
}

// GetAllMarketCoupon
export const GetAllMarketCouponAction = async (USER_ID: number) => {
    const response = await Request.get( `Market/SelectMarketCoupon/${USER_ID}` );
    return response.data;
}

// GetAllMarketerOperation
export const GetAllMarketerOperationAction = async (USER_ID: number) => {
    const response = await Request.get( `Market/SelectMarketerOperation/${USER_ID}` );
    return response.data;
}

export interface CheckMarkterInterface {
    USER_ID: number,
    LANG: string,
}

//CheckMarkterJoin
export const CheckMarkterJoinAction = async (payload: CheckMarkterInterface) => {
    const response = await Request.get( `Market/getCheckMarkterJoin/${payload.USER_ID}/${payload.LANG}` );
    return response.data;
}

export interface CreateGenerateCouponInterface {
    GUID: any,
    USER_ID: number,
    LANG: string,
}

export const CreateGenerateCouponAction = async ( Payload: CreateGenerateCouponInterface ) => {
    const response = await Request.post('/Market/GenerateCoupon', Payload )
    return response.data;
}

export interface JoinMarketInterface {
    REFERRAL_CODE: any,
    USER_ID: number,
    LANG: string,
}

export const CreateJoinMarketAction = async ( Payload: JoinMarketInterface ) => {
    const response = await Request.post('/Market/JoinMarket', Payload )
    return response.data;
}