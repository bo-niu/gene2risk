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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function UserInfo() {
  const classes = useStyles();
  const [gender, setGender] = React.useState('');
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  return (
    <div style={{marginLeft: '20%', marginRight: '20%', marginTop: '100px', marginBottom: '100px'}}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <InputLabel htmlFor="FirstNameInput">First Name</InputLabel>
            <Input
              id="FirstNameInput"
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
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Gender
            </InputLabel>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={gender}
              onChange={handleGenderChange}
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
            <TextField
              label="Weight"
              id="standard-start-adornment"
              className={clsx(classes.margin, classes.textField)}
              style={{minWidth: 220}}
              InputProps={{
                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker className={classes.formControl} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}