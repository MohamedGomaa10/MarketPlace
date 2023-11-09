import React, { FC, useState, useEffect } from "react";

// Master Hooks
import { useAppDispatch, useAppSelector } from '../../Services/MasterStore/MasterHook';

import { CreatePayment } from '../../Services/MasterStore/Reducers/PaymentSlice';
import { SelectOneProductPricing, Selectproducts, SelectGlobalProduct } from '../../Services/MasterStore/Reducers/ProductSlice';
import { SelectOrderInfo, Selectorder, CreateDiscountOrder, SelectOrderProduct } from '../../Services/MasterStore/Reducers/OrderSlice';

import { useNavigate, useParams, NavLink } from 'react-router-dom';

// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form";

//translation
import { useTranslation } from "react-i18next";

import jwtDecode from 'jwt-decode';
import '../../Assets/js/Payment';

// Styles
import "./Checkout.css";

import PathRight from "../../Assets/pathRight.png";
import logo2 from '../../Assets/Images/edited.png';
import Icon from '../../Assets/SectionSix/tag-outline.png';

interface CreatePaymentInterface {
	callback_url:any,
	publishable_api_key :any,
	amount : string,
	description: string,
	source:{
		type:string,
		name: string,
		number: string,
		month: string,
		year:string,
		cvc: string
	},
	Navigate: any;
    ProductId:any;
}

interface CreateApplyDiscountInterface {
    ORDER_GUID: string,
    CODE: string,
    LANG: string,
}

