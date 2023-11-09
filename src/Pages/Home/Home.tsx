import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Splide, SplideSlide } from "@splidejs/react-splide";

//slice
import { GetAllProducts, Selectproducts, SelectLatestProducts, SelectFeaturedProducts } from "../../Services/MasterStore/Reducers/ProductSlice";
import { GetAllCategories, SelectCategories } from "../../Services/MasterStore/Reducers/CategorySlice";
import { SelectOneUserProduct, SelectUserProducts } from "../../Services/MasterStore/Reducers/UserProductSlice";

// Master Hooks
import { useAppDispatch, useAppSelector } from "../../Services/MasterStore/MasterHook";

//React Router
import { NavLink } from 'react-router-dom'

//Images
import PathRight from "../../Assets/pathRight.png";
import Apps from "../../Assets/Apps.png";
import pic1 from "../../Assets/Projects/chat-square-code-outline.png";
import pic2 from "../../Assets/Projects/smartphone-outline.png";
import pic3 from "../../Assets/Projects/box-linear.png";
import pic4 from "../../Assets/Projects/settings-outline.png";
import pic5 from "../../Assets/Images/download.png";
import pic6 from "../../Assets/Projects/monitor-smartphone-outline.png";
import pic7 from "../../Assets/Projects/chat-round-money-outline.png";
import pic8 from "../../Assets/Projects/headphones-round-outline.png";
import pic9 from "../../Assets/Projects/cart-outline.png";
import pic10 from "../../Assets/Projects/chart-2-outline.png";
import pic11 from "../../Assets/Projects/clipboard-outline.png";
import picSectionFive1 from "../../Assets/SectionFive/box-outline.png";
import picSectionFive2 from "../../Assets/SectionFive/smartphone-2-outline.png";
import picSectionFive3 from "../../Assets/SectionFive/planet-3-linear.png";
import picSectionFive4 from "../../Assets/SectionFive/chat-unread-outline.png";
import picSectionFive5 from "../../Assets/SectionFive/case-round-linear.png";
import logo from "../../Assets/Images/edit.png";
import apps2 from "../../Assets/apps2.png";
import "./Home.css";

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(Selectproducts);
  const { categories } = useAppSelector(SelectCategories);
  const [FreeProducts, setFreeProducts] = useState<any>({});
  const { userProductOne } = useAppSelector(SelectUserProducts);
  const { latestProducts, featuredProducts } = useAppSelector(Selectproducts);

    // Get All Data
    useEffect(() => {
      dispatch(GetAllProducts());
      dispatch(GetAllCategories());
      dispatch(SelectLatestProducts());
      dispatch(SelectFeaturedProducts());
      dispatch(SelectOneUserProduct(''));
      localStorage.setItem("Category_Id", '');
    }, [dispatch]);

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
};

const handleLinkCategoryClick = (id: any) => {
  window.scrollTo(0, 0);
  localStorage.setItem("Category_Id", id);
};

