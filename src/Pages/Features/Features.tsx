import React, { FC } from "react";

//Images
import features from "../../Assets/features.png";
import toolbox from "../../Assets/toolbox.png";
import Simultaneous from "../../Assets/simultaneous.png";
import Team from "../../Assets/team.png";
import Key from "../../Assets/roles.png";
import TaskOne from "../../Assets/task1.svg";
import TaskTwo from "../../Assets/task2.svg";
import Realtime from "../../Assets/realtime.png";
import debug from "../../Assets/debug.png";
import Automation from "../../Assets/automation.png";
import Cloud from "../../Assets/cloud.png";
import Close from "../../Assets/close.svg";
//Css
import "./Features.css";
import { useTranslation } from "react-i18next";

const Features: FC = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <section className="features">
        <div className="container">
          <div className="flex_item">
            <div className="left">
              <img src={toolbox} alt="icon" />
              <h2>{t(`tool-box`)}</h2>
              <p>{t(`tool-box-descOne`)}</p>
              <p>{t(`tool-box-descTwo`)}</p>
            </div>
            <div className="right">
              <img src={features} alt="toolbox" />
            </div>
          </div>
          <div className="flex_item">
            <div className="left">
              <img src={Simultaneous} alt="toolbox" />
            </div>
            <div className="right">
              <img src={Team} alt="icon" />
              <h2>{t(`simultaneous`)}</h2>
              <p>{t(`simultaneous-desc`)}</p>
            </div>
          </div>
          <div className="flex_item">
            <div className="left">
              <img src={Key} alt="icon" />
              <h2>
                {t(`management`)}
                <span>BETA</span>{" "}
              </h2>
              <p>{t(`management-desc`)}</p>
            </div>
            <div className="right">
              <div className="image_containers">
                <div className="one">
                  <img src={TaskOne} alt="icon" />
                  <p>
                    Aziz made changes in the <span>Warehouse App</span> project.
                  </p>
                  <span className="time">3h ago</span>
                  <img src={Close} alt="icon" />
                </div>
                <div className="two">
                  <img src={TaskTwo} alt="icon" />
                  <p>
                    Rakan invited you to <span>Student Data</span> project.
                  </p>
                  <span className="time">5d ago</span>
                  <img src={Close} alt="icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex_item">
            <div className="left">
              <img src={Realtime} alt="toolbox" />
            </div>
            <div className="right">
              <div className="bottom">
                <img src={debug} alt="icon" />
                <h2>{t(`realtime`)}</h2>
                <p>{t(`realtime-desc`)}</p>
              </div>
            </div>
          </div>
          <div className="flex_item">
            <div className="left">
              <img src={Automation} alt="icon" />
              <h2>{t(`automation`)}</h2>
              <p>{t(`automation-descOne`)}</p>
              <p>{t(`automation-descTwo`)}</p>
            </div>
            <div className="right">
              <img src={Cloud} alt="icon" />
              <h2>{t(`cloud-feature`)}</h2>
              <p>{t(`cloud-feature-desc`)}</p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Features;
