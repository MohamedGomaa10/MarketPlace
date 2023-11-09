import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import ArLogo from "../../Assets/arLogo.png";

// Translation
import i18next from "i18next";

import { useTranslation } from "react-i18next";

// React Router
import { useNavigate } from "react-router-dom";

//icons
import { GrLanguage } from "react-icons/gr";

// Static Data
import StaticMenu from "../../Services/StaticData/SideMenuData.json";

// import { useCookies } from 'react-cookie';

//css
import "./MarketingNav.css";

const MarketingNav = () => {
  const Navigate = useNavigate();
  const { t } = useTranslation();
  // const [cookies] = useCookies(['JwtInfo']);
  const queryString = window.location.pathname;
  const [Token] = useState(!!localStorage.token || false);
  const [Language, setLanguage] = useState(localStorage.LANG || "ar");

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  // useEffect(() => {
  //   localStorage.setItem('token', cookies?.JwtInfo.ACCESS_TOKEN);
  // }, [cookies]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleShow = () => {
    window.scrollTo(0, 0);
  };

  const LoGout = () => {
    localStorage.clear();
    Navigate("/", { replace: true });
    window.location.reload();
  };

  const LanguageHandling = () => {
    if (Language === "ar") {
      setLanguage("en");
      localStorage.LANG = "en";
    } else {
      setLanguage("ar");
      localStorage.LANG = "ar";
    }
  };

  useEffect(() => {
    if (!localStorage.LANG) {
      localStorage.LANG = "ar";
    }

    const htmlRoot = document.querySelector("html") as HTMLElement;
    htmlRoot.setAttribute("dir", Language === "en" ? "ltr" : "rtl");
    htmlRoot.setAttribute("lang", Language === "en" ? "en" : "ar");
    i18next.changeLanguage(Language).then();
  }, [Language]);

  useEffect(() => {
    const ChangeMenu = document.getElementById("ChangeMenu");

    if (windowSize.innerWidth > 500) {
      ChangeMenu?.classList.remove("ShowMenu");
    }
  }, [windowSize]);

  //Show Menu
  const ShowMenu = () => {
    const ShowMenu = document.getElementById("ChangeMenu");
    if (ShowMenu) {
      ShowMenu?.classList.add("ShowMenu");
    }
  };

  useEffect(() => {
    const tabs = document.querySelectorAll(".content_body");
    const ShowMenu = document.getElementById("ChangeMenu");
    if (ShowMenu) {
      ShowMenu?.classList.remove("ShowMenu");
    }
    tabs.forEach((tab) => {
      if (tab.id === queryString) {
        tab.classList.add("activeHeader");
      } else {
        tab.classList.remove("activeHeader");
      }
    });
  }, [queryString])

  //Close Menu
  const CloseMenu = () => {
    const ShowMenu = document.getElementById("ChangeMenu");
    if (ShowMenu) {
      ShowMenu?.classList.remove("ShowMenu");
    }
  };

  return (
    <React.Fragment>
      <div className="headerNav">
        <div className="rightNav">
          <NavLink to={'/'}>
            <img src={ArLogo} alt="logo" className="LogoHome" />
          </NavLink>
          <i onClick={ShowMenu} className="bi bi-justify"></i>
          <NavLink to={'/'}>
            <img src={ArLogo} alt="logo" className="ShowLogo" />
          </NavLink>
          <div className="content_Nav">
            <i className="bi bi-x-circle" onClick={CloseMenu}></i>
            {!!StaticMenu.length &&
              StaticMenu.map((Data: any, Index: any) => (
                <NavLink to={Data?.URL} key={Index}>
                  <div className={`content_body`}
                    id={Data?.URL}>
                    <h1>{t(Data?.Name)}</h1>
                  </div>
                </NavLink>
              ))}
          </div>
        </div>
        <div className="settings">
          <div className="shape">
            <i className="bi bi-bell"></i>
          </div>
          <div className="dropdown">
            <div
              className="shape"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-gear"></i>
            </div>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li className="lang" onClick={LanguageHandling}>
                <div>{localStorage.getItem("LANG") === "ar" ? "En" : "Ar"}</div>
                <div>
                  <GrLanguage />
                </div>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              {Token ? (
                <li className="mobileMenu">
                  <NavLink to="/profile" onClick={handleShow}>
                    {localStorage.getItem("LANG") === "en"
                      ? localStorage.getItem("USER_NAME_TWO")
                      : localStorage.getItem("USER_NAME_ONE")}
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              <li>
                <hr className="dropdown-divider" />
              </li>
              {Token && (
                <li className="mobileMenu" onClick={LoGout}>
                  {t("LogOut")}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="FullScreen">
          <div className="lang" onClick={LanguageHandling} >
            <div>{localStorage.getItem("LANG") === "ar" ? "En" : "Ar"}</div>
            <div>
              <GrLanguage />
            </div>
          </div>
          {Token ? (
            <ul>
              <NavLink to="/profile" onClick={handleShow}>
                {localStorage.getItem("LANG") === "en"
                  ? localStorage.getItem("USER_NAME_TWO")
                  : localStorage.getItem("USER_NAME_ONE")}
              </NavLink>
            </ul>
          ) : (
            ""
          )}
          {Token && (
            <ul>
              <li onClick={LoGout}>{t("LogOut")}</li>
            </ul>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MarketingNav;
