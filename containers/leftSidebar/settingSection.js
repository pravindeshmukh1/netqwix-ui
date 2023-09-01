import React, { useState, useContext, useEffect, useRef } from "react";
import { Edit, ChevronLeft, X, ChevronRight, PlusCircle } from "react-feather";
import { Input, Label } from "reactstrap";

import { Form, Formik } from "formik";

import CustomizerContext from "../../helpers/customizerContext";
import config from "../../config/customizerConfig";
import * as Yup from "yup";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { authState } from "../../app/components/auth/auth.slice";
import {
  AccountType,
  LOCAL_STORAGE_KEYS,
  validationMessage,
} from "../../app/common/constants";
import { UpdateSettingProfileForm } from "../../app/components/trainer/settings/form";
import { updateProfileAsync } from "../../app/components/trainer/trainer.slice";
import { updateTraineeProfileAsync } from "../../app/components/trainee/trainee.slice";
import { HandleErrorLabel } from "../../app/common/error";
import { toast } from "react-toastify";
import UploadFile from "../../app/common/uploadFile";

const SettingSection = (props) => {
  const dispatch = useAppDispatch();
  const socialFormRef = useRef(null);
  const { userInfo } = useAppSelector(authState);
  const customizerCtx = useContext(CustomizerContext);
  const addBackgroundWallpaper = customizerCtx.addBackgroundWallpaper;
  const [isSocialFormOpen, setIsSocialFormOpen] = useState(false);
  const [acctRequestDisable, setDisable] = useState(false);
  const [isCheck, setIsChecked] = useState(false);
  const [deleteAcct, setDeleteDisable] = useState(false);
  const [settingTab, setSettingTab] = useState("");
  const [profile, setProfile] = useState({
    username: "",
    address: "Alabma , USA",
    wallet_amount: 0,
    editStatus: false,
    profile_picture: undefined,
  });
  const [collapseShow, setCollapseShow] = useState({
    security: false,
    privacy: false,
    verfication: false,
    changeNumber: false,
    accountInfo: false,
    deleteAccount: false,
  });

  const initialValues = {
    fb: "",
    instagram: "",
    twitter: "",
    google: "",
    slack: "",
  };

  const validationSchema = Yup.object().shape({
    fb: Yup.string()
      .required(validationMessage.social_media.field_required)
      .nullable(),
    instagram: Yup.string()
      .required(validationMessage.social_media.field_required)
      .nullable(),
    twitter: Yup.string()
      .required(validationMessage.social_media.field_required)
      .nullable(),
    google: Yup.string()
      .required(validationMessage.social_media.field_required)
      .nullable(),
    slack: Yup.string()
      .required(validationMessage.social_media.field_required)
      .nullable(),
  });

  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    if (
      socialFormRef &&
      socialFormRef.current &&
      userInfo?.extraInfo &&
      userInfo?.extraInfo.social_media_links
    ) {
      socialFormRef.current.setValues({
        ...userInfo?.extraInfo.social_media_links,
      });
    }
  }, [socialFormRef]);

  useEffect(() => {
    setAccountType(localStorage.getItem(LOCAL_STORAGE_KEYS.ACC_TYPE));
  }, []);

  useEffect(() => {
    setProfile({
      ...profile,
      username: userInfo.fullname,
      address: userInfo.email,
      wallet_amount: userInfo.wallet_amount,
      profile_picture: userInfo.profile_picture,
    });
  }, [userInfo]);

  const funcChecked = (val) => {
    setIsChecked(val);
  };

  const ProfileHandle = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const EditProfile = (e) => {
    e.preventDefault();
    if (profile.editStatus) {
      if (profile.username && profile.username.trim().length) {
        // updating trainee profile
        if (accountType === AccountType.TRAINEE) {
          dispatch(updateTraineeProfileAsync({ fullname: profile.username }));
        } else if (accountType === AccountType.TRAINER) {
          // updating trainer profile
          dispatch(updateProfileAsync({ fullname: profile.username }));
        }
        setProfile({ ...profile, editStatus: !profile.editStatus });
      } else {
        toast("please enter required values.");
      }

      console.log(`save here `, profile);
    } else {
      setProfile({ ...profile, editStatus: !profile.editStatus });
    }
  };

  const closeLeftSide = () => {
    // document.querySelector(".settings-tab").classList.remove("active");
    // document.querySelector(".recent-default").classList.add("active");
    // props.ActiveTab("");
    props.smallSideBarToggle();
  };

  useEffect(() => {
    // wallpaper
    if (config.wallpaper) {
      document.querySelector(
        ".wallpapers"
      ).style = `background-image: url(${`/assets/images/wallpaper/${config.wallpaper}.jpg`}) ; background-color: transparent; background-blend-mode: unset`;
    }
  }, []);

  const setBackgroundWallpaper = (e, wallpaper) => {
    addBackgroundWallpaper(e, wallpaper);
    config.wallpaper = wallpaper;
  };

  const handelSelectFile = (event) => {
    if (event && event.target && event.target.files && event.target.files[0]) {
      const { files } = event.target;
      const file = URL.createObjectURL(files[0]);
      const selectedFile = files[0];
      setProfile({ ...profile, profile_picture: file });
    }
    event.stopPropagation();
  };
  const handelClearFile = () => {
    setProfile({ ...profile, profile_picture: undefined });
  };

  return (
    <div
      className={`settings-tab submenu-width dynemic-sidebar custom-scroll ${
        props.tab === "setting" ? "active" : ""
      }`}
      id="settings"
    >
      <div className="theme-title">
        <div className="media">
          <div>
            <h2>Settings</h2>
            <h4>Change your app setting.</h4>
          </div>
          <div className="media-body text-right">
            {" "}
            <a
              className="icon-btn btn-outline-light btn-sm close-panel"
              href="#"
              onClick={() => {
                closeLeftSide();
                setSettingTab("");
              }}
            >
              <X />
            </a>
          </div>
        </div>
        <div className="profile-box">
          <div className={`media ${profile.editStatus ? "open" : ""}`}>
            {profile.profile_picture && profile.editStatus ? (
              <div className="border border-dark rounded mt-2">
                <i
                  className="fa fa-times pointer"
                  aria-hidden="true"
                  onClick={handelClearFile}
                  style={{
                    position: "absolute",
                    left: "14%",
                    top: "42%",
                  }}
                />
                <img
                  className="bg-img rounded mt-1"
                  src={profile.profile_picture}
                  alt="Avatar"
                  width={44}
                  height={38}
                />
              </div>
            ) : (
              <div>
                {profile.editStatus && !profile.profile_picture ? (
                  <UploadFile
                    onChange={handelSelectFile}
                    values={profile && profile.profile_picture}
                    clearFile={handelClearFile}
                    key={"profile_picture"}
                    name={"profile_picture"}
                  />
                ) : (
                  <img
                    className="bg-img rounded mt-2"
                    src={profile.profile_picture}
                    alt="Avatar"
                    width={44}
                    height={40}
                  />
                )}
              </div>
            )}
            {/* </div> */}
            <div className="details">
              <h5>{profile.username}</h5>
              <h6>{profile.address}</h6>
              {accountType === AccountType.TRAINER && (
                <h6>
                  {" "}
                  Wallet Amount: <b> ${profile.wallet_amount} </b>{" "}
                </h6>
              )}
            </div>
            <div className="details edit">
              <form className="form-radious form-sm">
                <div className="form-group mb-2 ml-2">
                  <label> Full name </label>
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    defaultValue={profile.username}
                    onChange={(e) => ProfileHandle(e)}
                  />
                </div>
                {/* <div className="form-group mb-0">
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    defaultValue={profile.address}
                    onChange={(e) => ProfileHandle(e)}
                  />
                </div> */}
              </form>
            </div>
            <div className="media-body">
              <a
                className="icon-btn btn-outline-light btn-sm pull-right edit-btn"
                href="#"
                onClick={(e) => EditProfile(e)}
              >
                {" "}
                <Edit />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="setting-block">
        <div className={`block ${settingTab === "account" ? "open" : ""}`}>
          <div className="media">
            <div className="media-body">
              <h3>Account</h3>
            </div>
            <div className="media-right">
              <a
                className="icon-btn btn-outline-light btn-sm pull-right previous"
                href="#"
                onClick={() => setSettingTab("")}
              >
                {" "}
                <ChevronLeft />
              </a>
            </div>
          </div>
          <div className="theme-according" id="accordion">
            <div className="card">
              <div
                className="card-header"
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    security: !collapseShow.security,
                    privacy: false,
                    changeNumber: false,
                    accountInfo: false,
                    deleteAccount: false,
                    verfication: false,
                  })
                }
              >
                <a href="#javascript">
                  Security
                  <i className="fa fa-angle-down" />
                </a>
              </div>
              <div
                className={`collapse ${collapseShow.security ? "show" : ""}`}
                id="collapseTwo"
                data-parent="#accordion"
              >
                <div className="card-body">
                  <div className="media">
                    <div className="media-body">
                      <h5>Show Security notification</h5>
                    </div>
                    <div className="media-right">
                      <Label className="switch">
                        <Input type="checkbox" />
                        <span className="switch-state" />
                      </Label>
                    </div>
                  </div>
                  <p>
                    <b>Note : </b>turn on this setting to recive notification
                    when a contact's security code has been changes.
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="card">
              <div
                className="card-header"
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    privacy: !collapseShow.privacy,
                    changeNumber: false,
                    accountInfo: false,
                    deleteAccount: false,
                    verfication: false,
                    security: false,
                  })
                }
              >
                <a href="#javascript">
                  Privacy<i className="fa fa-angle-down"></i>
                </a>
              </div>
              <div className={`collapse ${collapseShow.privacy ? "show" : ""}`}>
                <div className="card-body">
                  <ul className="privacy">
                    <li>
                      <div className="media-body">
                        <h5>Last seen</h5>
                      </div>
                      <div className="media-right">
                        <Label className="switch">
                          <Input type="checkbox" />
                          <span className="switch-state"></span>
                        </Label>
                      </div>

                      <p>
                        {" "}
                        <b>Note : </b>turn on this setting to whether your
                        contact can see last seen or not.
                      </p>
                    </li>
                    <li>
                      <h5>Profile Photo</h5>
                      <div className="media-right">
                        <Label className="switch">
                          <Input type="checkbox" />
                          <span className="switch-state"></span>
                        </Label>
                      </div>
                      <p>
                        turn on this setting to whether your contact can see
                        your profile or not.
                      </p>
                    </li>
                    <li>
                      <h5>About</h5>
                      <div className="media-right">
                        <Label className="switch">
                          <Input type="checkbox" />
                          <span className="switch-state"></span>
                        </Label>
                      </div>
                      <p>
                        {" "}
                        <b>Note : </b>turn on this setting to whether your
                        contact can see about status or not.
                      </p>
                    </li>
                    <li>
                      <h5>Status</h5>
                      <div className="media-right">
                        <Label className="switch">
                          <Input type="checkbox" />
                          <span className="switch-state"></span>
                        </Label>
                      </div>
                      <p>
                        {" "}
                        <b>Note : </b>turn on this setting to whether your
                        contact can see your status or not.{" "}
                      </p>
                    </li>
                    <li>
                      <h5>Read receipts</h5>
                      <div className="media-right">
                        <Label className="switch">
                          <Input type="checkbox" />
                          <span className="switch-state"></span>
                        </Label>
                      </div>
                      <p>
                        {" "}
                        <b>Note : </b>If turn off this option you won't be able
                        to see read recipts from contact. read receipts are
                        always sent for group chats.{" "}
                      </p>
                    </li>
                    <li>
                      <h5>Groups</h5>
                      <div className="media-right">
                        <Label className="switch">
                          <Input type="checkbox" />
                          <span className="switch-state"></span>
                        </Label>
                      </div>
                      <p>
                        {" "}
                        <b>Note : </b>turn on this setting to whether your
                        contact can add in groups or not.{" "}
                      </p>
                    </li>
                    <li>
                      <h5>Screen Lock(Require Touch ID)</h5>
                      <div className="media-right">
                        <Label className="switch">
                          <Input type="checkbox" />
                          <span className="switch-state"></span>
                        </Label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
            <div className="card">
              <div
                className="card-header collapsed"
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    verfication: !collapseShow.verfication,
                    changeNumber: false,
                    accountInfo: false,
                    deleteAccount: false,
                    privacy: false,
                    security: false,
                  })
                }
              >
                <a href="#javascript">
                  Two Step verification
                  <i className="fa fa-angle-down" />
                </a>
              </div>
              <div
                className={`collapse ${collapseShow.verfication ? "show" : ""}`}
              >
                <div className="card-body">
                  <div className="media">
                    <div className="media-body">
                      <h5>Enable</h5>
                    </div>
                    <div className="media-right">
                      <div className="media-right">
                        <Label className="switch">
                          <Input type="checkbox" />
                          <span className="switch-state" />
                        </Label>
                      </div>
                    </div>
                  </div>
                  <p>
                    {" "}
                    <b>Note : </b>For added security, enable two-step
                    verifiation, which will require a PIN when registering your
                    phone number with Chitchat again.
                  </p>
                </div>
              </div>
            </div>
            <div className="card">
              <div
                className="card-header"
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    changeNumber: !collapseShow.changeNumber,
                    verfication: false,
                    accountInfo: false,
                    deleteAccount: false,
                    privacy: false,
                    security: false,
                  })
                }
              >
                <a href="#javascript">
                  Change Number
                  <i className="fa fa-angle-down" />
                </a>
              </div>
              <div
                className={`collapse ${
                  collapseShow.changeNumber ? "show" : ""
                }`}
              >
                <div className="card-body change-number">
                  <h5>Your old country code & phone number</h5>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text form-control m-0">
                        +
                      </span>
                    </div>
                    <input
                      className="form-control country-code"
                      type="number"
                      placeholder="01"
                    />
                    <input
                      className="form-control"
                      type="number"
                      placeholder="1234567895"
                    />
                  </div>
                  <h5>Your new country code & phone number</h5>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text form-control m-0">
                        +
                      </span>
                    </div>
                    <input
                      className="form-control country-code"
                      type="number"
                      placeholder="01"
                    />
                    <input
                      className="form-control"
                      type="number"
                      placeholder=""
                    />
                  </div>
                  <div className="text-right">
                    {" "}
                    <a
                      className="btn btn-outline-primary button-effect btn-sm"
                      href="#"
                    >
                      confirm
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div
                className="card-header"
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    accountInfo: !collapseShow.accountInfo,
                    changeNumber: false,
                    privacy: false,
                    deleteAccount: false,
                    verfication: false,
                    security: false,
                  })
                }
              >
                <a href="#javascript">
                  Request account info
                  <a className="fa fa-angle-down" />
                </a>
              </div>
              <div
                className={`collapse ${collapseShow.accountInfo ? "show" : ""}`}
              >
                <div className="card-body">
                  <a
                    className={`p-0 req-info ${
                      acctRequestDisable ? "disabled" : ""
                    }`}
                    id="demo"
                    href="#"
                    disabled={acctRequestDisable}
                    onClick={() => setDisable(true)}
                  >
                    Request Info
                  </a>
                  <p>
                    {" "}
                    <b>Note : </b>Create a report of your account information
                    and settings, which you can access ot port to another app.
                  </p>
                </div>
              </div>
            </div>
            <div className="card">
              <div
                className="card-header"
                onClick={() =>
                  setCollapseShow({
                    ...collapseShow,
                    deleteAccount: !collapseShow.deleteAccount,
                    changeNumber: false,
                    accountInfo: false,
                    privacy: false,
                    verfication: false,
                    security: false,
                  })
                }
              >
                <a href="#javascript">
                  Delete My account
                  <i className="fa fa-angle-down" />
                </a>
              </div>
              <div
                className={`collapse ${
                  collapseShow.deleteAccount ? "show" : ""
                }`}
              >
                <div className="card-body">
                  <a
                    className={`p-0 req-info font-danger ${
                      deleteAcct ? "disabled" : ""
                    }`}
                    href="#"
                    disabled={deleteAcct}
                    onClick={() => setDeleteDisable(true)}
                  >
                    Delete Account{" "}
                  </a>
                  <p>
                    {" "}
                    <b>Note :</b>Deleting your account will delete your account
                    info, profile photo, all groups & chat history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="media">
          <div className="media-body">
            <h3>Account</h3>
            <h4>Update Your Account Details</h4>
          </div>
          <div className="media-right">
            {" "}
            <a
              className="icon-btn btn-outline-light btn-sm pull-right next"
              href="#"
              onClick={() => setSettingTab("account")}
            >
              {" "}
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
      {accountType === AccountType.TRAINER ? (
        <div className="setting-block">
          <div className={`block ${settingTab === "my-profile" ? "open" : ""}`}>
            <div className="media">
              <div className="media-body">
                <h3>My profile</h3>
              </div>
              <div className="media-right">
                <a
                  className="icon-btn btn-outline-light btn-sm pull-right previous"
                  href="#"
                  onClick={() => setSettingTab("")}
                >
                  {" "}
                  <ChevronLeft />
                </a>
              </div>
            </div>
            {/* for trainer settings form */}
            <UpdateSettingProfileForm
              userInfo={userInfo}
              extraInfo={userInfo?.extraInfo || {}}
              onFormSubmit={(formValue) => {
                //
                dispatch(
                  updateProfileAsync({
                    extraInfo: { ...userInfo?.extraInfo, ...formValue },
                  })
                );
              }}
            />
          </div>
          <div className="media">
            <div className="media-body">
              <h3>My profile</h3>
              <h4>Update profile settings</h4>
            </div>
            <div className="media-right">
              {" "}
              <a
                className="icon-btn btn-outline-light btn-sm pull-right next"
                href="#"
                onClick={() => setSettingTab("my-profile")}
              >
                {" "}
                <ChevronRight />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* <div className='setting-block'>
        <div className={`block ${settingTab === 'chat' ? 'open' : ''}`}>
          <div className='media'>
            <div className='media-body'>
              <h3>Chat</h3>
            </div>
            <div className='media-right'>
              <a
                className='icon-btn btn-outline-light btn-sm pull-right previous'
                href='#'
                onClick={() => setSettingTab('')}
              >
                {' '}
                <ChevronLeft />
              </a>
            </div>
          </div>
          <ul className='help'>
            <li>
              <h5>Chat Backup</h5>
              <ul className='switch-list'>
                <li>
                  <Label className="switch-green">
                    <Input type="checkbox" defaultChecked /><span className="switch-state" ></span>
                  </Label>
                  <Label className='label-right'>Auto Backup</Label>
                </li>
                <li className='pt-0'>
                  <Label className="switch-green">
                    <Input type="checkbox" /><span className="switch-state" ></span>
                  </Label>
                  <Label className='label-right'>Include document</Label>
                </li>
                <li className='pt-0'>
                  <Label className="switch-green">
                    <Input type="checkbox" /><span className="switch-state" ></span>
                  </Label>
                  <Label className='label-right'>Include Videos</Label>
                </li>
              </ul>
            </li>
            <li>
              <h5>Chat wallpaper</h5>
              <ul className='wallpaper'>
                <li
                  onClick={(e) => setBackgroundWallpaper(e, 1)}
                  style={{
                    backgroundImage: `url('/assets/images/wallpaper/2.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                  <img
                    className='bg-img'
                    src='/assets/images/wallpaper/2.jpg'
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </li>
                <li
                  onClick={(e) => setBackgroundWallpaper(e, 2)}
                  style={{
                    backgroundImage: `url('/assets/images/wallpaper/1.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                  <img
                    className='bg-img'
                    src='/assets/images/wallpaper/1.jpg'
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </li>
                <li
                  onClick={(e) => setBackgroundWallpaper(e, 3)}
                  style={{
                    backgroundImage: `url('/assets/images/wallpaper/3.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                  <img
                    className='bg-img'
                    src='/assets/images/wallpaper/3.jpg'
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </li>
                <li
                  onClick={(e) => setBackgroundWallpaper(e, 4)}
                  style={{
                    backgroundImage: `url('/assets/images/wallpaper/4.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                  <img
                    className='bg-img'
                    src='/assets/images/wallpaper/4.jpg'
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </li>
                <li
                  onClick={(e) => setBackgroundWallpaper(e, 5)}
                  style={{
                    backgroundImage: `url('/assets/images/wallpaper/5.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                  <img
                    className='bg-img'
                    src='/assets/images/wallpaper/5.jpg'
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </li>
                <li
                  onClick={(e) => setBackgroundWallpaper(e, 6)}
                  style={{
                    backgroundImage: `url('/assets/images/wallpaper/6.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'block',
                  }}
                >
                  <img
                    className='bg-img'
                    src='/assets/images/wallpaper/6.jpg'
                    alt='Avatar'
                    style={{ display: 'none' }}
                  />
                </li>
              </ul>
            </li>
            <li>
              <h5>
                {' '}
                <a href='#'>Archive all chat</a>
              </h5>
            </li>
            <li>
              <h5>
                {' '}
                <a href='#'> Clear all chats</a>
              </h5>
            </li>
            <li>
              <h5>
                {' '}
                <a className='font-danger' href='#'>
                  Delete all chats
                </a>
              </h5>
            </li>
          </ul>
        </div>
        <div className='media'>
          <div className='media-body'>
            <h3>Chat</h3>
            <h4>Control Your Chat Backup</h4>
          </div>
          <div className='media-right'>
            {' '}
            <a
              className='icon-btn btn-outline-light btn-sm pull-right next'
              href='#'
              onClick={() => setSettingTab('chat')}
            >
              {' '}
              <ChevronRight />
            </a>
          </div>
        </div>
      </div> */}
      {accountType === AccountType.TRAINER ? (
        <>
          <div className="setting-block">
            <div
              className={`block ${settingTab === "integratin" ? "open" : ""}`}
            >
              <div className="media">
                <div className="media-body">
                  <h3>Integration</h3>
                </div>
                <div className="media-right">
                  {" "}
                  <a
                    className="icon-btn btn-outline-light btn-sm pull-right previous"
                    href="#"
                    onClick={() => setSettingTab("")}
                  >
                    <ChevronLeft />
                  </a>
                  <div
                    className="icon-btn btn-outline-light btn-sm pull-right edit-btn pointer"
                    // href="#"
                    onClick={() => {
                      setIsSocialFormOpen(!isSocialFormOpen);
                    }}
                  >
                    {" "}
                    {isSocialFormOpen ? <X /> : <Edit />}
                  </div>
                </div>
              </div>
              <Formik
                innerRef={socialFormRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(value) => {
                  const payload = {
                    ...userInfo?.extraInfo,
                    social_media_links: value,
                  };
                  dispatch(updateProfileAsync({ extraInfo: { ...payload } }));
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleSubmit,
                  handleBlur,
                  setValues,
                  isValid,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <ul className="integratin">
                      <li>
                        <div className="media">
                          <div className="media-left">
                            <a
                              className="fb"
                              // href={
                              //   values.fb || "https://www.facebook.com/login"
                              // }
                              target="_blank"
                              style={{ cursor: "text" }}
                              href={null}
                            >
                              <i className="fa fa-facebook mr-1" />
                              <h5>Facebook </h5>
                            </a>
                          </div>

                          {/* <div className="media-right">
                        <div
                          className="profile"
                          style={{
                            backgroundImage: `url('assets/images/contact/1.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className="bg-img"
                            src="/assets/images/contact/1.jpg"
                            alt="Avatar"
                            style={{ display: 'none' }}
                          />
                        </div>
                      </div> */}
                        </div>
                        {isSocialFormOpen ? (
                          <>
                            <div className="row">
                              <div className="col-6">
                                <div className="form-group">
                                  <input
                                    onChange={(event) => {
                                      const { value } = event.target;
                                      setValues({ ...values, fb: value });
                                    }}
                                    value={values.fb}
                                    placeholder="Facebook URL"
                                    type="url"
                                    onBlur={handleBlur}
                                    className="form-control mt-1"
                                    name="fb"
                                    id=""
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div>
                              <HandleErrorLabel
                                isError={errors.fb}
                                isTouched={
                                  touched.fb && errors.fb ? true : false
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <>{values.fb || "Not available"}</>
                        )}
                      </li>
                      <li>
                        <div className="media">
                          <div className="media-left">
                            <a
                              className="insta"
                              // href={
                              //   values.instagram ||
                              //   "https://www.instagram.com/accounts/login/?hl=en"
                              // }
                              style={{ cursor: "text" }}
                              href={null}
                              target="_blank"
                            >
                              <i className="fa fa-instagram mr-1" />
                              <h5>instagram</h5>
                            </a>
                          </div>
                          {/* <div className="media-right">
                        <div
                          className="profile"
                          style={{
                            backgroundImage: `url('assets/images/contact/2.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className="bg-img"
                            src="/assets/images/contact/2.jpg"
                            alt="Avatar"
                            style={{ display: 'none' }}
                          />
                        </div>
                      </div> */}
                        </div>
                        {isSocialFormOpen ? (
                          <>
                            <div className="row">
                              <div className="col-6">
                                <div className="form-group">
                                  <input
                                    onChange={(event) => {
                                      const { value } = event.target;
                                      setValues({
                                        ...values,
                                        instagram: value,
                                      });
                                    }}
                                    value={values.instagram}
                                    placeholder="Instagram URL"
                                    type="url"
                                    onBlur={handleBlur}
                                    className="form-control mt-1"
                                    name="Instagram"
                                    id=""
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div>
                              <HandleErrorLabel
                                isError={errors.instagram}
                                isTouched={
                                  touched.instagram && errors.instagram
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <>{values.instagram || "Not available"}</>
                        )}
                      </li>
                      <li>
                        <div className="media">
                          <div className="media-left">
                            <a
                              className="twi"
                              // href={
                              //   values.twitter || "https://twitter.com/login"
                              // }
                              style={{ cursor: "text" }}
                              href={null}
                              target="_blank"
                            >
                              <i className="fa fa-twitter mr-1" />
                              <h5>twitter </h5>
                            </a>
                          </div>
                          {/* <div className="media-right">
                        <div
                          className="profile"
                          style={{
                            backgroundImage: `url('assets/images/contact/3.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className="bg-img"
                            src="/assets/images/contact/3.jpg"
                            alt="Avatar"
                            style={{ display: 'none' }}
                          />
                        </div>
                      </div> */}
                        </div>
                        {isSocialFormOpen ? (
                          <>
                            <div className="row">
                              <div className="col-6">
                                <div className="form-group">
                                  <input
                                    onChange={(event) => {
                                      const { value } = event.target;
                                      setValues({ ...values, twitter: value });
                                    }}
                                    value={values.twitter}
                                    placeholder="Twitter URL"
                                    type="url"
                                    onBlur={handleBlur}
                                    className="form-control mt-1"
                                    name="Twitter"
                                    id=""
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div>
                              <HandleErrorLabel
                                isError={errors.twitter}
                                isTouched={
                                  touched.twitter && errors.twitter
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <>{values.twitter || "Not available"}</>
                        )}
                      </li>
                      <li>
                        <div className="media">
                          <div className="media-left">
                            <a
                              className="ggl"
                              style={{ cursor: "text" }}
                              // href={
                              //   values.google ||
                              //   "https://accounts.google.com/signin/v2/identifier?service=mail&amp;passive=true&amp;rm=false&amp;continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&amp;ss=1&amp;scc=1&amp;ltmpl=default&amp;ltmplcache=2&amp;emr=1&amp;osid=1&amp;flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin"
                              // }
                              href={null}
                              target="_blank"
                            >
                              <i className="fa fa-linkedin mr-1" />
                              <h5>Linkedin</h5>
                            </a>
                          </div>
                          {/* <div className="media-right">
                        <div
                          className="profile"
                          style={{
                            backgroundImage: `url('assets/images/contact/2.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'block',
                          }}
                        >
                          <img
                            className="bg-img"
                            src="/assets/images/contact/2.jpg"
                            alt="Avatar"
                            style={{ display: 'none' }}
                          />
                        </div>
                      </div> */}
                        </div>
                        {isSocialFormOpen ? (
                          <>
                            <div className="row">
                              <div className="col-6">
                                <div className="form-group">
                                  <input
                                    onChange={(event) => {
                                      const { value } = event.target;
                                      setValues({ ...values, google: value });
                                    }}
                                    value={values.google}
                                    placeholder="Linkedin URL"
                                    type="url"
                                    onBlur={handleBlur}
                                    className="form-control mt-1"
                                    name="Google"
                                    id=""
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div>
                              <HandleErrorLabel
                                isError={errors.google}
                                isTouched={
                                  touched.google && errors.google ? true : false
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <>{values.google || "Not available"}</>
                        )}
                      </li>
                      <li>
                        <div className="media">
                          <div className="media-left">
                            <a
                              className="slc"
                              style={{ cursor: "text" }}
                              href={null}
                            >
                              <i className="fa fa-globe mr-1" />
                              <h5>My website</h5>
                            </a>
                          </div>
                          {/* <div className="media-right">
                        <div className="profile">
                          <a href="https://slack.com/get-started#/" target="_blank">
                            <PlusCircle />
                          </a>
                        </div>
                      </div> */}
                        </div>
                        {isSocialFormOpen ? (
                          <>
                            <div className="row">
                              <div className="col-6">
                                <div className="form-group">
                                  <input
                                    onChange={(event) => {
                                      const { value } = event.target;
                                      setValues({ ...values, slack: value });
                                    }}
                                    value={values.slack}
                                    placeholder="Website URL"
                                    type="url"
                                    onBlur={handleBlur}
                                    className="form-control mt-1"
                                    name="Slack"
                                    id=""
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div>
                              <HandleErrorLabel
                                isError={errors.slack}
                                isTouched={
                                  touched.slack && errors.slack ? true : false
                                }
                              />
                            </div>
                          </>
                        ) : (
                          <>{values.slack || "Not available"}</>
                        )}
                        {isSocialFormOpen ? (
                          <>
                            <div className="my-4">
                              <div className="d-flex  mt-4">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Save details
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </li>
                    </ul>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="media">
              <div className="media-body">
                <h3>Integration</h3>
                <h4>Sync Your Other Social Account</h4>
              </div>
              <div className="media-right">
                {" "}
                <a
                  className="icon-btn btn-outline-light btn-sm pull-right next"
                  href="#"
                  onClick={() => setSettingTab("integratin")}
                >
                  {" "}
                  <ChevronRight />
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="setting-block">
        <div className={`block ${settingTab === "help" ? "open" : ""}`}>
          <div className="media">
            <div className="media-body">
              <h3>Help</h3>
            </div>
            <div className="media-right">
              {" "}
              <a
                className="icon-btn btn-outline-light btn-sm pull-right previous"
                href="#"
                onClick={() => setSettingTab("")}
              >
                {" "}
                <ChevronLeft />
              </a>
            </div>
          </div>
          <ul className="help">
            <li>
              <h5>
                {" "}
                <a href="#">FAQ</a>
              </h5>
            </li>
            <li>
              <h5>
                {" "}
                <a href="#"> Contact Us</a>
              </h5>
            </li>
            <li>
              <h5>
                {" "}
                <a href="#">Terms and Privacy Policy</a>
              </h5>
            </li>
            {/* <li>
              <h5>
                {" "}
                <a href="#">Licenses</a>
              </h5>
            </li> */}
            {/* <li>
              <h5>
                {" "}
                <a href="#">2019 - 20 Powered by Pixelstrap</a>
              </h5>
            </li> */}
          </ul>
        </div>
        <div className="media">
          <div className="media-body">
            <h3>Help</h3>
            <h4>How can we help you?</h4>
          </div>
          <div className="media-right">
            {" "}
            <a
              className="icon-btn btn-outline-light btn-sm pull-right next"
              href="#"
              onClick={() => setSettingTab("help")}
            >
              {" "}
              <ChevronRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingSection;
