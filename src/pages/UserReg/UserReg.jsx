import React, { Component } from 'react';
import RegisterForm from './components/RegisterForm';

export default class UserReg extends Component {
  static displayName = 'UserReg';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-reg-page">
      <br/><br/><br/><br/><br/>
        <RegisterForm />
      </div>
    );
  }
}
