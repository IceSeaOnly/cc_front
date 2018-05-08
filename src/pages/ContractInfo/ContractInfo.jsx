import React, { Component } from 'react';
import DetailTable from './components/DetailTable';

export default class ContractInfo extends Component {
  static displayName = 'ContractInfo';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="contract-info-page">
        <DetailTable />
      </div>
    );
  }
}
