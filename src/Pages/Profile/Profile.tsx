import React, { useState, useEffect } from "react";
import Nav from "../../Components/NavMenu/Nav";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

// Master Hooks
import { useAppDispatch } from "../../Services/MasterStore/MasterHook";

import { SelectUserProduct } from "../../Services/MasterStore/Reducers/UserProductSlice";

import { ChangeUserPasswordSlice } from "../../Services/MasterStore/Reducers/UserSlice";

//translation
import { useTranslation } from "react-i18next";

import "./Profile.css";
import jwtDecode from "jwt-decode";

// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [Token] = useState(localStorage.getItem("token"));
  const [messageError, setMessageError] = useState('');
  const [type, setType] = useState({
    Old_Password: "password",
    New_Password: "password",
    Confirm_Password: "password",
  });
  const [icon, setIcon] = useState({
    Old_Password: eye,
    New_Password: eye,
    Confirm_Password: eye,
  });
  const { register, handleSubmit } = useForm();

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

  const handleToggle = (id: any) => {
    if (id === "Old_Password") {
      if (type.Old_Password === "password") {
        setIcon((prev) => {
          return { ...prev, Old_Password: eyeOff};
        });
        setType((prev) => {
          return { ...prev, Old_Password: "text" };
        });
      } else {
        setIcon((prev) => {
          return { ...prev, Old_Password: eye };
        });
        setType((prev) => {
          return { ...prev, Old_Password: "password" };
        });
      }
    }
    else if (id === "New_Password") {
      if (type.New_Password === "password") {
        setIcon((prev) => {
          return { ...prev, New_Password: eyeOff };
        });
        setType((prev) => {
          return { ...prev, New_Password: "text" };
        });
      } else {
        setIcon((prev) => {
          return { ...prev, New_Password: eye };
        });
        setType((prev) => {
          return { ...prev, New_Password: "password" };
        });
      }
    }
    else {
      if (type.Confirm_Password === "password") {
        setIcon((prev) => {
          return { ...prev, Confirm_Password: eyeOff };
        });
        setType((prev) => {
          return { ...prev, Confirm_Password: "text" };
        });
      } else {
        setIcon((prev) => {
          return { ...prev, Confirm_Password: eye };
        });
        setType((prev) => {
          return { ...prev, Confirm_Password: "password" };
        });
      }
    }
  };

  const ChangePassword: SubmitHandler<any> = (data) => {
    const Data = {
      NEW_PASSWORD: data.New_Password
    }
    if(data.New_Password === data.Confirm_Password){
      dispatch(ChangeUserPasswordSlice(Data));
    }else{
      setMessageError('كلمات المرور غير متطابقة');
    }
  }

  return (
    <React.Fragment>
      <Nav />
      <div className="col-md-12 mtTabs">
        <Tabs defaultActiveKey="profile">
          <Tab eventKey="profile" title={t("Profile")}>
            <div className="ParantDiv">
              <div className="container mb-5">
                <div className="row justify-content-center">
                  <div className="col-md-3">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        className="rounded-circle"
                        width="150px"
                        src={`https://dev.aait.com.sa/ProfileImageHandler/ProfileImage/${localStorage?.UserInfo
                            ? JSON.parse(localStorage?.UserInfo)?.PROFILE_IMAGE
                            : ""
                          }}/${localStorage?.UserInfo
                            ? JSON.parse(localStorage?.UserInfo)?.USER_NAME
                            : ""
                          }}`}
                        alt="Profile Pic"
                      />
                      {/* <input type="file" id="myFile" name="filename" /> */}
                      <div className="Upload">
                        <i className="bi bi-cloud-upload"></i>
                        <input type="file" id="National_Identity" />
                        <p>{t("Choose File")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="publicProfileForm mb-5">
                      <h3 className="mb-4">{t("Public Profile")}</h3>
                      <form>
                        <div className="row justify-content-center">
                          <div className="col-md-12 mb-4">
                            <div className="row">
                              <div className="col-md-2 d-flex align-items-center">
                                <label className="labels" htmlFor="Name">{t("Name")}</label>
                              </div>
                              <div className="col-md-10">
                                <input id="Name" type="text" className="form-control" placeholder={t("Name")}/>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-4">
                            <div className="row">
                              <div className="col-md-2 d-flex align-items-center">
                                <label className="labels" htmlFor="Email">{t("Email")}</label>
                              </div>
                              <div className="col-md-10">
                                <input id="Email" type="text" className="form-control" placeholder={t("Email")}/>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-4">
                            <div className="row">
                              <div className="col-md-2 d-flex align-items-center">
                                <label className="labels" htmlFor="Prefered_Language">
                                  {t("Prefered_Language")}
                                </label>
                              </div>
                              <div className="col-md-10">
                                <select id="Prefered_Language" className="form-control w-100">
                                  <option value="">{t("Select")}</option>
                                  <option value="English">{"English"}</option>
                                  <option value="Arabic">{"عربي"}</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row justify-content-end mt-3">
                          <div className="col-md-3 d-flex justify-content-end">
                            <button className="btn text-dark bg-light" type="submit">
                              {t("Save")}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <hr />
                    <div className="authentication">
                      <h3 className="mb-4">{t("Password and Authentication")}</h3>
                      <form onSubmit={handleSubmit((data) => ChangePassword(data))}>
                        <div className="row justify-content-center">
                          <div className="col-md-12 mb-4">
                            <div className="row">
                              <div className="col-md-2 d-flex align-items-center">
                                <label className="labels" htmlFor="User_Name">
                                  {t("User_Name")}
                                </label>
                              </div>
                              <div className="col-md-10">
                                <input name="User_Name" id="User_Name" type="text" className="form-control" placeholder={t("User_Name")}/>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-4">
                            <div className="row">
                              <div className="col-md-2 d-flex align-items-center">
                                <label className="labels" htmlFor="Old_Password">{t("Old_Password")}</label>
                              </div>
                              <div className="col-md-10 passParent">
                                <input id="Old_Password" type={type.Old_Password} className="form-control" placeholder={t("Old_Password")}/>
                                <span className="passIcon" onClick={() => { handleToggle("Old_Password") }}>
                                  <Icon className="absolute mr-10" icon={icon.Old_Password} size={20}/>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-4">
                            <div className="row">
                              <div className="col-md-2 d-flex align-items-center">
                                <label className="labels" htmlFor="New_Password">{t("New_Password")}</label>
                              </div>
                              <div className="col-md-10 passParent">
                                <input {...register("New_Password", { required: true })} name="New_Password" id="New_Password" type={type.New_Password} className="form-control" placeholder={t("New_Password")}/>
                                <span className="passIcon" onClick={() => { handleToggle("New_Password"); }}>
                                  <Icon className="absolute mr-10" icon={icon.New_Password} size={20}/>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 mb-4">
                            <div className="row">
                              <div className="col-md-2 d-flex align-items-center">
                                <label className="labels" htmlFor="Confirm_Password">
                                  {t("Confirm_Password")}
                                </label>
                              </div>
                              <div className="col-md-10 passParent">
                                <input {...register("Confirm_Password", { required: true })} name="Confirm_Password" id="Confirm_Password" type={type.Confirm_Password} className="form-control" placeholder={t("Confirm_Password")}/>
                                <span className="passIcon" onClick={() => { handleToggle("Confirm_Password");}}>
                                  <Icon className="absolute mr-10" icon={icon.Confirm_Password} size={20}/>
                                </span>
                              <small>{messageError}</small>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row justify-content-end mt-3">
                          <div className="col-md-3 d-flex justify-content-end">
                            <button className="btn text-dark bg-light" type="submit">
                              {t("Change Password")}
                            </button>
                          </div>
                        </div>
                      </form>
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
