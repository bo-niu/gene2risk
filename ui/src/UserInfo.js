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
  margin: {
    // margin: theme.spacing(1),
    margin: '10px',
  },
  formControl: {
    // margin: theme.spacing(1),
    margin: '10px',
    minWidth: 120,
  },
  selectEmpty: {
    // margin: theme.spacing(1),
    margin: '10px',
  },
}));

export default function UserInfo() {
  const classes = useStyles();
  // const [state, setState] = React.useState({
  //   age: '',
  //   name: 'hai',
  //   gender: '',
  //   weight: '',
  // });
  const [gender, setGender] = React.useState('');
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  return (
    <div style={{marginLeft: '20%', marginRight: '20%', marginTop: '100px', marginBottom: '100px'}}>
    {/* <form className={classes.root} noValidate autoComplete="off"> */}
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Gender
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={gender}
          onChange={handleGenderChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value={'male'}>Male</MenuItem>
          <MenuItem value={'female'}>Female</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
            label="With normal TextField"
            id="standard-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
            }}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <DatePicker className={classes.formControl} />
        </FormControl>
      

    {/* </form> */}
    </div>
  );
}