import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="green" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="3">
            <h5 className="title">CONNECT WITH US</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">{'Facebook'}</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">{'Twitter'}</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">{'Linkedin'}</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">PARTNER WITH US</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">{'23 & me'}</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">{'University of Washington'}</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">{'Northeastern University'}</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">PARTNER WITH US</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">{'23 & me'}</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">{'University of Washington'}</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">{'Northeastern University'}</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">PARTNER WITH US</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">{'23 & me'}</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">{'University of Washington'}</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">{'Northeastern University'}</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.google.com"> Gene2Risk </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;