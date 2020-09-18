import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useToasts } from 'react-toast-notifications';
import Checkbox from '@material-ui/core/Checkbox';

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

const UserAgreement = (props) => {
  const classes = useStyles();
  const { handleNext, handleBack, handleSkip, agreementAgreed, setAgreementAgreed } = props;
  const { addToast } = useToasts();
  // const [userAgreementChecked, setUserAgreementCheckBox] = React.useState(false);
  const onClickNext = () => {

    if (agreementAgreed == false) {
      addToast('Please agree our user agreement before going to the next step.', {
        appearance: 'info',
        autoDismiss: true,
        autoDismissTimeout: 5000,
      });
      return;
    }
    handleNext();
  };

  const handleCheckBoxChange = (event) => {
    setAgreementAgreed(event.target.checked);
  };

  return (
    <div style={{width: '60%', marginLeft: '20%', marginRight: '20%', marginTop:'5%'}}>
      <div>
      <Typography variant="h4" gutterBottom>
        User Agreement
      </Typography>
        <Typography className={classes.instructions}>
          {'GenoCode will not collect or use any data from users.Your genetic test file will be analyzed on the website and you need to save the given risk result for your own use. Once you close the website, you need to upload the file again to see the result. If you have questions, concerns, complaints, or suggestions about our website, you can reach out to us via email.'}
        </Typography>
      </div>
      <br /><br />
      <div className="form-check" style={{width: '60%', marginLeft: '20%', marginRight: '20%'}}>
        {/* <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" /> */}
        <Checkbox
        checked={agreementAgreed}
        onChange={handleCheckBoxChange}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        id="userAgreementCheckBox"
      />
        <label className="form-check-label" htmlFor="userAgreementCheckBox">
          <strong>I agree</strong>
        </label>
      </div>
      <br /><br />
      <div>
      <p align="right">
        <Button disabled={true} onClick={handleBack} className={classes.button}>
          Back
        </Button>
        {/* {isStepOptional(activeStep) && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSkip}
            className={classes.button}
          >
            Skip
          </Button>
        )} */}
        <Button
          variant="contained"
          color="primary"
          onClick={onClickNext}
          className={classes.button}
        >
          Next
        </Button>
      </p>
        
      </div>
    </div>
  );
}

export default UserAgreement;
