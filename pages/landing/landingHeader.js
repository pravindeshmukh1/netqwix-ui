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

const headerArr = [
  
  {path:"",name:"Teach"},
  {path:"",name:"contact us"},
  {path:"",name:"about us"},
  {path:"/auth/signUp",name:"signUp"},
  {path:"/auth/signIn",name:"Login"},
 ];
const LandingHeader = (masterRecords) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  return (
    // <Container>
    <>
    <img
    // className="img-fluid"
    src="/assets/images/netquix_logo.png"
    alt="logo"
    style={{
        maxWidth: "120px",
        margin: "2px",

      }}
      />
      <Nav
        tabs
        className="border-0 d-flex mt-4 " 
        style={{marginLeft:'8%',float:"right"}}
        >
       
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret style={{ fontSize: "16px",color:"grey" }}>
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
                <NavLink href={name.path} style={{ fontSize: "16px" ,color:"grey"}}>
                  {name.name}
                </NavLink>
              </NavItem>
            </>
          );
        })}
      </Nav>
      </>
      
    //   </Container>
  );
};

export default LandingHeader;
