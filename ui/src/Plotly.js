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
    const plotComponent = (
      <Plot
        data={[{
          type: 'violin',
          x: this.day,
          y: this.totalBill,
          points: 'none',
          box: {
            visible: true,
          },
          line: {
            color: 'green',
          },
          meanline: {
            visible: true,
          },
          transforms: [{
            type: 'groupby',
            groups: this.day,
            styles: [
              { target: 'Sun', value: { line: { color: 'blue' } } },
              { target: 'Sat', value: { line: { color: 'orange' } } },
              { target: 'Thur', value: { line: { color: 'green' } } },
              { target: 'Fri', value: { line: { color: 'red' } } },
            ],
          }],
        }]}
        layout={{
          title: 'Multiple Traces Violin Plot',
          yaxis: {
            zeroline: false,
          },
        }}
      />
    );
    return (
      <div>{plotComponent}</div>
    );
  }
}