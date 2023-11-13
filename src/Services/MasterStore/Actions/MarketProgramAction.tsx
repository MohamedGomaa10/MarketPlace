// Axios Middleware
import Request from '../../../Middleware/Requests/RequestMaster';

// Get All ProductProgram
export const GetAllProductProgramAction = async () => {
    const response = await Request.get( `Market/ProductOffer` );
    return response.data;
}

// GetOneProductProgram
export const GetOneProductProgramAction = async (GUID: any) => {
    const response = await Request.get( `Market/SelectOneMarketOffer/${GUID}` );
    return response.data;
}

// GetAllMarketCoupon
export const GetAllMarketCouponAction = async () => {
    const response = await Request.get( `Market/SelectMarketCoupon` );
    return response.data;
}

// GetAllMarketerOperation
export const GetAllMarketerOperationAction = async () => {
    const response = await Request.get( `Market/SelectMarketerOperation` );
    return response.data;
}

//CheckMarkterJoin
export const CheckMarkterJoinAction = async () => {
    const response = await Request.get( `Market/getCheckMarkterJoin` );
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