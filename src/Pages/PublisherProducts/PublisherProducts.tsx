import React, { FC, useEffect, useState } from "react";

//translation
import { useTranslation } from "react-i18next";

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

import { useParams, NavLink } from 'react-router-dom';

// Slices
import { GetAllProducts, Selectproducts } from "../../Services/MasterStore/Reducers/ProductSlice";

//css
import "./PublisherProducts.css";

const PublisherProducts:FC = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { products } = useAppSelector(Selectproducts);
    const [PublisherProducts, setPublisherProducts] = useState<any>([]);

    useEffect(() => {
        dispatch(GetAllProducts());
    }, [dispatch])

    useEffect(() => {
        setPublisherProducts(
            products && products.filter((Row: any) => {
              return Row.PUBLISHER_ID === Number(id);
            })
          );
    }, [products, id])

    useEffect(() => {
        console.log(PublisherProducts);
    }, [PublisherProducts])

    return(
        <React.Fragment>
            <div className=" container_Publisher">
            <div className='Links'>
                <div className='LinksDetails'>
                  <NavLink to={'/'}>
                    <h4>{t('Application Market')}</h4>
                  </NavLink>
                  <NavLink to={'/MarketPlace'}>
                    <h4>/ {t('Applications And Categories')}</h4>
                  </NavLink>
                    <h5>/ {PublisherProducts[0]?.PUBLISHER_NAME_ONE}</h5>
                </div>
              </div>
                <div className="content container">
                    <div className="contentDetail">
                        {!!PublisherProducts.length &&
                            PublisherProducts.map((Product: any, Index: number) => (
                                <NavLink
                                    to={`/productDetails/${Product?.PRODUCT_ID}`}
                                    key={Index}
                                >
                                    <div className="details">
                                        <div className="row CardTop">
                                            <div className="col-4">
                                                <img
                                                    className="imgProductIcon"
                                                    src={require("../../Assets/Projects/" + Product.PRODUCT_ICON)} alt="#"
                                                />
                                            </div>
                                            <div className="col-8 leftSideCard">
                                                <div className="cardLabel">
                                                    <i className="bi bi-star-fill"></i>
                                                    <p>{Product?.RATING_VALUE}</p>
                                                </div>
                                                <div className="cardLabel">
                                                    <i className="bi bi-tags"></i>
                                                    <p className="priceText">
                                                        {localStorage.getItem("LANG") === "en" ? Product?.PRICING_TAG_TWO : Product?.PRICING_TAG_ONE}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <h3>
                                            {localStorage.getItem("LANG") === "en" ? Product.NAME_TWO : Product?.NAME_ONE}
                                        </h3>
                                        <div>
                                            <h6>
                                                {t("development")} :{" "}
                                                {localStorage.getItem("LANG") === "en" ? Product?.PUBLISHER_NAME_TWO : Product?.PUBLISHER_NAME_ONE}
                                            </h6>
                                            <p>
                                                {localStorage.getItem("LANG") === "en" ? Product?.DESC_TWO : Product?.DESC_ONE}
                                            </p>
                                        </div>
                                    </div>
                                </NavLink>
                            ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default PublisherProducts;