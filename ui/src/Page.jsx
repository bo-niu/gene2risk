import React from 'react';
import {
  Navbar, Nav, NavItem, NavDropdown,
  MenuItem, Glyphicon,
  Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';
import IssueAddNavItem from './IssueAddNavItem.jsx';

function NavBar() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Gene2Risk Website</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/issues">
          <NavItem>Issue List</NavItem>
        </LinkContainer>
        <LinkContainer to="/report">
          <NavItem>Report</NavItem>
        </LinkContainer>
        <LinkContainer to="/gene2risk">
          <NavItem>testReadFile</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <IssueAddNavItem />
        <NavDropdown
          id="user-dropdown"
          title={<Glyphicon glyph="option-vertical" />}
          noCaret
        >
          <MenuItem>About</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

function Footer() {
  return (
    <small>
      <hr />
      <p className="text-center">
        Full source code available at this
        {' '}
        <a href="https://github.com/vasansr/pro-mern-stack-2">
          GitHub repository
        </a>
      </p>
    </small>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Grid>
        <Contents />
      </Grid>
      <Footer />
    </div>
  );
}

// function NavBar() {
//   return (
//     <nav>
//       {/* <a href="/">Home</a> */}
//       <NavLink exact to="/">Home</NavLink>
//       {' | '}
//       {/* <a href="/#/issues">Issue List</a> */}
//       <NavLink to="/issues">Issue List</NavLink>
//       {' | '}
//       {/* <a href="/#/report">Report</a> */}
//       <NavLink to="/report">Report</NavLink>
//     </nav>
//   );
// }

// export default function Page() {
//   return (
//     <div>
//       <NavBar />
//       <Contents />
//     </div>
//   );
// }
