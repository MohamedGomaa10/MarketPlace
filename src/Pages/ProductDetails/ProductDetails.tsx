import React, {FC, useEffect, useState, useRef } from 'react';

//translation
import { useTranslation } from 'react-i18next';

// Master Hooks
import { useAppDispatch, useAppSelector } from '../../Services/MasterStore/MasterHook';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import { ProgressBar } from 'react-bootstrap';

// Slices
import { SelectUserProducts, SelectProductUsingUserIdAndPRoductId } from "../../Services/MasterStore/Reducers/UserProductSlice";

import { useNavigate, useParams, NavLink } from 'react-router-dom';

import Ellipse1 from "../../Assets/Projects/Ellipse 54.png";
import earth from "../../Assets/Projects/earth.png";
import star from "../../Assets/Projects/star-bold.png";

import jwtDecode from 'jwt-decode';

import Modal from 'react-bootstrap/Modal';

// Slices
import {  SelectGlobalProduct, SelectProductPlan, Selectproducts, SelectProductInfo} from '../../Services/MasterStore/Reducers/ProductSlice';
import { CreateUserProduct } from '../../Services/MasterStore/Reducers/UserProductSlice';
import { CreatePaymentRecord } from '../../Services/MasterStore/Reducers/PaymentRecordSlice';
import { UserSignToProduct } from '../../Services/MasterStore/Reducers/UserSlice';

//css
import './ProductDetails.css';
import { CreateOrder, SendFreeEmail } from '../../Services/MasterStore/Reducers/OrderSlice';
import { CreateOrderInterface } from '../../Services/MasterStore/Actions/OrderAction';

