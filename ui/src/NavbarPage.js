import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
// import { BrowserRouter as Router } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'; 
import '../node_modules/bootstrap-css-only/css/bootstrap.min.css'; 
import '../node_modules/mdbreact/dist/css/mdb.css';
import logo from './img/logo50.png';
class NavbarPage extends Component {

  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }


toggleCollapse() {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    // <Router>
      <MDBNavbar color="green" dark expand="sm">
        <MDBNavbarBrand>
          {/* <strong className="white-text">Navbar</strong> */}
          <img className="logo" src={logo}/>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            {/* <MDBNavItem active> */}
            <MDBNavItem className="mx-xl-5 mx-lg-5 mx-md-5 mx-sm-2" >
              <MDBNavLink to="/GetStarted">GetStarted</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="mx-xl-5 mx-lg-5 mx-md-5 mx-sm-2">
              <MDBNavLink to="/AboutUs">AboutUs</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="mx-xl-5 mx-lg-5 mx-md-5 mx-sm-2">
              <MDBNavLink to="/FAQ">FAQ</MDBNavLink>
            </MDBNavItem>
            {/* <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropleft">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem> */}
          </MDBNavbarNav>
          <MDBNavbarNav right>
            {/* <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="twitter" />
              </MDBNavLink>
            </MDBNavItem> */}
            {/* <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="google" />
                {"   "}
                Login
              </MDBNavLink>
            </MDBNavItem> */}
            <MDBNavItem>
              <MDBDropdown dropdown-menu-right>
                <MDBDropdownToggle nav caret className="waves-effect waves-light">
                  <MDBIcon icon="user"/>
                </MDBDropdownToggle>
                {/* <DropdownButton
                  alignRight
                  title="Dropdown right"
                  // id="dropdown-menu-align-right"
                ></DropdownButton> */}
                <MDBDropdownMenu right >
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    // </Router>
    );
  }
}

export default NavbarPage;