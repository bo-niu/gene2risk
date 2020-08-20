import React from 'react';
import { Alert, Collapse } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
export default class Toast extends React.Component {
  componentDidUpdate() {
    const { showing, onDismiss } = this.props;
    if (showing) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(onDismiss, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }

  render() {
    const {
      showing, bsstyle, onDismiss, children,
    } = this.props;
    return (
      <Collapse in={showing}>
        <div style={{
          position: 'fixed', bottom: 20, left: 20, zIndex: 10,
        }}
        >
          <Alert variant={bsstyle} dismissible={true} onClose={onDismiss}>
            {children}
          </Alert>
        </div>
      </Collapse>
    );
  }
}
