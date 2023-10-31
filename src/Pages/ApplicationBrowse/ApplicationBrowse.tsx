import React, {useEffect, useState} from 'react'

//translation
import { useTranslation } from 'react-i18next';

import { NavLink } from "react-router-dom";
import jwtDecode from "jwt-decode";

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

import { GetAllCategories, SelectCategories } from "../../Services/MasterStore/Reducers/CategorySlice";

import { GetAllPrdouctsProgram, SelectMarketProgram } from "../../Services/MasterStore/Reducers/MarketProgramSlice";

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
        const decodedToken = TokenData && jwtDecode<any>(TokenData);
        dispatch(GetAllPrdouctsProgram(decodedToken?.UserId));
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
                    <div className='card_section'>
                        {SearchValue ? SearchValue.map((Data: any, Index: any) => (
                            <NavLink to={`/browse-application-detail/${Data?.GUID}`} className={'Parent_A'} key={Index}>
                                <div className='Market_Statues' style={{background: `${Data?.MARKETER_STATUS === 'A' ? 'var(--icon-color)' : Data?.MARKETER_STATUS === 'E' ? '#d9534f' : '#FFAA00'}`}}><h6>{`${Data?.MARKETER_STATUS === 'A' ? t('active') : Data?.MARKETER_STATUS === 'E' ? t('Finished') : t('inactive')}`}</h6></div>
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
                                    <div className='actions'>
                                        <button>{localStorage.getItem("LANG") === "en"
                                            ? Data.CATEGORY_NAME_TWO
                                            : Data.CATEGORY_NAME_ONE}
                                        </button>
                                    </div>
                                </div>
                            </NavLink>
                        )) : 
                        <div>
                          <h3>{t('Subscription_management_main_title')}</h3>
                          <h5>{t('Subscription_management_sub_title')}</h5>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ApplicationBrowse;