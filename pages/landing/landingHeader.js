import React, { useState } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  Container,
  UncontrolledDropdown,
} from "reactstrap";
import { useRouter } from "next/navigation";

const headerArr = [
  { path: "/auth/signUp", name: "Join as an Expert" },
  { path: "", name: "Contact Us" },
  { path: "", name: "About Us" },
];
const LandingHeader = (masterRecords) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const toggle = () => setDropdownOpen(!dropdownOpen);
  return (
    <>
      <div
        class="row"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "white",
        }}
      >
        <div class="col-xs-12 col-md-12 col-lg-12">
          <img
            // className="img-fluid"
            src="/assets/images/netquix_logo.png"
            alt="logo"
            style={{
              maxWidth: "120px",
              marginLeft: "25px",
            }}
          />
          <Nav
            tabs
            className="border-0 d-flex mt-4 mr-4 navbaritem"
            style={{ marginLeft: "8%", float: "right", alignItems: "end" }}
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
                {masterRecords?.masterRecords?.category?.map((cat) => {
                  return (
                    <>
                      <DropdownItem
                        style={{
                          textDecoration: "underline",
                          textUnderlineOffset: "0.4em",
                          textDecorationColor: "#000080",
                          fontWeight: 500,
                        }}
                      >
                        {cat}
                      </DropdownItem>
                    </>
                  );
                })}
              </DropdownMenu>
            </Dropdown>

            {headerArr.map((name) => {
              return (
                <>
                  <NavItem>
                    <NavLink
                      href={name.path}
                      style={{ fontSize: "16px", color: "grey" }}
                    >
                      {name.name}
                    </NavLink>
                  </NavItem>
                </>
              );
            })}
            <span
              class="badge badge-light lg bg-primary"
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
              class="badge badge-light lg bg-primary"
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
        </div>
      </div>
    </>
  );
};

export default LandingHeader;
