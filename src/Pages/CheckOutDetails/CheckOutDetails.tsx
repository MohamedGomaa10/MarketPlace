import React, { FC, useEffect, useRef, useState } from 'react';

import { useLocation, useNavigate, NavLink } from 'react-router-dom';

import html2canvas  from 'html2canvas'
import {jsPDF} from 'jspdf'
import {QRCodeSVG} from 'qrcode.react'

// Styles
import './CheckOutDetails.css';

import PathRight from "../../Assets/pathRight.png";
import logo2 from '../../Assets/Images/edited.png';
import logoCoject from '../../Assets/logoCojecth.png';
import { useAppDispatch, useAppSelector } from '../../Services/MasterStore/MasterHook';
import { GetPayment, SelectPayment } from '../../Services/MasterStore/Reducers/PaymentSlice';
import { SelectGlobalProduct, SelectOneProductPricing, Selectproducts } from '../../Services/MasterStore/Reducers/ProductSlice';
import jwtDecode from 'jwt-decode';
import { CreateUserProduct, SelectOneUserProduct, SelectProductUsingUserIdAndPRoductId, SelectUserProducts, SelectUserData } from '../../Services/MasterStore/Reducers/UserProductSlice';
import { UserSignToProduct } from '../../Services/MasterStore/Reducers/UserSlice';
import { SelectOrderInfo, Selectorder, UpdateOrderStatues, SendEmail, SelectComapnySettings } from '../../Services/MasterStore/Reducers/OrderSlice';
import { CreatePaymentRecord, SelectPaymentRecord, GetPaymentRecord } from '../../Services/MasterStore/Reducers/PaymentRecordSlice';
import { CreatePaymentRecordInterface } from '../../Services/MasterStore/Actions/PaymentAction';

//translation
import { useTranslation } from "react-i18next";

interface CreateProductPriceInterface {
    PRODUCT_ID: any;
    PRODUCT_PRICING_ID: any;
}

interface UserSignToProductInterface {
    NAME_ONE: string;
    NAME_TWO: string;
    PASSWORD: string;
    MOBILE: number;
    EMAIL: string;
    IS_ACTIVE_Y_N: string;
    VALID_FROM: any;
    VALID_TO: any;
}

interface IForm {
    PRODUCT_ID: string;
    IS_ACTIVE_Y_N: any;
    USER: number;
    VALID_FROM: any;
    VALID_TO: any;
    PAID_AMOUNT: number;
    USER_ACCOUNT_ID: number;
    USER_NAME: string;
    PASSWORD: string;
    paymenT_ID: number
}

