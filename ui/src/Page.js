import React from 'react';
import Contents from './Contents.js';
import UserContext from './UserContext.js';
import store from './store.js';
import graphQLFetch from './graphQLFetch.js';
import SignInNavItem from './SignInNavItem.js';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Glyphicon,
  Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './img/logo50.png';
import NavbarPage from './NavbarPage';
import Footer from './Footer';



function NavBar({ user, onUserChange }) {
  return (
    <Navbar collapseOnSelect expand="lg" style={{ minWidth: 800 }}>
      <Navbar.Brand href="/"><img className="logo" src={logo}/></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/GetStarted">GetStarted</Nav.Link>
          <Nav.Link href="/AboutUs">AboutUs</Nav.Link>
          <Nav.Link href="/FAQ">FAQ</Nav.Link>
        </Nav>
        <Nav pullright>
          <SignInNavItem onUserChange={onUserChange}/>
        </Nav>
      </Navbar.Collapse>
    </Navbar>


// {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//   <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//   <Navbar.Collapse id="responsive-navbar-nav">
//     <Nav className="mr-auto">
//       <Nav.Link href="#features">Features</Nav.Link>
//       <Nav.Link href="#pricing">Pricing</Nav.Link>
//       <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
//         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
//         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//         <NavDropdown.Divider />
//         <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
//       </NavDropdown>
//     </Nav>
//     <Nav>
//       <Nav.Link href="#deets">More deets</Nav.Link>
//       <Nav.Link eventKey={2} href="#memes">
//         Dank memes
//       </Nav.Link>
//     </Nav>
//   </Navbar.Collapse>
// </Navbar> */}








    // <Navbar>
    //   <Navbar.Header>
    //     <Navbar.Brand>Seattle Crime</Navbar.Brand>
    //   </Navbar.Header>
    //   <Nav>
    //     <LinkContainer exact to="/">
    //       <NavItem>Home</NavItem>
    //     </LinkContainer>
    //     <LinkContainer to="/GetStarted">
    //       <NavItem>GetStarted</NavItem>
    //     </LinkContainer>
    //     <LinkContainer to="/AboutUs">
    //       <NavItem>AboutUs</NavItem>
    //     </LinkContainer>
    //     <LinkContainer to="/FAQ">
    //       <NavItem>FAQ</NavItem>
    //     </LinkContainer>
    //   </Nav>
    //   <Nav pullRight>
    //     <SignInNavItem user={user} onUserChange={onUserChange} />
    //     {/* <NavDropdown
    //       id="user-dropdown"
    //       title={<Glyphicon glyph="option-vertical" />}
    //       noCaret
    //     >
    //       <LinkContainer to="/about">
    //         <MenuItem>About</MenuItem>
    //       </LinkContainer>
    //     </NavDropdown> */}
    //   </Nav>
    // </Navbar>
  );
}



export default class Page extends React.Component {
  static async fetchData(cookie) {
    const query = `query{ user {
      signedIn givenName
    }}`;
    const data = await graphQLFetch(query, null, null, cookie);
    return data;
  }

  constructor(props) {
    super(props);
    const user = store.userData ? store.userData.user : null;
    delete store.userData;
    this.state = { user };

    this.onUserChange = this.onUserChange.bind(this);
  }

  async componentDidMount() {
    const { user } = this.state;
    if (user == null) {
      const data = await Page.fetchData();
      this.setState({ user: data.user });
    }
  }

  onUserChange(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    if (user == null) return null;
    return (
      <div>
        <NavbarPage />
        {/* <NavbarPage user={user} onUserChange={this.onUserChange} /> */}
        <UserContext.Provider value={user}>
          <Contents onUserChange={this.onUserChange} />
        </UserContext.Provider>
        <Footer />
      </div>
    );
  }
}
