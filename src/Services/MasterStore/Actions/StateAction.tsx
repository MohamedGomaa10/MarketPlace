// Axios Middleware
import Request from '../../../Middleware/Requests/RequestMaster';

// Get All States
export const GetAllStatesAction = async () => {
    const response = await Request.get( '/states' );
    return response.data;
}

// Select State
export const SelectStateAction = async ( Payload: number ) => {
    const response = await Request.get( `/states/${Payload}` );
    return response.data;
}