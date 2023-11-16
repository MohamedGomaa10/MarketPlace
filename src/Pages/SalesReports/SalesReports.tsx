import React,{ useState, useEffect } from "react";

// Static Data
import StaticData from "../../Services/StaticData/SalesData.json";

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

import { GetMarketerOperationSlice, SelectMarketProgram } from "../../Services/MasterStore/Reducers/MarketProgramSlice";

//translation
import { useTranslation } from 'react-i18next';

//Image 
import Bank from "../../Assets/Projects/Bank.svg";

//css
import "./SalesReports.css";

const SalesReports = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [SaleTabel, setSaleTabel] = useState<any>([]);
  const [PageNumber, setPageNumber] = useState<any>(0);
  const [CurrentPage, setCurrentPage] = useState<any>(0);
  const [PaginationSize, setPaginationSize] = useState<any>(2);
  const { MarkterOperation } = useAppSelector(SelectMarketProgram);

  const MARKETEROPERATIONDATA = MarkterOperation && MarkterOperation.DETAIL_REF;

  useEffect(() => {
    dispatch(GetMarketerOperationSlice())
  }, [dispatch])

  // set pagination
  useEffect(() => {
    if (MARKETEROPERATIONDATA && MARKETEROPERATIONDATA.length !== 0) {
      setPaginationSize(2)
      const PageSize = Number(PaginationSize);
      const PagesNumber = Math.ceil(MARKETEROPERATIONDATA.length / PageSize);
      const FirstIndexPage = CurrentPage * PageSize;
      const LastIndexPage = FirstIndexPage + PageSize;
      setSaleTabel(MARKETEROPERATIONDATA.slice(FirstIndexPage, LastIndexPage));
      setPageNumber(PagesNumber);
    }
  }, [PaginationSize, CurrentPage, MARKETEROPERATIONDATA]);

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

  const onClickGrid = (Row: any) => {
    const value = `;${document.cookie}`;
    const parts = value.split(`; ${'JwtInfo'}=`);
    if (parts.length === 2) {
    };
  }

  return (
    <React.Fragment>
      <div className="container_Sales_main" id="container_main">
        <div className="container_Sales_body">
          <div className="Content_Body">
            <div className="cards">
            <h1>{t('المبيعات')}</h1>
              {StaticData?.map((Data: any, Index: any) => (
                <div className="cardDetails" key={Index}>
                  <div>
                    <h3>{t(Data?.name)}</h3>
                    <h6 style={{ color: Data?.color }}>{Data?.number}</h6>
                  </div>
                  <i className={Data?.icon}></i>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p>
            عند استخدام المحفظة الرقمية، يمكنك القيام بعدة عمليات مختلفة، بما في ذلك:<br/>

1. إرسال الأموال: يمكنك استخدام المحفظة الرقمية لإرسال الأموال إلى مستخدمين آخرين، سواء كانوا يستخدمون نفس المنصة أو منصات أخرى. تحتاج إلى معرفة عنوان المحفظة الرقمية للشخص الذي ترغب في إرسال الأموال إليه.<br/>

2. استلام الأموال: يمكنك أيضًا استخدام المحفظة الرقمية لاستلام الأموال من الآخرين. عليك مشاركة عنوان محفظتك الرقمية مع الشخص الذي يرغب في إرسال الأموال إليك.<br/>

3. تحويل العملات: بعض المحافظ الرقمية تتيح لك تحويل الأموال بين عملات مختلفة. فإذا كنت ترغب في تحويل العملات الرقمية المختلفة، فيمكنك استخدام المحفظة الرقمية لذلك.<br/>

4. تتبع الرصيد: يمكنك استخدام المحفظة الرقمية لتتبع رصيدك ورؤية العمليات المالية السابقة التي تمت عبر المحفظة.<br/>
            </p>
          </div>
          <div className="Content_Body">
            {SaleTabel.length ? <div className="CojectGrid">
            <h1>{t('SalesReports')}</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>{t('Operation ID')}</th>
                    <th>{t('Operation Type')}</th>
                    <th>{t('Total amount')}</th>
                    <th>{t('Operation Date')}</th>
                    <th>{t('Total Card')}</th>
                  </tr>
                </thead>
                <tbody>
                  {!!SaleTabel.length &&
                    SaleTabel.map((Data: any, Index: any) => (
                      <tr key={Index} onClick={() => { onClickGrid(Data) }} style={{ cursor: 'pointer' }}>
                        <td>{Data.MARKETER_PAYMENT_OPERATION_ID}</td>
                        <td>{Data.PRODUCT_MARKET_OFFER_NAME_ONE}</td>
                        <td>{Data?.NET_AMOUNT}</td>
                        <td>{formatDate(Data.PAYMENT_DATE)}</td>
                        <td>{Data?.NET_AMOUNT}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="row">
                <div className="pagination">
                  <div className="col-md-9">
                    <span>{SaleTabel.length} {t('Record found')}</span>
                  </div>
                  <div
                    className="col-md-3"
                    style={{ display: "flex", justifyContent: 'end' }}
                  >
                    <i className="bi bi-arrow-right" onClick={() => { PreviousPage(); }}></i>
                    <div className="pagnationcurrent">
                      <span>{CurrentPage + 1}</span>
                    </div>
                    <span style={{ marginLeft: "6px" }}>/{PageNumber}</span>
                    <i className="bi bi-arrow-left" onClick={() => { NextPage(); }}></i>
                  </div>
                </div>
              </div>
            </div> :              
                    <div className="Bank">
                        <img src={Bank} alt='#' />
                    </div>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SalesReports;
