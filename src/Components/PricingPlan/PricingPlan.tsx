import React, { useEffect, useState } from 'react'

//icons
import arrow from '../../Assets/arrow.svg'

// Master Hooks
import { useAppDispatch, useAppSelector } from '../../Services/MasterStore/MasterHook';

import { useNavigate, useParams } from 'react-router-dom';

// Slices
import {  SelectGlobalProduct, Selectproducts} from '../../Services/MasterStore/Reducers/ProductSlice';

//css
import './PricingPlan.css'
import { useTranslation } from 'react-i18next';

// const data = [
//     {
//         proPrice: 750,
//         businessPrice: 1450,
//     },
//     {
//         proPrice: 75,
//         businessPrice: 145,
//     }
// ]

const PricingPlan = () => {
    const { id } = useParams();
    const { t } = useTranslation()
    const dispatch = useAppDispatch();
    const [Index, setIndex] = useState(0)
    const { product } = useAppSelector(Selectproducts);
    //const [PricePlan, setPricePlan] = useState(data[Index]);
    const [Token] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(SelectGlobalProduct(Number(id)))
    }, [dispatch, id]);

    const handleMonth = (e:any) => {
        setIndex(1)
    }

    const handleAnnual = (e:any) => {
        setIndex(0)
    }

    // useEffect(() => {
    //     setPricePlan(data[Index])
    // }, [Index, product])

    const CheckOut = (pricingId: any) => {
        if (Token) {
            navigate(`/checkOut/${pricingId}/${id}`, { replace: true });
        }else{
            navigate('/login', { replace: true });
        }  
    }

    return (
        <React.Fragment>
            {                         
              !!product?.PRICING?.length && <section className='cpricing'>
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
                    {
                        product?.PRICING.map((pricing: any, Index: any) =>
                            <div className="plan  pro" key={Index}>
                                <h3> {pricing.NAME_ONE} <span>{t(`mostPopular`)}</span></h3>
                                <p>{t(`proDesc`)}</p>
                                <button className='inline' onClick={() => CheckOut(pricing.PRODUCT_PRICING_ID)}>{t(`startNow`)}</button>
                                <h3 className="price">${pricing.MONTHS < 12 ? pricing.PRICE_PER_MONTH : (pricing.PRICE_PER_MONTH * 12)}<span>/{pricing.MONTHS < 12 ? t(`month`) : t(`year`)}</span></h3>
                                <ul>
                                    <li>{t(`5users`)}</li>
                                    <li>{t(`unlimitedProject`)}</li>
                                    <li>{t(`5active`)}</li>
                                    <li>{t(`archiveProject`)}</li>
                                    <li>Dev Ops</li>
                                </ul>
                            </div>
                        )}
                    {/* <div className="plan ">
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
                    </div> */}
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
             }
        </React.Fragment>
    )
}

export default PricingPlan