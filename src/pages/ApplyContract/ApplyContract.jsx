import React, { Component } from 'react';
import StepForm from './components/StepForm';

export default class ApplyContract extends Component {
  static displayName = 'ApplyContract';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="apply-contract-page">
        <StepForm />
      </div>
    );
  }
}
