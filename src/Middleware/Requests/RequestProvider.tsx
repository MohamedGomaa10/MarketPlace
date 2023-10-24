import React, { FC } from 'react';

// Axios Instance
import Request from './RequestMaster';

// Master Hooks
// import { useAppDispatch } from '../../Services/MasterStore/MasterHook';

// // Slices
// // import { ClientSignOut } from '../../Services/MasterStore/Reducers/ClientSlice';

// // React Router
// import { useNavigate } from 'react-router-dom';

// React Toastify
import { toast } from 'react-toastify';

const RequestProvider: FC<any> = ({ children }) => {
    // const Navigate = useNavigate();
    // const dispatch = useAppDispatch();

    // Global Request Handler
    // Request.interceptors.request.use(( Request: any ) => {
    //     if ( (Request.url !== '/sign-in') || (Request.url !== '/sign-up') ) {
    //         const Token = localStorage.getItem('token');
    //         Request.headers.Authorization = Token ? `${JSON.parse(Token).type} ${JSON.parse(Token).access_token}` : '';
    //     }
    //     return Request;
    // },( Error: any ) => Promise.reject(Error));

    // Global Response Handler
    Request.interceptors.response.use((Response: any ) => { return Response },
        async ( Error: any ) => {
            if ( Error.response ) {

                // Validations Errors
                if ( Error.response.status === 422 ) {
                    for ( const key in Error.response.data.errors ) {
                        const Element = Error.response.data.errors[key];
                        for ( const ErrorMessage of Element ) {
                            toast.error( ErrorMessage, {
                                position: toast.POSITION.TOP_RIGHT,
                                toastId: 'uniqueId',
                            });
                        }
                    }
                }

                if ( Error.response.status === 401 ) {
                    const Token = localStorage.getItem('token') || '';
                    const IsAuthenticated = Token && JSON.parse(Token).access_token;
                    toast.error(Error.response.data.message, {
                        position: "top-right",
                        toastId: 'uniqueId',
                    });
                    if ( IsAuthenticated ) {
                        localStorage.clear();
                        // dispatch(ClientSignOut(Navigate));
                    }
                }

                if ( Error.response.status === 403 ) {
                    toast.error(Error.response.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 'uniqueId',
                    });
                }

                if ( Error.response.status === 429 ) {
                    toast.error( Error.response.data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 'uniqueId',
                    });
                }

                // Development Errors
                if ( Error.response.status === 404 ) {
                    toast.error('Something Went Wrong In API \n Please Contact With Developers', {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 'uniqueId',
                    });
                }

                // Servers Errors
                if ( Error.response.status === 500 ) {
                    toast.error('Something Went Wrong In Server \n Please Contact With IT', {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 'uniqueId',
                    });
                }

                // Internet and Firewall Errors
                if ( Error.response.status === 0 ) {
                    toast.error('No Internet Connection \n Please Contact With IT', {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: 'uniqueId',
                    });
                }
            }

            return Promise.reject(Error);
        }
    );

    return (
        <React.Fragment>
            { children }
        </React.Fragment>
    )
};

export default RequestProvider;