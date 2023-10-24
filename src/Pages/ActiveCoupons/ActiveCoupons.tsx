import React, { useEffect, useState } from "react";

//translation
import { useTranslation } from "react-i18next";

//css
import "./ActiveCoupons.css";

const ActiveCoupons = () => {
  const { t } = useTranslation();
  const [array] = useState<any>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [finalData, setFinalData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(0);
  const [pageNumber, setPageNumber] = useState<any>(0);

  // set pagination
  useEffect(() => {
    if (array && array.length !== 0) {
      const PageSize = 3;
      const PagesNumber = Math.ceil(array.length / PageSize);
      const FirstIndexPage = currentPage * PageSize;
      const LastIndexPage = FirstIndexPage + PageSize;
      setFinalData(array.slice(FirstIndexPage, LastIndexPage));
      setPageNumber(PagesNumber);
    }
  }, [array, currentPage]);

  const NextPage = () => {
    if (Number(currentPage) !== pageNumber - 1) {
      setCurrentPage(Number(currentPage) + 1);
    }
  };

  const PreviousPage = () => {
    if (Number(currentPage) !== 0) {
      setCurrentPage(Number(currentPage) - 1);
    }
  };

  return (
    <React.Fragment>
      <div className="ActiveCoupons">
        <div className="cardsContainer">
          {finalData &&
            finalData.map((item: any, index: any) => {
              return (
                <div className="card" key={index}>
                  <img
                    src="https://www.gizchina.com/wp-content/uploads/images/2023/05/Instagram-3.jpg"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <span className="card-title">
                      {t("الأكثر مبيعآ على كوكجت")}
                    </span>
                    <div className="card-text">
                      <div className="">
                        <div className="title">
                          <span>{t("الخصم")}</span>
                        </div>
                        <div className="amount">
                          <span className="price">{t("23 ")}</span>
                          <span className="currency">{t("ريال")}</span>
                        </div>
                      </div>
                      <div className="">
                        <div className="title">
                          <span>{t("العمولة")}</span>
                        </div>
                        <div className="amount">
                          <span className="price">{t("6.5 ")}</span>
                          <span className="currency">{t("ريال")}</span>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="card-footer">
                      <span>{"FDA54"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="pagination">
            <div className="col-md-9">
              <span>{array.length} سجل تم إيجاده</span>
            </div>
            <div
              className="col-md-3"
              style={{ display: "flex", justifyContent: "end" }}
            >
              <i
                className="bi bi-arrow-right"
                onClick={() => {
                  PreviousPage();
                }}
              ></i>
              <div className="pagnationcurrent">
                <span>{currentPage + 1}</span>
              </div>
              <span style={{ marginLeft: "6px" }}>/{pageNumber}</span>
              <i
                className="bi bi-arrow-left"
                onClick={() => {
                  NextPage();
                }}
              ></i>
            </div>
          </div>
      </div>
    </React.Fragment>
  );
};

export default ActiveCoupons;
