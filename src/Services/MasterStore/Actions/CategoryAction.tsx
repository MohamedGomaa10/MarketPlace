// Axios Middleware
import Request from '../../../Middleware/Requests/RequestMaster';


// Get All Categories
export const GetAllCategoriesAction = async () => {
    const response = await Request.get( 'Market/Category' );
    return response.data;
}