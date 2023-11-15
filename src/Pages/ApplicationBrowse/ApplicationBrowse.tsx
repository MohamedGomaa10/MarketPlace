import React, {useEffect, useState} from 'react'

//translation
import { useTranslation } from 'react-i18next';

import { NavLink } from "react-router-dom";

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

import { GetAllCategories, SelectCategories } from "../../Services/MasterStore/Reducers/CategorySlice";

import { GetAllPrdouctsOffer, SelectMarketProgram } from "../../Services/MasterStore/Reducers/MarketProgramSlice";


//Image 
import NoOffers from "../../Assets/Projects/902e4ce2-877b-4460-b90c-63e847996e86.svg";

//css
import './ApplicationBrowse.css';

const ApplicationBrowse = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector(SelectCategories);
    const [SearchValue, setSearchValue] = useState<any>([]);
    const [CategoryCheck, setCategoryCheck] = useState<any>();
    const [TokenData] = useState(localStorage.getItem('token'));
    const [CategoryValue, setCategoryValue] = useState<any>([]);
    const { PrdouctsProgram } = useAppSelector(SelectMarketProgram);
    const ProductProgram = PrdouctsProgram && PrdouctsProgram.PRODUCT

    useEffect(() => {
        dispatch(GetAllPrdouctsOffer());
        dispatch(GetAllCategories());
    }, [dispatch, TokenData])

    useEffect(() => {
        if(CategoryCheck && Number(CategoryCheck) !== 0){
            setCategoryValue(
                ProductProgram.filter((Row: any) => {
                  return Row.CATEGORY_ID === Number(CategoryCheck);
                })
              );
              setSearchValue(
                ProductProgram.filter((Row: any) => {
                  return Row.CATEGORY_ID === Number(CategoryCheck);
                })
              );
        }else{
            setSearchValue(ProductProgram && ProductProgram);
            setCategoryValue(ProductProgram && ProductProgram);
        }
    }, [ProductProgram, CategoryCheck])

    // Search Action
    const Searching = (Event: any) => {
        CategoryValue &&
            setSearchValue(
                CategoryValue.filter((Row: any) => {
                    return Object.keys(Row).some((Column) => {
                        return (
                            Row[Column] &&
                            Row[Column].toString()
                                .toLowerCase()
                                .indexOf(Event.target.value.toLowerCase()) !== -1
                        );
                    });
                })
            );
    };

    const GetCategoryId = (e: any) => {
        setCategoryCheck(e.target.value);
    }

    return (
        <React.Fragment>
            <div className='containerBrowse_main' id='container_main'>
                <div className='containerBrowse_body'>
                    <div className='search_section'>
                        <div>
                            <h4>{t('Application Name')}</h4>
                            <div className="search">
                                <input type="text" className="InputSearch" placeholder={t('Search for Application')} onChange={Searching}/>
                                <i className="bi bi-search"></i>
                            </div>
                        </div>
                        <div>
                            <h4>{t('categories')}</h4>
                            <select className="form-select resultfilter" aria-label="Default select example" onChange={(e) => {GetCategoryId(e)}}>
                                {!!categories?.length
                                    && categories.map((Category: any, Index: number) => (
                                    <option value={Category?.CATEGORY_ID} key={Index}>
                                    {localStorage.getItem("LANG") === "en"
                                      ? Category.NAME_TWO
                                      : Category.NAME_ONE}
                                      </option>
                                    ))}
                            </select>
                        </div>
                        {/* <div>
                            <h4>{t('Fast currency stores')}</h4>
                            <button className='fast_currencies'>{t('Show fast currencies only')}</button>
                        </div>
                        <div>
                            <h4>{t('Influencer-only stores')}</h4>
                            <button className='Influencer-only'>{t('View stores dedicated to influencers')}</button>
                        </div> */}
                    </div>
                    {SearchValue ? <div className='card_section'>
                        {SearchValue && SearchValue.map((Data: any, Index: any) => (
                            <NavLink to={`/browse-application-detail/${Data?.GUID}`} className={'Parent_A'} key={Index}>
                                <div className='Market_Statues' style={{background: `${Data?.MARKETER_STATUS === 'A' ? 'var(--icon-color)' : Data?.MARKETER_STATUS === 'E' ? '#d9534f' : ''}`}}><h6>{`${Data?.MARKETER_STATUS === 'A' ? t('active') : Data?.MARKETER_STATUS === 'E' ? t('Finished') : ''}`}</h6></div>
                                <div className='card_content' >
                                    {Data?.PRODUCT_ICON ? <img src={require("../../Assets/Projects/" + Data.PRODUCT_ICON)} alt='#' /> : ''}
                                    <h1>{localStorage.getItem("LANG") === "en" ? Data.PRODUCT_NAME_TWO : Data.PRODUCT_NAME_ONE}</h1>
                                    <span className='COUPON_NAME'>{localStorage.getItem("LANG") === "en" ? Data?.COUPON_NAME_TWO : Data?.COUPON_NAME_ONE}</span>
                                    <div className='discount'>
                                        <div className='Discount_COMMISSION'>
                                            <h3>{t('Discount')}</h3>
                                            <h6>{Data?.DISCOUNT_AMOUNT} <span>{Data?.DISCOUNT_TYPE_P_V === 'V' ? t('Salary_Type') : '%'}</span></h6>
                                        </div>
                                        <div className='Discount_COMMISSION'>
                                            <h3>{t('COMMISSION')}</h3>
                                            <h6>{Data?.COMMISSION_AMOUNT}<span>{Data?.COMMISSION_TYPE_P_V === 'P' ? '%' : t('Salary_Type')}</span></h6>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='Cardactions'>
                                        <button>{localStorage.getItem("LANG") === "en"
                                            ? Data.CATEGORY_NAME_TWO
                                            : Data.CATEGORY_NAME_ONE}
                                        </button>
                                    </div>
                                </div>
                            </NavLink>
                        ))
                        }
                    </div> :
                    <div className='OfferImageNot'>
                        <img src={NoOffers} alt='#' />
                    </div>}   
                </div>
            </div>
        </React.Fragment>
    )
}

export default ApplicationBrowse;