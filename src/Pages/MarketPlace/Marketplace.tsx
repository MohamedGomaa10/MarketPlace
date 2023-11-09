import React, { FC, useEffect, useState, useCallback } from "react";

//translation
import { useTranslation } from "react-i18next";

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

import { NavLink } from "react-router-dom";

// Slices
import { GetAllProducts, Selectproducts, SelectLatestProducts, SelectFeaturedProducts } from "../../Services/MasterStore/Reducers/ProductSlice";
import { GetAllCategories, SelectCategories } from "../../Services/MasterStore/Reducers/CategorySlice";

//css
import "./Marketplace.css";

const Marketplace:FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(Selectproducts);
  const { categories } = useAppSelector(SelectCategories);
  const [SearchValue, setSearchValue] = useState<any>([]);
  const [CategoryValue, setCategoryValue] = useState<any>([]);
  const [CategoryCheck, setCategoryCheck] = useState<any>();

  const [AllProducts, setAllProducts] = useState<any>([]);
  const [FinalData, setFinalData] = useState<any>([]);
  const { latestProducts, featuredProducts } = useAppSelector(Selectproducts);

  const [PaginationSize, setPaginationSize] = useState<any>(9);
  const [CurrentPage, setCurrentPage] = useState(0);
  const [PageNumber, setPageNumber] = useState<any>();

  // Get All Data
  useEffect(() => {
    dispatch(GetAllCategories());
    dispatch(GetAllProducts());
    dispatch(SelectLatestProducts());
    dispatch(SelectFeaturedProducts());
  }, [dispatch]);

  useEffect(() => {  
    setAllProducts(products);
  }, [products]);

  const onChangeDropDown = (e: any) => {
    setCategoryCheck(e.target.value);
  };

  const onChangeSelect = (e: any) => {
    if (e.target.value === "0") {
      setAllProducts(products);
    } else if (e.target.value === "1") {
      setAllProducts(featuredProducts?.FEATURED_PRODUCT);
    } else if (e.target.value === "2") {
      setAllProducts(latestProducts?.LATEST_PRODUCT);
    } else if (e.target.value === "3") {
    } else if (e.target.value === "4") {
      setAllProducts(products.filter((e: any) => e.PRICE_PER_MONTH === null));
    }
  };

  useEffect(() => {
    setCategoryCheck(localStorage.getItem("Category_Id"));
  }, []);

  // set products
  useEffect(() => {
    if (CategoryCheck && Number(CategoryCheck) !== 0) {
      setCategoryValue(
        AllProducts.filter((Row: any) => {
          return Row.CATEGORY_ID === Number(CategoryCheck);
        })
      );
      setSearchValue(
        AllProducts.filter((Row: any) => {
          return Row.CATEGORY_ID === Number(CategoryCheck);
        })
      );
    } else {
      setCategoryValue(AllProducts);
      setSearchValue(AllProducts);
    }
  }, [AllProducts, CategoryCheck]);

  // set pagination
  useEffect(() => {
    if (SearchValue && SearchValue.length !== 0) {
      const PageSize = Number(PaginationSize);
      const PagesNumber = Math.ceil(SearchValue.length / PageSize);
      const FirstIndexPage = CurrentPage * PageSize;
      const LastIndexPage = FirstIndexPage + PageSize;
      setFinalData(SearchValue.slice(FirstIndexPage, LastIndexPage));
      setPageNumber(PagesNumber);
    }else{
      setFinalData([]);
    }
  }, [SearchValue, PaginationSize, CurrentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [SearchValue]);
    
  // Next Pages Group
  const NextPage = useCallback(() => {
    if (Number(CurrentPage) !== PageNumber - 1) {
      setCurrentPage(c => Number(c) + 1);
    }
  }, [PageNumber, CurrentPage]);

  // Previous Pages Group
  const PreviousPage = () => {
    if (Number(CurrentPage) !== 0) {
      setCurrentPage(Number(CurrentPage) - 1);
    }
  };

  // Search Action
  const Searching = (Event: any) => {
    !!CategoryValue?.length &&
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

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
};

  return (
    <React.Fragment>
        <div className="containerHeader">
          <div className="Rightside">
            <div style={{ height: "100%" }} className="childRightside">
              <div className="RightsideHeader">
                <h3>{t('categories')}</h3>
              </div>
              <div className="categories">
                {!!categories?.length
                  ? categories.map((Category: any, Index: number) => (
                      <div className="selectCategory" key={Index}>
                        <input
                          className="Radio"
                          type="radio"
                          name="category"
                          onChange={() => {setCategoryCheck(Category.CATEGORY_ID);}}
                          checked={
                            Category.CATEGORY_ID === Number(CategoryCheck)? true : false
                          }
                        ></input>
                        <div className="CategoryNameParent">
                          <h4 className="CategoryName">
                            {localStorage.getItem("LANG") === "en"
                              ? Category.NAME_TWO
                              : Category.NAME_ONE}
                          </h4>
                          <h6>({Category?.CATEGORY_COUNT})</h6>
                        </div>
                      </div>
                    ))
                  : "" }
              </div>
            </div>
          </div>
          { <div className="leftSide">
              {/* <div className="col-md-12 showCategories">
                <button onClick={ShowCategories} className="btn btn-info">
                  المنتجات والتصنيفات
                </button>
              </div> */}
              <div className="textHeader">
                <h4 className="titleHeader">{t("Application Market")}</h4>
                <p>{t("thirdtitle")}</p>
              </div>
              <div className="search">
                <input
                  onChange={Searching}
                  type="text"
                  className="InputSearch"
                  placeholder = {t('Search for Application')}
                />
                <i className="bi bi-search"></i>
              </div>
              <div className="filter">
                <div className="row searchable">
                  <div className="col-sm-6 results">
                    <p>{t('Sort Result By')} : </p>
                    <select
                      className="form-select ShowNumbers"
                      aria-label="Default select example"
                      value={CategoryCheck ? CategoryCheck : ""}
                      onChange={(e) => onChangeDropDown(e)}>
                      {!!categories?.length
                        ? categories.map((Category: any, Index: number) => (
                            <option key={Index} value={Category.CATEGORY_ID}>
                              {" "}
                              {localStorage.getItem("LANG") === "en"
                                ? Category.NAME_TWO
                                : Category.NAME_ONE}{" "}
                              ({Category.CATEGORY_COUNT})
                            </option>
                          ))
                        : ""}
                    </select>
                    <select
                      className="form-select resultfilter"
                      aria-label="Default select example"
                      onChange={(e) => onChangeSelect(e)}
                    >
                      <option value="0">{t('All applications')}</option>
                      <option value="1">{t('Most Subscription')}</option>
                      <option value="2">{t('the most recent')}</option>
                      <option value="3">{t('Highest rating')}</option>
                      <option value="4">{t('Free')}</option>
                    </select>
                  </div>
                  <div className="col-sm-6 results resultLeft">
                    <p>{t('Number of applications per page')} : </p>
                    <select
                      className="form-select pagination"
                      aria-label="Default select example"
                      onChange={(e) => {setPaginationSize(e.target.value); setCurrentPage(0);}}
                    >
                      <option value="9">9</option>
                      <option value="18">18</option>
                      <option value="27">27</option>
                    </select>
                  </div>
                </div>
              </div>
              <section className="cSectionCategories">
                <div className="SectionCategories_container">
                  {/* <div className="row"> */}
                  <div className="SectionCategories row">
                    <div className="moreDetail">
                      {!!FinalData.length &&
                        FinalData.map((Product: any, Index: number) => (
                          <NavLink
                            to={`/productDetails/${Product?.PRODUCT_ID}`}
                            key={Index} onClick={handleLinkClick}
                          >
                            <div className="col-md-3 col-sm-6 details">
                              <div className="row CardTop">
                                <div className="col-4">
                                  <img
                                    className="imgCategory"
                                    src={require("../../Assets/Projects/" + Product.PRODUCT_ICON)} alt="#"
                                  />
                                </div>
                                <div className="col-8 leftSideCard">
                                  <div className="cardLabel">
                                    <i className="bi bi-star-fill"></i>
                                    <p>5</p>
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
              </section>
              <div className="filter">
                <div className="row">
                  <div className="col-6 results">
                    <p>
                      {t('show')} {FinalData.length} {t('from')} {PaginationSize} {t('Out of all results')}
                    </p>
                  </div>
                  <div className="col-6 results resultLeft">
                    <div className="btnPagination">
                      <button type="button" className="btn prev" onClick={()=>{PreviousPage(); handleLinkClick();}}>{t('previous')}</button>
                      <button type="button" className="btn next" onClick={()=>{NextPage(); handleLinkClick();}}>{t('next')}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>
    </React.Fragment>
  );
};

export default Marketplace;
