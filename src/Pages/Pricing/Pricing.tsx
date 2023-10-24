import React, { FC, useEffect, useState, useMemo } from "react";

//translation
import { useTranslation } from "react-i18next";

//images
import Stream from "../../Assets/streamline.png";
//icons
import { BiInfoCircle } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

//css
import "./Pricing.css";

const Pricing: FC = () => {
  const { t } = useTranslation();
  const [Index, setIndex] = useState(0);
  const data =useMemo(() => [
    {
      proPrice: 750,
      businessPrice: 1450,
    },
    {
      proPrice: 75,
      businessPrice: 145,
    },
  ], []);
  const [PricePlan, setPricePlan] = useState(data[Index]);

  const handleMonth = (e: any) => {
    setIndex(1);
  };

  const handleAnnual = (e: any) => {
    setIndex(0);
  };

  useEffect(() => {
    setPricePlan(data[Index]);
  }, [Index, data]);

  return (
    <React.Fragment>
      <section className="pricing">
        <div className="pricing_type">
          <span>{t(`save15`)}</span>
          <ul>
            <li>
              <button
                className={`${Index === 0 && "inline"}`}
                onClick={handleAnnual}
              >
                {t(`annual`)}
              </button>
            </li>
            <li>
              <button
                className={`${Index === 1 && "inline"}`}
                onClick={handleMonth}
              >
                {t(`monthly`)}
              </button>
            </li>
          </ul>
        </div>
        <div className="plan_container">
          <div className="plan">
            <h3>{t(`basic`)}</h3>
            <p>{t(`basicDesc`)}</p>
            <h3 className="price">{t(`free`)}</h3>
          </div>
          <div className="plan pro">
            <h3>
              {" "}
              {t(`pro`)} <span>{t(`mostPopular`)}</span>
            </h3>
            <p>{t(`proDesc`)}</p>
            <h3 className="price">
              ${PricePlan.proPrice}
              <span>/{t(`year`)}</span>
            </h3>
          </div>
          <div className="plan">
            <h3>{t(`business`)}</h3>
            <p>{t(`businessDesc`)}</p>
            <h3 className="price">
              ${PricePlan.businessPrice}
              <span>/{t(`year`)}</span>
            </h3>
          </div>
          <div className="plan enterprise">
            <h3>{t(`enterprise`)}</h3>
            <p>{t(`enterpriseDesc`)}</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>{t(`features`)}</th>
              <th>
                <button>{t(`startNow`)}</button>
              </th>
              <th>
                <button className="inline">{t(`startNow`)}</button>
              </th>
              <th>
                <button>{t(`startNow`)}</button>
              </th>
              <th>
                <button>{t(`startNow`)}</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <BiInfoCircle />
                {t(`userNum`)}{" "}
              </td>
              <td>1</td>
              <td>5</td>
              <td>10</td>
              <td>{t(`unlimited`)}</td>
            </tr>
            <tr>
              <td>
                {" "}
                <BiInfoCircle />
                {t(`projectNum`)}
              </td>
              <td>{t(`unlimited`)}</td>
              <td>{t(`unlimited`)}</td>
              <td>{t(`unlimited`)}</td>
              <td>{t(`unlimited`)}</td>
            </tr>
            <tr>
              <td>
                {" "}
                <BiInfoCircle />
                {t(`active`)}
              </td>
              <td>1</td>
              <td>5</td>
              <td>100</td>
              <td>{t(`unlimited`)}</td>
            </tr>
            <tr>
              <td>
                {" "}
                <BiInfoCircle />
                {t(`archive`)}
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <BiInfoCircle />
                {t(`downloadSource`)}
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <BiInfoCircle />
                {t(`restartArchive`)}
              </td>
              <td>
                <IoMdClose className="false" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <BiInfoCircle />
                Dev Ops
              </td>
              <td>
                <IoMdClose className="false" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <BiInfoCircle />
                {t(`cojectPms`)}
              </td>
              <td>
                <IoMdClose className="false" />
              </td>
              <td>
                <IoMdClose className="false" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <BiInfoCircle />
                {t(`hoisting`)}
              </td>
              <td>
                <IoMdClose className="false" />
              </td>
              <td>
                <IoMdClose className="false" />
              </td>
              <td>
                <IoMdClose className="false" />
              </td>
              <td>
                <BsFillCheckCircleFill className="true" />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <BiInfoCircle />
                {t(`additionals`)}
              </td>
              <td>$15 {t(`perUser`)}</td>
              <td>$20 {t(`perUser`)}</td>
              <td>$20 {t(`perUser`)}</td>
              <td>{t(`free`)}</td>
            </tr>
            <tr>
              <td>
                {" "}
                <BiInfoCircle />
                {t(`support`)}
              </td>
              <td>{t(`supportCommunity`)}</td>
              <td>{t(`supportMail`)}</td>
              <td>{t(`priorityMail`)}</td>
              <td>
                {t(`24support`)}
                <br />
                {t(`24support2`)}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="stream">
          <div className="image">
            <img src={Stream} alt="stream" />
          </div>
          <div className="info">
            <h2>{t(`stream_work`)}</h2>
            <p>{t(`stream_desc_one`)}</p>
            <p>{t(`stream_desc_two`)}</p>
            <button>{t(`bookDemo`)}</button>
          </div>
        </div>
        <div className="container"></div>
      </section>
    </React.Fragment>
  );
};

export default Pricing;
