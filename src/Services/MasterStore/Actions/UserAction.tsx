// Axios Middleware
import RequestAuth from '../../../Middleware/Requests/RequestAuth';

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
    const response = await RequestAuth.post( 'Security/RegisterUser', Payload.Data )
    // Payload.Navigate('/dashboard', { replace: true });
    return response.data;
}

// // User Email Verified Interface
// export interface UserEmailVerifiedInterface {
//     Data: {
//         id: string;
//         hash: string;
//     };
//     Navigate: any;
// }

// // User Email Verified
// export const UserEmailVerifiedAction = async ( Payload: UserEmailVerifiedInterface ) => {
//     const response = await Request.post( '/users/email-verified', Payload.Data );
//     Payload.Navigate('/', { replace: true });
//     return response.data;
// }

// // User Profile
// export const UserProfileAction = async () => {
//     const response = await Request.get( '/users/profile' );
//     return response.data;
// }

// // User Sign Out
// export const UserSignOutAction = async ( Payload: any ) => {
//     const response = await Request.post( '/users/sign-out' );
//     localStorage.clear();
//     Payload.Navigate('/dashboard/sign-in', { replace: true });
//     return response.data;
// }

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
    const response = await RequestAuth.post( Payload.URL + '/Coject/Market/Register', Payload.Data )
    //Payload.Navigate(`/profile`, { replace: true });
    return response.data;
}