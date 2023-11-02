import React, {FC, useEffect, useState} from 'react';

// Componant
import Nav from '../../Components/NavMenu/Nav';

// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form";

// Slices
import { UserSignIn, UserSignUp } from '../../Services/MasterStore/Reducers/UserSlice';

// React Router
import { useNavigate } from 'react-router-dom';

// Master Hooks
import { useAppDispatch } from '../../Services/MasterStore/MasterHook';

// Translation
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

// Google Account Login
// import Google from '../../Services/MasterStore/Actions/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import logoImage from '../../Assets/logo.png'

//Css
import './Login.css';
interface IForm {
    LOGIN_NAME : string,
    PASSWORD : string,
    PROJECT_TYPE_ID : number,
    LOGIN_TYPE_ID : string,
    Language : string
}
interface IFormSignUp {
    NAME_ONE : string;
    PASSWORD : string;
    EMAIL : string;
}

const Login:FC = () => {
    const { t } = useTranslation();
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [TermMessage, setTermMessage] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');
    const [Term, setTerm] = useState(false);
    const { register: registerSignIn, handleSubmit: handleSubmitSignIn } = useForm<IForm>();
    const { register: registerSignUp, handleSubmit: handleSubmitSignUp } = useForm<IFormSignUp>();
    const [Language] = useState( localStorage.LANG || "ar");
    const tabs = document.getElementsByClassName('tab');
    const loginElement = document.getElementById('login');
    const signupElement = document.getElementById('signup');
    const newState = localStorage.getItem('state')
    useEffect(() => {
        if (!localStorage.LANG) {
            localStorage.LANG = "ar";
        }
        const htmlRoot = document.querySelector("html") as HTMLElement;
        htmlRoot.setAttribute("dir", Language === "en" ? "ltr" : "rtl");
        htmlRoot.setAttribute("lang", Language === "en" ? "en" : "ar");
        i18next.changeLanguage(Language).then();
        if (loginElement && signupElement) {
            loginElement.style.display = 'block';
            signupElement.style.display = 'none';
        }   
    }, [Language, loginElement,signupElement]);

    const onSubmit: SubmitHandler<IForm> = ( data ) => {
        const Data: IForm = {LOGIN_NAME:data.LOGIN_NAME, PASSWORD:data.PASSWORD,  PROJECT_TYPE_ID: 1,LOGIN_TYPE_ID: "1",Language: localStorage.getItem('LANG') === 'en' ? 'TWO': 'ONE'}
        dispatch(UserSignIn({ Data, Navigate }));
    };

    const onSubmitSignUp: SubmitHandler<IFormSignUp> = ( data ) => {
        const Data: IFormSignUp = { NAME_ONE:data.EMAIL, PASSWORD:data.PASSWORD, EMAIL:data.EMAIL }

        if(Term){
            dispatch(UserSignUp({ Data, Navigate })).then((res) =>{
                setErrorMessage(res.payload.MESSAGE.MESSAGE );
                if(res.payload.MESSAGE.MESSAGE === ''){
                    const Data: IForm = {LOGIN_NAME:data.EMAIL, PASSWORD:data.PASSWORD,  PROJECT_TYPE_ID: 1,LOGIN_TYPE_ID: "1",Language: localStorage.getItem('LANG') === 'en' ? 'TWO': 'ONE'}
                    dispatch(UserSignIn({ Data, Navigate }));
                }
            });
            setTermMessage('');
        }else{
            setTermMessage('يجب أن توافق علي الشروط اولا');
        }
    };

    const classActiveTab = (e:any) =>{  
        setTermMessage('');
        for (let index = 0; index < tabs.length; index++) {
            tabs[index].classList.remove('active');            
        }
        if (e.target.hash === '#login') {            
            if (loginElement && signupElement) {
              loginElement.style.display = 'block';
              signupElement.style.display = 'none';
            }        
        }else{
            if (loginElement && signupElement) {
                loginElement.style.display = 'none';
                signupElement.style.display = 'block';
              }    
        }
        const parent = e.target.parentElement;
        parent.classList.add('active');
    }

    useEffect(() => {
        if (newState === 'new') {
            if (loginElement && signupElement) {
                loginElement.style.display = 'none';
                signupElement.style.display = 'block';
                document.getElementById('SIGINUP')?.classList.add('active')
                document.getElementById('LOGIN')?.classList.remove('active')
                localStorage.removeItem('state');
            }
        }
    }, [newState, loginElement, signupElement])

    const CheckTerm = (e: any) => {
        setTerm(e.target.checked);
    }

    return (
        <React.Fragment>
            <Nav/>
            <div className='mainSection'>
                <div className='row h-100'>
                    <div className='col-md-6'>
                        <div className='right-side'>
                            <div className="form">
                                <ul className="tab-group">
                                    <li id='SIGINUP' className="tab "><a href="#signup" onClick={(e) => { classActiveTab(e); }}>{t('SignUp')}</a></li>
                                    <li id='LOGIN' className="tab active"><a href="#login" onClick={(e) => { classActiveTab(e); }}>{t('LogIn')}</a></li>
                                </ul>
                                <div className="tab-content">
                                    <div id="signup">
                                        {/* <h1>{t('SignUpforFree')}</h1>*/}
                                        <form onSubmit={handleSubmitSignUp(onSubmitSignUp)}>
                                            <div className="field-wrap">
                                                <label>{t('EmailAddress')}<span className="req"></span></label>
                                                <input {...registerSignUp("EMAIL", { required: true })} placeholder={t('EmailAddress')} type="email" name='EMAIL' required autoComplete="off" />
                                                <h6 className='ErrorMessage'>{ErrorMessage}</h6>
                                            </div>
                                            <div className="field-wrap">
                                                <label>{t('SetAPassword')}<span className="req"></span></label>
                                                <input {...registerSignUp("PASSWORD", { required: true })} type="PASSWORD" placeholder={t('SetAPassword')} name='PASSWORD' required autoComplete="off" />
                                            </div>
                                            <div className='Term'>
                                                <input type="checkbox" name="terms" onChange={(e) => { CheckTerm(e) }} />
                                                <p>{t('readandaccept')}<a href='https://dev.aait.com.sa/DevPortal/Terms'>{t('term')}</a></p>
                                            </div>
                                            <button className="button button-block">{t('GetStarted')}</button>
                                            <h6 className='ErrorMessage'>{TermMessage}</h6>
                                        </form>
                                    </div>
                                    <div id="login">
                                        {/* <h1>{t('WelcomeBack')}</h1>*/}
                                        <form onSubmit={handleSubmitSignIn(onSubmit)}>
                                            <div className="field-wrap">
                                                <label> {t('EmailAddress')}<span className="req"></span> </label>
                                                <input {...registerSignIn("LOGIN_NAME", { required: true })} type={'email'} name='LOGIN_NAME' placeholder={t('EmailAddress')} required autoComplete="off" />
                                            </div>
                                            <div className="field-wrap">
                                                <label>{t('SetAPassword')}<span className="req"></span></label>
                                                <input {...registerSignIn("PASSWORD", { required: true })} name='PASSWORD' placeholder={t('SetAPassword')} type="password" required autoComplete="off" />
                                            </div>
                                            <div className='footerForm'>
                                                <p className="forgot"><a href="/">{t('ForgotPassword')}</a></p>
                                                <button className="button button-block">{t('LogIn')}</button>
                                            </div>
                                        </form>
                                        <br />
                                        <div className="App d-flex justify-content-center">
                                            <header className="App-header">
                                                {/* <GoogleOAuthProvider clientId="77207926742-87gcu7ts96gbh8qe1i9t3gt528mu8kt4.apps.googleusercontent.com">
                                            <Google />
                                        </GoogleOAuthProvider> */}
                                            </header>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="left_side">
                            <div className="content">
                                <figure >
                                    <img src={logoImage} alt="logo" />
                                    <figcaption id="figCoject">MarketPlace</figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='row marginTopSection'>
                <div className='col-md-6 d-flex justify-content-center hiddenElement'>
                    <img src={Semicolon} alt="Semicolon" />
                </div>
                <div className='col-md-6'>
                    <div className="form">
                    <ul className="tab-group">
                        <li className="tab "><a href="#signup" onClick={classActiveTab}>{t('SignUp')}</a></li>
                        <li className="tab active"><a href="#login" onClick={classActiveTab}>{t('LogIn')}</a></li>
                    </ul>                
                    <div className="tab-content">
                        <div id="signup">   
                            <h1>{t('SignUpforFree')}</h1>                            
                            <form onSubmit={handleSubmitSignUp(onSubmitSignUp)}>                              
                                <div className="field-wrap">
                                    <label>{t('EmailAddress')}<span className="req">*</span></label>
                                    <input {...registerSignUp("EMAIL", { required: true })} placeholder={t('EmailAddress')} type="email" name='EMAIL' required autoComplete="off"/>
                                </div>                            
                                <div className="field-wrap">
                                    <label>{t('SetAPassword')}<span className="req">*</span></label>
                                    <input {...registerSignUp("PASSWORD", { required: true })} type="PASSWORD" placeholder={t('SetAPassword')} name='PASSWORD' required autoComplete="off"/>
                                </div>                            
                                <button className="button button-block">{t('GetStarted')}</button>                            
                            </form>
                        </div>                    
                        <div id="login">   
                            <h1>{t('WelcomeBack')}</h1>                            
                            <form onSubmit={handleSubmitSignIn(onSubmit)}>                            
                                <div className="field-wrap">
                                    <label> {t('EmailAddress')}<span className="req">*</span> </label>
                                    <input {...registerSignIn("LOGIN_NAME", { required: true })} type={'email'} name='LOGIN_NAME' placeholder={t('EmailAddress')} required autoComplete="off"/>
                                </div>                            
                                <div className="field-wrap">
                                    <label>{t('SetAPassword')}<span className="req">*</span></label>
                                    <input {...registerSignIn("PASSWORD", { required: true })} name='PASSWORD' placeholder={t('SetAPassword')} type="password" required autoComplete="off"/>
                                </div>                            
                                <p className="forgot"><a href="/">{t('ForgotPassword')}</a></p>                            
                                <button className="button button-block">{t('LogIn')}</button>                            
                            </form>
                            <br/>
                            <div className="App d-flex justify-content-center">
                                <header className="App-header">                                    
                                    {/* <GoogleOAuthProvider clientId="77207926742-87gcu7ts96gbh8qe1i9t3gt528mu8kt4.apps.googleusercontent.com">
                                        <Google />
                                    </GoogleOAuthProvider> 
                                </header>
                            </div>
                        </div>                    
                    </div>
                </div>
                </div>                               
            </div> */}
            {/* <Footer /> */}
            
        </React.Fragment>
    )
}
 
export default Login;