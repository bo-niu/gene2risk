/* eslint-disable no-console */
import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message.jsx';
import Progress from './Progress.jsx';
import '../css/fileUpload.css';

/* eslint "no-unused-vars": "off" */
const FileUpload = (props) => {
  const [file, setFile] = useState('');
  // const [filename, setFilename] = useState('Choose File');
  // const [uploadedFile, setUploadedFile] = useState(undefined);
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [tmpRes, setTmpRes] = useState('');

  const onChange = (e) => {
    setFile(e.target.files[0]);
    // setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total),
              10,
            ),
          );

          // Clear percentage
          // setTimeout(() => setUploadPercentage(0), 10000);
          setUploadDisabled(true);
        },
      });
      const resObj = JSON.parse(res.data);
      console.log('we got the resObj.');
      console.log(resObj);
      setTmpRes(JSON.stringify(resObj));
      console.log('finished setTmpRes(JSON.stringify(resObj));');
      const { setPlot } = props;
      console.log('finished const setPlot = props.setPlot;');
      const result = {
        x: resObj.figure[0].data[0].x,
        y: resObj.figure[0].data[0].y,
        array: resObj.figure[0].data[0].error_y.array,
      };
      console.log('result:  hehe');
      console.log(result);
      setPlot(result);

      setUploadDisabled(false);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadDisabled(false);
    }
  };

  return (
    <div>
      {message ? <Message msg={message} /> : null}

      <div className="col-md-6">
        <form onSubmit={onSubmit} className="uploadFileForm" action="#" id="#">
          <div className="form-group files">
            {/* <label>Upload Your File </label> */}
            <input
              type="file"
              onChange={onChange}
              className="form-control"
              multiple=""
              required
            />
          </div>
          <Progress percentage={uploadPercentage} />
          <button
            // className="uploadFileSubmit"
            type="submit"
            className="btn btn-primary"
            disabled={uploadDisabled}
          >
            Upload
          </button>
        </form>
      </div>

      {/* {uploadedFile !== undefined && uploadedFile !== null ? (
        <h3>{`${uploadedFile.fileName} Uploaded Successfully.`}</h3>
      ) : ''} */}
      <div>{tmpRes}</div>
    </div>
  );
};

export default FileUpload;
