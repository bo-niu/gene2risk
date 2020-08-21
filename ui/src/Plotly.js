import React from 'react';

export default class Plotly extends React.Component {
  constructor() {
    super();
    this.state = {
      Plot: null,
    };
  }

  async componentDidMount() {
    const { Plot } = this.state;
    if (Plot == null && __isBrowser__) {
      let { default: Plot } = await import('react-plotly.js');
      this.setState({ Plot });
    }
  }

  render() {
    const { Plot } = this.state;
    if (!Plot) return null;
    const { x, y, array } = this.props;
    const plotComponent = (
      <Plot
        data={[{
          x, //: list(genotype_bmi),
          type: 'bar',
          y, //: list(contribution_bmi.values()),
          error_y: {
            array, //: list(error_bmi.values()),
            type: 'percent',
          },
        }]}
        layout={{
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
    return (
      <div>{plotComponent}</div>
    );
  }
}