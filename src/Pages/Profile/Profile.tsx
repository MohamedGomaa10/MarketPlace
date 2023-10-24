import React,{useState, useEffect} from "react";
import Nav from "../../Components/NavMenu/Nav";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

// Master Hooks
import { useAppDispatch } from "../../Services/MasterStore/MasterHook";

import { SelectUserProduct } from "../../Services/MasterStore/Reducers/UserProductSlice";

//translation
import { useTranslation } from "react-i18next";

import "./Profile.css";
import jwtDecode from "jwt-decode";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [Token] = useState(localStorage.getItem('token'));

    useEffect(() => {
      const decodedToken = Token && jwtDecode<any>(Token);
      decodedToken && dispatch(SelectUserProduct(decodedToken.UserId));
    }, [dispatch, Token]);
  
    // const formatDate = (dateString: any) => {
    //   const date = new Date(dateString);
    //   const year = date.getFullYear();
    //   const month = date.getMonth() + 1;
    //   const day = date.getDate();
    //   return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    // };

    // const OpenApp = (Url:string) =>{
    //   window.open(Url, "_blank", "noreferrer");
    // }

  return (
    <React.Fragment>
      <Nav />
      <div className="col-md-12 mtTabs">
        <Tabs defaultActiveKey="profile">
          <Tab eventKey="profile" title={t("Profile")}>
            <div className="ParantDiv">
              <div className="container mb-5">
                <div className="row">
                  <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center ">
                      <img
                        className="rounded-circle"
                        width="150px"
                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        alt="#"
                      />
                      <span className="font-weight-bold">Edogaru</span>
                      <span className="text-black-50">edogaru@mail.com.my</span>
                      <span> </span>
                    </div>
                  </div>
                  <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right">Profile Settings</h4>
                      </div>
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <label className="labels"></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("first_name")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="labels"></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("second_name")}
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <label className="labels"></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("enter_phone_number")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels"></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("Enter_Address_One")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels"></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("Enter_Address_Two")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels"></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("enter_Postcode")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels"></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("enter_State")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels"></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("enter_Area")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels"> </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("enter_email")}
                          />
                        </div>
                        <div className="col-md-12">
                          <label className="labels"></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("education")}
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label className="labels"></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("Country")}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="labels"></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("enter_State")}
                          />
                        </div>
                      </div>
                      <div className="mt-5 text-center">
                        <button
                          className="btn btn-primary profile-button"
                          type="button"
                        >
                          Save Profile
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="p-3 py-5">
                      <div className="d-flex justify-content-between align-items-center experience">
                        <span>Edit Experience</span>
                        <span className="border px-3 p-1 add-experience">
                          <i className="fa fa-plus"></i>&nbsp;Experience
                        </span>
                      </div>
                      <br />
                      <div className="col-md-12">
                        <label className="labels"></label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("experience")}
                        />
                      </div>{" "}
                      <br />
                      <div className="col-md-12">
                        <label className="labels"></label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("additinal_details")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default Profile;
