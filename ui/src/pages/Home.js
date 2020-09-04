import React from 'react';
import Dropzone from '../Dropzone';
import Plotly from '../Plotly';
import Stepper from '../Stepper';
import DatePicker from '../DatePicker';
import { Link } from "react-router-dom";
import '../css/home.css';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.setPlot = this.setPlot.bind(this);
    this.state = {
      x: null,
      y: null,
      array: null,
    };
  }

  setPlot({ x, y, array }) {
    this.setState({ x, y, array });
  }

  render() {
    const { x, y, array } = this.state;
    return (
      <div>
        <div className="Home">
          <div className="body">
            <div className="hero">
            <h1 className="hero-text">Be educated about your natural risk</h1>
            <p className="hero-subtext">Stay one step ahead of life. Learn more about your genetic health today.</p>
            </div>

          </div>
        </div>
          {/* <Dropzone setPlot={this.setPlot} />
          <Plotly x={x} y={y} array={array} />
          <Stepper />
          <DatePicker /> */}
      </div>
    );
  }
}

export default Home;
