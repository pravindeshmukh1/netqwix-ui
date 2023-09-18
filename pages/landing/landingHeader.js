import React, { useEffect, useState } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  Collapse,
  Container,
  Row,
  Col,
  Navbar,
} from "reactstrap";
import { useRouter } from "next/router";
import Link from "next/link";

const headerArr = [
  { path: "/auth/signUp", name: "Join as an Expert" },
  { path: "", name: "Contact Us" },
  { path: "", name: "About Us" },
];

const LandingHeader = (masterRecords) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleResize = () => {
      const isMobileScreen = window.innerWidth < 390;
      setIsMobileScreen(isMobileScreen);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <div
        className="row"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "white",
          margin: 0,
        }}
      >
        <div className={`col-1 col-sm-2 col-md-1 col-lg-4`}>
          <img
            src="/assets/images/netquix_logo.png"
            alt="logo"
            style={{
              maxWidth: "120px",
              marginLeft: "25px",
            }}
          />
        </div>
        <div className={`col-11 col-sm-10 col-md-11 col-lg-8`}>
          <button
            className="navbar-toggler d-xl-none"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
            style={{
              float: "right",
            }}
          >
            <i
              class="fa fa-bars"
              style={{
                marginTop: "40px",
                cursor: "pointer",
              }}
              aria-hidden="true"
            ></i>
          </button>
          <Collapse
            className={`navbar-collapse d-xl-block ${isMenuOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <Nav
              navbar={isMobileScreen && isMenuOpen ? true : false}
              className={`border-0 d-flex  mr-4 navbaritem ${
                isMenuOpen ? "d-none" : "" // Hide the Nav when the menu is open
              }`}
              style={{
                marginLeft: "8%",
                marginTop: isMobileScreen ? "25%" : "38px",
                float: "right",
                alignItems: "end",
              }}
            >
              <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle
                  nav
                  caret
                  style={{ fontSize: "16px", color: "grey" }}
                >
                  Categories
                </DropdownToggle>
                <DropdownMenu>
                  {masterRecords?.masterRecords?.category?.map((cat, index) => {
                    return (
                      <DropdownItem
                        key={`master_data${index}`}
                        style={{
                          textDecoration: "underline",
                          textUnderlineOffset: "0.4em",
                          textDecorationColor: "#000080",
                          fontWeight: 500,
                        }}
                      >
                        {cat}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
              {headerArr.map((name, index) => {
                return (
                  <NavItem key={`headers-${index}`}>
                    <NavLink
                      href={name.path}
                      style={{ fontSize: "16px", color: "grey" }}
                    >
                      {name.name}
                    </NavLink>
                  </NavItem>
                );
              })}
              <span
                className="badge badge-light lg bg-primary"
                style={{
                  padding: "13px",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/auth/signUp")}
              >
                SignUp
              </span>
              <span
                className="mt-xs-5 badge badge-light lg bg-primary"
                style={{
                  padding: "13px",
                  marginright: "5px",
                  marginLeft: "5px",
                  marginTop: isMobileScreen ? "10px" : null,
                  alignItems: "center",
                  fontSize: "14px",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/auth/signIn")}
              >
                Login
              </span>
            </Nav>
          </Collapse>
        </div>
        {/* <div className="col-xs-12 col-md-12 col-lg-12">
          <img
            src="/assets/images/netquix_logo.png"
            alt="logo"
            style={{
              maxWidth: "120px",
              marginLeft: "25px",
            }}
          />
        </div>
        <button
          className="navbar-toggler d-xl-none"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
          style={{
            float: "right",
            marginRight: "10px",
          }}
        >
          <i
            class="fa fa-bars"
            style={{
              marginTop: "40px",
              cursor: "pointer",
            }}
            aria-hidden="true"
          ></i>
        </button>
        <Collapse
          className={`navbar-collapse d-xl-block ${isMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <Nav
            tabs
            className={`border-0 d-flex mr-4 navbaritem ${
              isMenuOpen ? "d-none" : "" // Hide the Nav when the menu is open
            }`}
            style={{
              marginLeft: "8%",
              float: "right",
              alignItems: "end",
            }}
          >
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle
                nav
                caret
                style={{ fontSize: "16px", color: "grey" }}
              >
                Categories
              </DropdownToggle>
              <DropdownMenu>
                {masterRecords?.masterRecords?.category?.map((cat, index) => {
                  return (
                    <DropdownItem
                      key={`master_data${index}`}
                      style={{
                        textDecoration: "underline",
                        textUnderlineOffset: "0.4em",
                        textDecorationColor: "#000080",
                        fontWeight: 500,
                      }}
                    >
                      {cat}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
            {headerArr.map((name, index) => {
              return (
                <NavItem key={`headers-${index}`}>
                  <NavLink
                    href={name.path}
                    style={{ fontSize: "16px", color: "grey" }}
                  >
                    {name.name}
                  </NavLink>
                </NavItem>
              );
            })}
            <span
              className="badge badge-light lg bg-primary"
              style={{
                padding: "13px",
                alignItems: "center",
                fontSize: "14px",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => router.push("/auth/signUp")}
            >
              SignUp
            </span>
            <span
              className="badge badge-light lg bg-primary"
              style={{
                padding: "13px",
                marginright: "5px",
                marginLeft: "5px",
                alignItems: "center",
                fontSize: "14px",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => router.push("/auth/signIn")}
            >
              Login
            </span>
          </Nav>
        </Collapse> */}
      </div>
    </React.Fragment>
  );
};

export default LandingHeader;
