import React, { Component } from 'react';
import UserLogin from './components/UserLogin';

export default class OfficeLogin extends Component {
  static displayName = 'OfficeLogin';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="office-login-page">
        <UserLogin />
      </div>
    );
  }
}
