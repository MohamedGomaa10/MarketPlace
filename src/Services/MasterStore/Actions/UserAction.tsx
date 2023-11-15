// Axios Middleware
import RequestAuth from '../../../Middleware/Requests/RequestAuth';

// Axios
import axios from "axios";

// User Sign In Interface
export interface UserSignInInterface {
    Data: {
        LOGIN_NAME : string,
        PASSWORD : string,
        PROJECT_TYPE_ID : number,
        LOGIN_TYPE_ID : string,
        Language : string
    };
    Navigate: any;
}

// User Sign In
export const UserSignInAction = async ( Payload: UserSignInInterface ) => {
    const response = await RequestAuth.post( 'Security/Developer/Login', Payload.Data );
    if (response.data.MESSAGE.CODE !== '' || response.data.MESSAGE.CODE == null) {
        Payload.Navigate('/login', { replace: true });
    }else{
        localStorage.setItem('USER_NAME_ONE',response.data.DATA.PUSER_INFO[0].USER_NAME_ONE)
        localStorage.setItem('USER_NAME_TWO',response.data.DATA.PUSER_INFO[0].USER_NAME_TWO)
        if(localStorage.getItem('Product_Id') !== null){
            Payload.Navigate('/productDetails/' + localStorage.getItem('Product_Id'), { replace: true });
        }else{
            Payload.Navigate('/', { replace: true });
        }
    }
    return response.data;
}

// User Sign Up Interface
export interface UserSignUpInterface {
    Data: {
        NAME_ONE : string;
        PASSWORD : string;
        EMAIL : string;
    };
    Navigate: any;
}

// User Sign Up
export const UserSignUpAction = async ( Payload: UserSignUpInterface ) => {
    const response = await RequestAuth.post( 'Security/RegisterUser', Payload.Data );
    return response.data;
}

// User Sign Up Interface
export interface UserSignToProductInterface {
    Data: {
        NAME_ONE : string;
        NAME_TWO : string;
        PASSWORD : string;
        MOBILE: number;
        EMAIL : string;
        IS_ACTIVE_Y_N: string;
        VALID_FROM: any;
        VALID_TO: any;
    };
    URL: any;
    Navigate: any;
    ProductId:any;
}

export const UserSignToProductAction = async ( Payload: UserSignToProductInterface ) => {
    const response = await RequestAuth.post( Payload.URL + '/Coject/Market/Register', Payload.Data );
    return response.data;
}

export interface ChangeUserPasswordInterface {
    NEW_PASSWORD: string;
}

const baseUrl = 'https://dev.aait.com.sa/CojectAuth';

export const ChangeUserPasswordAction = async ( Payload: ChangeUserPasswordInterface ) => {
    const response = await axios.post( baseUrl + '/Security/ChangePassword', Payload );
    return response.data;
}