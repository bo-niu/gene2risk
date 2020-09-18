import React from 'react';
import Typography from '@material-ui/core/Typography';
import useWindowDimensions from '../components/useWindowDimensions';
// import { useParams } from 'react-router';

let Plotly = null;
async function loadPlotly() {
  if (__isBrowser__) {
    let { default: Plot } = await import('react-plotly.js');
    Plotly = Plot;
  }
}

loadPlotly();

function Result(props) {
  const { geneResult: res } = props;
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  // let useParam = useParams();
  console.log('geneResult: ', res);
  let geneResult = null;
  if (res) {
    const resObj = JSON.parse(res);
    geneResult = {
      x: resObj.figure[0].data[0].x,
      y: resObj.figure[0].data[0].y,
      array: resObj.figure[0].data[0].error_y.array,
    };
  }

  console.log('Plotly: ', Plotly);
  let plotComponent = 'server side rendered plot';
  if (res === null || res === undefined) {
    return null;
  }
  if (Plotly) {
    plotComponent = (
      <Plotly
        data={[{
          x: geneResult.x, //: list(genotype_bmi),
          type: 'bar',
          y: geneResult.y, //: list(contribution_bmi.values()),
          error_y: {
            array: geneResult.array, //: list(error_bmi.values()),
            type: 'percent',
          },
        }]}
        layout={{
          width: windowWidth,
          title: 'Contributions of different SNPs to BMI Polygenic risk scores',
          yaxis: {
            title: 'Contributions',
          },
          xaxis: {
            title: 'Genotypes',
          },
        }}
      />
    );
  }

  console.log(windowWidth, windowHeight);
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Here are your results.
      </Typography>
      <div>{plotComponent}</div>
    </div>

  );
}

export default Result;