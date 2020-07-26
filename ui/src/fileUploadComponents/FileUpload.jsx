import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message.jsx';
import Progress from './Progress.jsx';
import '../css/fileUpload.css';

/* eslint "no-unused-vars": "off" */
const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState(undefined);
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [tmpRes, setTmpRes] = useState('');

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
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
      setTmpRes(JSON.stringify(resObj));

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

      <form onSubmit={onSubmit} className="uploadFileForm">
        <input
          type="file"
          onChange={onChange}
          required
        />
        <Progress percentage={uploadPercentage} />
        <input
          type="submit"
          value="Upload"
          disabled={uploadDisabled}
        />
      </form>
      {uploadedFile !== undefined && uploadedFile !== null ? (
        <h3>{`${uploadedFile.fileName} Uploaded Successfully.`}</h3>
      ) : ''}
      <div>{tmpRes}</div>
    </div>
  );
};

export default FileUpload;
