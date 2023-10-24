import React,{ useState, useEffect } from "react";

// Static Data
import StaticData from "../../Services/StaticData/ActiveRequest.json";

import SalesData from "../../Services/StaticData/SalesData.json";

//translation
import { useTranslation } from 'react-i18next';

//css
import "./SalesReports.css";

const SalesReports = () => {
  const { t } = useTranslation();
  const [SaleTabel,setSaleTabel]=useState<any>([]);
  const [PaginationSize, setPaginationSize] = useState<any>(2);
  const [CurrentPage, setCurrentPage] = useState<any>(0);
  const [PageNumber, setPageNumber] = useState<any>(0);

  // set pagination
  useEffect(() => {
    if (SalesData && SalesData.length !== 0) {
      setPaginationSize(2)
      const PageSize = Number(PaginationSize);
      const PagesNumber = Math.ceil(SalesData.length / PageSize);
      const FirstIndexPage = CurrentPage * PageSize;
      const LastIndexPage = FirstIndexPage + PageSize;
      setSaleTabel(SalesData.slice(FirstIndexPage , LastIndexPage));
      setPageNumber(PagesNumber);
    }
  }, [PaginationSize, CurrentPage]);

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

  return (
    <React.Fragment>
      <div className="container_Sales_main" id="container_main">
        <div className="container_Sales_body">
          {!!StaticData.length &&
            StaticData.map((Data: any, Index: any) => (
              Data.id === 3 &&  <div className="Content_Body" key={Index}>
                <h1>{t(Data?.name)}</h1>
                <div className="cards">
                  {Data?.card_Body.map((Data: any, Index: any) => (
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
            ))}
          <div className="Content_Body">
            <h1>{t('SalesReports')}</h1>
            <div className="CojectGrid">
              <table className="table">
                <thead>
                  <tr>
                    <th>معرف الطلب</th>
                    <th>اسم الكوبون</th>
                    <th>اسم الابليكيشن</th>
                    <th>كود الكوبون</th>
                    <th>عمولتي ( ر.س )</th>
                    <th>الحالة</th>
                    <th>تاريخ الانشاء</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {!!SaleTabel.length &&
                    SaleTabel.map((Data: any, Index: any) => (
                      <tr key={Index}>
                        <td>{Data.id}</td>
                        <td>{Data.name}</td>
                        <td>عسير</td>
                        <td>{Data.number}</td>
                        <td>{Data.color}</td>
                        <td>فعال</td>
                        <td>2023-06-03</td>
                        <td>2023-06-03</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="row">
                <div className="pagination">
                  <div className="col-md-9">
                    <span>{SalesData.length} سجل تم إيجاده</span>
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

export default SalesReports;
