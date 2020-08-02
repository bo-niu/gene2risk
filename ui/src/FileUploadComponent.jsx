/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import FileUpload from './fileUploadComponents/FileUpload.jsx';
// import './App.css';

class FileUploadComponent extends React.Component {
  render() {
    const { setPlot } = this.props;
    return (
      <div>
        <h4>
          React File Upload
        </h4>
        <FileUpload setPlot={setPlot} />
      </div>
    );
  }
}

export default FileUploadComponent;
