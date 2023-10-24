import React, { FC } from "react";

//translation
import { useTranslation } from "react-i18next";

//images
import HearoImage from "../../Assets/whyusHearo.png";
import Attia from "../../Assets/attia.png";
import Younis from "../../Assets/yonis.png";

//css
import "./WhyUs.css";

const WhyUs: FC = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <section className="whyus">
        <div>
          <button className="button_header">{t(`hearoStart`)}</button>
        </div>
        <img className="hearo_image" src={HearoImage} alt="hearoimage" />
        <section className="story">
          <h2>{t(`story`)}</h2>
          <ul>
            <li>{t(`story-one`)}</li>
            <li>{t(`story-two`)}</li>
            <li>
              {t(`story-three`)} <span>{t(`freeTrial`)}</span>{" "}
              {t(`story-three-two`)}
            </li>
            <li>{t(`story-four`)}</li>
          </ul>
        </section>
        <section className="our_team">
          <h2>{t(`our-team`)}</h2>
          <p className="info">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua.
          </p>
          <ul>
            <li>
              <img src={Attia} alt="user" />
              <div className="info">
                <h3>{t(`Yonis`)}</h3>
                <p>{t(`Co-founder`)}</p>
              </div>
            </li>
            <li>
              <img src={Younis} alt="user" />
              <div className="info">
                <h3>{t(`Yonis`)}</h3>
                <p>{t(`Co-founder`)}</p>
              </div>
            </li>
          </ul>
        </section>
      </section>
    </React.Fragment>
  );
};

export default WhyUs;
