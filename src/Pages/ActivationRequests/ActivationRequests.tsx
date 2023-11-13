import React, { useState, useEffect } from "react";

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

import { GetAllMarketCouponSlice, SelectMarketProgram } from "../../Services/MasterStore/Reducers/MarketProgramSlice";

// Static Data
import StaticData from "../../Services/StaticData/statisticsData.json";

//translation
import { useTranslation } from 'react-i18next';

//css
import "./ActivationRequests.css";

const ActivationRequests = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { MarketCoupon } = useAppSelector(SelectMarketProgram);
  const [SaleTabel, setSaleTabel] = useState<any>([]);
  const [PaginationSize, setPaginationSize] = useState<any>(2);
  const [CurrentPage, setCurrentPage] = useState<any>(0);
  const [PageNumber, setPageNumber] = useState<any>(0);

  const SUMMARY_REF = MarketCoupon && MarketCoupon.SUMMARY_REF;
  const MARKET_COUPON = MarketCoupon && MarketCoupon.MARKET_COUPON;

  useEffect(() => {
    dispatch(GetAllMarketCouponSlice())
  }, [dispatch])

  // set pagination
  useEffect(() => {
    if (MARKET_COUPON && MARKET_COUPON.length !== 0) {
      setPaginationSize(3);
      const PageSize = Number(PaginationSize);
      const PagesNumber = Math.ceil(MARKET_COUPON.length / PageSize);
      const FirstIndexPage = CurrentPage * PageSize;
      const LastIndexPage = FirstIndexPage + PageSize;
      setSaleTabel(MARKET_COUPON.slice(FirstIndexPage , LastIndexPage));
      setPageNumber(PagesNumber);
    }
  }, [PaginationSize, CurrentPage, MARKET_COUPON]);

  const NextPage = () => {
    if (Number(CurrentPage) !== PageNumber - 1) {
      setCurrentPage(Number(CurrentPage) + 1);
    }
  };

  // Previous Pages Group
  const PreviousPage = () => {
    if (Number(CurrentPage) !== 0) {
      setCurrentPage(Number(CurrentPage) - 1);
    }
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  return (
    <React.Fragment>
      <div className="container_Activation_main" id="container_main">
        <div className="container_Activation_body">
             <div className="Content_Body">
                <h1>{t('Statistics')}</h1>
                <div className="cards">
                  {StaticData?.map((Data: any, Index: any) => (
                    <div className="cardDetails" key={Index}>
                      <div>
                        <h3>{t(Data?.name)}</h3>
                        <h6 style={{ color: Data?.color }}>{Index < SUMMARY_REF?.length ? SUMMARY_REF && SUMMARY_REF.map((Image: any) => ((Image.COUPON_STATE === Data.COUPON_STATE) ? Image?.COUPON_COUNT : '')) : 0}</h6>
                      </div>
                      <i className={Data?.icon}></i>
                    </div>
                  ))}
                </div>
              </div>
          <div className="Content_Body">
            <h1>{t('ActivationRequests')}</h1>
            <div className="CojectGrid">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t('Order ID')}</th>
                    <th>{t('Order Name')}</th>
                    <th>{t('Application Name')}</th>
                    <th>{t('enter_State')}</th>
                    <th>{t('Expiry date')}</th>
                    <th>{t('CODE')}</th>
                  </tr>
                </thead>
                <tbody>
                  {!!SaleTabel.length &&
                    SaleTabel.map((Data: any, Index: any) => (
                      <tr key={Index}>
                        <td>{Data.GUID}</td>
                        <td>{Data.COUPON_NAME_ONE}</td>
                        <td>{Data.NAME_ONE}</td>
                        <td>{Data?.COUPON_STATE_ONE}</td>
                        <td>{formatDate(Data?.VALID_TILL)}</td>
                        <td><span>{Data?.CODE}</span></td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="row">
                <div className="pagination">
                  <div className="col-md-9">
                    <span>{MARKET_COUPON && MARKET_COUPON.length} {t('Record found')}</span>
                  </div>
                  <div
                    className="col-md-3"
                    style={{  display: "flex",justifyContent:'end' }}
                  >
                    <i className="bi bi-arrow-right" onClick={()=>{PreviousPage();}}></i>
                    <div className="pagnationcurrent">
                      <span>{CurrentPage+1}</span>
                    </div>
                    <span style={{ marginLeft: "6px" }}>/{PageNumber}</span>
                    <i className="bi bi-arrow-left" onClick={()=>{NextPage();}}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ActivationRequests;
