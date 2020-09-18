import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Waiting(props) {
  const { text } = props;
  return (
    <div>
      <CircularProgress disableShrink />
      <Typography variant="body1" gutterBottom>
        {text}
      </Typography>
    </div>
  );
}
