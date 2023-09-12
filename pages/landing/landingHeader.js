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

const headerArr = ["Teach", "contact us", "about us"];
const LandingHeader = (masterRecords) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  return (
    // <Container>

      <Nav
        tabs
        className="border-0 d-flex mt-4 " 
        style={{marginLeft:'20px',color:"red"}}
        >
        <img
          // className="img-fluid"
          src="/assets/images/netquix_logo.png"
          alt="logo"
          style={{
              maxWidth: "100px",
              marginTop: "-28px",
            }}
            />
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret style={{ fontSize: "16px",color:"D9D9D9" }}>
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
                <NavLink href="#" style={{ fontSize: "16px" ,color:"D9D9D9"}}>
                  {name}
                </NavLink>
              </NavItem>
            </>
          );
        })}
      </Nav>
      
    //   </Container>
  );
};

export default LandingHeader;