const CategoryImagesArray: any = [
  {key: 'business.png', value: picSectionFive1}, 
  {key: 'collaboration.png', value: picSectionFive2}, 
  {key: 'communication.png', value: picSectionFive3},
  {key: 'support.png', value: picSectionFive4},
  {key: 'design.png', value: picSectionFive5},
  {key: 'hr.png', value: pic9},
  {key: 'finance.png', value: pic10},
  {key: 'payment.png', value: pic11},
];

  useEffect(() => {
    setFreeProducts(products?.length && products.filter((e: any) => (e.PRICE_PER_MONTH === null)).slice(0, 4));
  }, [products, featuredProducts, userProductOne])
  
  return (
    <React.Fragment>
      {/* main header */}
      <div className="header_home">
        <div className="left">
          <h1>
              {t('Distinctive applications and tools')} <span>{t('To grow your profits')}</span>
          </h1>
          <p>
          {t('Hint_Home_Page')}  <br />{" "}
                      </p>
          <ul>
            <NavLink to='/marketplace' onClick={handleLinkClick}>
              <li>{t('browse all apps')}</li>
            </NavLink>
          </ul>
          <br />
          <img
            className="bckground hiddenTab"
            src={PathRight}
            alt="hearobackground"
          />
        </div>
        <div className="right">
          <div style={{ height: "100%" }}>
            <img className="bckground" src={PathRight} alt="hearobackground" />
            <img className="laptop" src={Apps} alt="hearoImage" />
          </div>
        </div>
      </div>

      {/* First Cards */}
      <section className="cSectionTwo">
        <div className="SectionTwo_container">
          {/* <div className="row"> */}
          <div className="SectionTwo">
            <div className="row">
              <div className="col-3">
                <img src={pic1} className="imghight" alt="#" />
              </div>
              <div className="col-9">
                <h3>{t(`2000 +`)}</h3>
                <p>{t(`developer`)}</p>
              </div>
            </div>
          </div>
          <div className="SectionTwo ">
            <div className="row">
              <div className="col-3 ">
                <img src={pic2} className="imghight" alt="#" />
              </div>
              <div className="col-9">
                <h3>{products && products.length + ' +'}</h3>
                <p>{t(`App`)}</p>
              </div>
            </div>
          </div>
          <div className="SectionTwo ">
            <div className="row">
              <div className="col-3 ">
                <img src={pic3} className="imghight" alt="#" />
              </div>
              <div className="col-9">
                <h3>{categories && categories.length + ' +'}</h3>
                <p>{t(`categories`)}</p>
              </div>
            </div>
          </div>
          <div className="SectionTwo  enterprise">
            <div className="row">
              <div className="col-3 ">
                <img src={pic4} className="imghight" alt="#" />
              </div>
              <div className="col-9">
                <h3>{userProductOne && userProductOne.length + ' +'}</h3>
                <p>{t(`Install`)}</p>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </section>

      {/* Slider */}
      <div className="cSectionThree">
        <div className="HeaderTitleSection">
          <div>
            <h1>{t(`featured applications`)}</h1>
            <p>{t('hint_Features_section')}</p>
          </div>
          <NavLink to='/marketplace' onClick={handleLinkClick}>
            <div className="leftHeaderSection">
              <h6>{t(`Latest applications`)}</h6>
              <span>
                {localStorage.getItem('LANG') === 'en' ? <i className="bi bi-chevron-right"></i> : <i className="bi bi-chevron-left"></i>}
              </span>
            </div>
          </NavLink>
        </div>
        <Splide aria-label="My Favorite Images" options={{ type: "loop", direction: "rtl", autoWidth: true, perMove: 1, autoplay: true, speed: 3000, gap: "16px", }}>
          {!!featuredProducts?.FEATURED_PRODUCT?.length &&
            featuredProducts?.FEATURED_PRODUCT.map((Product: any, Index: number) => (
              <SplideSlide key={Index}>
                <div className="CardContainer">
                  <div className="CardInner">
                    <div className="cardLabel">
                      <i className="bi bi-tags"></i>
                      <p>{localStorage.getItem('LANG') === 'en' ? Product.PRICING_TAG_TWO : Product?.PRICING_TAG_ONE}</p>
                    </div>
                    <div className="CardImage">
                      <img src={require('../../Assets/Projects/' + Product.PRODUCT_ICON)} alt="cloud" />
                    </div>
                    <div className="CardText">
                      <div className="TextHeader">
                        <h4>{localStorage.getItem('LANG') === 'en' ? Product.NAME_TWO : Product?.NAME_ONE}</h4>
                        <div className="CardRate">
                          <i className="bi bi-star-fill"></i>
                          <p>{Product.RATING_VALUE}({Product.RATING_COUNT} تقييم )</p>
                        </div>
                      </div>
                      <p>{localStorage.getItem('LANG') === 'en' ? Product.DESC_TWO : Product?.DESC_ONE}</p>
                    </div>
                    <NavLink to={`/productDetails/${Product?.PRODUCT_ID}`}>
                      <button className="btn">{t('install app')}</button>
                    </NavLink>
                  </div>
                  <div className="CardBackground" style={{ backgroundColor: Product.COLOR }} />
                </div>
              </SplideSlide>
            ))}
        </Splide>
      </div>

      {/* Second Card */}
      <section className="cSectionFour">
        <h1>{t('grow yor store')}</h1>
        <div className="sectionFour_container">
          {/* <div className="row"> */}
          <div className="sectionFour">
            <div className="row planDetails">
              <div className="col-md-12 cardDetails">
                <div className="col-md-4 col-sm-4">
                  <img src={pic6} alt="#" />
                </div>
                <div className="col-md-12 col-sm-12">
                  <h3>{t(`Ease of managing applications`)}</h3>
                  <p>{t(`Ease of managing and activating applications from the same control panel`)}</p>
                </div>
              </div>
              <div className="col-md-4 imageDetails">
                <img src={pic5} alt="#" />
              </div>
            </div>
          </div>
          <div className="sectionFour">
            <div className="row planDetails">
              <div className="col-md-12 cardDetails">
                <div className="col-md-4 col-sm-4">
                  <img src={pic7} alt="#" />
                </div>
                <div className="col-md-12 col-sm-12">
                  <h3>{t(`suitable prices`)}</h3>
                  <p>
                    {t(`Many free apps, competitive prices with free trial of apps`)}
                  </p>
                </div>
              </div>
              <div className="col-md-4 imageDetails">
                <img src={pic5} alt="#" />
              </div>
            </div>
          </div>
          <div className="sectionFour">
            <div className="row planDetails">
              <div className="col-md-12 cardDetails">
                <div className="col-md-4 col-sm-4">
                  <img src={pic8} alt="#" />
                </div>
                <div className="col-md-12 col-sm-12">
                  <h3>{t(`Technical support`)}</h3>
                  <p>
                    {t(`Integrated technical support`)}
                  </p>
                </div>
              </div>
              <div className="col-md-4 imageDetails">
                <img src={pic5} alt="#" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card section three */}
      <section className="cSectionFive">
        <h1>{t('grow yor store')}</h1>
        <div className="sectionFive_container">
          {/* <div className="row"> */}
          <div className="sectionFive">
            <div className="moreDetail">
            {!!categories?.length ? categories.map((Category: any, Index: number) => (
                 Category.CATEGORY_ID !==0 &&
                 
                 <NavLink to={`/MarketPlace`} key={Index} onClick={() =>{handleLinkCategoryClick(Category.CATEGORY_ID)}}>
                 <div className="col-md-3 col-sm-6 details" key={Index}>
                    <img src={CategoryImagesArray.map((Image: any) => (Image.key === Category.ICON ? Image.value.toString() : '')).join('')} alt="#" />
                    <h3>{localStorage.getItem('LANG') ==='en' ? Category.NAME_TWO : Category.NAME_ONE}</h3>
                  </div>
                 </NavLink>
                        ))
                      : ""}
            </div>
          </div>
        </div>
      </section>

      {/* Card Icon Image Section */}
      <section className="cSectionSix">
        <div className="HeaderTitleSection">
            <h1>{t(`free applications`)}</h1>
            <NavLink to='/marketplace' onClick={handleLinkClick}>
          <div className="leftHeaderSection">
              <h6>{t(`Latest applications`)}</h6>
              <span>
                {localStorage.getItem('LANG') === 'en' ? <i className="bi bi-chevron-right"></i> : <i className="bi bi-chevron-left"></i>}
              </span>
          </div>
            </NavLink>
        </div>
        <div className="sectionSix_container">
          {/* <div className="row"> */}
          <div className="sectionSix">
            <div className="moreDetail">
              {FreeProducts && !!FreeProducts.length &&
                FreeProducts.map((Product: any, Index: number) => (
                  <NavLink to={`/productDetails/${Product?.PRODUCT_ID}`} key={Index} onClick={handleLinkClick}>
                    <div className="col-md-3 col-sm-6 details">
                      <div className="CardTop">
                        <div>
                          <img src={require('../../Assets/Projects/' + Product.PRODUCT_ICON)} alt="cloud" />
                        </div>
                        <div className="leftSideCard">
                          <div className="cardLabel">
                            <i className="bi bi-star-fill"></i>
                            <p>{Product?.RATING_VALUE}</p>
                          </div>
                          <div className="cardLabel">
                            <i className="bi bi-tags"></i>
                            <p className="priceText">{localStorage.getItem('LANG') === 'en' ? Product.PRICING_TAG_TWO : Product?.PRICING_TAG_ONE}</p>
                          </div>
                        </div>
                      </div>
                      <h3>{localStorage.getItem('LANG') === 'en' ? Product.NAME_TWO : Product?.NAME_ONE}</h3>
                      <h6>
                        {localStorage.getItem('LANG') === 'en' ? Product.DESC_TWO : Product?.DESC_ONE}
                      </h6>
                    </div>
                  </NavLink>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Block BackGround */}
      <div className="SectionBlock">
        <div className="styleSectionBlock">
          <div className="col-md-6 col-12">
            <h1>{t('developer')} ؟</h1>
            <h5>{t(`Be Zed's partner in growth`)}</h5>
            <div className="col-md-3">
              <button type="button" className="CustomButton">
                {t('Register Now')}
              </button>
            </div>
          </div>
        </div>
        <img src={logo} className="imageBlock bckground" alt="#" />
      </div>

      {/* Other Card Section Image */}
      <section className="cSectionSix">
        <div className="HeaderTitleSection">
          <h1>{t(`Latest applications`)}</h1>
          <NavLink to='/marketplace' onClick={handleLinkClick}>
            <div className="leftHeaderSection">
              <h6>{t(`All applications`)}</h6>
              <span>
                {localStorage.getItem('LANG') === 'en' ? <i className="bi bi-chevron-right"></i> : <i className="bi bi-chevron-left"></i>}
              </span>
            </div>
          </NavLink>
        </div>
        <div className="sectionSix_container">
          {/* <div className="row"> */}
          <div className="sectionSix">
            <div className="moreDetail">
              {!!latestProducts?.LATEST_PRODUCT?.length &&
                latestProducts?.LATEST_PRODUCT.map((Product: any, Index: number) => (
                  <NavLink to={`/productDetails/${Product?.PRODUCT_ID}`} key={Index} onClick={handleLinkClick}>
                    <div className="col-lg-4 col-md-3 col-sm-6 details">
                      <div className="CardTop">
                        <div>
                          <img src={require('../../Assets/Projects/' + Product.PRODUCT_ICON)} alt="#" />
                        </div>
                        <div className="leftSideCard">
                          <div className="cardLabel">
                            <i className="bi bi-star-fill"></i>
                            <p>{Product.RATING_VALUE}</p>
                          </div>
                          <div className="cardLabel">
                            <i className="bi bi-tags"></i>
                            <p className="priceText">{localStorage.getItem('LANG') === 'en' ? Product.PRICING_TAG_TWO : Product.PRICING_TAG_ONE}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3>{localStorage.getItem('LANG') === 'en' ? Product.NAME_TWO : Product?.NAME_ONE}</h3>
                      </div>
                      <div>
                        <h6>
                          {localStorage.getItem('LANG') === 'en' ? Product.DESC_TWO : Product?.DESC_ONE}
                        </h6>
                      </div>
                    </div>
                  </NavLink>
                ))}
            </div>
          </div>
        </div>
      </section>

      <div className="SectionBlock">
        <div className="styleSectionBlock">
          <div className="col-md-6 col-12">
            <h1>{t('Your suggestions are important to us')}</h1>
            <h5>{t('suggestions for programs')}</h5>
            <div className="col-lg-3 col-md-4 col-sm-5">
              <button type="button" className="CustomButton">{t('Suggest an application')}</button>
            </div>
          </div>
        </div>
        <img src={apps2} className="imageBlock bckground" alt="#" />
      </div>
    </React.Fragment>
  );
};

export default Home;
