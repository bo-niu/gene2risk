import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function UserAgreement(props) {
  const classes = useStyles();
  const { handleNext, handleBack, handleSkip } = props;
  return (
    <>
      <div style={{width: '60%', marginLeft: '20%', marginRight: '20%', marginTop:'5%'}}>
        <Typography className={classes.instructions}>
          {'GenoCode will not collect or use any data from users.Your genetic test file will be analyzed on the website and you need to save the given risk result for your own use. Once you close the website, you need to upload the file again to see the result. If you have questions, concerns, complaints, or suggestions about our website, you can reach out to us via email.'}
        </Typography>
      </div>
      <br /><br />
      <div className="form-check" style={{width: '60%', marginLeft: '20%', marginRight: '20%'}}>
        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
        <label className="form-check-label" htmlFor="defaultCheck1">
          I agree
        </label>
      </div>
      <br /><br />
      <div>
      <p align="right">
        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
          Back
        </Button>
        {isStepOptional(activeStep) && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSkip}
            className={classes.button}
          >
            Skip
          </Button>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </p>
        
      </div>
    </>
  );
}