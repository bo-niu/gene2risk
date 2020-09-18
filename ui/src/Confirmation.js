import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  table: {
    // minWidth: 700,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function Confirmation(props) {

  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  const {
    handleNext, handleBack, handleSkip, userInfo, fileStat, setGeneResult
  } = props;
  let history = useHistory();
  const goToResult = (obj) => {
    history.push(obj);
  }
  const handleSubmit = async () => {
    setLoading(true);
    try {
			const res = await axios.post('/calculate', {
        uuid: fileStat.uuid,
        userInfo,
        fileStat,
      });
      // setPlot(result);
      // console.log(res);
      setLoading(false);
      
      // const params = new URLSearchParams();
      // params.set('res', res.data);
      // const search = params.toString ? `?${params.toString()}` : '';
      // // history.push({ pathname: urlBase, search });
      // // history.push("/result");
      // // goToResult({ pathname: `result`, search });
      setGeneResult(res.data[0]);
      goToResult({ pathname: `result` });


		} catch (err) {
      console.log(`There was a problem with the server: ${err}`);
    }
  };

  const handleLoading = () => {
    console.log('we are still processing.');
  }

  const rows = [
    ['First Name', userInfo.firstName],
    ['Last Name', userInfo.lastName],
    ['Gender', userInfo.gender],
    ['Weight', userInfo.weight],
    ['Birthday', userInfo.birthday.toISOString().substring(0, 10)],
    ['Gene File Name', fileStat.filename],
    ['Gene File Size', `${(fileStat.filesize / 1000000).toFixed(1).toString()}MB`],
  ];

  return (
    <div style={{marginLeft: '20%', marginRight: '20%', marginTop: '100px', marginBottom: '100px'}}>
      {/* <div style={{width: '60%', marginLeft: '20%', marginRight: '20%', marginTop:'5%'}}> */}
      {/* <List className={classes.root}>
        {lists}
      </List> */}
      <Typography variant="h4" gutterBottom>
        Please confirm your information.
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row[0]}>
                <StyledTableCell component="th" scope="row">
                  {row[0]}
                </StyledTableCell>
                <StyledTableCell>{row[1]}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <br /><br />
      </div>
      <p align="right">
        <Button disabled={false} onClick={handleBack} className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.button}
        >
          Submit
        </Button>
      </p>

      <Backdrop className={classes.backdrop} open={loading} onClick={handleLoading}>
          <CircularProgress color="inherit" />
          <br/>
          <Typography  variant="h4" gutterBottom>
            {'  Please wait. Usually it will take less than 10 seconds for processing.'}
          </Typography>
      </Backdrop>
    </div>
  );
}