const Checkout: FC = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const { pricingId } = useParams();
	const dispatch = useAppDispatch();
	const Navigate = useNavigate();
	
	const { orderInfo, orderProduct } = useAppSelector(Selectorder);
	const { product } = useAppSelector(Selectproducts);
	const [Token] = useState(localStorage.getItem('token'));
	const { register: FormPay, handleSubmit: handleFormPay } = useForm<CreatePaymentInterface>();
	const { register: FormDiscount, handleSubmit: handleFormDiscount } = useForm<CreateApplyDiscountInterface>();
	const ORDER_INFO = orderInfo.ORDER_INFO && orderInfo.ORDER_INFO.length && orderInfo.ORDER_INFO[0];
	const ORDER_PRODUCT_INFO = orderProduct.ORDER_PRODUCT_INFO && orderProduct.ORDER_PRODUCT_INFO.length && orderProduct.ORDER_PRODUCT_INFO[0];
	const[MessageError,setMessageError]=useState("");
	const[YearValidate,setYearValidate]=useState<any>(null);
	const[MessageYearError,setMessageYearError]=useState<any>({});
	const[ButtonDisabled,setButtonDisabled]=useState(false);

	useEffect(() => {
		dispatch(SelectGlobalProduct(Number(id)))
		const decodedToken = Token && jwtDecode<any>(Token);
		dispatch(SelectOrderInfo(decodedToken?.UserId)).then((res) => {
			if(res.payload.DATA.ORDER_INFO[0]?.ORDER_STATUS_ID === 3){
				Navigate('/', { replace: true });
			}else{				
				dispatch(SelectOrderProduct(res.payload.DATA.ORDER_INFO[0].ORDER_ID))
			}
		})
	}, [dispatch, id, Token, Navigate]);

	interface CreateProductPriceInterface {
		PRODUCT_ID: any;
		PRODUCT_PRICING_ID: any;
	}

	useEffect(() => {
		const Data: CreateProductPriceInterface = { PRODUCT_PRICING_ID: pricingId, PRODUCT_ID: id }
		dispatch(SelectOneProductPricing(Data))
	}, [dispatch, id, pricingId]);

	useEffect(() => {
		if(ORDER_INFO?.ORDER_STATUS_ID === 3){
		}
	}, [ORDER_INFO, Navigate]);

	const handleSubmit: SubmitHandler<CreatePaymentInterface> = ( data ) => {
        const Data: CreatePaymentInterface = { 
			callback_url : process.env.REACT_APP_CALLBACK,
			publishable_api_key : process.env.REACT_APP_APIKEY,
			description : product && JSON.stringify({Order_Id: ORDER_INFO?.ORDER_ID, Description: ORDER_PRODUCT_INFO?.PRODUCT_DESC_ONE, ProductId:product?.PRODUCT && product?.PRODUCT[0]?.PRODUCT_ID, PricingPlanId:pricingId}),
			amount : ((ORDER_INFO.NET_AMOUNT)* 100).toString(),
			source:{
				name:data.source.name,
				cvc :data.source.cvc,
				number : data.source.number,
				month : data.source.month,
				year : data.source.year,
				type : 'creditcard'
			},
			Navigate: Navigate,
			ProductId: ORDER_INFO.PRODUCT_ID
		}
		
		// const currentYear = new Date().getFullYear();
		// if(YearValidate >= currentYear){
		// 	dispatch(CreatePayment(Data)).then((res) => {
		// 		setMessageYearError(res?.payload?.errors?.company);
		// 	})
		// }else{

		// }
		dispatch(CreatePayment(Data)).then((res) => {
			if(res.meta.requestStatus === 'fulfilled'){
				setButtonDisabled(true);
			}
			setMessageYearError(res?.payload?.errors);
		})
    };
	let Element = document.getElementById('validateYear');

	const CheckValue = (event :any, len: number) => {
		const currentYear = new Date().getFullYear();
		if(len === 4){
			setYearValidate(event.target.value);
			if(event.target.value >= currentYear){
				if(Element){
					Element.innerHTML = " ";
				}
			}else{
				if(Element && YearValidate)
				Element.innerHTML = t('Validate_Date');
			}
		}
		const pattern = new RegExp(`^([^e+-]{0,${len}})`);
		return event.target.value = event.target.value.match(pattern)[0];
	}

	const CheckValueMonth = (event :any) => {
		const regex = new RegExp(/^(0?[0-9]|1[0-2])$/);
		if(regex.test(event.target.value)){
			return event.target.value
		}else{
			return event.target.value = event.target.value && event.target.value.match(regex);
		}
	}

	const APPLY_DISCOUNT: SubmitHandler<CreateApplyDiscountInterface> = ( data ) => {
		const Lang = localStorage.getItem("LANG") === "en" ? "TWO" : "ONE";
		const DATA:	CreateApplyDiscountInterface = {
			ORDER_GUID: ORDER_INFO && ORDER_INFO?.GUID,
			CODE: data.CODE,
			LANG: Lang,
		}
		dispatch(CreateDiscountOrder(DATA)).then((databack) => {
			if(databack.payload.MESSAGE.CODE != null)
			{
				setMessageError(databack.payload.MESSAGE.MESSAGE);
			}else
			{
				setMessageError("");
			}
			const decodedToken = Token && jwtDecode<any>(Token);
			dispatch(SelectOrderInfo(decodedToken?.UserId));
		})
	}

	const formatDate = (dateString: any) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
	  };

	return (
		<React.Fragment>
			<div className="d-flex justify-content-between marContiner">
				<div>
					<img className='bckground hiddenTab' src={PathRight} alt="hearobackground" />
				</div>
				<div>
					<img className='bckground hiddenTab' src={logo2} alt="hearobackground" />
				</div>
			</div>
			<div className="d-flex justify-content-center align-items-center col-md-12 MainCard">
				<div className='Links'>
					<div className='LinksDetails'>
						<NavLink to={'/'}>
							<h4>{t('Application Market')}</h4>
						</NavLink>
						<NavLink to={'/MarketPlace'}>
							<h4>/ {t('Applications And Categories')}</h4>
						</NavLink>
						<NavLink to={'/productDetails/' + id}>
							<h4>/ {localStorage.getItem("LANG") === "en" ? ORDER_PRODUCT_INFO?.PRODUCT_NAME_TWO : ORDER_PRODUCT_INFO?.PRODUCT_NAME_ONE}</h4>
						</NavLink>
						<h5>/ {t('Payment')}</h5>
					</div>
				</div>
				<div className="CardPayment col-md-9 row">
					<div className=" col-lg-7 col-md-12 col-sm-12 d-flex flex-column">
						<div className="FristCard">
							<div>
								<h5>{t('Total Price')}</h5>
								<br />
								<h2>{ORDER_INFO?.NET_AMOUNT} <span>{t('Salary_Type_Two')}</span></h2>
							</div>
							<div>
								<h5>{t('Order_Id')}</h5>
								<br />
								<h2>{ORDER_INFO?.ORDER_ID}</h2>
							</div>
						</div>
						<div className="SecondCard">
							<h4 className="HeaderSecondCard">{t('Order Details')}</h4>
							<div className="CardImageTitle">
								{ORDER_PRODUCT_INFO?.PRODUCT_ICON && <img src={require('../../Assets/Projects/' + ORDER_PRODUCT_INFO?.PRODUCT_ICON)} className="imagePadding imageHeader" alt="#" />}
								<div className="DetailsApp">
									<h4>{localStorage.getItem("LANG") === "en" ? ORDER_PRODUCT_INFO?.PRODUCT_NAME_TWO : ORDER_PRODUCT_INFO?.PRODUCT_NAME_ONE}</h4>
									<h6>{t('development')} : {localStorage.getItem("LANG") === "en" ? ORDER_PRODUCT_INFO?.PUBLISHER_NAME_TWO : ORDER_PRODUCT_INFO?.PUBLISHER_NAME_ONE}</h6>
								</div>
							</div>
							<div className="d-flex Pricing_Plan">
								<img src={Icon} className="imagePadding" alt="#" />
								<h5>{localStorage.getItem("LANG") === "en" ? ORDER_PRODUCT_INFO?.PRICING_TAG_TWO : ORDER_PRODUCT_INFO?.PRICING_TAG_ONE}</h5>
							</div>
							<div className="d-flex flex-row pt-4 gap-4">
								<div className='imagePadding'>
									<div className="d-flex flex-row gap-2">
										<i className="bi bi-calendar-event imagePadding"></i>
										<h5>{t('Subscription Start')}</h5>
									</div>
									<h5>{formatDate(ORDER_PRODUCT_INFO?.CREATED_IN)}</h5>
								</div>
								<div className="textcenter">
									<div className="d-flex flex-row gap-2">
										<i className="bi bi-calendar-event imagePadding"></i>
										<h5>{t('Subscription End')}</h5>
									</div>
									<h5>{formatDate(ORDER_PRODUCT_INFO?.END_DATE)}</h5>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-5 col-md-12 col-sm-12">
						<div className="ThiredCard">
							<h1>{t('Order Details')}</h1>
							<form onSubmit={handleFormDiscount(APPLY_DISCOUNT)}>
								<div className="Discount">
									<input {...FormDiscount("CODE")} placeholder={t('Entet The Code')} className="form-control INPUT_CODE" />
									<button className="ActiveDiscount">{t('Apply')}</button>
									{MessageError === "" ?
										<p>{ORDER_INFO?.COUPON_ID ? t('Discount applied') : ''}</p> :
										<p>{MessageError}</p>}
								</div>
							</form>
							<br />
							<div className="cardDitailesPay">
								<div>
									<h5>{t('the amount of subscription')}</h5>
									<h5>{!ORDER_INFO?.COUPON_ID ? ORDER_INFO?.AMOUNT - ORDER_INFO?.VAT : ORDER_INFO.NET_AMOUNT - ORDER_INFO?.NET_VAT} {t('Salary_Type_Two')}</h5>
								</div>
								<div>
									<h5>{t('Discount')} <span className="COUPON_CODE">({ORDER_INFO?.COUPON_CODE})</span></h5>
									<h5>{ORDER_INFO?.NET_DISCOUNT ? ORDER_INFO?.NET_DISCOUNT : 0} {t('Salary_Type_Two')} </h5>
								</div>
								<div>
									<h5>{t('Value added tax')}</h5>
									<h5>{ORDER_INFO?.NET_VAT} {t('Salary_Type_Two')}</h5>
								</div>
							</div>
							<div className="d-flex flex-row justify-content-between pt-3 checkout">
								<h1>{t('Total amount')}</h1>
								<h5> {ORDER_INFO?.NET_AMOUNT} <span>{t('Salary_Type_Two')}</span></h5>
							</div>
							<hr />
							<h1>{t('Pay this bill')}</h1>
							<form onSubmit={handleFormPay(handleSubmit)} className="FormCard">
								<div className="col-md-12 mb-2">
									<input  {...FormPay("source.name", { required: true })} id="cc-name" placeholder="Card Name" className="form-control cc-name valid mb-2" />
									<input id="cc-number" onInput={(event) => CheckValue(event, 16)} {...FormPay("source.number", { required: true, maxLength: 16 })} placeholder="Card Number" type="number" className="form-control cc-number identified visa " />
								</div>
								<div className="col-md-12 mb-3">
									<div className="row">
										<div className="col-md-4">
											<input id="cc-exp" onInput={(event) => CheckValueMonth(event)} {...FormPay("source.month", { required: true, maxLength: 2 })} placeholder="MM" type="tel" className="form-control cc-exp" />
										</div>
										<div className="col-md-4">
											<input id="x_card_code" onInput={(event) => CheckValue(event, 4)} {...FormPay("source.year", { required: true, maxLength: 4 })} placeholder="YYYY" type="tel" className="form-control cc-exp" />
										</div>
										<div className="col-md-4">
											<input id="cc-number" onInput={(event) => CheckValue(event, 3)} {...FormPay("source.cvc", { required: true, maxLength: 3 })} placeholder="CVC" type="number" className="form-control " />
										</div>
									</div>
									{MessageYearError && Object.values(MessageYearError).map((text: any, Index: any) => (
										<h6 key={Index}>{text}</h6>
									))}
									<h6 id="validateYear"> </h6>
								</div>
								<div className="col-md-12">
									<button id="payment-button" className="btn btn-lg btn-block" disabled={ButtonDisabled}>
										<span id="payment-button-amount">{t('Pay')} {ORDER_INFO?.NET_AMOUNT} {t('Salary_Type_Two')}</span>
										<i className="bi bi-arrow-left"></i>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="d-flex flex-row justify-content-end MainCard">
				<img className='bckground hiddenTab' src={PathRight} alt="hearobackground" />
			</div>
		</React.Fragment>
	);
};

export default Checkout;
