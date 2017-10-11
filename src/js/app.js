import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Chart from './repayment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isReady: false, isError: false, data: null };
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://api.github.com/repos/donovan-graham/victory-chart/commits');
      if (res.ok) {
        const contentType = res.headers.get('content-type');
        const data = contentType && contentType.includes('application/json') ? await res.json() : await res.text();
        this.setState(state => ({ isReady: true, isError: false, data }));
      } else {
        this.setState(state => ({ isReady: true, isError: true, data: null }));
      }
    } catch (e) {
      this.setState(state => ({ isReady: true, isError: true, data: null }));
    }
  }

  render() {
    if (!this.state.isReady) {
      return <span>loading ... </span>;
    }
    if (this.state.isError) {
      return <span>an error occurred ... </span>;
    }
    return <Chart />;
  }
}

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
