import React, { useEffect, useLayoutEffect } from "react";
import FevoriteSection from "./fevoriteSection";
import DocumentSection from "./documentSection";
import ContactListSection from "./contactListSection";
import NotificationSection from "./notificationSection";
import SettingSection from "./settingSection";
import StatusSection from "./statusSection";
import RecentSection from "./recentSection";
import ChatSection from "./chatSection";
import { Fragment, useState } from "react";
import { NavLink, TabContent, TabPane } from "reactstrap";
import { useRouter } from "next/router";
import { Tooltip } from "react-tippy";
import Link from "next/link";
import { useAppDispatch } from "../../app/store";
import { authAction } from "../../app/components/auth/auth.slice";
import { LOCAL_STORAGE_KEYS } from "../../app/common/constants";

const steps = [
  {
    selector: ".step1",
    content: "Check Status here",
  },
  {
    selector: ".step2",
    content: "You can change settings by clicking here",
  },
  {
    selector: ".step3",
    content: "Change mode",
  },
  {
    selector: ".step4",
    content: "Start chat",
  },
];

const Index = (props) => {
  // const width = useWindowSize();
  const [width, setWidth] = useState(0);
  const [opentour, setopentour] = useState(true);
  const [activeTab, setActiveTab] = useState("");
  const [mode, setMode] = useState(false);
  const router = useRouter();
  const [size, setSize] = useState([0, 0]);
  const [accountType, setAccountType] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setAccountType(localStorage.getItem(LOCAL_STORAGE_KEYS.ACC_TYPE));
  });

  useEffect(() => {
    if (localStorage.getItem("layout_mode") === "dark") {
      setMode(true);
    }
  }, []);

  useEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const TogglTab = (value) => {
    setActiveTab(value);
    document.querySelector(".recent-default").classList.remove("active");
    if (width < 800) {
      document.querySelector(".app-sidebar").classList.remove("active");
    }
  };

  const closeTour = () => {
    setopentour(false);
  };

  const toggleLightMode = (modes) => {
    if (modes) {
      setMode(!modes);
      document.body.className += "sidebar-active main-page";
      localStorage.setItem("layout_mode", "");
    } else {
      setMode(!modes);
      document.body.className += "sidebar-active main-page dark";
      localStorage.setItem("layout_mode", "dark");
    }
  };

  const Logout = () => {
    localStorage.clear();
    router.push("/auth/signIn");
    dispatch(authAction.updateIsUserLoggedIn());
  };

  return (
    <Fragment>
      <nav className="main-nav on custom-scroll">
        {/* logo section */}
        <div className="logo-warpper">
          <Link href="/landing">
            <img src="/assets/images/logo/logo.png" alt="logo" />
          </Link>
        </div>

        {/* list section */}
        <div className="sidebar-main">
          <ul className="sidebar-top">
            <li>
              <Tooltip title="Status" position="top" trigger="mouseenter">
                <NavLink
                  className="button-effect step1"
                  onClick={() => TogglTab("status")}
                  data-intro="Check Status here"
                >
                  <div className="user-popup status one">
                    <div
                      className="bg-size"
                      style={{
                        backgroundImage: `url("/assets/images/avtar/2.jpg")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "block",
                      }}
                    >
                      <img
                        className="bg-img"
                        src="/assets/images/avtar/2.jpg"
                        alt="Avatar"
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="Chats" position="top" trigger="mouseenter">
                <NavLink
                  className={`icon-btn btn-light button-effect ${
                    activeTab === "chats" ? "active" : ""
                  }`}
                  onClick={() => TogglTab("chats")}
                >
                  <i className="fa fa-comment"></i>
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="Favourite" position="top" trigger="mouseenter">
                <NavLink
                  className={`icon-btn btn-light button-effect ${
                    activeTab === "fevorite" ? "active" : ""
                  }`}
                  onClick={() => TogglTab("fevorite")}
                >
                  <i className="fa fa-star"></i>
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="Document" position="top" trigger="mouseenter">
                <NavLink
                  className={`icon-btn btn-light button-effect ${
                    activeTab === "document" ? "active" : ""
                  }`}
                  onClick={() => TogglTab("document")}
                >
                  {" "}
                  <i className="fa fa-file-text"></i>
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="Contact" position="top" trigger="mouseenter">
                <NavLink
                  className={`icon-btn btn-light button-effect ${
                    activeTab === "contact" ? "active" : ""
                  }`}
                  onClick={() => TogglTab("contact")}
                >
                  {" "}
                  <i className="fa fa-users"></i>
                </NavLink>
              </Tooltip>
            </li>

            <li>
              <div className="dot-btn dot-danger grow">
                <Tooltip
                  title="Notification"
                  position="top-end"
                  size="small"
                  trigger="mouseenter"
                >
                  <NavLink
                    className={`icon-btn btn-light button-effect ${
                      activeTab === "notification" ? "active" : ""
                    }`}
                    onClick={() => TogglTab("notification")}
                  >
                    <i className="fa fa-bell"></i>
                  </NavLink>
                </Tooltip>
              </div>
            </li>
            <li>
              <Tooltip title="Settings" position="top" trigger="mouseenter">
                <NavLink
                  className={`icon-btn btn-light button-effect step2 ${
                    activeTab === "setting" ? "active" : ""
                  }`}
                  onClick={() => TogglTab("setting")}
                  data-intro="You can change settings by clicking here"
                >
                  <i className="fa fa-cog"></i>
                </NavLink>
              </Tooltip>
            </li>
          </ul>
          <ul className="sidebar-bottom">
            <li>
              <Tooltip
                title="Change Mode"
                size="small"
                position="top-end"
                trigger="mouseenter"
              >
                <NavLink
                  className="icon-btn btn-light button-effect mode step3"
                  data-intro="Change mode"
                  onClick={() => toggleLightMode(mode)}
                >
                  <i
                    className={mode ? "fa fa-lightbulb-o" : "fa fa-moon-o"}
                  ></i>
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="SignOut" position="top" trigger="mouseenter">
                <NavLink
                  className="icon-btn btn-light"
                  onClick={() => Logout()}
                >
                  {" "}
                  <i className="fa fa-power-off"> </i>
                </NavLink>
              </Tooltip>
            </li>
          </ul>
        </div>
      </nav>
      <aside className="chitchat-left-sidebar left-disp">
        {!activeTab && (
          <React.Fragment>
            <div className="recent-default dynemic-sidebar active">
              {/* <RecentSection />
              <ChatSection /> */}
              <div className="recent">
                <div className="theme-title">
                  <div className="media">
                    <div>
                      <h2>Welcome </h2>
                      <h4>{accountType}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}

        <TabContent activeTab={activeTab}>
          <TabPane tabId="fevorite">
            <FevoriteSection tab={activeTab} ActiveTab={setActiveTab} />
          </TabPane>
          <TabPane tabId="chats">
            <div className="recent-default dynemic-sidebar active">
              <ChatSection />
            </div>
          </TabPane>
          <TabPane tabId="document">
            <DocumentSection tab={activeTab} ActiveTab={setActiveTab} />
          </TabPane>
          <TabPane tabId="contact">
            <ContactListSection tab={activeTab} ActiveTab={setActiveTab} />
          </TabPane>
          <TabPane tabId="notification">
            <NotificationSection tab={activeTab} ActiveTab={setActiveTab} />
          </TabPane>
          <TabPane tabId="setting">
            <SettingSection tab={activeTab} ActiveTab={setActiveTab} />
          </TabPane>
          <TabPane tabId="status">
            <StatusSection tab={activeTab} ActiveTab={setActiveTab} />
          </TabPane>
        </TabContent>
      </aside>
    </Fragment>
  );
};

export default Index;
