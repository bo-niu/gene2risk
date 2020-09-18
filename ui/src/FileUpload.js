import Dropzone from './Dropzone';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useToasts } from 'react-toast-notifications';
import Typography from '@material-ui/core/Typography';
import Accordion from './components/Accordion';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

export default function FileUpload(props) {

  const { addToast } = useToasts();
  const { fileStat } = props;
  const onNextClicked = () => {
    if (fileStat === null) {
      addToast('Please upload your gene file before entering next step.', {
        appearance: 'info',
        autoDismiss: true,
        autoDismissTimeout: 5000,
      });
      return;
    }
    handleNext();
  };
  const whatGeneFileTitle = 'What is the gene file?';
  const whatGeneFileContent = (
    <div>
      <p>Your gene file should be a text file in such format:</p>
      <div># rsid	chromosome	position	genotype</div>
      <div>rs12564807	1	734462	AA</div>
      <div>rs3131972	1	752721	AG</div>
      <div>rs148828841	1	760998	CC</div>
      <div>rs12124819	1	776546	AG</div>
      <div>rs115093905	1	787173	--</div>
      <div>rs11240777	1	798959	AG</div>
      <div>rs7538305	1	824398	--</div>
      <div>rs4970383	1	838555	CC</div>
      <div>rs4475691	1	846808	CC</div>
      <div>rs7537756	1	854250	AA</div>
      <div>rs13302982	1	861808	GG</div>
      <div>rs55678698	1	864490	CC</div>
      <div>i6019299	1	871267	CC</div>
      <div>rs1110052	1	873558	TT</div>
      <div>rs147226614	1	878697	GG</div>
      <div>i6019302	1	881843	GG</div>
      <div>rs2272756	1	882033	GG</div>
      <div>rs67274836	1	884767	AG</div>
      <div>i6019303	1	888554	CC</div>
      <div>...</div>
    </div>
  );

  const whereGeneFileTitle = 'Where can I get my gene file?';
  const whereGeneFileContent = (
    <div>You can get your own gene file from <a href="https://www.google.com/" target="_blank">here</a>.</div>
  );


  const classes = useStyles();
  const {
    handleNext, handleBack, handleSkip,
  } = props;

  let fileAdded = null;
  if (fileStat) {
    fileAdded = (
      <div>
        <Typography variant="body1" gutterBottom>
          <div style={{color: 'blue'}}>
            <strong>You have successfully upload your gene file.</strong>
          </div>
          <div>File name: {fileStat.filename}</div>
          <div>Size: {(fileStat.filesize / 1024 / 1024).toFixed(2)}MB</div>
      </Typography>
      </div>
    );
  }

  return (
    <div style={{marginLeft: '20%', marginRight: '20%', marginTop: '100px', marginBottom: '100px'}}>
      <Typography variant="h4" gutterBottom>
        Please upload your gene file.
      </Typography>
      {/* <div style={{width: '60%', marginLeft: '20%', marginRight: '20%', marginTop:'5%'}}> */}
      <div>
        <Dropzone {...props} />
      </div>
      <div>{fileAdded}</div>
      <br /><br />
      <Accordion title={whatGeneFileTitle} content={whatGeneFileContent} />
      <Accordion title={whereGeneFileTitle} content={whereGeneFileContent} />
      <br /><br />
      <p align="right">
        <Button disabled={false} onClick={handleBack} className={classes.button}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onNextClicked}
          className={classes.button}
        >
          Next
        </Button>
      </p>
    </div>
  );
}