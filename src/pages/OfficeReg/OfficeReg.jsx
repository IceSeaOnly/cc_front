import React, { Component } from 'react';
import RegisterForm from './components/RegisterForm';

export default class OfficeReg extends Component {
  static displayName = 'OfficeReg';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="office-reg-page">
        <br/><br/><br/><br/><br/>
        <RegisterForm />
      </div>
    );
  }
}
