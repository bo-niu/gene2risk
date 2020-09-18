import DatePicker from './DatePicker';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

export default function UserInfo(props) {
  const classes = useStyles();
  const {
    handleNext, handleBack, handleSkip, 
    // firstName, setFirstName, lastName,
    // setLastName, gender, setGender, weight, setWeight, birthday, setBirthday
    userInfo, setUserInfo,
  } = props;
  const { firstName, lastName, gender, weight, birthday } = userInfo;
  const onClick = () => {
    handleNext();
  };
  const onLastNameChange = (e) => {
    let preUserInfo = {...userInfo};
    preUserInfo.lastName = e.target.value;
    setUserInfo(preUserInfo);
  };
  const onFirstNameChange = (e) => {
    // setFirstName(e.target.value);
    let preUserInfo = {...userInfo};
    preUserInfo.firstName = e.target.value;
    setUserInfo(preUserInfo);
  };
  const onGenderChange = (e) => {
    // setGender(e.target.value);
    let preUserInfo = {...userInfo};
    preUserInfo.gender = e.target.value;
    setUserInfo(preUserInfo);
  };
  const onWeightChange = (e) => {
    // setWeight(e.target.value);
    let preUserInfo = {...userInfo};
    preUserInfo.weight = e.target.value;
    setUserInfo(preUserInfo);
  };
  return (
    <div style={{marginLeft: '20%', marginRight: '20%', marginTop: '100px', marginBottom: '100px'}}>
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <InputLabel htmlFor="FirstNameInput">First Name</InputLabel>
            <Input
              id="FirstNameInput"
              value={firstName}
              onChange={onFirstNameChange}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <InputLabel htmlFor="LastNameInput">Last Name</InputLabel>
            <Input
              id="LastNameInput"
              defaultValue={lastName}
              onChange={onLastNameChange}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="genderLabel">
              Gender
            </InputLabel>
            <Select
              labelId="genderLabel"
              id="genderSelect"
              value={gender ? gender : ''}
              onChange={onGenderChange}
              displayEmpty
              style={{minWidth: 220}}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
            <FormHelperText></FormHelperText>
          </Grid>
          <Grid item xs={12}>
          <InputLabel id="weightLabel">
              Weight
            </InputLabel>
            <TextField
              // label="Weight"
              labelId="weightLabel"
              id="weightInput"
              onChange={onWeightChange}
              defaultValue={weight}
              className={clsx(classes.margin, classes.textField)}
              style={{minWidth: 220}}
              InputProps={{
                startAdornment: <InputAdornment position="start"><div style={{fontSize: 12}}>Kg</div></InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              className={classes.formControl}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          </Grid>
        </Grid>
      </div>
      <br /><br />
      <p align="right">
        <Button disabled={false} onClick={handleBack} className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          className={classes.button}
        >
          Next
        </Button>
      </p>
    </div>
  );
}