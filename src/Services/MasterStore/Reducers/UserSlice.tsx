// Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// React Toastify
import { toast } from 'react-toastify';

// Master Store
import { RootState } from "../MasterStore";

// Actions
import { UserSignInInterface, UserSignInAction,
         UserSignUpInterface, UserSignUpAction,
         UserSignToProductInterface,
         UserSignToProductAction
         /*UserEmailVerifiedInterface, UserEmailVerifiedAction,
UserSignOutAction, UserProfileAction*/ } from '../Actions/UserAction';

// Interface
interface IUsers {
    loading?: boolean;
    user?: any;
    error?: any;
}

// Initial State
const initialState: IUsers = {
    loading: false,
    user: {},
    error: ''
}

// User Sign In
export const UserSignIn = createAsyncThunk(
    'Users/SignIn',
    async (Payload: UserSignInInterface) => {
        return await UserSignInAction(Payload);
    }
)

// User Sign Up
export const UserSignUp = createAsyncThunk(
    'Users/SignUp',
    async (Payload: UserSignUpInterface) => {
        return await UserSignUpAction(Payload);
    }
)

// User Sign Up
export const UserSignToProduct = createAsyncThunk(
    'Users/SignToProduct',
    async (Payload: UserSignToProductInterface) => {        
        return  await UserSignToProductAction(Payload);
    }
)

// User Sign Out
// export const UserSignOut = createAsyncThunk(
//     'Users/SignOut',
//     async (Payload: any) => {
//         return await UserSignOutAction(Payload);
//     }
// )

// // Client Email Verified
// export const UserEmailVerified = createAsyncThunk(
//     'Users/EmailVerified',
//     async (Payload: UserEmailVerifiedInterface) => {
//         return await UserEmailVerifiedAction(Payload);
//     }
// )

// // User Profile
// export const UserProfile = createAsyncThunk(
//     'Users/Profile',
//     async () => {
//         return await UserProfileAction();
//     }
// )

const UserSlice = createSlice({
    name: 'Users',
    initialState,
    reducers: {},
    extraReducers: ( Builder:any) => {
        // User Sign In
        Builder.addCase( UserSignIn.pending, ( State:any) => {
            State.loading = true;
        })
        Builder.addCase( UserSignIn.fulfilled, ( State:any, Action:any ) => {
            if (Action.payload?.DATA?.PUSER_INFO) {
                State.loading = false;
                State.user = Action.payload.DATA.PUSER_INFO;
                State.error = '';
                document.cookie = `JwtInfo=${JSON.stringify(Action.payload?.JWT)}; path=/`
                document.cookie = `UserInfo=${JSON.stringify(Action.payload?.DATA?.PUSER_INFO[0])}; path=/`
            }else{
                toast.error(`UnAuthorized`, { position: "top-right", toastId: 'uniqueId' });
                State.loading = false;
                State.user = [];
                State.error = Action.payload.MESSAGE.CODE;
            }
        })

        // User Sign Up
        Builder.addCase( UserSignUp.pending, ( State:any) => {
            State.loading = true;
        })
        Builder.addCase( UserSignUp.fulfilled, ( State:any, Action:any ) => {
            State.loading = false;
            State.user = Action.payload?.data?.user;
            State.error = '';
        })
        Builder.addCase( UserSignUp.rejected ,( State:any, Action:any) => {
            State.loading = false;
            State.user = [];
            State.error = Action.error?.message;
        })

        // User Sign To Product
        Builder.addCase( UserSignToProduct.pending, ( State:any) => {
            State.loading = true;
        })
        Builder.addCase( UserSignToProduct.fulfilled, ( State:any, Action:any ) => {
            State.loading = false;
            State.error = '';
            toast.success(Action.payload?.message, { position: "top-right", toastId: 'uniqueId' });
        });
    },
});

export const SelectUsers = ( State: RootState ) => State.User;
export default UserSlice.reducer;