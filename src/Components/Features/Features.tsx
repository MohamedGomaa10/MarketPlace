import React from 'react'

//icons
import { BiChevronRightCircle } from 'react-icons/bi'

//images
import Cloud from '../../Assets/cloud.png'
import tool from '../../Assets/toolbox.png'
import roles from '../../Assets/roles.png'
import debug from '../../Assets/debug.png'
import automation from '../../Assets/automation.png'
import teamwork from '../../Assets/team.png'

// css
import './Features.css'
import { useTranslation } from 'react-i18next';

const Features = () => {
    const { t } = useTranslation()
    return (
        <section className='cfeatures'>
            <div className="header">
                <h2> {t(`keyFeatures`)}</h2>
                <p> {t(`featureDesc`)} </p>
                <a href="/">
                    {t(`learnMore`)} <BiChevronRightCircle />
                </a>
            </div>
            <div className="container">
                <div className="row">
                    <div className='item_container col-md-6'>
                        <div className="item">
                            <div className="img_header">
                                <img src={Cloud} alt="cloud" />
                            </div>
                            <div className="content">
                                <h3> {t(`cloud`)}</h3>
                                <p>{t(`cloudDesc`)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='item_container col-md-6'>
                        <div className="item">
                            <div className="img_header">
                                <img src={tool} alt="cloud" />
                            </div>
                            <div className="content">
                                <h3> {t(`toolBox`)}</h3>
                                <p>{t(`toolDesc`)} </p>
                            </div>
                        </div>
                    </div>
                    <div className='item_container col-md-6'>
                    <div className="item">
                        <div className="img_header">
                            <img src={roles} alt="cloud" />
                        </div>
                        <div className="content">
                            <h3> {t(`roles`)} <span>beta</span></h3>
                            <p>{t(`rolesDesc`)}</p>
                        </div>
                    </div>
                    </div>
                    <div className='item_container col-md-6'>
                        <div className="item">
                            <div className="img_header">
                                <img src={debug} alt="cloud" />
                            </div>
                            <div className="content">
                                <h3>{t(`instant`)}</h3>
                                <p>{t(`instantDesc`)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='item_container col-md-6'>
                        <div className="item">
                            <div className="img_header">
                                <img src={automation} alt="cloud" />
                            </div>
                            <div className="content">
                                <h3>{t(`automation`)}</h3>
                                <p>{t(`automationDesc`)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='item_container col-md-6'>
                        <div className="item">
                            <div className="img_header">
                                <img src={teamwork} alt="cloud" />
                            </div>
                            <div className="content">
                                <h3>{t(`teamWork`)}</h3>
                                <p>{t(`teamWorkDesc`)}</p>
                            </div>
                        </div>
                    </div>
                </div>                                
            </div>
        </section>
    )
}

export default Features