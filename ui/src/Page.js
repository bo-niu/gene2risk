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
import { ToastProvider, useToasts } from 'react-toast-notifications'

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
    const geneResult = null;
    this.state = { user, geneResult };

    this.onUserChange = this.onUserChange.bind(this);
    this.setGeneResult = this.setGeneResult.bind(this);
  }

  async componentDidMount() {
    const { user } = this.state;
    if (user == null) {
      const data = await Page.fetchData();
      this.setState({ user: data.user });
    }
  }

  setGeneResult(res) {
    this.setState({ geneResult: res });
  }

  onUserChange(user) {
    console.log('enter onUserChange');
    console.log(user);
    this.setState({ user });
  }

  render() {
    const { user, geneResult } = this.state;
    if (user == null) return null;
    return (
      <div>
        <ToastProvider>
          <NavbarPage user={user} onUserChange={this.onUserChange} />
          {/* <NavbarPage user={user} onUserChange={this.onUserChange} /> */}
          <UserContext.Provider value={user}>
            <Contents onUserChange={this.onUserChange} setGeneResult={this.setGeneResult} geneResult={geneResult} />
          </UserContext.Provider>
          <Footer />
        </ToastProvider>
      </div>
    );
  }
}
