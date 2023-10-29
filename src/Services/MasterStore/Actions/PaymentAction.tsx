// Axios Middleware
import axios from 'axios';
import Request from '../../../Middleware/Requests/RequestMaster';

// Create Payment Interface
export interface CreatePaymentInterface {
        callback_url:string,
        publishable_api_key :string,
        amount : string,
        description: string,
        source:{
            type:string,
            name: string,
            number: string,
            month: string,
            year:string,
            cvc: string
        }
    Navigate: any;
    ProductId?:any;
}

export interface CreatePaymentRecordInterface {
    producT_ID: number,
    useR_ACCOUNT_ID: number,
    producT_PRICING_ID: number,
    IS_PAID_Y_N: string,
    getwaY_ID: string,
    ip: string,
    crediT_CARD: string,
    crediT_CARD_NAME: string,
    crediT_CARD_COMPANY: string,
    amount: any,
    ordeR_ID:number
}

export const CreatePaymentAction = async ( Payload: CreatePaymentInterface ) => {
    const response =await axios.post("https://api.moyasar.com/v1/payments",Payload)
    window.location.replace(`${response.data.source.transaction_url}`);
    //Payload.Navigate(`/productDetailsSub/${Payload.ProductId}`, { replace: true });
    return response.data;
}

export const fetchData = (Payload: CreatePaymentInterface ) => {
      // Make the HTTP request here, for example, using Axios or fetch API
      axios.post("https://api.moyasar.com/v1/payments",Payload)
        .then(response => {           
            return response.data
        })
        .catch(error => {
            return error.response.data.errors;
        });
  };

export const CreatePaymentRecordAction = async ( Payload: CreatePaymentRecordInterface ) => {
    const response =await Request.post( `Market/Payment`, Payload );
    return response.data;
}

export const GetPaymentAction = async ( id: any ) => {
    const response =await axios.get(`https://dev.aait.com.sa/CojectPayment/Payment/Moyasar/ValidatePayment/${id}`)
    return response.data;
}

export const GetPaymentSearchAction = async ( id: any ) => {
    const response =await Request.get(`Market/Payment?ID=${id}`);
    return response.data;
}

export const CreatePaymentMarketOperationInsAction = async ( PAYMENT_ID: number ) => {
    const response =await Request.post(`Market/PaymentMarketOperationIns/${PAYMENT_ID}`);
    return response.data;
}