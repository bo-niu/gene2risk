import Dropzone from './Dropzone';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

export default function Confirmation(props) {
  const classes = useStyles();
  const {
    handleNext, handleBack, handleSkip,
  } = props;
  return (
    <div style={{marginLeft: '20%', marginRight: '20%', marginTop: '100px', marginBottom: '100px'}}>
      {/* <div style={{width: '60%', marginLeft: '20%', marginRight: '20%', marginTop:'5%'}}> */}
      <div>
        This is for confirmation.
        <br /><br />
      </div>
      <p align="right">
        <Button disabled={false} onClick={handleBack} className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          Finish
        </Button>
      </p>
    </div>
  );
}