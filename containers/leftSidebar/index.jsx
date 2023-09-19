import React, { useContext, useEffect, useLayoutEffect } from "react";
import FevoriteSection from "./fevoriteSection";
import DocumentSection from "./documentSection";
import ContactListSection from "./contactListSection";
import NotificationSection from "./notificationSection";
import SettingSection from "./settingSection";
import StatusSection from "./statusSection";
import RecentSection from "./recentSection";
import { Fragment, useState } from "react";
import { NavLink, TabContent, TabPane } from "reactstrap";
import { useRouter } from "next/router";
import { Tooltip } from "react-tippy";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { authAction, authState } from "../../app/components/auth/auth.slice";
import {
  AccountType,
  LOCAL_STORAGE_KEYS,
  MOBILE_SIZE,
  POSITION_FIXED_SIDEBAR_MENU,
  leftSideBarOptions,
} from "../../app/common/constants";
import { SocketContext } from "../../app/components/socket";
import TodoSection from "../rightSidebar/todoSection";
import ReminderSection from "../rightSidebar/reminderSection";
import NoteSection from "../rightSidebar/noteSection";
import FileSection from "../rightSidebar/fileSection";
import AppListSection from "../rightSidebar/appList";
import { Book, File } from "react-feather";
import {
  bookingsAction,
  bookingsState,
} from "../../app/components/common/common.slice";
const { isMobileFriendly, isSidebarToggleEnabled } = bookingsAction;
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
  const socket = useContext(SocketContext);
  const { sidebarActiveTab } = useAppSelector(authState);
  const [width, setWidth] = useState(0);
  const [opentour, setopentour] = useState(true);
  const [activeTab, setActiveTab] = useState(sidebarActiveTab);
  const [mode, setMode] = useState(false);
  const router = useRouter();
  const [size, setSize] = useState([0, 0]);
  const [accountType, setAccountType] = useState("");
  const dispatch = useAppDispatch();
  const { configs } = useAppSelector(bookingsState);
  const { handleActiveTab } = bookingsAction;
  useEffect(() => {
    setAccountType(localStorage.getItem(LOCAL_STORAGE_KEYS.ACC_TYPE));
  });

  useEffect(() => {
    if (localStorage.getItem("layout_mode") === "dark") {
      setMode(true);
    }
  }, []);

  useEffect(() => {
    console.log(`window.innerWidth --- `, window.innerWidth);
    function updateSize() {
      setSize(window.innerWidth);
      setWidth(window.innerWidth);
      if (window.innerWidth < MOBILE_SIZE) {
        // for mobile device
        dispatch(isMobileFriendly(true));
        console.log(`size === `, window.innerWidth);
      } else {
        dispatch(isMobileFriendly(false));
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const CloseAppSidebar = () => {
    document.querySelector(".chitchat-main").classList.remove("small-sidebar");
    document.querySelector(".app-sidebar").classList.remove("active");
    document.body.className = `main-page ${localStorage.getItem(
      "layout_mode"
    )}`;
  };

  const TogglTab = (value) => {
    setActiveTab(value);
    dispatch(authAction.setActiveTab(value));
    // // document.querySelector(".recent-default").classList.remove("active");
    if (
      width < 800 &&
      document &&
      document.querySelector &&
      document.querySelector(".app-sidebar")
    ) {
      document.querySelector(".app-sidebar").classList.remove("active");
    }
  };

  const ToggleTab = (tab) => {
    setActiveTab(tab);
    if (width > 1640 && document.querySelector(".chitchat-main")) {
      document
        .querySelector(".chitchat-main")
        .classList.remove("small-sidebar");
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
    socket.disconnect();
    localStorage.clear();
    router.push("/auth/signIn");
    dispatch(authAction.updateIsUserLoggedIn());
  };

  const smallSideBarToggle = () => {
    if (document && document.querySelector(".chitchat-main")) {
      document.querySelector(".chitchat-main").classList.add("small-sidebar");
    }
    setActiveTab("");
  };

  return (
    <Fragment>
      {/* <AppListSection
          activeTab={activeTab}
          CloseAppSidebar={CloseAppSidebar}
          ToggleTab={ToggleTab}
        /> */}

      <nav
        className={`main-nav on custom-scroll ${
          accountType === AccountType.TRAINEE &&
          POSITION_FIXED_SIDEBAR_MENU.includes(activeTab) &&
          "custom-sidebar"
        }`}
      >
        {/* logo section */}
        <div className="logo-warpper">
          <Link href="/landing">
            <img
              src="/assets/images/logo/netquix-logo.png"
              alt="logo"
              className="custom-image"
            />
          </Link>
        </div>

        <div className="app-list sidebar-main">
          {/* <ul className="sidebar-top  custom-scroll">
            <li>
              <Tooltip title="Home" position="top" trigger="mouseenter">
                <NavLink
                  className={`icon-btn btn-light button-effect ${activeTab === "home" ? "active" : ""
                    }`}
                  onClick={() => TogglTab("home")}
                >
                  <i className="fa fa-home"></i>
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip
                title={
                  accountType === AccountType.TRAINEE
                    ? "Booking"
                    : "Schedule Slots"
                }
                position="right-end"
                trigger="mouseenter"
              >
                <NavLink
                  className={`icon-btn btn-light button-effect ${activeTab === leftSideBarOptions.SCHEDULE_TRAINING
                    ? "active"
                    : ""
                    }`}
                  onClick={() => TogglTab(leftSideBarOptions.SCHEDULE_TRAINING)}
                >
                  <i className="fa fa-calendar"></i>
                </NavLink>
              </Tooltip>
            </li>
            <li><Link className={`icon-btn btn-outline-primary btn-sm button-effect ${activeTab === "todo" ? "active" : ""}`} href="#" onClick={() => ToggleTab("todo")}><Book /></Link>
            </li>

          </ul> */}
          <ul className="sidebar-top">
            <li>
              <Tooltip title="Home" position="top" trigger="mouseenter">
                <NavLink
                  className={`icon-btn btn-light button-effect ${
                    activeTab === "home" ? "active" : ""
                  }`}
                  onClick={() =>
                    TogglTab("home") || dispatch(handleActiveTab("home"))
                  }
                >
                  <i className="fa fa-home" />
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip
                title={
                  accountType === AccountType.TRAINEE
                    ? "Booking"
                    : "Schedule Slots"
                }
                position="right-end"
                trigger="mouseenter"
              >
                <NavLink
                  className={`icon-btn btn-light button-effect ${
                    activeTab === leftSideBarOptions.SCHEDULE_TRAINING
                      ? "active"
                      : ""
                  }`}
                  onClick={() => TogglTab(leftSideBarOptions.SCHEDULE_TRAINING)}
                >
                  <i className="fa fa-calendar" />
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="Media" position="top" trigger="mouseenter">
                <NavLink
                  className={`icon-btn btn-light button-effect step2 ${
                    activeTab === "file" ? "active" : ""
                  }`}
                  onClick={() => ToggleTab("file")}
                  data-intro=""
                >
                  <i className="fa fa-film" />
                </NavLink>
              </Tooltip>
            </li>
            {/* <li>
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
            </li> */}

            {/* some menu hide feedback changes */}
            {/* <li>
              <Tooltip title="Todo" position="top" trigger="mouseenter">
                <NavLink
                  className={`icon-btn btn-light button-effect ${
                    activeTab === "todo" ? "active" : ""
                  }`}
                  onClick={() => ToggleTab("todo")}
                >
                  <i className="fa fa-list" />
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="Notes" position="top" trigger="mouseenter">
                <NavLink
                  className={`icon-btn btn-light button-effect ${
                    activeTab === "notes" ? "active" : ""
                  }`}
                  onClick={() => ToggleTab("notes")}
                >
                  <i className="fa fa-book" />
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="Reminder" position="top" trigger="mouseenter">
                <NavLink
                  className={`icon-btn btn-light button-effect ${
                    activeTab === "reminder" ? "active" : ""
                  }`}
                  onClick={() => ToggleTab("reminder")}
                >
                  <i className="fa fa-clock-o" />
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="Favourite" position="top" trigger="mouseenter">
                <NavLink
                  className={`icon-btn btn-light button-effect ${
                    activeTab === "fevorite" ? "active" : ""
                  }`}
                  onClick={() => ToggleTab("fevorite")}
                >
                  <i className="fa fa-star" />
                </NavLink>
              </Tooltip>
            </li> */}

            {/* <li>
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
            </li> */}
            {/* <li>
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
            </li> */}

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
                    onClick={() => ToggleTab("notification")}
                  >
                    <i className="fa fa-bell" />
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
                  onClick={() => ToggleTab("setting")}
                  data-intro="You can change settings by clicking here"
                >
                  <i className="fa fa-cog" />
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
                  <i className={mode ? "fa fa-lightbulb-o" : "fa fa-moon-o"} />
                </NavLink>
              </Tooltip>
            </li>
            <li>
              <Tooltip title="Logout" position="top" trigger="mouseenter">
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
      {activeTab !== leftSideBarOptions.HOME &&
        activeTab !== leftSideBarOptions.SCHEDULE_TRAINING && (
          <aside className="app-sidebar active">
            <div className="apps">
              <div className="apps-ul">
                <TabContent activeTab={activeTab}>
                  <TabPane
                    tabId="todo"
                    className={`${activeTab === "todo" ? "left-90" : ""}`}
                  >
                    <TodoSection
                      smallSideBarToggle={smallSideBarToggle}
                      tab={activeTab}
                      ActiveTab={setActiveTab}
                    />
                  </TabPane>
                  <TabPane
                    tabId="reminder"
                    className={`${activeTab === "reminder" ? "left-90" : ""}`}
                  >
                    <ReminderSection
                      smallSideBarToggle={smallSideBarToggle}
                      tab={activeTab}
                      ActiveTab={setActiveTab}
                    />
                  </TabPane>
                  <TabPane
                    tabId="notes"
                    className={`${activeTab === "notes" ? "left-90" : ""}`}
                  >
                    <NoteSection
                      smallSideBarToggle={smallSideBarToggle}
                      tab={activeTab}
                      ActiveTab={setActiveTab}
                    />
                  </TabPane>
                  <TabPane
                    tabId="document"
                    className={`${activeTab === "document" ? "left-90" : ""}`}
                  >
                    <DocumentSection
                      smallSideBarToggle={smallSideBarToggle}
                      tab={activeTab}
                      ActiveTab={setActiveTab}
                    />
                  </TabPane>
                  <TabPane
                    tabId="fevorite"
                    className={`${activeTab === "fevorite" ? "left-90" : ""}`}
                  >
                    <FevoriteSection
                      smallSideBarToggle={smallSideBarToggle}
                      tab={activeTab}
                      ActiveTab={setActiveTab}
                    />
                  </TabPane>
                  <TabPane
                    tabId="file"
                    className={`${activeTab === "file" ? "left-90" : ""}`}
                  >
                    <FileSection smallSideBarToggle={smallSideBarToggle} />
                  </TabPane>

                  <TabPane
                    tabId="contact"
                    className={`${activeTab === "contact" ? "left-90" : ""}`}
                  >
                    <ContactListSection
                      smallSideBarToggle={smallSideBarToggle}
                      tab={activeTab}
                      ActiveTab={setActiveTab}
                    />
                  </TabPane>
                  <TabPane
                    tabId="notification"
                    className={`${
                      activeTab === "notification" ? "left-90" : ""
                    }`}
                  >
                    <NotificationSection
                      smallSideBarToggle={smallSideBarToggle}
                      tab={activeTab}
                      ActiveTab={setActiveTab}
                    />
                  </TabPane>
                  <TabPane
                    tabId="setting"
                    className={`${activeTab === "setting" ? "left-90 " : ""} ${
                      accountType === AccountType.TRAINER
                        ? "sidebar-full-width"
                        : ""
                    }`}
                  >
                    <SettingSection
                      smallSideBarToggle={smallSideBarToggle}
                      tab={activeTab}
                      ActiveTab={setActiveTab}
                    />
                  </TabPane>
                  <TabPane
                    tabId="status"
                    className={`${activeTab === "status" ? "left-90" : ""}`}
                  >
                    <StatusSection
                      smallSideBarToggle={smallSideBarToggle}
                      tab={activeTab}
                      ActiveTab={setActiveTab}
                    />
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </aside>
        )}
      {configs?.sidebar?.isMobileMode && <RecentSection />}
    </Fragment>
  );
};

export default Index;
