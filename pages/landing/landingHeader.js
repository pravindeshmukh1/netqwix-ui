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
} from "reactstrap";
import { useRouter } from "next/navigation";

const headerArr = [
  { path: "/auth/signUp", name: "Join as trainer" },
  { path: "", name: "Contact us" },
  { path: "", name: "About us" },
];
const LandingHeader = (masterRecords) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const toggle = () => setDropdownOpen(!dropdownOpen);
  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 1000,backgroundColor:"white" }}>
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
          className="border-0 d-flex mt-4 "
          style={{ marginLeft: "8%", float: "right" }}
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
                return <DropdownItem header>{cat}</DropdownItem>;
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
              padding: "18px",
              alignItems: "center",
              fontSize: "14px",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => router.push("/auth/signUp")}
          >
            Signup
          </span>
          <span
            class="badge badge-light lg bg-primary"
            style={{
              padding: "18px",
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
    </>
  );
};

export default LandingHeader;
