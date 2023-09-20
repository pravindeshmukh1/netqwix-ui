import { useContext, useEffect, useState } from "react";
import ChatContext from "../../helpers/chatContext";
import SliderSection from "./sliderSection";
import Link from "next/link";
import { useAppSelector } from "../../app/store";
import {
  bookingsAction,
  bookingsState,
} from "../../app/components/common/common.slice";
import { useDispatch } from "react-redux";
const { isMobileFriendly, isSidebarToggleEnabled } = bookingsAction;
const RecentSection = (props) => {
  const dispatch = useDispatch();
  const { activeTab } = useAppSelector(bookingsState);
  const { handleClickRight, mainMenu } = useContext(ChatContext);
  const { configs } = useAppSelector(bookingsState);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const OpenCloseSidebar = (sidebar) => {
    dispatch(isSidebarToggleEnabled(!sidebar));
    if (sidebar) {
      setSidebarToggle(!sidebar);
      document.querySelector(".main-nav").classList.add("on");
    } else {
      setSidebarToggle(!sidebar);
      document.querySelector(".main-nav").classList.remove("on");
    }
  };

  useEffect(() => {
    if (configs.sidebar.isToggleEnable) {
      OpenCloseSidebar(false);
    }
  }, [configs.sidebar.isToggleEnable]);

  const hangleRightClick = () => {
    handleClickRight(!mainMenu);
    document.querySelector(".main-nav").classList.remove("on");
    document.querySelector(".app-sidebar").classList.add("active");
  };

  return (
    <div className="recent sidebar-toggle">
      <div className="theme-title">
        <div className="media">
          {/* <div>
						<h2>Recent</h2>
						<h4>Chat from your friends &#128536;</h4>
					</div> */}

          {!configs.sidebar.isToggleEnable ? (
            ""
          ) : (
            <div className="media-body">
              {/* <Link
							className={`icon-btn button-effect pull-right mobile-back  ${
								sidebarToggle ? "btn-outline-primary" : "btn-outline-light"
							}`}
							href="#"
						>
							<i
								className="ti-angle-right"
								onClick={() => hangleRightClick()}
							></i>
						</Link> */}
              <Link
                style={{
                  marginTop: "10px",
                }}
                className={`icon-btn ml-3 button-effect pull-right mainnav  ${
                  sidebarToggle ? "btn-primary" : "btn-outline-light"
                }`}
                href="#"
                onClick={() => OpenCloseSidebar(sidebarToggle)}
              >
                <i className="fa fa-bars" />
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* <SliderSection /> */}
    </div>
  );
};

export default RecentSection;
