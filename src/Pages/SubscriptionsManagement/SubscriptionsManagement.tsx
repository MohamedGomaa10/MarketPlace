import React, {FC, useEffect, useState } from 'react';

//translation
import { useTranslation } from 'react-i18next';

// Master Hooks
import { useAppDispatch, useAppSelector } from '../../Services/MasterStore/MasterHook';
import { NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { SelectUserSubscription, SelectUserProducts } from '../../Services/MasterStore/Reducers/UserProductSlice';

//css
import './SubscriptionsManagement.css';
const SubscriptionsManagement:FC = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
	const [Token] = useState(localStorage.getItem('token'));
    const { userSubscriptions } = useAppSelector(SelectUserProducts);

    useEffect(() => {
		const decodedToken = Token && jwtDecode<any>(Token);
		dispatch(SelectUserSubscription(decodedToken?.UserId));
	}, [dispatch, Token]);

    const formatDate = (dateString: any) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
	  };

    const OpenApp = (Url:string) =>{
      window.open(Url, "_blank", "noreferrer");
      }

    return (
      <React.Fragment>
        <div className='Container'>
            <div className="ContainerHeader">
                <div className='TextHeader'>
                    <div className='LinksHeader'>
                        <div className='Links_Details'>
                          <NavLink to={'/'}>
                              <h4>{t('Application Market')}</h4>
                          </NavLink>
                          <h5>/ {t('subscription')}</h5>
                        </div>
                    </div>
                </div>
                <div className='ContainerHeaderActions'>
                    <button className='helper'>{t('Help Center')}</button>
                    <NavLink to={'/MarketPlace'}>
                            <button className='activeBrowse'>{t('Application Browse')}</button>
                    </NavLink>
                </div>
            </div>
            <div className="cContainer">
              <div className="row">
                {!!userSubscriptions.length ?
                  userSubscriptions.map((Product: any, Index: number) => (
                    <div className="col-md-4" key={Index}>
                      <div className="Details">
                        <div className="DetailsHeader">
                          <div className="prdouctImage">
                          {Product?.PRODUCT_ICON && <img src={require('../../Assets/Projects/' +Product?.PRODUCT_ICON)} alt="cloud"/>}
                          </div>
                          <div className="ProductHeader">
                            <h5>{localStorage.getItem("LANG") === "en" ? Product?.PRODUCT_NAME_TWO : Product?.PRODUCT_NAME_ONE}</h5>
                            <h6>{t('development')} : {localStorage.getItem("LANG") === "en" ? Product?.PUBLISHER_NAME_TWO : Product?.PUBLISHER_NAME_ONE}</h6>
                          </div>
                        </div>
                        <div className="priceTag">
                            <div className="active"><h6>{t('active')}</h6></div>
                            <div className="salaryType">
                            <i className="bi bi-tags"></i>
                            <p>{localStorage.getItem("LANG") === "en" ? Product?.PRICING_TAG_TWO : Product?.PRICING_TAG_ONE}</p>
                            </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="d-flex gap-2">
                            <span><i className="bi bi-calendar-event"></i></span>
                            <span>{t('Subscription Start')}</span>
                            </div>
                            <h6>{Product?.VALID_FROM ? formatDate(Product?.VALID_FROM) : ''}</h6>
                          </div>
                          <div className="col-md-4">
                            <div className="d-flex gap-2">
                              <span><i className="bi bi-calendar-x"></i></span>
                              <span>{t('Subscription End')}</span>
                            </div>
                            <h6>{Product?.VALID_TO ? formatDate(Product?.VALID_TO) : ''}</h6>
                          </div>
                        </div>
                        <div className="col-md-12"><h5>{t('Technical_support')}</h5></div>
                        <div className='cardSupport'>
                            <div className='row'>
                              <div className='col-6'>{t('Develper Email')} :</div>
                              <div className='col-6 dataSupport'>{Product?.EMAIL}</div>
                            </div>
                            <div className='row'>
                              <div className='col-6'>{t('WEBSITE')} :</div>
                              <div className='col-6 dataSupport'>{Product?.URL}</div>
                            </div>
                          </div>
                          <div className="row d-flex justify-content-end ContainerActions">
                            <div className="col-md-4 reviewButton">
                              <button>{t('app rating')}</button>
                            </div>
                            <div className="col-md-4 activeAppButton">
                              <button onClick={() => OpenApp(Product.PRODUCT_URL)}>{t('Go to the application')}</button>
                            </div>
                          </div>
                      </div>
                    </div>
                  ))
                  :
                  <div>
                    <h3>{t('Subscription_management_main_title')}</h3>
                    <h5>{t('Subscription_management_sub_title')}</h5>
                  </div>}
              </div>
            </div>
        </div>
      </React.Fragment>
    );
}

export default SubscriptionsManagement;