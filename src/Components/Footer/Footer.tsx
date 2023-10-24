import React, { useEffect, useState } from 'react'

//React Router
import { NavLink } from 'react-router-dom'

// Translation
import i18next from 'i18next';

//images
import logo from '../../Assets/logo.png'

//icons
import { SiInstagram } from 'react-icons/si';
import { FaFacebookF } from 'react-icons/fa';
import { GrTwitter } from 'react-icons/gr';
import { GrLanguage } from "react-icons/gr";

//css
import './Footer.css'
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation()
    const [Language, setLanguage] = useState(
        localStorage.LANG || "ar"
    );
    const LanguageHandling = (e:any) => {
        if (Language === 'ar') {
            setLanguage('en')
            localStorage.LANG = 'en';
        } else {
            setLanguage('ar');
            localStorage.LANG = 'ar';
        }
    };
    useEffect(() => {
        if (!localStorage.LANG) {
            localStorage.LANG = "ar";
        }
        const htmlRoot = document.querySelector("html") as HTMLElement;
        htmlRoot.setAttribute("dir", Language === "en" ? "ltr" : "rtl");
        htmlRoot.setAttribute("lang", Language === "en" ? "en" : "ar");
        i18next.changeLanguage(Language).then();
    }, [Language]);
    return (
        <>
            <footer>
                <div className="logo">
                    <NavLink to='/' >
                        <img src={logo} alt="logo" />
                    </NavLink>
                </div>
                <div className="links">
                    <ul>
                        <li>
                            <NavLink to='/why-us' >
                                {t(`whuUs`)}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/features' >
                                {t(`features`)}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/pricing' >
                                {t(`pricing`)}
                            </NavLink>
                        </li>
                        <li> {t(`guide`)}</li>
                        <li>{t(`community`)}</li>
                    </ul>
                </div>
                <div className="social">
                    <ul>
                        <li> <SiInstagram /> </li>
                        <li> <FaFacebookF /> </li>
                        <li> <GrTwitter /> </li>
                    </ul>
                </div>
            </footer>
            <div className="footer_bottom">
                <p>{t(`coby`)} {new Date().getFullYear()} &copy; </p>
                <ul>
                    <li onClick={LanguageHandling} >
                        {localStorage.LANG === 'ar' ? "English" : "العربية"}
                        <GrLanguage />
                    </li>
                    <li>{t(`terms`)}</li>
                    <li>{t(`privacy`)}</li>
                </ul>
            </div>
        </>
    )
}

export default Footer