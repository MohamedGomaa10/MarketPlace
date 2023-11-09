import React, { useEffect, useState } from 'react'

//React Router
import { NavLink } from 'react-router-dom'

// Translation
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

// React Router
import { useNavigate } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';

// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form";

import { useCookies } from 'react-cookie';

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

import { CheckMarkterJoinSlice, SelectMarketProgram, CreateJoinMarketSlice } from "../../Services/MasterStore/Reducers/MarketProgramSlice";

//icons
import { GrLanguage } from "react-icons/gr";
import jwtDecode from "jwt-decode";

//image
import Logo from "../../Assets/logo.png"
import ArLogo from "../../Assets/arLogo.png"

//css
import "./Nav.css"

interface CreateApplyDiscountInterface {
    ORDER_GUID: string,
    CODE: string,
    LANG: string,
}

const Nav = () => {
    const { t } = useTranslation();
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
     const [cookies] = useCookies(['JwtInfo']);
     const [cookiesInfo] = useCookies(['UserInfo']);
	const { register: FormDiscount, handleSubmit: handleFormDiscount } = useForm<CreateApplyDiscountInterface>();
    const { CheckMarkterJoin, MarkterJoin } = useAppSelector(SelectMarketProgram);
    const [ShowNav, setShowNav] = useState(false)
    const [FreeShow, setFreeShow] = useState(false);
    const [ShowActions, setShowActions] = useState(false)
    const [SubscribeShow, setSubscribeShow] = useState(false);
    const [Language, setLanguage] = useState(localStorage.LANG || "ar");
    const [Token, setToken] = useState(!!localStorage.token || false);
    const [TokenData] = useState(localStorage.getItem('token'));

    useEffect(() => {
    localStorage.setItem('token', JSON.stringify(cookies?.JwtInfo.ACCESS_TOKEN));
    localStorage.setItem('USER_NAME', JSON.stringify(cookiesInfo?.UserInfo.USER_NAME));
    localStorage.setItem('USER_NAME_TWO', JSON.stringify(cookiesInfo?.UserInfo.USER_NAME_TWO));
    localStorage.setItem('USER_NAME_ONE', JSON.stringify(cookiesInfo?.UserInfo.USER_NAME_ONE));
    localStorage.setItem('PROFILE_IMAGE', JSON.stringify(cookiesInfo?.UserInfo.PROFILE_IMAGE));
      }, [cookies, cookiesInfo]);

    const handleFreeClose = () => setFreeShow(false);
    const handleFreeShow = () => {
        if(CheckMarkterJoin === 'N' ){
            Navigate('/marketing-home', { replace: true })
          }else{
              setFreeShow(true);
          }
    };

    const LanguageHandling = (e:any) => {
        if (Language === 'ar') {
            setLanguage('en')
            localStorage.LANG = 'en';
        } else {
            setLanguage('ar');
            localStorage.LANG = 'ar';
        }
        setShowNav(false)
    };

    useEffect(() => {
        if (!localStorage.LANG) {
            localStorage.LANG = "ar";
        }
        const htmlRoot = document.querySelector("html") as HTMLElement;
        htmlRoot.setAttribute("dir", Language === "en" ? "ltr" : "rtl");
        htmlRoot.setAttribute("lang", Language === "en" ? "en" : "ar");
        i18next.changeLanguage(Language).then();
        setToken(!!localStorage.token);
    }, [Language]);

    const handleShow = (type: any) => {
        setShowNav(!ShowNav);
        if(type === 'Links'){
            setShowActions(true);
        }else{
            setShowActions(!ShowActions);
        }
        window.scrollTo(0, 0);
    }

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    const LoGout =() =>{
        localStorage.clear();
        Navigate('/', { replace: true })
        window.location.reload();
    }

    useEffect(() => {
        const decodedToken = TokenData && jwtDecode<any>(TokenData);
        const payload =  {
            USER_ID: decodedToken?.UserId,
            LANG: localStorage.getItem('LANG') === 'en' ? "TWO" : "ONE"
          }
          dispatch(CheckMarkterJoinSlice(payload));
      }, [TokenData, Token, dispatch]);

      const JoinMarket: SubmitHandler<CreateApplyDiscountInterface> = ( data ) => {
        const decodedToken = TokenData && jwtDecode<any>(TokenData);
        const payload =  {
            REFERRAL_CODE: data?.CODE,
            USER_ID: decodedToken?.UserId,
            LANG: localStorage.getItem('LANG') === 'en' ? "TWO" : "ONE"
          }
          if(CheckMarkterJoin === 'N' ){
            Navigate('/marketing-home', { replace: true })
          }else{
            dispatch(CreateJoinMarketSlice(payload)).then((res) => {
                if (res.payload.MESSAGE.MESSAGE === '') {
                    Navigate('/marketing-home', { replace: true });
                }else{
                    setFreeShow(false);
                    setSubscribeShow(!SubscribeShow);
                }
            })
          }
      }

    return (
        <React.Fragment>
            <div className='ParentNav'>
                <Modal aria-labelledby="contained-modal-title-vcenter"
                    centered show={FreeShow} onHide={handleFreeClose} className='col-md-6'>
                    <Modal.Header>
                        <div className='GenerateCouponModal'>
                            <form onSubmit={handleFormDiscount(JoinMarket)} className='form_JoinMarket'>
                                <Modal.Title as={() => { return <h4 className='fw-bold'>{t('برنامج التسويق بالعمولة')}</h4>; }} />
                                <Modal.Title as={() => {
                                    return <div className='actionsGenerateCoupon'>
                                        <label>رمز الاحالة</label>
                                        <input {...FormDiscount("CODE")} className="INPUT_CODE" />
                                    </div>
                                }} />
                                <Modal.Title as={() => {
                                    return <div className='actionsGenerateCoupon'>
                                        <button className='Back' onClick={handleFreeClose}>{t('No, Back')}</button>
                                        <button className='GenerateCoupon'>{t('الالتحاق بالبرنامج')}</button>
                                    </div>
                                }} />
                            </form>
                        </div>
                    </Modal.Header>
                </Modal>
                <Modal aria-labelledby="contained-modal-title-vcenter"
                    centered show={SubscribeShow} className='col-md-6'>
                    <Modal.Header>
                        <div className='FreeModal subscribeModal'>
                            <Modal.Title as={() => { return MarkterJoin.MESSAGE.MESSAGE === '' ? <i className="bi bi-check-circle"></i> : <i className="bi bi-x-circle"></i>; }} />
                            <Modal.Title as={() => { return <h4 className='fw-bold'>{MarkterJoin.MESSAGE.MESSAGE === '' ? 'تم إضافة الكوبون بنجاح' : MarkterJoin.MESSAGE.MESSAGE}</h4>; }} />
                            <Modal.Title as={() => {
                                return <div>
                                    <div className='actionsFree'>
                                        <button className='Close' onClick={() => setSubscribeShow(!SubscribeShow)}>{t('Close')}</button>
                                    </div>
                                </div>
                            }} />
                        </div>
                    </Modal.Header>
                </Modal>
                <nav className='active'>
                    <div className={`NAVDEtail`}>
                        <div className='NavChild'>
                            <NavLink to='/' onClick={handleLinkClick} >
                                <img src={`${Language === "ar" ? ArLogo : Logo}`} alt="logo" onClick={() => setShowNav(false)} />
                            </NavLink>
                        </div>
                        <div className='shape' onClick={() => { handleShow('Actions') }}>
                            <h3>{localStorage.getItem('LANG') === 'en' ? localStorage.getItem('USER_NAME_TWO') ? localStorage.getItem('USER_NAME_TWO') : '' : localStorage.getItem('USER_NAME_ONE') ? localStorage.getItem('USER_NAME_ONE') : ''}</h3>
                            <img src={`https://dev.aait.com.sa/ProfileImageHandler/ProfileImage/${localStorage.getItem('PROFILE_IMAGE') ? localStorage.getItem('PROFILE_IMAGE') : ''}}/${localStorage.getItem('USER_NAME') ? localStorage.getItem('USER_NAME') : ''}}`} alt="logo" />
                            <div className={`actions ${ShowActions ? 'showaction' : 'hiddenaction'}`}>
                                <div className='lang' onClick={LanguageHandling}>
                                    <div>{localStorage.getItem('LANG') === 'ar' ? 'En' : 'Ar'}</div>
                                    <div><GrLanguage /></div>
                                </div>
                                {!Token && <ul>
                                    <li>
                                        <NavLink to='/login' onClick={handleShow}>
                                            {t('signIn')}
                                        </NavLink>
                                    </li>
                                    <li >
                                        <NavLink to='/login#signup' onClick={() => localStorage.setItem('state', 'new')}>
                                            <button>{t(`tryFree`)}</button>
                                        </NavLink>
                                    </li>
                                </ul>}
                                {Token ? <ul>
                                    <NavLink to='/profile' onClick={handleShow}>
                                        {localStorage.getItem('LANG') === 'en' ? localStorage.getItem('USER_NAME_TWO') ? localStorage.getItem('USER_NAME_TWO') : '' : localStorage.getItem('USER_NAME_ONE') ? localStorage.getItem('USER_NAME_ONE') : ''}
                                    </NavLink>
                                </ul> : ''}
                                {Token ? <ul>
                                    <NavLink to='/subscriptionsManagement' onClick={handleShow}>
                                        {t('Subscription management')}
                                    </NavLink>
                                </ul> : ''}

                                {Token ? <ul>
                                    <div onClick={handleFreeShow} className='MarketShop'>
                                        <i className="bi bi-shop"></i>
                                    </div>
                                </ul> : ''}
                                {Token && <ul>
                                    <li onClick={LoGout}>
                                        {t('LogOut')}
                                    </li>
                                </ul>}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </React.Fragment>       
    )
}

export default Nav