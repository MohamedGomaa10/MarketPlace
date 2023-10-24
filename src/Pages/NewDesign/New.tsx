import React from 'react';
import { useTranslation } from 'react-i18next';
import { Splide, SplideSlide } from '@splidejs/react-splide';



import PathRight from "../../Assets/pathRight.png"
import Apps from "../../Assets/Apps.png"
import Slider1 from "../../Assets/Desgin/Group 564.png";
import Slider2 from "../../Assets/Desgin/Group 565.png";
import Slider3 from "../../Assets/Desgin/Group 566.png";
import Slider4 from "../../Assets/Desgin/Group 567.png";
import Slider5 from "../../Assets/Desgin/Group 568.png";
import pic1 from '../../Assets/SectionFive/box-outline.png'
import pic2 from '../../Assets/SectionFive/smartphone-2-outline.png'
import pic3 from '../../Assets/SectionFive/planet-3-linear.png'
import pic4 from '../../Assets/SectionFive/chat-unread-outline.png'
import pic5 from '../../Assets/Images/download.png'
import picSectionFive1 from '../../Assets/SectionFive/box-outline.png'
import picSectionFive2 from '../../Assets/SectionFive/smartphone-2-outline.png'
import picSectionFive3 from '../../Assets/SectionFive/planet-3-linear.png'
import picSectionFive4 from '../../Assets/SectionFive/chat-unread-outline.png'
import picSectionFive5 from '../../Assets/SectionFive/case-round-linear.png'
import logo from '../../Assets/Images/edit.png';
import apps2 from '../../Assets/apps2.png'
import star from '../../Assets/SectionSix/star-bold.png'
import picSectionSix1 from '../../Assets/SectionSix/google_analytics_logo.png'
import picSectionSix2 from '../../Assets/SectionSix/getbutton_logo.png'
import picSectionSix3 from '../../Assets/SectionSix/snapchat_pixel_logo.png'
import picSectionSix4 from '../../Assets/SectionSix/smartarget_logo.png'
import tag from '../../Assets/SectionSix/tag-outline.png'