const CheckOutDetails:FC = () => {
	const { t } = useTranslation();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pdfRef = useRef(null);
    const navigate = useNavigate();
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const id = searchParams.get('id');
    const { payment } = useAppSelector(SelectPayment);
	const { orderInfo, companySettings } = useAppSelector(Selectorder);
	const { userDATA, UserProducts } = useAppSelector(SelectUserProducts);
    const [UserData, setUserData] = useState<any>({});
    const [EnCoding, setEnCoding] = useState<any>('');
    const { product } = useAppSelector(Selectproducts);
    const { paymentRecord } = useAppSelector(SelectPaymentRecord);
    const [Token] = useState(localStorage.getItem('token'));
    const { productPricing } = useAppSelector(Selectproducts);
    const [ValidDate, SetValidDate] = useState<any>();
    const [URL, SetURL] = useState<any>('');
    const userINFO = userDATA && userDATA[0];
	const ORDER_INFO = orderInfo.ORDER_INFO && orderInfo.ORDER_INFO.length && orderInfo.ORDER_INFO[0];
    useEffect(() => {
		setUserData(Token && jwtDecode<any>(Token))
	}, [Token]);

    useEffect(() => {
		id && dispatch(GetPayment(id))
        dispatch(SelectComapnySettings())
	}, [dispatch, id]);

    useEffect(() => {
		id && dispatch(GetPaymentRecord(id))
	}, [dispatch, id]);

    useEffect(()=>{
        const Data: CreateProductPriceInterface = payment && payment.DATA && { PRODUCT_PRICING_ID: JSON.parse(payment.DATA.description).PricingPlanId, PRODUCT_ID: JSON.parse(payment.DATA.description).ProductId }
        payment && payment.DATA && dispatch(SelectOneProductPricing(Data));
    },[payment, dispatch]);

    useEffect(()=>{
        const date = new Date();
        if (productPricing?.PRODUCT_PRICING && productPricing?.PRODUCT_PRICING[0]?.MONTHS < 12) {
            SetValidDate(date.setDate(date.getDate() + 30));
        } else {
            SetValidDate(date.setDate(date.getDate() + 365));
        }
        payment && payment.DATA && dispatch(SelectGlobalProduct(Number(JSON.parse(payment.DATA.description).ProductId)))
        
    },[productPricing, payment, dispatch]);

    useEffect(()=>{
        product?.PRODUCT && SetURL(product?.PRODUCT[0]?.PROJECT_URL_API);
    },[product, Token, dispatch, payment])

    interface UpdateStatuesInterface {
        ORDER_ID: number,
        ORDER_STATUS: string,
      }

      useEffect(() => {
		const decodedToken = Token && jwtDecode<any>(Token);
		payment && payment.DATA && dispatch(SelectOrderInfo(decodedToken?.UserId)).then((respons)=>{
            const currentDate = new Date();
            const newPassword = generatePassword(6);
            const ProductId = respons.payload.DATA.ORDER_INFO[0].PRODUCT_ID;
            const validDate = ValidDate && new Date(ValidDate);
            const newIsoDateString = validDate.toISOString();
            const Data: UserSignToProductInterface = { NAME_ONE: decodedToken?.UserName, PASSWORD: newPassword, NAME_TWO: decodedToken?.UserName, MOBILE: 1286283258, IS_ACTIVE_Y_N: 'Y', 
            EMAIL: decodedToken?.LoginName,
            VALID_FROM: currentDate,
            VALID_TO: newIsoDateString, }
            if ((paymentRecord?.DATA && paymentRecord?.DATA?.PAYMENT_DETAIL?.length === 0) &&  URL) {
                const PaymentRecord : CreatePaymentRecordInterface = {
                    producT_ID: JSON.parse(payment.DATA.description).ProductId,
                    useR_ACCOUNT_ID: decodedToken?.UserId,
                    producT_PRICING_ID: JSON.parse(payment.DATA.description).PricingPlanId,
                    status: payment.DATA.status,
                    getwaY_ID: payment.DATA.id,
                    ip: payment.DATA.ip,
                    crediT_CARD: payment.DATA.source.number,
                    crediT_CARD_NAME: payment.DATA.source.name,
                    crediT_CARD_COMPANY: payment.DATA.source.company,
                    amount: (payment.DATA.amount / 100).toString(),
                    ordeR_ID: respons.payload.DATA.ORDER_INFO[0]?.ORDER_ID
                }
                URL && dispatch(CreatePaymentRecord(PaymentRecord)).then((result) => {
                    if(result.payload.DATA.PRODUCT[0]?.STATUS === 'paid'){
                        const DataUser: IForm = {
                            PRODUCT_ID: JSON.parse(payment.DATA.description).ProductId,
                            USER_NAME: decodedToken?.LoginName,
                            PASSWORD: newPassword,
                            IS_ACTIVE_Y_N: 'Y',
                            USER: decodedToken?.UserId,
                            USER_ACCOUNT_ID: decodedToken?.UserId,
                            PAID_AMOUNT: payment.DATA.amount /100,
                            VALID_FROM: currentDate.toISOString(),
                            VALID_TO: newIsoDateString,
                            paymenT_ID: result.payload.DATA.PRODUCT[0].PAYMENT_ID
                       }
                        URL && dispatch(CreateUserProduct(DataUser)).then((respons) => {
                            dispatch(SelectOneUserProduct(respons.payload.DATA.USER_PRODUCT[0]?.USER_PRODUCT_ID))
                            const payload = {
                                UserId: decodedToken?.UserId,
                                ProductId: respons.payload.DATA.USER_PRODUCT[0]?.PRODUCT_ID
                            }
                            dispatch(SelectProductUsingUserIdAndPRoductId(payload))
                            dispatch(UserSignToProduct({ Data, URL, Navigate, ProductId }));
                        });
                    }
                    const DataUpdate: UpdateStatuesInterface = {ORDER_ID: result.payload.DATA.PRODUCT[0].ORDER_ID, ORDER_STATUS: result.payload.DATA.PRODUCT[0].STATUS}
                    dispatch(UpdateOrderStatues(DataUpdate)).then(()=>{
                        payment.DATA.status === 'paid' && dispatch(SendEmail(respons.payload.DATA.ORDER_INFO[0]?.GUID));
                    });
                });
            }
            dispatch(SelectUserData(decodedToken?.UserId));
        });
	}, [dispatch, payment, URL, paymentRecord, Navigate, Token, ValidDate]);

    const generatePassword = (length: number): string => {
		const charset = "abcdefghijklmnopqrstuvw@xyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let password = "";
		for (let i = 0; i < length; i++) {
			password += charset.charAt(Math.floor(Math.random() * charset.length));
		}
		return password;
	};

    const NavigateFor =(str:any)=>{
        str ==='m'?navigate(`/marketplace`, { replace: true }):navigate(`/subscriptionsManagement`, { replace: true });
    }

    const NavigateErrorPaid =(str:any)=>{
        str ==='m'?navigate(`/marketplace`, { replace: true }) : navigate(`/checkOut/${ORDER_INFO?.PRODUCT_PRICING_ID}/${ORDER_INFO?.PRODUCT_ID}`, { replace: true });
    }

    useEffect(()=>{
        console.log(UserProducts);
        
        const arabicText =` إسم البائع :  ${companySettings?.companyName}
        \n  "رقم تسجيل ضريبة القيمة المضافة :"  ${companySettings?.companyTaxNumber}
        \n  "التاريخ :  ${formatDate(payment?.DATA?.updated_at)}
        \n  "إجمالي ضريبة القيمة المضافة :  ${ORDER_INFO?.NET_VAT}
        \n  "مجموع الفاتورة (شامل ضريبة القيمة المضافة) :  ${ORDER_INFO && ORDER_INFO?.NET_AMOUNT}`;
        const binaryText = unescape(encodeURIComponent(arabicText));
        setEnCoding(btoa(binaryText));
    },[UserData, ORDER_INFO, payment, companySettings, UserProducts])

    const OpenApp = (Url:string) =>{
        window.open(Url, "_blank", "noreferrer");
    }

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const formattedTime = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" });
		return `${formattedDate + ' ' + formattedTime}`;
	  };

      const DownloadPdf = () => {
        const input = pdfRef.current;
        if(input){
            html2canvas(input, {scale: 1}).then((canvas: any) => {
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF('p', 'mm');
                const imgWidth = 210;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                pdf.addImage(imgData, "png", 0, 0, imgWidth, imgHeight);
                pdf.save('Invoice.pdf');
            })
        }
      }

	return (
		<React.Fragment>
            <div className="d-flex justify-content-between marContiner">
                <div className='ImageBackGroundWave'>
                    <img className='bckground hiddenTab' src={PathRight} alt="hearobackground" />
                </div>					
                <div className='ImageBackGroundLogo'>
                    <img className='bckground hiddenTab' src={logo2} alt="hearobackground" />
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center col-md-12 MainCardParent"  >
                <div className='Links'>
                    <div className='LinksDetails'>
                        <NavLink to={'/'}>
                        <h4>{t('Application Market')}</h4>
                        </NavLink>
                        <NavLink to={'/MarketPlace'}>
                        <h4>/ {t('Applications And Categories')}</h4>
                        </NavLink>
                        <NavLink to={'/productDetails/' + ORDER_INFO?.PRODUCT_ID}>
                            <h4>/ {product && product?.PRODUCT && product?.PRODUCT[0]?.NAME_ONE}</h4>
                        </NavLink>
                        <NavLink to={UserProducts.length !== 0 ? `/` : `/checkOut/${ORDER_INFO?.PRODUCT_PRICING_ID}/${ORDER_INFO?.PRODUCT_ID}`}>
                            <h4>/ {t('Payment')}</h4>
                        </NavLink>
                        <h5>/ {t('Payment Bill')}</h5>
                    </div>
                </div>
                <div className="CardPayment col-md-8 row MainCard">
                    <div className="col-md-6 d-flex flex-column CardFrist">
                        <div>
                        </div>
                        <div className="FristCard">
								<div>
                                    <h5 className='mt-4 mb-4'>{t('Total amount paid')}</h5>
                                    <h1>{payment && payment.DATA && payment.DATA.amount / 100} {t('Salary_Type_Two')}</h1>
								</div>
								<div>
									<h5>{t('Order_Id')}</h5>
									<br/>
									<h2>{ORDER_INFO?.ORDER_ID}</h2>
								</div>
							</div>
                        <hr className="dashed"/>
                        <h5 className='mb-4'>{t('Pay For')}</h5>
                        <h6> {product && product.PRODUCT && product.PRODUCT[0].NAME_ONE}</h6>
                        <div className='d-flex justify-content-between'>
                            <h5>{t('Application Name')}</h5>
                            <h5>{t('Total')}</h5>
                        </div>
                        <br/>
                        <div className='d-flex justify-content-between'>
                            <h6> {product && product.PRODUCT && product.PRODUCT[0].NAME_ONE} </h6>
                            <h6> {payment && payment.DATA && payment.DATA.amount / 100} {t('Salary_Type_Two')} </h6>
                        </div>
                        <hr className="dashed"/>
                        <div className='d-flex justify-content-between'>
                            <h4>{t('Total')}</h4>
                            <h4> {payment && payment.DATA && payment.DATA.amount / 100} {t('Salary_Type_Two')}</h4>
                        </div>
                    </div>
                    <div className="col-md-6 CardSecond d-flex justify-content-center  flex-column">
                        {
                            payment && payment.DATA && payment.DATA.status === 'paid' &&
                            <div>                        
                                <div className='d-flex justify-content-center align-items-center flex-column'>
                                    <i className="bi bi-check-circle"></i>
                                    <h3>{t('Payment has been completed')}</h3>
                                    <h5>{t('Send Invoice')}</h5>
                                    <hr className="dashed"/>                            
                                </div>
                                <div className='UserData'>
                                    <div className='d-flex gap-3 align-items-center'>
                                        <h5>{t('EmailAddress')} : </h5>
                                        <h6>{userINFO?.USER_NAME}</h6>
                                    </div>
                                    <div className='d-flex gap-3 align-items-center'>
                                        <h5>{t('SetAPassword')} : </h5>
                                        <h6>{userINFO?.PASSWORD}</h6>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-around'>
                                    <h6>{t('Send Invoice')}</h6>
                                    <h6> {payment && payment.DATA && payment.DATA.id } </h6>
                                </div>
                                
                        <div className='d-flex justify-content-around mt-5'>
                            <button type='submit' onClick={()=>NavigateFor("m")}>{t('back to the store')}</button>
                            <button type='submit' onClick={()=>NavigateFor("r")}>{t('subscription')}</button>
                        </div>
                            </div>                            
                        }
                        {
                            payment && payment.DATA && payment.DATA.status !== 'paid' &&
                            <div>
                                <div className='d-flex justify-content-center align-items-center flex-column'>
                                    <i className="bi bi-exclamation-circle"></i>
                                    <h3>{t('An error occurred in the payment process')}</h3>
                                    <h6 className='faild'> {t('Reason for payment failure')} : {payment.DATA.source.message}</h6>
                                </div>
                                <div className='d-flex justify-content-around mt-5'>
                                    <button type='submit' onClick={()=>NavigateErrorPaid("r")}>{t('back to the Payment')}</button>
                                    <button type='submit' onClick={()=>NavigateErrorPaid("m")}>{t('back to the store')}</button>
                                </div>
                            </div>
                        }
                        {  payment && payment.DATA && payment.DATA.status === 'paid' &&
                        <div className='d-flex justify-content-around mt-5'>
                        <button type='submit' onClick={DownloadPdf}>{t('Print the invoice')}</button>
                            <button type='submit' onClick={()=>OpenApp(product?.PRODUCT[0]?.PRODUCT_URL)}>{t('launch to the application')}</button>
                        </div>}
                    </div>
                </div>
            <iframe  title='Invoice'>
            </iframe>
           <div ref={pdfRef}id='InvoicePrint' style={{maxWidth: '750px', background: '#FFF', zIndex: '-1'}}>
                <div className='FreeModal subscribeModal'>
                    <div className='HeaderInvoice'>
                        <div className='Invoice'><h1>فاتورة ضريبية</h1></div>
                        <div className='CompanyLogo'><img src={logoCoject} alt='#'/></div>
                    </div>                    
                    <div className='HeaderInvoice'>
                        <div className='InvoiceDate'>
                            <h6> الرقم التسلسلي  : <span>#{ORDER_INFO?.ORDER_ID}</span></h6>
                            <h6>التاريخ : <span>{formatDate(payment?.DATA?.updated_at)}</span></h6>
                        </div>                        
                        <div className='QrCode'>
                            <QRCodeSVG value={EnCoding}/>
                        </div>
                    </div>
                    <div className='HeaderInvoice'>
                        <div className='GateWay'>
                            <h6>مصدر الفاتورة :</h6>
                            <span>{companySettings?.companyName}</span>
                            <span> السجل الضريبي : {companySettings?.companyTaxNumber}</span>
                            <span>السجل التجاري : {companySettings?.companyCommercialNO}</span>
                        </div>
                        <div className='GateWay'>
                            <h6> فاتورة الي :</h6>
                            <span>{UserData?.UserName}</span>
                            <span>{UserData?.LoginName}</span>
                        </div>
                    </div>
                </div>
                <div className='tableParent'>  
                   { ORDER_INFO &&  <table>
                        <thead>
                            <tr>
                                <th>المنتج</th>
                                <th>الكمية</th>
                                <th>السعر</th>
                                <th>الخصم</th>
                                <th>الإجمالي</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{product?.PRODUCT && product?.PRODUCT[0]?.NAME_ONE}</td>
                                <td>1</td>
                                <td>{ORDER_INFO?.AMOUNT - ORDER_INFO?.VAT}</td>
                                <td>{ORDER_INFO?.NET_DISCOUNT}</td>
                                <td>{ORDER_INFO?.NET_AMOUNT - ORDER_INFO?.NET_VAT}</td>
                            </tr>
                            <tr>
                                <td colSpan={2} rowSpan={3} className='Payment_Info'>
                                </td>
                                <td>المجموع</td>
                                <td></td>
                                <td>{ORDER_INFO?.NET_AMOUNT - ORDER_INFO?.NET_VAT}</td>
                            </tr>
                            <tr>
                                <td>الضريبة المضافة(15%)</td>
                                <td></td>
                                <td>{ORDER_INFO?.NET_VAT}</td>
                            </tr>
                            <tr className='TotalAmount'>
                                <td>الإجمالي</td>
                                <td></td>
                                <td>{payment && payment.DATA?.amount_format}</td>
                            </tr>                            
                        </tbody>
                    </table>}
                </div>
            </div>
            </div>
		</React.Fragment>
	)
}

export default CheckOutDetails;