const ProductDetails:FC = () => {
    const { id } = useParams();
    const pricingPlanRef: React.RefObject<HTMLDivElement> = useRef(null);
    const RecommendAppsRef: React.RefObject<HTMLDivElement> = useRef(null);
    const DescribeRef: React.RefObject<HTMLDivElement> = useRef(null);
    const ReviewRef: React.RefObject<HTMLDivElement> = useRef(null);
    const NavTabRef: React.RefObject<HTMLDivElement> = useRef(null);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { UserProducts } = useAppSelector(SelectUserProducts);
    const { product, productInfo, productPlan } = useAppSelector(Selectproducts);
    const Navigate = useNavigate();
    const navigate = useNavigate();
    const [Token] = useState(localStorage.getItem('token'));
    const [UserData, setUserData] = useState<any>({});    
    const [show, setShow] = useState(false);
    const [FreeShow, setFreeShow] = useState(false);
    const [SubscribeShow, setSubscribeShow] = useState(false);
    const [Star_Record, setStar_Record] = useState<any>([]);
    const [ProductPricing, setProductPricing] = useState<any>({});
    const [UserInormation, setUserInormation] = useState<any>({});

    const handleClose = () => setShow(false);
    const handleShow = () => {
      if (Token) {
        setShow(true)}
      else{
        localStorage.setItem('Product_Id', `${id}`)
        navigate('/login', { replace: true });
      } 
    };

    const handleFreeClose = () => setFreeShow(false);
    const handleFreeShow = () => {
      if (Token) {
        setFreeShow(true)}
      else{
        localStorage.setItem('Product_Id', `${id}`)
        navigate('/login', { replace: true });
      } 
    };

    const Product_Info = !!productInfo.PRODUCT_INFO && productInfo.PRODUCT_INFO.length && productInfo.PRODUCT_INFO[0];
    const Product_Image = !!productInfo.PRODUCT_IMAGE && productInfo.PRODUCT_IMAGE.length && productInfo.PRODUCT_IMAGE;
    const PRODUCT_PLAN = !!productPlan?.PRODUCT_PLAN && productPlan?.PRODUCT_PLAN.length && productPlan?.PRODUCT_PLAN;
    const PRODUCT_STARS = !!productInfo?.PRODUCT_STARS && productInfo?.PRODUCT_STARS.length && productInfo?.PRODUCT_STARS;
    const PRODUCT_COMMENT = !!productInfo?.PRODUCT_COMMENT && productInfo?.PRODUCT_COMMENT.length && productInfo?.PRODUCT_COMMENT;
    const PRODUCT_PLAN_DETAIL = !!productPlan?.PRODUCT_PLAN_DETAIL && productPlan?.PRODUCT_PLAN_DETAIL.length && productPlan?.PRODUCT_PLAN_DETAIL;
    const PRODUCT_RECOMMENDATION = !!productInfo.PRODUCT_RECOMMENDATION && productInfo.PRODUCT_RECOMMENDATION.length && productInfo.PRODUCT_RECOMMENDATION;

    useEffect(() => {
      const decodedToken = Token && jwtDecode<any>(Token);
      const payload = {
          UserId: decodedToken?.UserId,
          ProductId: id
      }
      payload && dispatch(SelectProductUsingUserIdAndPRoductId(payload))
  }, [dispatch, id, Token]);

    useEffect(()=>{
        setUserData(Token && jwtDecode<any>(Token));
      },[Token, UserProducts, ProductPricing]);
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

    const Lang = localStorage.getItem("LANG") === "en" ? "TWO" : "ONE";
    useEffect(() => {
        dispatch(SelectGlobalProduct(Number(id)))
        
      const decodedToken = Token && jwtDecode<any>(Token);
        const payload = {
          user_id: decodedToken?.UserId ? decodedToken?.UserId : null,
          id: Number(id),
          lang: Lang,
      }
      dispatch(SelectProductInfo(payload));
      dispatch(SelectProductPlan(Number(id)));
    }, [dispatch, id, Token, Lang, UserProducts]);

    const handleShowing = (e: any, type: any) => {
      if(type === "PlanandPricing"){
        pricingPlanRef?.current?.scrollIntoView({ behavior: "smooth" ,block: "center", inline: "start" });
      }else if (type === "RecommendedApps"){
        RecommendAppsRef?.current?.scrollIntoView({ behavior: "smooth" ,block: "center", inline: "start"});
      }else if(type === "reviewApps"){
        ReviewRef?.current?.scrollIntoView({ behavior: "smooth" ,block: "center", inline: "start"});
      }
      else{
        DescribeRef?.current?.scrollIntoView({ behavior: "smooth" ,block: "center", inline: "start"});
      }
        const tabs = document.querySelectorAll('.Pricing');
        tabs.forEach(tab => {
          if(tab === e.target){
            tab.classList.add('active');
          }else{
            tab.classList.remove('active');
          }
        });
        
        const Return = document.getElementById('Return');
        if(Return !== null){
          Return.style.display = 'block';
        }
    }

    const Return = () => {
      NavTabRef?.current?.scrollIntoView({ behavior: "smooth" ,block: "center", inline: "start" });
      const Return = document.getElementById('Return');
      if(Return !== null){
        Return.style.display = 'none';
      }
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

    const generatePassword = (length: number): string => {
      const charset = "abcdefghijklmnopqrstuvw@xyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return password;
    };
    

  const generateGUID = ()=> {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (
      S4() +S4() +"-" +S4() +"-4" +S4().substring(0, 3) + "-" +S4() +"-" +S4() + S4() +S4()
    );
  }
    interface CreatePaymentRecordInterface {
      producT_ID: number,
      useR_ACCOUNT_ID: number,
      producT_PRICING_ID: number,
      IS_PAID_Y_N: string,
      getwaY_ID: string,
      ip: string,
      crediT_CARD: string,
      crediT_CARD_NAME: string,
      crediT_CARD_COMPANY: string,
      amount: string,
      ordeR_ID:number
  }

    const handleSubmit = () => {
      if (Token) {
        const DataOdrer: CreateOrderInterface = {
          guid: generateGUID(),
          amount: 0,
          vat: ProductPricing?.PLAN_VAT,
          currency: 'SAR',
          description: product.PRODUCT[0].NAME_ONE,
          producT_ID: Number(id),
          producT_PRICING_ID: PRODUCT_PLAN && PRODUCT_PLAN[0]?.PRODUCT_PRICING_ID,
          useR_ACCOUNT_ID: UserData?.UserId
        };
        dispatch(CreateOrder(DataOdrer)).then((res)=>{
          const newPassword = generatePassword(6);
          const Data: UserSignToProductInterface = {NAME_ONE:UserData && UserData?.UserName, PASSWORD: newPassword,  NAME_TWO: UserData && UserData?.UserName, MOBILE: 1286283258, IS_ACTIVE_Y_N: 'Y', 
          EMAIL: UserData && UserData?.LoginName,
          VALID_FROM: null, VALID_TO: null}
          const URL = product?.PRODUCT[0]?.PROJECT_URL_API;
          const ProductId= product?.PRODUCT[0]?.PRODUCT_ID;
          const PaymentData : CreatePaymentRecordInterface = {producT_ID: ProductId, useR_ACCOUNT_ID:  UserData && UserData?.UserId,
            producT_PRICING_ID: PRODUCT_PLAN && PRODUCT_PLAN[0]?.PRODUCT_PRICING_ID, IS_PAID_Y_N: "Y",
          getwaY_ID: "Default", ip: "Default", crediT_CARD: "Default", crediT_CARD_NAME: "Default",
          crediT_CARD_COMPANY: "Default", amount: "0", ordeR_ID:res?.payload?.DATA?.ORDER[0].ORDER_ID
        }
        dispatch(CreatePaymentRecord(PaymentData)).then((resPayment) => {
          const Data2: IForm = {PRODUCT_ID:product?.PRODUCT[0]?.PRODUCT_ID, USER_NAME: UserData && UserData?.LoginName,
            PASSWORD: newPassword, IS_ACTIVE_Y_N: 'Y',  USER: UserData && UserData?.UserId,
            USER_ACCOUNT_ID: UserData && UserData?.UserId, PAID_AMOUNT: 0.0, VALID_FROM: null,
            VALID_TO: null, paymenT_ID: resPayment?.payload?.DATA?.PRODUCT[0]?.PAYMENT_ID}
          dispatch(CreateUserProduct(Data2)).then((resOrder)=>{
            setUserInormation(resOrder.payload.DATA.USER_PRODUCT[0]);
            if(resOrder.payload.MESSAGE.MESSAGE === ''){
              setSubscribeShow(true)
              dispatch(SendFreeEmail(res.payload.DATA?.ORDER[0]?.GUID))
            }
            dispatch(UserSignToProduct({ Data, URL, Navigate, ProductId }))
          })
        })
        });
      }else{
        localStorage.setItem('Product_Id', `${id}`)
        navigate('/login', { replace: true });
      }
      setFreeShow(false);
  };

  const ActiveApp = () => {
    if (UserData === null || Object.keys(UserData).length === 0) {
      navigate(`/login`, { replace: true })
    }
    else {
      const Data: CreateOrderInterface = {
        guid: generateGUID(),
        amount: ProductPricing.MONTHS * ProductPricing.PRICE_PER_MONTH,
        vat: ProductPricing?.PLAN_VAT,
        currency: 'SAR',
        description: product.PRODUCT[0].NAME_ONE,
        producT_ID: Number(id),
        producT_PRICING_ID: ProductPricing.PRODUCT_PRICING_ID,
        useR_ACCOUNT_ID: UserData?.UserId
      };
      dispatch(CreateOrder(Data)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          navigate(`/checkOut/${ProductPricing.PRODUCT_PRICING_ID}/${id}`, { replace: true })
        }
      });
      window.scrollTo(0, 0);
    }
  }


  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  const summation = PRODUCT_STARS && PRODUCT_STARS.reduce((accumulator: any, currentValue: any) => {
    return accumulator + currentValue.STARS_VALUE;
  }, 0);

  const ReviewAverage = PRODUCT_STARS && PRODUCT_STARS.reduce((accumulator: any, currentValue: any) => {
    return (accumulator + (currentValue.STARS_VALUE * currentValue.STARS_LABEL) / summation);
  }, 0);

  useEffect(() => {
    let arr = [];
    for (let index = 0; index < PRODUCT_STARS.length; index++) {
      arr.push(PRODUCT_STARS[index].STARS_LABEL)
    }
    setStar_Record(arr);
  }, [PRODUCT_STARS, productInfo])

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const NavigateFor = (str: any) => {
    str === 'm' ? navigate(`/marketplace`, { replace: true }) : navigate(`/subscriptionsManagement`, { replace: true });
  }

  const OpenApp = (Url: string) => {
    window.open(Url, "_blank", "noreferrer");
  }
  
    return (
      <React.Fragment>
        {<div className="row" style={{ marginTop: "150px"}}>
            <Modal  size="lg" aria-labelledby="contained-modal-title-vcenter"
              centered show={show} onHide={handleClose} className='col-md-6'>
                <div className='ModalContent'>
                  <Modal.Header>
                  <Modal.Title as={() => {return <h4 className='fw-bold'>{ localStorage.getItem('LANG') ==='en' ?  t('Subscribe To') + ' ' + ProductPricing.productName_Two + ' - ' + ProductPricing?.PLAN_NAME_EN : t('Subscribe To') + ' ' + ProductPricing.productName + ' - ' + ProductPricing?.PLAN_NAME_AR}</h4>;}}/>
                  <Modal.Title as={() => {return <h4 ><i className="bi bi-currency-dollar"></i> {t('deserved amount')}</h4>;}}/>
                  <Modal.Title as={() => {return <h1 className='colorPrice'>{ProductPricing?.PLAN_TOTAL_AMOUNT} <span>{t('Salary_Type')}</span></h1>;}}/>
                  <Modal.Title as={() => {return <div className='dateDetails'>
                    <div className='date_Subscribe'>
                      <i className="bi bi-calendar4"></i>
                      <h6>{t('Start_Subscribe')}</h6>
                      <h6>{formatDate(ProductPricing?.STARTDATE)}</h6>
                    </div>
                    <div className='date_Subscribe'>
                      <i className="bi bi-calendar4"></i>
                      <h6>{t('End Subscribe')}</h6>
                      <h6>{formatDate(ProductPricing?.ENDDATE)}</h6>
                    </div>
                    </div>;}}/>
                  <Modal.Title as={() => {return <h4>{t('Amount Details')}</h4>;}}/>
                </Modal.Header>
                <Modal.Body>
                  <div className='cardPlan'>
                    <div className='col-md-6'>{t('Plan Price')}</div>
                    <div className='col-md-6 d-flex justify-content-end'>{ProductPricing?.PLAN_WITHOUT_VAT + ' ' + t('Salary_Type')}</div>
                  </div>
                  <div className='cardPlan'>
                    <div className='col-md-6'>{t('Value added tax')}<span> 15%</span></div>
                    <div className='col-md-6 d-flex justify-content-end'>{ProductPricing?.PLAN_VAT + ' ' + t(`Salary_Type`)}</div>
                  </div>
                  <div className='cardPlan allSalary'>
                    <div className='col-md-6'>{t('Total amount due')}</div>
                    <div className='col-md-6 d-flex justify-content-end'>{ProductPricing?.PLAN_TOTAL_AMOUNT + ' ' + t('Salary_Type')}</div>
                  </div>
                    <div className="ActionsApp">
                      <button className="BackButton" onClick={handleClose}>{t('Back')}</button>
                      <button className="activeApp" onClick={ActiveApp}>{t('App Action')}</button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className='TermsFooter'>
                    <h4> <i className="bi bi-award-fill"></i>{t('When you subscribe to the application, you agree to')}<span> {t('terms')}</span> {t('For the application market')}</h4>
                  </div>
                </Modal.Footer>
              </div>
            </Modal>
            <Modal aria-labelledby="contained-modal-title-vcenter"
              centered show={FreeShow} onHide={handleFreeClose} className='col-md-6'>
              <Modal.Header>
                <div className='FreeModal'>                   
                  <Modal.Title as={() => {return <i className="bi bi-arrow-right-circle-fill"></i>;}}/>
                  <Modal.Title as={() => {return <h4 className='fw-bold'>{t('هل تريد الإشتراك في الخطة ؟')}</h4>;}}/>
                  <Modal.Title as={() => {return <div>
                    <div className='actionsFree'>
                      <button className='activeFree' onClick={handleSubmit}>{t('Yes, subscribe')}</button>
                      <button className='BackFree' onClick={handleFreeClose}>{t('No, Back')}</button>
                    </div>
                  </div>}}/>
                </div>
              </Modal.Header>
            </Modal>
            <Modal aria-labelledby="contained-modal-title-vcenter"
              centered show={SubscribeShow} onHide={handleFreeClose} className='col-md-6'>
              <Modal.Header>
                <div className='FreeModal subscribeModal'>
                  <Modal.Title as={() => {return <i className="bi bi-check-circle"></i>;}}/>
                  <Modal.Title as={() => {return <h4 className='fw-bold'>{ t('You have successfully subscribed to the plan')}</h4>;}}/>
                <Modal.Title as={() => {
                  return <div className='UserData'>
                    <div className='d-flex gap-3 align-items-center'>
                      <h5>{t('EmailAddress')} : </h5>
                      <h6>{UserInormation?.USER_NAME}</h6>
                    </div>
                    <div className='d-flex gap-3 align-items-center'>
                      <h5>{t('SetAPassword')} : </h5>
                      <h6>{UserInormation?.PASSWORD}</h6>
                    </div>
                  </div>;
                }} />
                  <Modal.Title as={() => {return <div>
                    <div className='actionsFree'>
                      <button className='activeFree' onClick={() => OpenApp(Product_Info?.PRODUCT_URL)}>{t('launch to the application')}</button>
                      <button className='activeFree' onClick={()=>{NavigateFor("r"); handleLinkClick();}}>{t('subscription')}</button>
                    </div>
                  </div>}}/>
                </div>
              </Modal.Header>
            </Modal>
            <div className="col-md-12 parentContent">
              <div className='Links'>
                <div className='LinksDetails'>
                  <NavLink to={'/'}>
                    <h4>{t('Application Market')}</h4>
                  </NavLink>
                  <NavLink to={'/MarketPlace'}>
                    <h4>/ {t('Applications And Categories')}</h4>
                  </NavLink>
                    <h5>/ {Product_Info?.PRODUCT_NAME}</h5>
                </div>
              </div>
              <div className="crudDetail">
                <div className="headerImg">
                  {Product_Info?.PRODUCT_ICON && <img src={require('../../Assets/Projects/' +Product_Info?.PRODUCT_ICON)} alt="cloud"/>}
                </div>
                <div className='CrudParentBody'>
                  <div className="crudDetailBody">
                    <div className='childDetail'>
                      <h2 className='productName'>{Product_Info?.PRODUCT_NAME}</h2>
                        <div className='categoryType'><h6>{Product_Info?.CATEGORY_NAME}</h6></div>
                        <div className='cardLabel'>
                          <i className="bi bi-tags"></i>
                          <p className="priceText">{Product_Info?.PRICING_TAG}</p>
                        </div>
                    </div>
                    <div className='Description'>
                      <h6>{t('development')} : {Product_Info?.PUBLISHER_NAME}</h6>
                      <h6>{Product_Info?.DESCRIPTION_NAME}</h6>
                    </div>
                    <div className='activeProduct'>
                      {UserProducts.length !== 0 ?
                      <div>
                        <button className='InstallButton' onClick={() => OpenApp(Product_Info?.PRODUCT_URL)}>{t('launch to the application')}</button> 
                        <p>{Product_Info && Product_Info?.IS_USER_SUBSCRIBED_ONE}</p>
                      </div> : 
                      Product_Info?.IS_FREE_Y_N === 'N' ?
                      <button className='InstallButton' onClick={(e) => handleShowing(e, 'PlanandPricing')}>{t('subscripe')}</button>
                    :  <button className='InstallButton' onClick={handleFreeShow}>{t('subscripe')}</button>}
                    </div>
                  </div>
                  <div className='FrameShape'>
                    <iframe src={Product_Info.YOUTUBE} title='Youtube'/>
                  </div>
                </div>
              </div>
              <div className='NavScroll'>
                <div className='NavHeader' ref={NavTabRef}>
                  <span className='Pricing active' onClick={(e) => {handleShowing(e, "FeaturedApp")}}>{t('FeaturedApp') }</span>
                  <span onClick={(e) => {handleShowing(e, "PlanandPricing")}} className='Pricing'>{t('PlanandPricing')}</span>
                  <span onClick={(e) => {handleShowing(e, "reviewApps")}} className='Pricing'>{t('reviewApps')}</span>
                  <span className='Pricing' onClick={(e) => {handleShowing(e, "RecommendedApps")}}>{t('RecommendedApps')}</span>
                </div>
              </div>
              <div className='row ContainerThirdBlock' ref={DescribeRef}>
                <div className='col-md-6 col-sm-12 RightSide'>
                  <div className='col-12'>
                    <h4 className='HeaderText'>{t('About the application')}</h4>
                  </div>
                  <div className='col-12 productDetail'>
                    <span className='paragrph'>{Product_Info?.PRODUCT_DETAIL}</span>
                  </div>
                </div>
                <div className='col-md-6 col-sm-12 CardContainerShow'>
                  <div className='CardContent'>
                    <div className='CardDetails'>
                      <div className='TwoCards'>
                      <div className='CardChild'>
                        <div className='EllipseOne'>
                          <img className='EllipseImg' src={Ellipse1} alt='#'/>
                          <img className='earth' src={earth} alt='#'/>
                        </div>
                        <div>
                          <h6>{t('Application Language')}</h6>
                          <p>{Product_Info?.PRODUCT_LANGUAGE}</p>
                        </div>
                      </div>
                      <div className='CardChild'>
                        <div className='EllipseOne'>
                          <img className='EllipseImg' src={Ellipse1} alt='#'/>
                          <img className='earth' src={star} alt='#'/>
                        </div>
                        <div>
                          <h6>{t('Rating')}</h6>
                          <p>({t('Rate')} {Product_Info?.RATING_COUNT}){Product_Info?.RATING_VALUE}</p>
                        </div>
                      </div>
                      </div>
                      <div className='col-md-12 cardMidChild'><h6>{t('technical support for application')} :</h6></div>
                      <div className='cardLastChild'>
                        <div className='CardChildLabel'>
                          <div>{t("Develper Email")} : </div>
                          <div className='dataChild'>{Product_Info?.EMAIL}</div>
                        </div>
                        <div className='CardChildLabel'>
                          <div>{t('WEBSITE')} : </div>
                          <div className='dataChild'>{Product_Info?.URL}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='Return' id='Return' onClick={Return}>
                <i className="bi bi-arrow-up-circle-fill"></i>
              </div>
              <div className="slider-container" style={{width: '735px', padding: '0px 50px 0px 0px', maxWidth: '100%'}}>
            {  Product_Image ? <Splide aria-label="My Favorite Images"   options={ {type: 'loop',direction:'rtl',  autoplay: true,  speed: 3000,
                    } }>
                        {  Product_Image.map((Image: any, Index: any)=> (
                  <SplideSlide key={Index}>
                  <div className='relepos'>
                  {Image && <img style={{width: '100%'}} src={require('../../Assets/Projects/'+Image.IMAGE) }className='opacity' alt="Image1"/>}
                  </div>
                  </SplideSlide>
                        )) }
                  </Splide> : ''}
              </div>
              <div className='ContainerPrice' ref={pricingPlanRef}>
                <div className='PriceHeader'>
                  <h4>{t('PlanandPricing')}</h4>
                  {UserProducts.length !== 0 ? 
                  <div className='activeProduct mt-5'>
                    <button className='InstallButton' onClick={() => OpenApp(Product_Info?.PRODUCT_URL)}>{t('launch to the application')}</button> 
                    <p>{Product_Info && Product_Info?.IS_USER_SUBSCRIBED_ONE}</p>
                  </div> :
                  productInfo && productInfo?.PRODUCT_INFO && productInfo?.PRODUCT_INFO[0].IS_FREE_Y_N ==='Y'?
                  <div style={{display:'flex'}}><i className="bi bi-gift-fill iconfree"></i> &nbsp;&nbsp;  <p>{t('This application is free')}</p></div>:<p>{t('develop your business')}</p>
                  }
                </div>
                <div className='ContentPrice'>
                {UserProducts.length === 0 && !Product_Info?.IS_USER_SUBSCRIBED_ONE && productInfo?.PRODUCT_INFO && productInfo?.PRODUCT_INFO[0].IS_FREE_Y_N === 'N' && PRODUCT_PLAN ? PRODUCT_PLAN.map((Product: any, Index: number) => ( 
                  <div key={Index} className='contentCardPrice'>
                    <div className='CardTop'>
                      <h4 className='PriceType'>{ localStorage.getItem('LANG') ==='en' ? Product?.PLAN_NAME_EN : Product?.PLAN_NAME_AR}</h4>
                      <h4 className='price'>{localStorage.getItem('LANG') ==='en' ? Product.PLAN_PRICE_TAG_EN : Product.PLAN_PRICE_TAG_AR}</h4>
                      <p>{localStorage.getItem('LANG') ==='en' ? Product?.PLAN_DESC_EN : Product?.PLAN_DESC_AR}</p>
                    </div>
                    <div className='CardMid'>
                    {PRODUCT_PLAN_DETAIL ? PRODUCT_PLAN_DETAIL?.map((Product: any, Index: number) => (
                      <div className='Plan_Detail' key={Index}>
                        <i className="bi bi-check-circle"></i>
                        <h6>{localStorage.getItem('LANG') === 'en' ? Product.PLAN_DETAIL_DESC_EN : Product.PLAN_DETAIL_DESC_AR}</h6>
                      </div>
                     )) : ''}
                    </div>
                    <div className='cardFooter'>
                      {Product?.PRICE_PER_MONTH !== 0 ?
                        <button onClick={()=>{setProductPricing({...Product, productName: product?.PRODUCT?.length && product?.PRODUCT[0]?.NAME_ONE, productName_Two:product?.PRODUCT?.length && product?.PRODUCT[0]?.NAME_TWO}); handleShow()}}>{t('subscripe')}</button> :                      
                        <button onClick={handleFreeShow}>{t('subscripe')}</button>
                      }
                    </div>
                  </div>
                  )) : ''}
                </div>
              </div>
              <div className='RatingandReview' ref={ReviewRef}>
                <div className='TextHeader'><h4 className='fw-bold'>{t('RatingandReview')}</h4></div>
                <div className='RatingReviewContent'>
                  <div className='ratingParent'>
                    <div className='averageRate'>
                      <h6>{t('Average app rating')}</h6>
                      <div className='starReview'>
                      {PRODUCT_STARS && PRODUCT_STARS.map((Review: any, Index: any) => (
                        Index < ReviewAverage &&
                        <span key={Index}><i className="bi bi-star-fill Yellow"></i></span>
                      ))}
                      </div>
                      <h6>({t('Rate')} {summation})</h6>
                    </div>
                      {PRODUCT_STARS && PRODUCT_STARS.map((Review: any, Index: any) => (
                    <div className='ratingDetails' key={Index}>
                      <div className='starReview'>
                        {Star_Record && Star_Record.map((star: any, Index: any) => (
                          <span key={Index}><i className={`bi bi-star-fill ${Review.STARS_LABEL >= star && 'Yellow'}`}></i></span>
                        ))}
                      </div>
                      <div className="progressBar"><ProgressBar now={Review?.STARS_VALUE} max={summation}/></div>
                      <h6>({Review?.STARS_VALUE})</h6>
                    </div>
                  ))}
                  </div>
                  <div className='review'>
                    {PRODUCT_COMMENT ? PRODUCT_COMMENT.map((Comment: any, Index: any) => (
                      <div className='reviewContent' key={Index}>
                        <div className='ReviewBody'>
                          <div className='rightCard'>
                            <div className='topCard'>
                              <h6>{Comment?.USER_NAME}</h6>
                              <div className="cardLabel">
                                <i className="bi bi-star-fill"></i>
                                <p>{Comment?.STARS}</p>
                              </div>
                            </div>
                            <h5>{Comment?.COMMENT_TEXT}</h5>
                          </div>
                          <div className='leftCard'>
                            <p>{Comment?.COMMENT_DATE}</p>
                          </div>
                        </div>
                      </div>
                    )) : ''}
                  </div>
                </div>
              </div>
              <section className='ContainerRecommend' ref={RecommendAppsRef}>
              <div className='HeaderTitleSection'>
                <h1 >{t(`RecommendProducts`)}</h1>
                <div className='leftHeaderSection'>
                  <h6 >{t(`All applications`)}</h6>
                  <span><i className="bi bi-chevron-left"></i></span>
                </div>
              </div>
                <div className="ContentRecommend">
                  <div className='moreDetail'>
                  {PRODUCT_RECOMMENDATION.length && PRODUCT_RECOMMENDATION.map((Product: any, Index: number) => (
                    <NavLink to={`/productDetails/${Product?.PRODUCT_ID}`} key={Index} onClick={handleLinkClick}>
                      <div className='col-md-3 col-sm-6 details'>
                          <div className="CardTop">
                            <div>
                                <img src={require('../../Assets/Projects/' + Product.PRODUCT_ICON)} alt="cloud"/>
                            </div>
                            <div className="leftSideCard">
                              <div className="cardLabel">
                                  <i className="bi bi-star-fill"></i>
                                  <p>{Product?.RATING_VALUE}</p>
                              </div>
                              <div className="cardLabel">
                                  <i className="bi bi-tags"></i>
                                  <p className="priceText">{Product?.PRICING_TAG}</p>
                              </div>
                            </div>
                          </div>
                          <h3>{Product?.PRODUCT_NAME}</h3>
                          <h6>{Product?.PRODUCT_DESC}</h6>
                      </div>
                    </NavLink>
                  ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        }
      </React.Fragment>
    );
}
 
export default ProductDetails;