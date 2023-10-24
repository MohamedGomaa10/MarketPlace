import React, { useEffect, useState } from 'react'

//icons
import arrow from '../../Assets/arrow.svg'

//css
import './Pricing.css'
import { useTranslation } from 'react-i18next';

const data = [
    {
        proPrice: 750,
        businessPrice: 1450,
    },
    {
        proPrice: 75,
        businessPrice: 145,
    }
]

const Pricing = () => {
    const { t } = useTranslation()
    const [Index, setIndex] = useState(0)
    const [PricePlan, setPricePlan] = useState(data[Index])

    const handleMonth = (e:any) => {
        setIndex(1)
    }

    const handleAnnual = (e:any) => {
        setIndex(0)
    }

    useEffect(() => {
        setPricePlan(data[Index])
    }, [Index])

    return (
        <section className='cpricing'>
            <h2>{t(`pricing`)}</h2>
            <div className="pricing_type">
                <span>{t(`save15`)}</span>
                <ul>
                    <li>
                        <button className={`${Index === 1 && 'inline'}`} onClick={handleMonth}>{t(`monthly`)}</button>
                    </li>
                    <li>
                        <button className={`${Index === 0 && 'inline'}`} onClick={handleAnnual}>{t(`annual`)}</button>
                    </li>
                </ul>
            </div>
            <div className="plan_container">
                {/* <div className="row"> */}
                <div className="plan ">
                    <h3>{t(`basic`)}</h3>
                    <p>{t(`basicDesc`)}</p>
                    <button>{t(`startNow`)}</button>
                    <h3 className="price">{t(`free`)}</h3>
                    <ul>
                        <li>{t(`oneUser`)}</li>
                        <li>{t(`unlimitedProject`)}</li>
                        <li>{t(`oneProject`)}</li>
                        <li>{t(`archiveProject`)}</li>
                    </ul>
                </div>
                <div className="plan  pro">
                    <h3> {t(`pro`)} <span>{t(`mostPopular`)}</span></h3>
                    <p>{t(`proDesc`)}</p>
                    <button className='inline'>{t(`startNow`)}</button>
                    <h3 className="price">${PricePlan.proPrice}<span>/{t(`year`)}</span></h3>
                    <ul>
                        <li>{t(`5users`)}</li>
                        <li>{t(`unlimitedProject`)}</li>
                        <li>{t(`5active`)}</li>
                        <li>{t(`archiveProject`)}</li>
                        <li>Dev Ops</li>
                    </ul>
                </div>
                <div className="plan ">
                    <h3>{t(`business`)}</h3>
                    <p>{t(`businessDesc`)}</p>
                    <button>{t(`startNow`)}</button>
                    <h3 className="price">${PricePlan.businessPrice}<span>/{t(`year`)}</span></h3>
                    <ul>
                        <li>{t(`10users`)}</li>
                        <li>{t(`unlimitedProject`)}</li>
                        <li>{t(`100activePr`)}</li>
                        <li>{t(`archiveProject`)}</li>
                        <li>Dev Ops</li>
                        <li>{t(`cojectPms`)}</li>
                    </ul>
                </div>
                <div className="plan  enterprise">
                    <h3>{t(`enterprise`)}</h3>
                    <p>{t(`enterpriseDesc`)}</p>
                    <button>{t(`contactUs`)}</button>
                    <ul>
                        <li>{t(`unlimitedUser`)}</li>
                        <li>{t(`unlimitedProject`)}</li>
                        <li>{t(`unlimitedActive`)}</li>
                        <li>{t(`archiveProject`)}</li>
                        <li>Dev Ops</li>
                        <li>{t(`cojectPms`)}</li>
                        <li>{t(`prioritySupport`)}</li>
                    </ul>
                </div>
                {/* </div> */}
                
            </div>
            <div className="compare">
                <ul>
                    <li>
                        <div className="text">{t(`compareFeature`)}</div>
                        <div className="icon">
                            <img src={arrow} alt="" />
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Pricing