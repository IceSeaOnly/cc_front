import React, { Component } from 'react';
import TabTable from './components/TabTable'
export default class UserContractList extends Component {
  static displayName = 'UserContractList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-contract-list-page">
      <TabTable/>
      </div>
    );
  }
}