import './New.css'
const New = () => {
    const { t } = useTranslation();
    
    return (
        <React.Fragment>

            {/* main header */}
           <div className='header_home'>
                <div className="left">
                    <h1>
                         تطبيقات وأدوات مميزة <span>لنمو أرباحك</span>
                    </h1>
                    <p>
                     الأسئلة الشطور متجرك من خلال تطبيقات وحلول سوق تطبيقات زدالتي <br/> تساعدك في إدارة عمليات متجرك بإحترافية    
                    </p>
                    <ul>
                        <li>تصفح جميع التطبيقات</li>                        
                    </ul>
                    <br />
                    <img className='bckground hiddenTab' src={PathRight} alt="hearobackground" />
                </div>
                <div className="right">
                    <div style={{ height: '100%' }}>
                        <img className='bckground' src={PathRight} alt="hearobackground" />
                        <img className='laptop' src={Apps} alt="hearoImage" />
                    </div>
                </div>
           </div>

           {/* First Cards */}

           <section className='cSectionTwo'>
            <div className="SectionTwo_container">
                {/* <div className="row"> */}
                <div className="SectionTwo ">
                    <div className='row'>
                        <div className='col-md-4 d-flex align-items-center'>
                            <img src={pic1} className='imghight' alt='#'/>
                        </div>
                        <div className='col-md-8'>
                            <h3>{t(`2000 +`)}</h3>
                            <p>{t(`مطور تطبيقات`)}</p>
                        </div>
                    </div>
                </div>
                <div className="SectionTwo  pro">
                    <div className='row'>
                        <div className='col-md-4 d-flex align-items-center'>
                            <img src={pic2} className='imghight' alt='#'/>
                        </div>
                        <div className='col-md-8'>
                            <h3>{t(`200 +`)}</h3>
                            <p>{t(`تطبيق`)}</p>
                        </div>
                    </div>
                </div>
                <div className="SectionTwo ">
                    <div className='row'>
                        <div className='col-md-4 d-flex align-items-center'>
                            <img src={pic3} className='imghight' alt='#'/>
                        </div>
                        <div className='col-md-8'>
                            <h3>{t(`10 +`)}</h3>
                            <p>{t(`تصنيفات`)}</p>
                        </div>
                    </div>
                </div>
                <div className="SectionTwo  enterprise">
                    <div className='row'>
                        <div className='col-md-4 d-flex align-items-center'>
                            <img src={pic4} className='imghight'alt='#'/>
                        </div>
                        <div className='col-md-8'>
                            <h3>{t(`50000 +`)}</h3>
                            <p>{t(`تثبيت`)}</p>
                        </div>
                    </div>
                </div>
                {/* </div> */}
                
            </div>
        </section>

           {/* Slider */}
           <div className='cSectionThree'>
            <div className='d-flex justify-content-between pb-5'>
                <div>
                    <h1>التطبيقات المميزة</h1>
                    <br />
                    <p>تطبيقات تقدم حلول وخدمات مميزة نوصى بتجربتها</p>
                </div>
                <div className='leftapps'>
                    <h4>جميع التطبيقات</h4>
                </div>
            </div>
            <Splide aria-label="My Favorite Images" options={ { type: 'loop',direction:'rtl', padding: '5rem', autoWidth: true, perMove: 1, autoplay: true,  speed: 3000,gap: '2rem', pagination: false } }>
                    <SplideSlide>
                            <div className='relepos'>
                                <div className='styleCard d-flex flex-column'>
                                    <div className='d-flex justify-content-end p-3'>
                                        <p className='StylePInCard'>
                                        <i className="bi bi-bookmark-star p-2"></i>
                                        تطبيق مجانى 
                                        </p>
                                    </div>
                                    <div className='d-flex flex-column sectionbottom'>
                                        <div className='d-flex justify-content-between align-items-center p-3'>
                                            <h1>تابى</h1>
                                            <div>
                                                <i className="bi bi-star-fill customIcons"></i>
                                                5 (تقيم 21)                                                
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <p>تمكن تابي عملاءك من التسوق الآن وتقسيم قيمة مشترياتهم على 4 دفعات شهرية بدون فوائد وبدون رسوم</p>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <button type='button' className='InstallButton'>تثبيت التطبيق</button>
                                        </div>
                                    </div>
                                </div>
                                <img src={Slider1} className='opacity' alt="Image1"/>       
                            </div>
                                         
                    </SplideSlide>
                    <SplideSlide>
                    <div className='relepos'>
                                <div className='styleCard d-flex flex-column'>
                                    <div className='d-flex justify-content-end p-3'>
                                        <p className='StylePInCard'>
                                        <i className="bi bi-bookmark-star p-2"></i>
                                        تجربة مجانية لمدة 14 يوم
                                        </p>
                                    </div>
                                    <div className='d-flex flex-column sectionbottom'>
                                        <div className='d-flex justify-content-between align-items-center p-3'>
                                            <h1>متصل</h1>
                                            <div>
                                                <i className="bi bi-star-fill customIcons"></i>
                                                5 (تقيم 21)                                                
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <p>قم بتطوير أعمالك عبر خدمة الواتساب المؤسسي مع منصة متصل  </p>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <button type='button' className='InstallButton'>تثبيت التطبيق</button>
                                        </div>
                                    </div>
                                </div>
                                <img src={Slider2} alt="Image2"/>       
                            </div>
                        
                    </SplideSlide>
                    <SplideSlide>
                    <div className='relepos'>
                                <div className='styleCard d-flex flex-column'>
                                    <div className='d-flex justify-content-end p-3'>
                                        <p className='StylePInCard'>
                                        <i className="bi bi-bookmark-star p-2"></i>
                                        يبدأ من 115.00 ريال/ 1 شهر
                                        </p>
                                    </div>
                                    <div className='d-flex flex-column sectionbottom'>
                                        <div className='d-flex justify-content-between align-items-center p-3'>
                                            <h1>بونات</h1>
                                            <div>
                                                <i className="bi bi-star-fill customIcons"></i>
                                                5 (تقيم 21)                                                
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <p>نظام الولاء والتفاعل مع العملاء, يمكنك من الحفاظ على عملاءك وزيادة المبيعات</p>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <button type='button' className='InstallButton'>تثبيت التطبيق</button>
                                        </div>
                                    </div>
                                </div>
                                <img src={Slider3} alt="Image1"/>
                            </div>
                      
                    </SplideSlide>
                    <SplideSlide>
                    <div className='relepos'>
                                <div className='styleCard d-flex flex-column'>
                                    <div className='d-flex justify-content-end p-3'>
                                        <p className='StylePInCard'>
                                        <i className="bi bi-bookmark-star p-2"></i>
                                        يبدأ من 115.00 ريال/ 1 شهر
                                        </p>
                                    </div>
                                    <div className='d-flex flex-column sectionbottom'>
                                        <div className='d-flex justify-content-between align-items-center p-3'>
                                            <h1>عناقيد </h1>
                                            <div>
                                                <i className="bi bi-star-fill customIcons"></i>
                                                5 (تقيم 21)                                                
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <p>احصل على تطبيق لمتجرك على iOS & Android</p>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <button type='button' className='InstallButton'>تثبيت التطبيق</button>
                                        </div>
                                    </div>
                                </div>
                                <img src={Slider4} alt="Image2"/>     
                            </div>
                        
                    </SplideSlide>
                    <SplideSlide>
                    <div className='relepos'>
                                <div className='styleCard d-flex flex-column'>
                                    <div className='d-flex justify-content-end p-3'>
                                        <p className='StylePInCard'>
                                        <i className="bi bi-bookmark-star p-2"></i>
                                        تجربة مجانية لمدة 14 يوم
                                        </p>
                                    </div>
                                    <div className='d-flex flex-column sectionbottom'>
                                        <div className='d-flex justify-content-between align-items-center p-3'>
                                            <h1>قلام</h1>
                                            <div>
                                                <i className="bi bi-star-fill customIcons"></i>
                                                5 (تقيم 21)                                                
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <p>خدمة تحليل السلال المهملة و التواصل التلقائي مع العملاء لإكمال الشراء عبر الرسائل البريدية و النصية.</p>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <button type='button' className='InstallButton'>تثبيت التطبيق</button>
                                        </div>
                                    </div>
                                </div>
                                <img src={Slider5} alt="Image2"/>
                            </div>
                        
                    </SplideSlide>
            </Splide>
           </div>

           {/* Second Card */}
           <section className='cSectionFour'>
            <h1>كل ما تحتاجه لنمو متجرك في مكان واحد</h1>
            <div className="sectionFour_container">
                {/* <div className="row"> */}
                <div className="sectionFour">
                    <div className='row planDetails'>
                        <div className='col-md-12'>
                            <div className='col-md-4 col-sm-4'>
                                <img src={pic4} alt='#'/>
                            </div>
                            <div className='col-md-12 col-sm-12'>
                                <h3>{t(`سهولة ادارة التطبيقات`)}</h3>
                                <p>{t(`سهولة ادارة وتفعيل التطبيقات من نفس لوحة التحكم`)}</p>
                            </div>
                        </div>
                        <div className='col-md-4 imageDetails'>
                            <img src={pic5} alt='#'/>
                        </div>
                    </div>
                </div>
                <div className="sectionFour  pro">
                    <div className='row planDetails'>
                        <div className='col-md-12'>
                            <div className='col-md-4 col-sm-4'>
                                <img src={pic3} alt='#'/>
                            </div>
                            <div className='col-md-12 col-sm-12'>
                                <h3>{t(`أسعار مناسبة`)}</h3>
                                <p>{t(`العديد من التطبيقات المجانية, والأسعار التنافسية مع تحربة مجانية للتطبيقات`)}</p>
                            </div>
                        </div>
                        <div className='col-md-4 imageDetails'>
                            <img src={pic5} alt='#'/>
                        </div>
                    </div>
                </div>
                <div className="sectionFour ">
                    <div className='row planDetails'>
                        <div className='col-md-12'>
                            <div className='col-md-4 col-sm-4'>
                                <img src={pic2} alt='#'/>
                            </div>
                            <div className='col-md-12 col-sm-12'>
                                <h3>{t(`دعم تقني`)}</h3>
                                <p>{t(`دعم فني وتقني متكامل من فريق سوق التطبيقات علي مدار الساعة`)}</p>
                            </div>
                        </div>
                        <div className='col-md-4 imageDetails'>
                            <img src={pic5} alt='#'/>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/* Card section three */}
        <section className='cSectionFive'>
            <h1>كل ما تحتاجه لنمو متجرك في مكان واحد</h1>
            <div className="sectionFive_container">
                {/* <div className="row"> */}
                <div className="sectionFive row">
                    <div className='moreDetail'>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-xl-3 col-lg-4 col-md-4 col-sm-3'>
                                    <img src={picSectionFive1} alt='#'/>
                                </div>
                                <div className='col-xl-9 col-lg-8 col-md-8 col-sm-9'>
                                    <h3>{t(`الشحن والتخزين`)}</h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-xl-3 col-lg-4 col-md-4 col-sm-3'>
                                    <img src={picSectionFive2} alt='#'/>
                                </div>
                                <div className='col-xl-9 col-lg-8 col-md-8 col-sm-9'>
                                    <h3>{t(`تطبيقات الجوال`)}</h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-xl-3 col-lg-4 col-md-4 col-sm-3'>
                                    <img src={picSectionFive3} alt='#'/>
                                </div>
                                <div className='col-xl-9 col-lg-8 col-md-8 col-sm-9'>
                                    <h3>{t(`تطبيقات الجوال`)}</h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-xl-3 col-lg-4 col-md-4 col-sm-3'>
                                    <img src={picSectionFive4} alt='#'/>
                                </div>
                                <div className='col-xl-9 col-lg-8 col-md-8 col-sm-9'>
                                    <h3>{t(`التسويق`)}</h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-xl-3 col-lg-4 col-md-4 col-sm-3'>
                                    <img src={picSectionFive5} alt='#'/>
                                </div>
                                <div className='col-xl-9 col-lg-8 col-md-8 col-sm-9'>
                                    <h3>{t(`المحاسبة`)}</h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-xl-3 col-lg-4 col-md-4 col-sm-3'>
                                    <img src={picSectionFive3} alt='#'/>
                                </div>
                                <div className='col-xl-9 col-lg-8 col-md-8 col-sm-9'>
                                    <h3>{t(`تطبيقات الجوال`)}</h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-xl-3 col-lg-4 col-md-4 col-sm-3'>
                                    <img src={picSectionFive1} alt='#'/>
                                </div>
                                <div className='col-xl-9 col-lg-8 col-md-8 col-sm-9'>
                                    <h3>{t(`تطبيقات الجوال`)}</h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3 details'>
                            <div className='row'>
                                <div className='col-xl-3 col-lg-4 col-md-4 col-sm-3'>
                                    <img src={picSectionFive5} alt='#'/>
                                </div>
                                <div className='col-xl-9 col-lg-8 col-md-8 col-sm-9'>
                                    <h3>{t(`تطبيقات الجوال`)}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


 {/* Card Icon Image Section */}
 <section className='cSectionSix'>
            <div className='row'>
                <div className='col-6 rightHeaderSection'>
                    <h1 >{t(`تطبيقات مجانية`)}</h1></div>
                <div className='col-6 leftHeaderSection'>
                    <h6 >{t(`أحدث التطبيقات`)}</h6>
                    <span><i className="bi bi-chevron-left"></i></span>
                </div>
            </div>
            <div className="sectionSix_container">
                {/* <div className="row"> */}
                <div className="sectionSix row">
                    <div className='moreDetail'>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-4'>
                                    <img src={picSectionSix1} alt='#'/>
                                </div>
                                <div className='col-8 leftSideCard'>
                                    <div className='starImg row'>
                                        <div className='col-6'><img src={star} alt='#'/></div>
                                        <div className='col-6'><span className='number'>5</span></div>
                                    </div>
                                    <div className='starImg row'>
                                        <div className='col-3'><img src={tag} alt='#'/></div>
                                        <div className='col-9'><p>تطبيق مجاني</p></div>
                                    </div>
                                </div>
                            </div>
                            <div><h3>Google Analystic</h3></div>
                            <div><h6>خدمة تمكنك من جمع وتحليل البيانات من متجرك بسهولة وسلالة</h6></div>
                        </div>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-4'>
                                    <img src={picSectionSix2} alt='#'/>
                                </div>
                                <div className='col-8 leftSideCard'>
                                    <div className='starImg row'>
                                        <div className='col-6'><img src={star} alt='#'/></div>
                                        <div className='col-6'><span className='number'>5</span></div>
                                    </div>
                                    <div className='starImg row'>
                                        <div className='col-3'><img src={tag} alt='#'/></div>
                                        <div className='col-9'><p>تطبيق مجاني</p></div>
                                    </div>
                                </div>
                            </div>
                            <div><h3>Google Analystic</h3></div>
                            <div><h6>خدمة تمكنك من جمع وتحليل البيانات من متجرك بسهولة وسلالة</h6></div>
                        </div>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-4'>
                                    <img src={picSectionSix3} alt='#'/>
                                </div>
                                <div className='col-8 leftSideCard'>
                                    <div className='starImg row'>
                                        <div className='col-6'><img src={star} alt='#'/></div>
                                        <div className='col-6'><span className='number'>5</span></div>
                                    </div>
                                    <div className='starImg row'>
                                        <div className='col-3'><img src={tag} alt='#'/></div>
                                        <div className='col-9'><p>تطبيق مجاني</p></div>
                                    </div>
                                </div>
                            </div>
                            <div><h3>Google Analystic</h3></div>
                            <div><h6>خدمة تمكنك من جمع وتحليل البيانات من متجرك بسهولة وسلالة</h6></div>
                        </div>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-4'>
                                    <img src={picSectionSix4} alt='#'/>
                                </div>
                                <div className='col-8 leftSideCard'>
                                    <div className='starImg row'>
                                        <div className='col-6'><img src={star} alt='#'/></div>
                                        <div className='col-6'><span className='number'>5</span></div>
                                    </div>
                                    <div className='starImg row'>
                                        <div className='col-3'><img src={tag} alt='#'/></div>
                                        <div className='col-9'><p>تطبيق مجاني</p></div>
                                    </div>
                                </div>
                            </div>
                            <div><h3>Google Analystic</h3></div>
                            <div><h6>خدمة تمكنك من جمع وتحليل البيانات من متجرك بسهولة وسلالة</h6></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Block BackGround */}
        <div className='SectionBlock'>
            <div className='styleSectionBlock'>
                <h1>مطور تطبيقات؟</h1>
                <h5>كن شريك زد في النمو والنجاح، طور تطبيقات وحلول تخدم التجار وانشرها على سوق تطبيقات كوجكت لأكثر من+7000 تاجر</h5>
                <button type='button' className='CustomButton'>سجل الان</button>
            </div>
            <img src={logo} className='imageBlock bckground' alt='#'/>
        </div>


       {/* Other Card Section Image */}
       <section className='cSectionSix'>
            <div className='row'>
                <div className='col-6 rightHeaderSection'>
                    <h1 >{t(`أحدث التطبيقات`)}</h1></div>
                <div className='col-6 leftHeaderSection'>
                    <h6 >{t(`جميع التطبيقات`)}</h6>
                    <span><i className="bi bi-chevron-left"></i></span>
                </div>
            </div>
            <div className="sectionSix_container">
                {/* <div className="row"> */}
                <div className="sectionSix row">
                    <div className='moreDetail'>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-4'>
                                    <img src={picSectionSix1} alt='#'/>
                                </div>
                                <div className='col-8 leftSideCard'>
                                    <div className='starImg row'>
                                        <div className='col-6'><img src={star} alt='#'/></div>
                                        <div className='col-6'><span className='number'>5</span></div>
                                    </div>
                                    <div className='starImg row'>
                                        <div className='col-2'><img src={tag} alt='#'/></div>
                                        <div className='col-10'><p> يبدأ من 115.00 ريال/ شهر</p></div>
                                    </div>
                                </div>
                            </div>
                            <div><h3>Google Analystic</h3></div>
                            <div><h6>خدمة تمكنك من جمع وتحليل البيانات من متجرك بسهولة وسلالة</h6></div>
                        </div>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-4'>
                                    <img src={picSectionSix2} alt='#'/>
                                </div>
                                <div className='col-8 leftSideCard'>
                                    <div className='starImg row'>
                                        <div className='col-6'><img src={star} alt='#'/></div>
                                        <div className='col-6'><span className='number'>5</span></div>
                                    </div>
                                    <div className='starImg row'>
                                        <div className='col-2'><img src={tag} alt='#'/></div>
                                        <div className='col-10'><p> يبدأ من 115.00 ريال/ شهر</p></div>
                                    </div>
                                </div>
                            </div>
                            <div><h3>Google Analystic</h3></div>
                            <div><h6>خدمة تمكنك من جمع وتحليل البيانات من متجرك بسهولة وسلالة</h6></div>
                        </div>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-4'>
                                    <img src={picSectionSix3} alt='#'/>
                                </div>
                                <div className='col-8 leftSideCard'>
                                    <div className='starImg row'>
                                        <div className='col-6'><img src={star} alt='#'/></div>
                                        <div className='col-6'><span className='number'>5</span></div>
                                    </div>
                                    <div className='starImg row'>
                                        <div className='col-2'><img src={tag} alt='#'/></div>
                                        <div className='col-10'><p> يبدأ من 115.00 ريال/ شهر</p></div>
                                    </div>
                                </div>
                            </div>
                            <div><h3>Google Analystic</h3></div>
                            <div><h6>خدمة تمكنك من جمع وتحليل البيانات من متجرك بسهولة وسلالة</h6></div>
                        </div>
                        <div className='col-md-3 col-sm-6 details'>
                            <div className='row'>
                                <div className='col-4'>
                                    <img src={picSectionSix4} alt='#'/>
                                </div>
                                <div className='col-8 leftSideCard'>
                                    <div className='starImg row'>
                                        <div className='col-6'><img src={star} alt='#'/></div>
                                        <div className='col-6'><span className='number'>5</span></div>
                                    </div>
                                    <div className='starImg row'>
                                        <div className='col-2'><img src={tag} alt='#'/></div>
                                        <div className='col-10'><p> يبدأ من 115.00 ريال/ شهر</p></div>
                                    </div>
                                </div>
                            </div>
                            <div><h3>Google Analystic</h3></div>
                            <div><h6>خدمة تمكنك من جمع وتحليل البيانات من متجرك بسهولة وسلالة</h6></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className='SectionBlock'>
            <div className='styleSectionBlock'>
                <h1>اقتراحاتكم تهمنا </h1>
                <h5>تاجرنا العزيز يسعدنا تقديم مقترحاتك لبرامج تساعدك في إدارة متجرك</h5>
                <button type='button' className='CustomButton'> اقترح تطبيق</button>
            </div>
            <img src={apps2} className='imageBlock bckground' alt='#'/>
        </div>



        {/* last Section */}
        {/* <div className='d-flex align-items-center  justify-content-between' style={{marginTop:"160px"}}>
            <div>
                <img className='bckground d-none75' src={PathRight} alt="hearobackground" />
            </div>
            <div className='SutfMarket'>
                <h1>
                اقتراحاتكم تهمنا
                </h1>
                <h5>
                جرَّب التجزئة بشكلها الحديث مع زد, انشئ متجرك الآن مجاناً وبدون رسوم
                </h5>
                <button type='button' className='InstallButton'> تصفح جميع التطبيقات</button>
            </div>
            <div>
                <img className='bckground d-none75' src={logo2} alt="hearobackground" />
            </div>
        </div> */}

        </React.Fragment>
    )
}

export default New;