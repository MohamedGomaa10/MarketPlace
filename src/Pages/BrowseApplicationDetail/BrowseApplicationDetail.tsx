import React, { useState, useEffect } from "react";

//translation
import { useTranslation } from "react-i18next";

import { NavLink, useParams } from "react-router-dom";

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

import jwtDecode from 'jwt-decode';

import Modal from 'react-bootstrap/Modal';

import { CreateGenerateCouponSlice, GetOneProductProgram, SelectMarketProgram } from "../../Services/MasterStore/Reducers/MarketProgramSlice";

//css
import "./BrowseApplicationDetail.css";

const BrowseApplicationDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [FreeShow, setFreeShow] = useState(false);
  const { PrdouctProgram } = useAppSelector(SelectMarketProgram);
  const [MessageShow, setMessageShow] = useState('');
  const [SubscribeShow, setSubscribeShow] = useState(false);
  const [Token] = useState(localStorage.getItem('token'));

  const DATA_INFO = PrdouctProgram && PrdouctProgram?.PRODUCT && PrdouctProgram?.PRODUCT[0];

  const GenerateCoupon = () => {
    const decodedToken = Token && jwtDecode<any>(Token);
    const payload =  {
      GUID: id,
      USER_ID: decodedToken?.UserId,
      LANG: localStorage.getItem("LANG") === "en" ? "TWO" : "ONE"
    }
    dispatch(CreateGenerateCouponSlice(payload)).then((res) => {
      setMessageShow(res?.payload.MESSAGE.MESSAGE);
      setSubscribeShow(!SubscribeShow);
      setFreeShow(false);
    });
  }

  const handleFreeClose = () => setFreeShow(false);
  const handleFreeShow = () => setFreeShow(true);

  useEffect(() => {
    dispatch(GetOneProductProgram(id))
  }, [dispatch, id])

  return (
    <React.Fragment>
      <div className="BrowseApplicationDetail" id="container_main">
        <Modal aria-labelledby="contained-modal-title-vcenter"
          centered show={FreeShow} onHide={handleFreeClose} className='col-md-6'>
          <Modal.Header>
            <div className='GenerateCouponModal'>
              <Modal.Title as={() => { return <i className="bi bi-arrow-right-circle-fill"></i>; }} />
              <Modal.Title as={() => { return <h4 className='fw-bold'>{t('هل تريد إرسال طلب ؟')}</h4>; }} />
              <Modal.Title as={() => {
                return <div>
                  <div className='actionsGenerateCoupon'>
                    <button className='GenerateCoupon' onClick={GenerateCoupon}>{t('CONFIRM')}</button>
                    <button className='Back' onClick={handleFreeClose}>{t('No, Back')}</button>
                  </div>
                </div>
              }} />
            </div>
          </Modal.Header>
        </Modal>
        <Modal aria-labelledby="contained-modal-title-vcenter"
          centered show={SubscribeShow} className='col-md-6'>
          <Modal.Header>
            <div className='FreeModal subscribeModal'>
              <Modal.Title as={() => { return MessageShow === '' ? <i className="bi bi-check-circle"></i> : <i className="bi bi-x-circle"></i>; }} />
              <Modal.Title as={() => { return <h4 className='fw-bold'>{MessageShow === '' ? 'تم إضافة الكوبون بنجاح' : MessageShow}</h4>; }} />
              <Modal.Title as={() => {
                return <div>
                  <div className='actionsFree'>
                    <button className='Close' onClick={() => setSubscribeShow(!SubscribeShow)}>{t('Close')}</button>
                  </div>
                </div>
              }} />
            </div>
          </Modal.Header>
        </Modal>
        <div className="container_body">
          <div className="headerTitle">
            <NavLink to={"/application-browse"}>
              <div className="arrowBack">
                <i className="bi bi-arrow-right"></i>
              </div>
            </NavLink>
            <h1>{t('Offer_Details')}</h1>
          </div>
          <div className="contentBody">
            <div className="cardDetails appDetails">
              <div className="row">
                <p className="title">{t('Application Name')}</p>
                <p className="details">{localStorage.getItem("LANG") === "en" ? DATA_INFO?.PRODUCT_NAME_TWO : DATA_INFO?.PRODUCT_NAME_ONE}</p>
              </div>
              <div className="row">
                <p className="title">{t('Offer Name')}</p>
                <p className="details">{localStorage.getItem("LANG") === "en" ? DATA_INFO?.COUPON_NAME_TWO : DATA_INFO?.COUPON_NAME_ONE}</p>
              </div>
              <div className="row">
                <p className="title">{t('Description')}</p>
                <p className="details">
                  {localStorage.getItem("LANG") === "en" ? DATA_INFO?.PROMOTIONAL_DESCR_TWO : DATA_INFO?.PROMOTIONAL_DESC_ONE}
                </p>
              </div>
            </div>
            <div className="cardDetails couponDetail">
              <div className="cardChild">
                <div className="cardText textTitle">
                  <span>{t("Discount Type")}</span>
                </div>
                <div className="cardText textValue">
                  <span className="price">{DATA_INFO?.DISCOUNT_TYPE_P_V}</span>
                </div>
              </div>
              <div className="cardChild">
                <div className="cardText textTitle">
                  <span>{t("Discount Amount")}</span>
                </div>
                <div className="cardText textValue">
                  <span className="price">{DATA_INFO?.DISCOUNT_AMOUNT}</span>
                  <span className="currency">{t("Salary_Type")}</span>
                </div>
              </div>
              <div className="cardChild">
                <div className="cardText textTitle">
                  <span>{t("COMMISSION TYPE")}</span>
                </div>
                <div className="cardText textValue">
                  <span className="price">{DATA_INFO?.COMMISSION_TYPE_P_V}</span>
                </div>
              </div>
              <div className="cardChild">
                <div className="cardText textTitle">
                  <span>{t("COMMISSION Amount")}</span>
                </div>
                <div className="cardText textValue">
                  <span className="price">{DATA_INFO?.COMMISSION_AMOUNT}</span>
                  <span className="currency">{t("Salary_Type")}</span>
                </div>
              </div>
            </div>
            <div className="cardDetails usesDetails">
              <div className="UsesContent">
                <div className="UsesContentDetails">
                    <p className="title">{t("MAX_USAGE")}</p>
                    <p className="currency title">{DATA_INFO?.MAX_USAGE === 0 ? t('Unlimited') : DATA_INFO?.MAX_USAGE}</p>
                </div>
                <div className="UsesContentDetails">
                    <p className="title">{t("CUSTOMER_USAGE_LIMIT")}</p>
                    <p className="currency title">{DATA_INFO?.CUSTOMER_USAGE_LIMIT === 0 ? t('Unlimited') : DATA_INFO?.CUSTOMER_USAGE_LIMIT}</p>
                </div>
                <div className="UsesContentDetails">
                    <p className="title">{t("CODE")}</p>
                    <p className="currency title">{DATA_INFO?.CODE}</p>
                </div>
              </div>
            </div>
            <div className="cardDetails linkDetails">
              <div className="row">
                <div className="col-md-12">
                  <div>
                    <p className="title">{t('Marketing video and photo links')}</p>
                  </div>
                  <div>
                    <p className="link title">{DATA_INFO?.MARKETING_LINKS}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="cardDetails storeDetails">
              <p className="storeTitle">{t("Developer Information")}</p>
              <div className="row">
                  <div className="storeSections col-md-3">
                    <div className="icon">
                      <i className="bi bi-dash-square"></i>
                    </div>
                    <div className="content">
                      <div>
                        <p className="title">{t("Platform application")}</p>
                      </div>
                      <div>
                        <p className="subTitle">{t("Coject")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="storeSections col-md-3">
                    <div className="icon">
                      <i className="bi bi-archive"></i>
                    </div>
                    <div className="content">
                      <div>
                        <p className="title">{t("categories")}</p>
                      </div>
                      <div>
                        <p className="subTitle">{localStorage.getItem("LANG") === "en" ? DATA_INFO?.CATEGORY_NAME_TWO : DATA_INFO?.CATEGORY_NAME_ONE}</p>
                      </div>
                    </div>
                  </div>
                  <div className="storeSections col-md-3">
                    <div className="icon">
                      <i className="bi bi-receipt"></i>
                    </div>
                    <div className="content">
                      <p className="title">{t('Application Name')}</p>
                      <p className="details">{localStorage.getItem("LANG") === "en" ? DATA_INFO?.PRODUCT_NAME_TWO : DATA_INFO?.PRODUCT_NAME_ONE}</p>
                    </div>
                  </div>
                  <div className="storeSections col-md-3">
                    <div className="icon">
                      <i className="bi bi-link-45deg"></i>
                    </div>
                  <div className="content">
                    <div>
                      <p className="title">
                        {t("Application link on the store")}
                      </p>
                    </div>
                    <div>
                      <NavLink to={`/productDetails/${DATA_INFO?.PRODUCT_ID}`}>
                        <p className="subTitle link">{t("Application link on the store")}</p>
                      </NavLink>
                    </div>
                  </div>
                  </div>
                {/* <div className="col-md-5">
                  <div className="row storeSections">
                    <div className="col-md-12 content">
                      <div>
                         {DATA_INFO?.PRODUCT_ICON && <img src={require("../../Assets/Projects/" + DATA_INFO.PRODUCT_ICON)} alt='#' />}
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          {DATA_INFO?.MARKETER_STATUS !== "A" && <div className="row buttons">
            <div className="col-md-4">
              <button className="send" onClick={handleFreeShow}>
                <i className="bi bi-lightning-charge"></i>
                <span>{t("Request to activate a coupon")}</span>
              </button>
            </div>
          </div>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BrowseApplicationDetail;
