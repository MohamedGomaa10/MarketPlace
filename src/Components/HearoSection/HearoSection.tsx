import React from 'react'

//icons
import { BiChevronRightCircle } from "react-icons/bi";

//image
import HearoBckg from "../../Assets/GradientBlue.png"
import Path from "../../Assets/Path.png"
import HearoImage from "../../Assets/hearoImage.png"

//css
import './HearoSection.css'
import { useTranslation } from 'react-i18next';

const HearoSection = () => {
    const { t } = useTranslation();

    return (
        <div className='hearo_section'>
            <div className="left">
                <h1>
                    {t(`hearoHeader`)}<br></br>{t(`hearoHeader2`)}
                </h1>
                <p>
                  {t(`hearoDesc`)} <br></br>{t(`hearoDesc2`)}
                </p>
                <ul>
                    <li>{t(`hearoStart`)}</li>
                    <li>{t(`hearoAppoint`)}<BiChevronRightCircle /></li>
                </ul>
            </div>
            <div className="right">
                <div style={{ height: '100%' }}>
                    <img className='bckground' src={HearoBckg} alt="hearobackground" />
                    <img className='arrow' src={Path} alt="Path" />
                    <img className='laptop' src={HearoImage} alt="hearoImage" />
                </div>
            </div>
        </div>
    )
}

export default HearoSection