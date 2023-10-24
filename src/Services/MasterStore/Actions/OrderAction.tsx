import Request from "../../../Middleware/Requests/RequestMaster";

export interface CreateOrderInterface {
    guid: string,
    amount: number,
    vat: number,
    currency: string,
    description: string,
    producT_ID: number,
    producT_PRICING_ID: number,
    useR_ACCOUNT_ID: number
}

export const CreateOrderAction = async ( Payload: CreateOrderInterface ) => {
    const response = await Request.post('/Market/Order', Payload )
    return response.data;
}

// Select ProductPlan
export const SelectOrderAction = async ( id: any) => {
    const response = await Request.get(`Market/OrderInfoSelect/${id}`);
    return response.data;
}

// send Mail
export const TestMailAction = async ( id: any) => {
    const response = await Request.post(`Market/Order/TestMail/${id}`);
    return response.data;
}

// send Mail
export const SendFreeMailAction = async ( id: any) => {
    const response = await Request.post(`Market/Order/SendFreeMail/${id}`);
    return response.data;
}

// Select ProductPlan
export const SelectOrderProductAction = async ( id: any) => {
    const response = await Request.get(`Market/OrderProductSelect/${id}`);
    return response.data;
}

export interface CreateApplyDiscountInterface {
    ORDER_GUID: string,
    CODE: string,
    LANG: string,
}

export const CreateDiscountAction = async ( Payload: CreateApplyDiscountInterface ) => {
    const response = await Request.post('/Market/ApplyDiscount', Payload )
    return response.data;
}

export interface UpdateStatuesInterface {
    ORDER_ID: number,
    ORDER_STATUS: string,
}

export const UpdateStatuesAction = async ( Payload: UpdateStatuesInterface ) => {
    const response = await Request.post('/Market/UpdateOrderStatues', Payload )
    return response.data;
}

// Select ComapnySettings
export const SelectComapnySettingsAction = async () => {
    const response = await Request.get('Market/Settings');
    return response.data;
}