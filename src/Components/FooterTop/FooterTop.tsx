import React from 'react'

//React Router
import { NavLink } from 'react-router-dom'

//css
import './FooterTop.css'
import { useTranslation } from 'react-i18next';
import logo2 from '../../Assets/Images/edited.png'
import PathRight from "../../Assets/pathRight.png"
const FooterTop = () => {
    const { t } = useTranslation();

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
    };

    return (
            <div className='d-flex align-items-center' style={{marginTop:"160px"}}>
                <div className='FooterImg'>
                    <img className='bckground d-none75' src={PathRight} alt="hearobackground" />
                </div>
                <div className='SutfMarket'>
                    <h1>{t('Your suggestions are important to us')}</h1>
                    <h5>{t('Experience retail in its modern')}</h5>
                    <div>
                        <NavLink to='/marketplace' onClick={handleLinkClick}>
                                <button type='button' className='InstallButton'>{t('Launch your store now')}</button>
                        </NavLink>
                    </div>
                </div>
                <div className='FooterImg'>
                    <img className='bckground d-none75' src={logo2} alt="hearobackground" />
                </div>
            </div>
    )
}

export default FooterTop