import React from 'react';
import {
  NavItem, Modal, Button, NavDropdown,
} from 'react-bootstrap';
import withToast from './withToast.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import usericon from './img/usericon.png';
import UserContext from './UserContext.js';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
  MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";


class SigninNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      disabled: true,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    console.log('enter componentDidMount');
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    if (!clientId) return;
    console.log('window.gapi.load');
    window.gapi.load('auth2', () => {
      if (!window.gapi.auth2.getAuthInstance()) {
        window.gapi.auth2.init({ client_id: clientId }).then(() => {
          this.setState({ disabled: false });
        });
      }
    });
  }

  async signIn() {
    this.hideModal();
    const { showError } = this.props;
    let googleToken;
    try {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const googleUser = await auth2.signIn();
      googleToken = googleUser.getAuthResponse().id_token;
    } catch (error) {
      showError(`Error authenticating with Google: ${error.error}`);
    }

    try {
      const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
      const response = await fetch(`${apiEndpoint}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ google_token: googleToken }),
      });
      const body = await response.text();
      const result = JSON.parse(body);
      const { signedIn, givenName } = result;

      const { onUserChange } = this.props;
      onUserChange({ signedIn, givenName });
    } catch (error) {
      showError(`Error signing into the app: ${error}`);
    }
  }

  async signOut() {
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    const { showError } = this.props;
    try {
      await fetch(`${apiEndpoint}/signout`, {
        method: 'POST',
        credentials: 'include',
      });
      const auth2 = window.gapi.auth2.getAuthInstance();
      await auth2.signOut();
      const { onUserChange } = this.props;
      onUserChange({ signedIn: false, givenName: '' });
      console.log('signout finished');
    } catch (error) {
      showError(`Error signing out: ${error}`);
    }
  }

  showModal() {
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    const { showError } = this.props;
    if (!clientId) {
      showError('Missing environment variable GOOGLE_CLIENT_ID');
      return;
    }
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  render() {
    const { user } = this.props;
    console.log('user is: ', user);
    if (user.signedIn) {
      console.log('user signed in');
      return (
        <MDBNavItem>
          <MDBDropdown dropdown-menu-right>
            <MDBDropdownToggle nav caret className="waves-effect waves-light">
              <div className="d-none d-md-inline"><strong>Hello {user.givenName}</strong></div>
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropleft" right>
              <MDBDropdownItem onClick={this.signOut}>Sign out</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem>
      );
    }
    console.log('user not signed in');
    const { showing, disabled } = this.state;
    return (
      <>
        <MDBNavItem>
          <MDBDropdown dropdown-menu-right>
            <MDBDropdownToggle nav caret className="waves-effect waves-light">
              <MDBIcon icon="user"/>
            </MDBDropdownToggle>
            <MDBDropdownMenu right >
              <MDBDropdownItem>
                <NavItem onClick={this.showModal}>
                  Sign in
                </NavItem>
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem>

        <Modal keyboard show={showing} onHide={this.hideModal} size="sm">
          <Modal.Header closeButton>
            <Modal.Title>Sign in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              block
              disabled={disabled}
              bsstyle="primary"
              onClick={this.signIn}
            >
              <img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png" alt="Sign In" />
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button bsstyle="link" onClick={this.hideModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
SigninNavItem.contextType = UserContext;

export default withToast(SigninNavItem);
